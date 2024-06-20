require 'uri'
require 'net/http'

module Beekeeper
  class Request

    def self.demo_send(url)
      data =  {
        "session": "tmp1",
        "task_name": "my task",
        "type": "lanczos_general",
        "script": "eigen_values(A, n, 10)",
        "data": {
          "A": "C:\\Users\\CompMechLab2\\acelan\\Acelan.Tests\\DataForTests\\Lanczos\\dummy_a.txt",
          "B": "C:\\Users\\CompMechLab2\\acelan\\Acelan.Tests\\DataForTests\\Lanczos\\dummy_b.txt",
          "n": 2,
          "m": 4,
          "boundary_conditions": "x = 0, ux = 0; y = 0, uy = 0; z = 0, uz = 0;",
          "material": "steel"
        },
        "callback_url": "http://127.0.0.1:3000/api/reports/"
      }

      uri = URI.parse(url)
      http = Net::HTTP.new(uri.host, uri.port)

      http.read_timeout = 5

      http.request_post(uri.path, JSON.generate(data)) do |response|
        puts response
        puts response.body
      end
    end

  end

end