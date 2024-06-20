module Beekeeper
  require 'socket'
  require 'json'
  class Bridge

    # @param Hash]data
    def self.send(data)
      s = TCPSocket.new 'localhost', 13000

      # Convert the hash to JSON
      json_data = data.to_json

      # Send the JSON data to the socket
      s.puts json_data

      # Read the response from the socket
      response = s.gets.chomp
      puts "Received: #{response}"

      # Close the socket
      s.close
    end

  end
end