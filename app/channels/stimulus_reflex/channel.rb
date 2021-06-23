# frozen_string_literal: true

class StimulusReflex::Channel < StimulusReflex.configuration.parent_channel.constantize
  attr_reader :reflex_data

  def stream_name
    [params[:channel], connection.connection_identifier].join(":")
  end

  def subscribed
    super
    stream_from stream_name
  end

  def receive(data)
    @reflex_data = StimulusReflex::ReflexData.new(data)
    begin
      begin
        reflex = StimulusReflex::ReflexFactory.create_reflex_from_data(self, @reflex_data)
        delegate_call_to_reflex reflex
      rescue => exception
        error = exception_with_backtrace(exception)
        error_message = "\e[31mReflex #{reflex_data.target} failed: #{error[:message]} [#{reflex_data.url}]\e[0m\n#{error[:stack]}"

        if reflex
          reflex.rescue_with_handler(exception)
          puts error_message
          reflex.broadcast_message subject: "error", data: data, error: exception
        else
          puts error_message

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
          reflex.broadcast(reflex_data.selectors, data)
        rescue => exception
          reflex.rescue_with_handler(exception)
          error = exception_with_backtrace(exception)
          reflex.broadcast_message subject: "error", data: data, error: exception
          puts "\e[31mReflex failed to re-render: #{error[:message]} [#{reflex_data.url}]\e[0m\n#{error[:stack]}"
        end
      end
    ensure
      if reflex
        commit_session(reflex)
        report_failed_basic_auth(reflex) if reflex.controller?
        reflex.logger&.print
      end
    end
  end

  private

  def delegate_call_to_reflex(reflex)
    method_name = reflex_data.method_name
    arguments = reflex_data.arguments
    method = reflex.method(method_name)

    policy = StimulusReflex::ReflexMethodInvocationPolicy.new(method, arguments)

    if policy.no_arguments?
      reflex.process(method_name)
    elsif policy.arguments?
      reflex.process(method_name, *arguments)
    else
      raise ArgumentError.new("wrong number of arguments (given #{arguments.inspect}, expected #{policy.required_params.inspect}, optional #{policy.optional_params.inspect})")
    end
  end

  def commit_session(reflex)
    store = reflex.request.session.instance_variable_get("@by")
    store.commit_session reflex.request, reflex.controller.response
  rescue => exception
    error = exception_with_backtrace(exception)
    puts "\e[31mFailed to commit session! #{error[:message]}\e[0m\n#{error[:backtrace]}"
  end

  def report_failed_basic_auth(reflex)
    if reflex.controller.response.status == 401
      puts "\e[31mReflex failed to process controller action \"#{reflex.controller.class}##{reflex.controller.action_name}\" due to HTTP basic auth. Consider adding \"unless: -> { @stimulus_reflex }\" to the before_action or method responible for authentication.\e[0m"
    end
  end

  def exception_with_backtrace(exception)
    {
      message: exception.to_s,
      backtrace: exception.backtrace.first,
      stack: exception.backtrace.join("\n")
    }
  end
end
