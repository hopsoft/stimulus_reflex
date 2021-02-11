# frozen_string_literal: true

require File.expand_path("../lib/stimulus_reflex/version", __FILE__)

Gem::Specification.new do |gem|
  gem.name = "stimulus_reflex"
  gem.license = "MIT"
  gem.version = StimulusReflex::VERSION
  gem.authors = ["Nathan Hopkins"]
  gem.email = ["natehop@gmail.com"]
  gem.homepage = "https://github.com/hopsoft/stimulus_reflex"
  gem.summary = "Build reactive applications with the Rails tooling you already know and love."
  gem.post_install_message = <<~MESSAGE
    Friendly reminder: When updating the stimulus_reflex gem,
    don't forget to update your npm package as well.

    See https://www.npmjs.com/package/stimulus_reflex
  MESSAGE

  gem.metadata = {
    "bug_tracker_uri" => "https://github.com/hopsoft/stimulus_reflex/issues",
    "changelog_uri" => "https://github.com/hopsoft/stimulus_reflex/CHANGELOG.md",
    "documentation_uri" => "https://docs.stimulusreflex.com",
    "homepage_uri" => gem.homepage,
    "source_code_uri" => gem.homepage
  }

  gem.files = Dir["app/**/*", "lib/**/*", "bin/*", "[A-Z]*"]
  gem.test_files = Dir["test/**/*.rb"]

  gem.add_dependency "rack"
  gem.add_dependency "nokogiri"
  gem.add_dependency "rails", ">= 5.2"
  gem.add_dependency "redis"
  gem.add_dependency "cable_ready", ">= 4.5"
  gem.add_dependency "permessage_deflate"

  gem.add_development_dependency "bundler", "~> 2.0"
  gem.add_development_dependency "pry-nav"
  gem.add_development_dependency "pry"
  gem.add_development_dependency "rake"
  gem.add_development_dependency "standardrb"
end
