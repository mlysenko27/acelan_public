# frozen_string_literal: true
require 'net/http'
require 'uri'
require 'json'

class SendScriptsJob < ApplicationJob
  queue_as :default

  def send_request(script) #TODO add email and password
    data = { email: "api@acelan.ru",
             password: "~APIUSER2023" }
    uri = URI.parse('https://acelan.ru')
    Net::HTTP.start(uri.host, uri.port,
                    :use_ssl => uri.scheme == 'https') do |http|
      http.request_post('/api/token', data.to_json, { 'Content-Type': 'application/json' }) do |response|
        if response.body["token"].nil?
          result = {
            type: 'errorResult',
            data: {
              message: "Error 521:  Web Server Is Down"
            }
          }
          ActionCable.server.broadcast 'send_scripts_channel',
                                       { status: "up_error", result: result, msg: 'ERROR' }
        else
          result = {
            type: 'textResult',
            data: {
              text: "OK."
            }
          }
          ActionCable.server.broadcast 'send_scripts_channel',
                                       { status: "up_success", result: result, msg: 'OK' }
        end
      end
    end
  end

  def clean(script)
    result = []
    script.each_with_index do |line, index|
      if index.odd?
        result.push(line)
      end
    end
    result.join("\n")
  end

  def perform(*args)
    parser = Grace::Parser.new
    script = clean(args[0].split("\n"))

    # FIXME - we want to execute multiple strings
    result = parser.perform_line(script)
    # send_request(script)
    key = args[1]
    if result == nil
      result = {
        type: 'errorResult',
        data: {
          message: "result is nil"
        }
      }

      ActionCable.server.broadcast 'send_scripts_channel',
                                   { status: "error", result: result, key: key}
    else
      ActionCable.server.broadcast 'send_scripts_channel',
                                   { status: "success", result: result, key: key }
    end
  rescue StandardError => e
    result = {
      type: 'errorResult',
      data: {
        message: e
      }
    }
    ActionCable.server.broadcast 'send_scripts_channel',
                                 { status: 'up_error', result: result }
  end
end
