# frozen_string_literal: true

require "permessage_deflate"

module ActionCable
  module Connection
    class ClientSocket
      alias_method :old_initialize, :initialize
      def initialize(env, event_target, event_loop, protocols)
        old_initialize(env, event_target, event_loop, protocols)
        deflate = PermessageDeflate.configure(
          level: Zlib::BEST_COMPRESSION,
          max_window_bits: 13
        )
        @driver.add_extension(deflate)
      end
    end
  end
end
