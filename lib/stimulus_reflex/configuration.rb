# frozen_string_literal: true

module StimulusReflex
  class << self
    def configure
      yield configuration
    end

    def configuration
      @configuration ||= Configuration.new
    end

    alias_method :config, :configuration
  end

  class Configuration
    attr_accessor :on_failed_sanity_checks, :parent_channel, :logging, :middleware, :session_prefix

    DEFAULT_LOGGING = proc { "[#{session_id}] #{operation_counter.magenta} #{reflex_info.green} -> #{selector.cyan} via #{mode} Morph (#{operation.yellow})" }

    def initialize
      @on_failed_sanity_checks = :exit
      @parent_channel = "ApplicationCable::Channel"
      @logging = DEFAULT_LOGGING
      @session_prefix = "stimulus_reflex:session:"
      @middleware = ActionDispatch::MiddlewareStack.new
    end
  end
end
