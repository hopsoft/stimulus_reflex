# frozen_string_literal: true

class StimulusReflex::Channel < ActionCable::Channel::Base
  include CableReady::Broadcaster

  def stream_name
    ids = connection.identifiers.map { |identifier| send(identifier).try(:id) || send(identifier) }
    [
      params[:channel],
      ids.select(&:present?).join(";")
    ].select(&:present?).join(":")
  end

  def subscribed
    stream_from stream_name
  end

  def receive(data)
    url = data["url"].to_s
    selectors = (data["selectors"] || []).select(&:present?)
    selectors = data["selectors"] = ["body"] if selectors.blank?
    target = data["target"].to_s
    reflex_name, method_name = target.split("#")
    reflex_name = reflex_name.camelize
    reflex_name = reflex_name.end_with?("Reflex") ? reflex_name : "#{reflex_name}Reflex"
    arguments = (data["args"] || []).map { |arg| object_with_indifferent_access arg }
    element = StimulusReflex::Element.new(data)
    permanent_attribute_name = data["permanent_attribute_name"]
    params = data["params"] || {}

    begin
      begin
        reflex_class = reflex_name.constantize.tap { |klass| raise ArgumentError.new("#{reflex_name} is not a StimulusReflex::Reflex") unless is_reflex?(klass) }
        reflex = reflex_class.new(self, url: url, element: element, selectors: selectors, method_name: method_name, permanent_attribute_name: permanent_attribute_name, params: params)
        delegate_call_to_reflex reflex, method_name, arguments
      rescue => invoke_error
        reflex&.rescue_with_handler(invoke_error)
        message = exception_message_with_backtrace(invoke_error)
        return broadcast_message subject: "error", body: "StimulusReflex::Channel Failed to invoke #{target}! #{url} #{message}", data: data
      end

      if reflex.halted?
        broadcast_message subject: "halted", data: data
      else
        begin
          case reflex.morph_mode
          when :page
            render_page_and_broadcast_morph reflex, selectors, data
          when :selector
            broadcast_message subject: "selector", data: data
          when :nothing
            broadcast_message subject: "nothing", data: data
          end
        rescue => render_error
          reflex.rescue_with_handler(render_error)
          message = exception_message_with_backtrace(render_error)
          broadcast_message subject: "error", body: "StimulusReflex::Channel Failed to re-render #{url} #{message}", data: data
        end
      end
    
    ensure
      commit_session reflex if reflex
    end
  end

  private

  def object_with_indifferent_access(object)
    return object.with_indifferent_access if object.respond_to?(:with_indifferent_access)
    object.map! { |obj| object_with_indifferent_access obj } if object.is_a?(Array)
    object
  end

  def is_reflex?(reflex_class)
    reflex_class.ancestors.include? StimulusReflex::Reflex
  end

  def delegate_call_to_reflex(reflex, method_name, arguments = [])
    method = reflex.method(method_name)
    required_params = method.parameters.select { |(kind, _)| kind == :req }
    optional_params = method.parameters.select { |(kind, _)| kind == :opt }

    if arguments.size == 0 && required_params.size == 0
      reflex.process(method_name)
    elsif arguments.size >= required_params.size && arguments.size <= required_params.size + optional_params.size
      reflex.process(method_name, *arguments)
    else
      raise ArgumentError.new("wrong number of arguments (given #{arguments.inspect}, expected #{required_params.inspect}, optional #{optional_params.inspect})")
    end
  end

  def render_page_and_broadcast_morph(reflex, selectors, data = {})
    html = render_page(reflex)
    broadcast_morphs selectors, data, html if html.present?
  end

  def commit_session(reflex)
    store = reflex.request.session.instance_variable_get("@by")
    store.commit_session reflex.request, reflex.controller.response
  rescue => e
    message = "Failed to commit session! #{exception_message_with_backtrace(e)}"
    logger.error "\e[31m#{message}\e[0m"
  end

  def render_page(reflex)
    reflex.controller.process reflex.url_params[:action]
    reflex.controller.response.body
  end

  def broadcast_morphs(selectors, data, html)
    document = Nokogiri::HTML(html)
    selectors = selectors.select { |s| document.css(s).present? }
    selectors.each do |selector|
      cable_ready[stream_name].morph(
        selector: selector,
        html: document.css(selector).inner_html,
        children_only: true,
        permanent_attribute_name: data["permanent_attribute_name"],
        stimulus_reflex: data.merge({
          last: selector == selectors.last,
          morph_mode: "page"
        })
      )
    end
    cable_ready.broadcast
  end

  def broadcast_message(subject:, body: nil, data: {})
    message = {
      subject: subject,
      body: body
    }

    logger.error "\e[31m#{body}\e[0m" if subject == "error"

    data.merge!(morph_mode: "page", server_message: message)
    data.merge!(morph_mode: "selector") if subject == "selector"
    data.merge!(morph_mode: "nothing") if subject == "nothing"

    cable_ready[stream_name].dispatch_event(
      name: "stimulus-reflex:server-message",
      detail: {stimulus_reflex: data}
    )
    cable_ready.broadcast
  end

  def exception_message_with_backtrace(exception)
    "#{exception} #{exception.backtrace.first}"
  end
end
