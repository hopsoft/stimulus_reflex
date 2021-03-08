# frozen_string_literal: true

module StimulusReflex
  class SelectorBroadcaster < Broadcaster
    def broadcast(_, data = {})
      morphs.each do |morph|
        selectors, html = morph
        updates = selectors.is_a?(Hash) ? selectors : Hash[selectors, html]
        updates.each do |key, value|
          html = reflex.render(key) if key.is_a?(ActiveRecord::Base) && value.nil?
          html = reflex.wrap(reflex.render(key), key) if key.is_a?(ActiveRecord::Relation) && value.nil?
          fragment = Nokogiri::HTML.fragment(html&.to_s || "")

          selector = key.is_a?(ActiveRecord::Base) || key.is_a?(ActiveRecord::Relation) ? reflex.dom_id(key) : key
          match = fragment.at_css(selector)
          if match.present?
            operations << [selector, :morph]
            cable_ready.morph(
              selector: selector,
              html: match.inner_html,
              children_only: true,
              permanent_attribute_name: permanent_attribute_name,
              stimulus_reflex: data.merge({
                morph: to_sym
              })
            )
          else
            operations << [selector, :inner_html]
            cable_ready.inner_html(
              selector: selector,
              html: fragment.to_html,
              stimulus_reflex: data.merge({
                morph: to_sym
              })
            )
          end
        end
      end

      if Rails.application.config.session_store == ActionDispatch::Session::CookieStore # AND if session has changed
        cable_ready.dispatch_event(name: "stimulus-reflex:update-cookies")
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
  end
end
