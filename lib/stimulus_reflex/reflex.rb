# frozen_string_literal: true

ClientAttributes = Struct.new(:reflex_id, :reflex_controller, :xpath_controller, :xpath_element, :permanent_attribute_name, keyword_init: true)

class StimulusReflex::Reflex
  include ActiveSupport::Rescuable
  include StimulusReflex::Callbacks
  include ActionView::Helpers::TagHelper

  attr_accessor :payload
  attr_reader :cable_ready, :channel, :url, :element, :data, :selectors, :method_name, :broadcaster, :client_attributes, :logger

  alias_method :action_name, :method_name # for compatibility with controller libraries like Pundit that expect an action name

  delegate :connection, :stream_name, to: :channel
  delegate :controller_class, :flash, :session, to: :request
  delegate :broadcast, :broadcast_message, to: :broadcaster
  delegate :reflex_id, :reflex_controller, :xpath_controller, :xpath_element, :permanent_attribute_name, to: :client_attributes

  def initialize(channel, url: nil, data: nil, selectors: [], method_name: nil, params: {}, client_attributes: {})
    if is_a? CableReady::Broadcaster
      message = <<~MSG

        #{self.class.name} includes CableReady::Broadcaster, and you need to remove it.
        Reflexes have their own CableReady interface. You can just assume that it's present.
        See https://docs.stimulusreflex.com/rtfm/cableready#using-cableready-inside-a-reflex-action for more details.

      MSG
      raise TypeError.new(message.strip)
    end

    @channel = channel
    @url = url
    @data = data
    @selectors = selectors
    @method_name = method_name
    @params = params
    @broadcaster = StimulusReflex::PageBroadcaster.new(self)
    @logger = StimulusReflex::Logger.new(self)
    @client_attributes = ClientAttributes.new(client_attributes)
    @cable_ready = StimulusReflex::CableReadyChannels.new(stream_name)
    @payload = {}

    @element = StimulusReflex::Element.new(
      attrs: data["attrs"],
      dataset: data["dataset"],
      selector: data["xpathElement"],
      cable_ready: @cable_ready
    )
    self.params
  end

  def request
    @request ||= begin
      uri = URI.parse(url)
      path = ActionDispatch::Journey::Router::Utils.normalize_path(uri.path)
      query_hash = Rack::Utils.parse_nested_query(uri.query)
      mock_env = Rack::MockRequest.env_for(uri.to_s)

      mock_env.merge!(
        "rack.request.query_hash" => query_hash,
        "rack.request.query_string" => uri.query,
        "ORIGINAL_SCRIPT_NAME" => "",
        "ORIGINAL_FULLPATH" => path,
        Rack::SCRIPT_NAME => "",
        Rack::PATH_INFO => path,
        Rack::REQUEST_PATH => path,
        Rack::QUERY_STRING => uri.query
      )

      env = connection.env.merge(mock_env)

      middleware = StimulusReflex.config.middleware

      if middleware.any?
        stack = middleware.build(Rails.application.routes)
        stack.call(env)
      end

      req = ActionDispatch::Request.new(env)

      # fetch path params (controller, action, ...) and apply them
      request_params = StimulusReflex::RequestParameters.new(params: @params, req: req, url: url)
      req = request_params.apply!

      req
    end
  end

  def morph(selectors, html = nil)
    case selectors
    when :page
      raise StandardError.new("Cannot call :page morph after :#{broadcaster.to_sym} morph") unless broadcaster.page?
    when :nothing
      raise StandardError.new("Cannot call :nothing morph after :selector morph") if broadcaster.selector?
      @broadcaster = StimulusReflex::NothingBroadcaster.new(self) unless broadcaster.nothing?
    else
      raise StandardError.new("Cannot call :selector morph after :nothing morph") if broadcaster.nothing?
      @broadcaster = StimulusReflex::SelectorBroadcaster.new(self) unless broadcaster.selector?
      broadcaster.append_morph(selectors, html)
    end
  end

  def controller
    @controller ||= begin
      controller_class.new.tap do |c|
        c.instance_variable_set :"@stimulus_reflex", true
        instance_variables.each { |name| c.instance_variable_set name, instance_variable_get(name) }
        c.set_request! request
        c.set_response! controller_class.make_response!(request)
      end
    end
  end

  def controller_element
    @controller_element ||= StimulusReflex::Element.new(selector: xpath_controller, cable_ready: @cable_ready)
  end

  def controller?
    !!defined? @controller
  end

  def render(*args)
    controller_class.renderer.new(connection.env.merge("SCRIPT_NAME": "")).render(*args)
  end

  # Invoke the reflex action specified by `name` and run all callbacks
  def process(name, *args)
    reflex_invoked = false
    result = run_callbacks(:process) {
      public_send(name, *args).tap { reflex_invoked = true }
    }
    @halted ||= result == false && !reflex_invoked
    result
  end

  # Indicates if the callback chain was halted via a throw(:abort) in a before_reflex callback.
  # SEE: https://api.rubyonrails.org/classes/ActiveSupport/Callbacks.html
  # IMPORTANT: The reflex will not re-render the page if the callback chain is halted
  def halted?
    !!@halted
  end

  def default_reflex
    # noop default reflex to force page reloads
  end

  def params
    @_params ||= ActionController::Parameters.new(request.parameters)
  end

  def dom_id(record, prefix = nil, hash: "#")
    id = if record.is_a?(ActiveRecord::Relation)
      [prefix, record.model_name.plural].compact.join("_")
    elsif record.is_a?(ActiveRecord::Base)
      ActionView::RecordIdentifier.dom_id(record, prefix).to_s
    else
      [prefix, record.to_s].compact.join("_")
    end
    (hash + id).squeeze("#")
  end

  # morphdom needs content to be wrapped in an element with the same id when children_only: true
  # Oddly, it doesn't matter if the target element is a div! See: https://docs.stimulusreflex.com/appendices/troubleshooting#different-element-type-altogether-who-cares-so-long-as-the-css-selector-matches
  # Used internally to allow automatic partial collection rendering, but also useful to library users
  # eg. `morph dom_id(@posts), wrap(render(@posts), @posts)`
  def wrap(content, resource)
    tag.div(content.html_safe, id: dom_id(resource, hash: ""))
  end
end
