require 'jwt'
module JwtHelper

  #todo we may need to encode it - or not
  def self.token(payload)
    JWT.encode payload, nil, 'none'
  end

  def self.decode(token)
    data = JWT.decode token, nil, false
    result = {}
    data.each do |pair|
      result.merge!(pair)
    end
    result
  end
end