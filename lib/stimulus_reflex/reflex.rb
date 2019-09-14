# frozen_string_literal: true

class StimulusReflex::Reflex
  attr_reader :channel, :url, :element, :callback, :redirect

  delegate :connection, to: :channel
  delegate :session, to: :request

  def initialize(channel, url: nil, element: nil)
    @channel = channel
    @url = url
    @element = element
    @callback = nil
    @redirect = nil
  end

  def request
    @request ||= ActionDispatch::Request.new(connection.env)
  end
end
