# frozen_string_literal: true

class StimulusReflex::Channel < StimulusReflex.configuration.parent_channel.constantize
  def stream_name
    ids = connection.identifiers.map { |identifier| send(identifier).try(:id) || send(identifier) }
    [
      params[:channel],
      ids.select(&:present?).join(";")
    ].select(&:present?).join(":")
  end

  def subscribed
    super
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
    permanent_attribute_name = data["permanentAttributeName"]
    form_data = Rack::Utils.parse_nested_query(data["formData"])
    params = form_data.deep_merge(data["params"] || {})

    begin
      begin
        reflex_class = reflex_name.constantize.tap { |klass| raise ArgumentError.new("#{reflex_name} is not a StimulusReflex::Reflex") unless is_reflex?(klass) }
        reflex = reflex_class.new(
          self,
          url: url,
          data: data,
          selectors: selectors,
          method_name: method_name,
          params: params,
          client_attributes: {
            reflex_id: data["reflexId"],
            xpath_controller: data["xpathController"],
            xpath_element: data["xpathElement"],
            reflex_controller: data["reflexController"],
            permanent_attribute_name: permanent_attribute_name
          }
        )
        delegate_call_to_reflex reflex, method_name, arguments
      rescue => invoke_error
        message = exception_message_with_backtrace(invoke_error)
        body = "Reflex #{target} failed: #{message} [#{url}]"

        if reflex
          reflex.rescue_with_handler(invoke_error)
          reflex.broadcast_message subject: "error", body: body, data: data, error: invoke_error
        else
          puts "\e[31m#{body}\e[0m"

          if body.to_s.include? "No route matches"
            initializer_path = Rails.root.join("config", "initializers", "stimulus_reflex.rb")

            puts <<~NOTE
              \e[33mNOTE: StimulusReflex failed to locate a matching route and could not re-render the page.

              If your app uses Rack middleware to rewrite part of the request path, you must enable those middleware modules in StimulusReflex.
              The StimulusReflex initializer should be located at #{initializer_path}, or you can generate it with:

                $ bundle exec rails generate stimulus_reflex:config

              Configure any required middleware:

                StimulusReflex.configure do |config|
                  config.middleware.use FirstRackMiddleware
                  config.middleware.use SecondRackMiddleware
                end\e[0m

            NOTE
          end
        end
        return
      end

      if reflex.halted?
        reflex.broadcast_message subject: "halted", data: data
      else
        begin
          reflex.broadcast(selectors, data)
        rescue => render_error
          reflex.rescue_with_handler(render_error)
          message = exception_message_with_backtrace(render_error)
          body = "Reflex failed to re-render: #{message} [#{url}]"
          reflex.broadcast_message subject: "error", body: body, data: data, error: render_error
          puts "\e[31m#{body}\e[0m"
        end
      end
    ensure
      if reflex
        commit_session(reflex)
        report_failed_basic_auth(reflex) if reflex.controller?
        reflex.logger.print
      end
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
    policy = StimulusReflex::ReflexMethodInvocationPolicy.new(method, arguments)

    if policy.no_arguments?
      reflex.process(method_name)
    elsif policy.arguments?
      reflex.process(method_name, *arguments)
    else
      raise ArgumentError.new("wrong number of arguments (given #{arguments.inspect}, expected #{required_params.inspect}, optional #{optional_params.inspect})")
    end
  end

  def commit_session(reflex)
    store = reflex.request.session.instance_variable_get("@by")
    store.commit_session reflex.request, reflex.controller.response
  rescue => e
    message = "Failed to commit session! #{exception_message_with_backtrace(e)}"
    puts "\e[31m#{message}\e[0m"
  end

  def report_failed_basic_auth(reflex)
    if reflex.controller.response.status == 401
      message = "Reflex failed to process controller action \"#{reflex.controller.class}##{reflex.controller.action_name}\" due to HTTP basic auth. Consider adding \"unless: -> { @stimulus_reflex }\" to the before_action or method responible for authentication."
      puts "\e[31m#{message}\e[0m"
    end
  end

  def exception_message_with_backtrace(exception)
    "#{exception}\n#{exception.backtrace.first}"
  end
end
