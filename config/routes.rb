StimulusReflex::Engine.routes.draw do
  if Rails.application.config.session_store == ActionDispatch::Session::CookieStore
    get "update-cookies", to: "cookies#update", constraints: ->(req) { req.xhr? }
  end
end
