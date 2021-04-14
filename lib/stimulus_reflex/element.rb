# frozen_string_literal: true

class StimulusReflex::Element < OpenStruct
  attr_reader :attributes, :data_attributes, :selector
  attr_accessor :cable_ready

  def initialize(attrs: {}, dataset: {}, selector: nil, cable_ready: nil)
    @selector = selector
    @cable_ready = cable_ready

    @attributes = HashWithIndifferentAccess.new(attrs || {})
    @data_attributes = HashWithIndifferentAccess.new(dataset || {})
    all_attributes = @attributes.merge(@data_attributes)
    super all_attributes.merge(all_attributes.transform_keys(&:underscore))
    @data_attributes.transform_keys! { |key| key.delete_prefix "data-" }
  end

  def signed
    @signed ||= ->(accessor) { GlobalID::Locator.locate_signed(dataset[accessor]) }
  end

  def unsigned
    @unsigned ||= ->(accessor) { GlobalID::Locator.locate(dataset[accessor]) }
  end

  def dataset
    @dataset ||= OpenStruct.new(data_attributes.merge(data_attributes.transform_keys(&:underscore)))
  end

  def update
    cable_ready.broadcast
  end

  def method_missing(method_name, *arguments, &block)
    if cable_ready.respond_to?(method_name)
      xpath = selector ? selector.starts_with?("//") : false
      args = {selector: selector, xpath: xpath}.merge(arguments.first.to_h)

      cable_ready.send(method_name.to_sym, args)

      cable_ready
    else
      super
    end
  end

  def respond_to_missing?(method_name)
    cable_ready.respond_to?(method_name) || super
  end
end
