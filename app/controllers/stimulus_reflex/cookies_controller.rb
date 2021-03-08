class StimulusReflex::CookiesController < ApplicationController
  def update
    redis_key = StimulusReflex.config.session_prefix + session.id.to_s
    if Rails.cache.exist?(redis_key)
      data = JSON.parse(Rails.cache.fetch(redis_key))
      data.each do |key, value|
        session[key] = value
      end
      Rails.cache.delete(redis_key)
    end
    head :ok
  end
end
