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
    attr_accessor :on_failed_sanity_checks, :on_new_version_available, :on_missing_default_urls, :parent_channel, :logging, :middleware

    DEFAULT_LOGGING = proc { "[#{session_id}] #{operation_counter.magenta} #{reflex_info.green} -> #{selector.cyan} via #{mode} Morph (#{operation.yellow})" }

    def initialize
      @on_failed_sanity_checks = :exit
      @on_new_version_available = :ignore
      @on_missing_default_urls = :warn
      @parent_channel = "ApplicationCable::Channel"
      @logging = DEFAULT_LOGGING
      @middleware = ActionDispatch::MiddlewareStack.new
    end
  end
end
