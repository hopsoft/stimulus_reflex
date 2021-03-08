# frozen_string_literal: true

module StimulusReflex
  class PageBroadcaster < Broadcaster
    def broadcast(selectors, data)
      reflex.controller.process reflex.params[:action]
      page_html = reflex.controller.response.body

      return unless page_html.present?

      document = Nokogiri::HTML.parse(page_html)
      selectors = selectors.select { |s| document.css(s).present? }
      selectors.each do |selector|
        operations << [selector, :morph]
        html = document.css(selector).inner_html
        cable_ready.morph(
          selector: selector,
          html: html,
          children_only: true,
          permanent_attribute_name: permanent_attribute_name,
          stimulus_reflex: data.merge({
            morph: to_sym
          })
        )
      end

      if Rails.application.config.session_store == ActionDispatch::Session::CookieStore # AND if session has changed
        cable_ready.dispatch_event(name: "stimulus-reflex:update-cookies")
      end

      cable_ready.broadcast
    end

    def to_sym
      :page
    end

    def page?
      true
    end

    def to_s
      "Page"
    end
  end
end
