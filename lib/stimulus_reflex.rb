# frozen_string_literal: true

require "uri"
require "rack"
require "rails/engine"
require "active_support/all"
require "action_dispatch"
require "action_cable"
require "action_view"
require "nokogiri"
require "cable_ready"
require "stimulus_reflex/version"
require "stimulus_reflex/cable_ready_channels"
require "stimulus_reflex/configuration"
require "stimulus_reflex/callbacks"
require "stimulus_reflex/reflex"
require "stimulus_reflex/element"
require "stimulus_reflex/sanity_checker"
require "stimulus_reflex/broadcasters/broadcaster"
require "stimulus_reflex/broadcasters/nothing_broadcaster"
require "stimulus_reflex/broadcasters/page_broadcaster"
require "stimulus_reflex/broadcasters/selector_broadcaster"
require "stimulus_reflex/patches/client_socket"
require "stimulus_reflex/utils/colorize"
require "stimulus_reflex/logger"

module StimulusReflex
  class Engine < Rails::Engine
    initializer "stimulus_reflex.sanity_check" do
      SanityChecker.check! unless Rails.env.production?
    end
  end
end
