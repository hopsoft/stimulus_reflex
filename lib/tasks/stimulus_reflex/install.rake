# frozen_string_literal: true

require "fileutils"
require "stimulus_reflex/version"

namespace :stimulus_reflex do
  desc "Install StimulusReflex in this application"
  task install: :environment do
    system "rails dev:cache" unless Rails.root.join("tmp", "caching-dev.txt").exist?
    gem_version = StimulusReflex::VERSION.gsub(".pre", "-pre")
    system "yarn add stimulus_reflex@#{gem_version}"
    system "bundle exec rails webpacker:install:stimulus"
    main_folder = defined?(Webpacker) ? Webpacker.config.source_path.to_s.gsub("#{Rails.root}/", "") : "app/javascript"

    FileUtils.mkdir_p Rails.root.join("#{main_folder}/controllers"), verbose: true
    FileUtils.mkdir_p Rails.root.join("app/reflexes"), verbose: true

    filepath = [
      "#{main_folder}/controllers/index.js",
      "#{main_folder}/controllers/index.ts",
      "#{main_folder}/packs/application.js",
      "#{main_folder}/packs/application.ts"
    ]
      .select { |path| File.exist?(path) }
      .map { |path| Rails.root.join(path) }
      .first

    puts "Updating #{filepath}"
    lines = File.readlines(filepath)

    unless lines.find { |line| line.start_with?("import StimulusReflex") }
      matches = lines.select { |line| line =~ /\A(require|import)/ }
      lines.insert lines.index(matches.last).to_i + 1, "import StimulusReflex from 'stimulus_reflex'\n"
    end

    unless lines.find { |line| line.start_with?("import consumer") }
      matches = lines.select { |line| line =~ /\A(require|import)/ }
      lines.insert lines.index(matches.last).to_i + 1, "import consumer from '../channels/consumer'\n"
    end

    unless lines.find { |line| line.start_with?("import controller") }
      matches = lines.select { |line| line =~ /\A(require|import)/ }
      lines.insert lines.index(matches.last).to_i + 1, "import controller from '../controllers/application_controller'\n"
    end

    initialize_line = lines.find { |line| line.start_with?("StimulusReflex.initialize") }
    lines << "application.consumer = consumer\n"
    lines << "StimulusReflex.initialize(application, { controller, isolate: true })\n" unless initialize_line
    lines << "StimulusReflex.debug = process.env.RAILS_ENV === 'development'\n" unless initialize_line
    File.write(filepath, lines.join)

    puts
    puts "Updating config/environments/development.rb"
    filepath = Rails.root.join("config/environments/development.rb")
    lines = File.readlines(filepath)
    unless lines.find { |line| line.include?("config.session_store") }
    matches = lines.select { |line| line =~ /\A(Rails.application.configure do)/ }
      lines.insert lines.index(matches.last).to_i + 1, "  config.session_store :cache_store\n\n"
      puts "Using :cache_store for session storage. We recommend switching to Redis for cache and session storage, when you're ready. Find out more: https://docs.stimulusreflex.com/appendices/deployment#use-redis-as-your-cache-store"
      File.write(filepath, lines.join)
    end

    lines = File.readlines(filepath)
    unless lines.find { |line| line.include?("config.action_mailer.default_url_options") }
      matches = lines.select { |line| line =~ /\A(Rails.application.configure do)/ }
      lines.insert lines.index(matches.last).to_i + 1, "  config.action_mailer.default_url_options = {host: \"localhost\", port: 3000}\n\n"
      File.write(filepath, lines.join)
    end

    lines = File.readlines(filepath)
    unless lines.find { |line| line.include?("config.action_controller.default_url_options") }
      matches = lines.select { |line| line =~ /\A(Rails.application.configure do)/ }
      lines.insert lines.index(matches.last).to_i + 1, "  config.action_controller.default_url_options = {host: \"localhost\", port: 3000}\n"
      File.write(filepath, lines.join)
    end

    puts
    puts "Updating config/cable.yml"
    filepath = Rails.root.join("config/cable.yml")
    lines = File.readlines(filepath)
    if lines[1].include?("adapter: async")
      lines.delete_at 1
      lines.insert 1, "  adapter: redis\n"
      lines.insert 2, "  url: <%= ENV.fetch(\"REDIS_URL\") { \"redis://localhost:6379/1\" } %>\n"
      lines.insert 3, "  channel_prefix: " + File.basename(Rails.root.to_s).tr("\\", "").tr("-. ", "_").underscore + "_development\n"
      File.write(filepath, lines.join)
    end

    puts
    puts "Generating default StimulusReflex and CableReady configuration files in config/initializers."
    system "bundle exec rails generate stimulus_reflex:initializer"
    system "bundle exec rails generate cable_ready:initializer"
    system "bundle exec rails generate cable_ready:stream_from"

    puts
    puts "Generating ApplicationReflex class and Stimulus controllers, plus an example Reflex class and controller."
    system "bundle exec rails generate stimulus_reflex example"

    puts
    puts "StimulusReflex and CableReady have been successfully installed! 🎉"
    puts "Go to https://docs.stimulusreflex.com/hello-world/quickstart if you need help getting started."
    puts
    puts "Come say hello on Discord: https://discord.gg/stimulus-reflex"
    puts "The fastest way to get support is to prepare an MVCE git repo that you can share."
    puts
  end
end
