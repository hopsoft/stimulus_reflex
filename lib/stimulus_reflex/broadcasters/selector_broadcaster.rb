# frozen_string_literal: true

module StimulusReflex
  class SelectorBroadcaster < Broadcaster
    def broadcast(_, data = {})
      morphs.each do |morph|
        selectors, html = morph
        updates = create_update_collection(selectors, html)
        updates.each do |update|
          fragment = Nokogiri::HTML.fragment(update.html.to_s)
          match = fragment.at_css(update.selector)
          if match.present?
            operations << [update.selector, :morph]
            cable_ready.morph(
              selector: update.selector,
              html: match.inner_html(save_with: Broadcaster::DEFAULT_HTML_WITHOUT_FORMAT),
              payload: payload,
              children_only: true,
              permanent_attribute_name: permanent_attribute_name,
              stimulus_reflex: data.merge({
                morph: to_sym
              })
            )
          else
            operations << [update.selector, :inner_html]
            cable_ready.inner_html(
              selector: update.selector,
              html: fragment.to_html,
              payload: payload,
              stimulus_reflex: data.merge({
                morph: to_sym
              })
            )
          end
        end
      end

      cable_ready.broadcast
      morphs.clear
    end

    def morphs
      @morphs ||= []
    end

    def append_morph(selectors, html)
      morphs << [selectors, html]
    end

    def to_sym
      :selector
    end

    def selector?
      true
    end

    def to_s
      "Selector"
    end

    private

    def create_update_collection(selectors, html)
      updates = selectors.is_a?(Hash) ? selectors : {selectors => html}
      updates.map do |key, value|
        Update.new(key, value, reflex)
      end
    end

    StimulusReflex::SelectorBroadcaster::Update = Struct.new(:key, :value, :reflex) do
      def selector
        identifiable?(key) ? dom_id(key) : key.to_s
      end

      def html
        html = reflex.render(key) if key.is_a?(ActiveRecord::Base) && value.nil?
        html = reflex.render_collection(key) if key.is_a?(ActiveRecord::Relation) && value.nil?
        html || value
      end
    end.include(CableReady::Identifiable)
  end
end
