# frozen_string_literal: true

module StimulusReflex
  class Broadcaster
    attr_reader :reflex, :logger, :operations
    delegate :cable_ready, :permanent_attribute_name, to: :reflex

    def initialize(reflex)
      @reflex = reflex
      @logger = Rails.logger if defined?(Rails.logger)
      @operations = []
    end

    def nothing?
      false
    end

    def page?
      false
    end

    def selector?
      false
    end

    def broadcast_message(subject:, body: nil, data: {}, error: nil)
      logger.error "\e[31m#{body}\e[0m" if subject == "error"
      operations << ["document", :dispatch_event]
      cable_ready.dispatch_event(
        name: "stimulus-reflex:server-message",
        detail: {
          reflexId: data["reflexId"],
          stimulus_reflex: data.merge(
            morph: to_sym,
            server_message: {subject: subject, body: error&.to_s}
          )
        }
      )
      if Rails.application.config.session_store == ActionDispatch::Session::CookieStore # AND if session has changed
        cable_ready.dispatch_event(name: "stimulus-reflex:update-cookies")
      end
      cable_ready.broadcast
    end

    # abstract method to be implemented by subclasses
    def broadcast(*args)
      raise NotImplementedError
    end

    # abstract method to be implemented by subclasses
    def to_sym
      raise NotImplementedError
    end

    # abstract method to be implemented by subclasses
    def to_s
      raise NotImplementedError
    end
  end
end
