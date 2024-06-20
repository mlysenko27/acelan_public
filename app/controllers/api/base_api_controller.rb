class  Api::BaseApiController < ApplicationController

  protected
  def extract_data_from_token
    token = request.authorization.split(' ').last
    if token.present?
      JwtHelper.decode token
    end
  end

  def preload_user
    token_data = extract_data_from_token
    return head(:forbidden) unless token_data.present?
    @current_user = User.find_by_id(token_data["user_id"])
  end
end