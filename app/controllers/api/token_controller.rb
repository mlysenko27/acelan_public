class Api::TokenController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
    user = User.find_by_email(params[:email])
    if user.present? && user.authenticate(params[:password])
      return render json: {token: JwtHelper.token({user_id: user.id})}
    else
      return render head(:forbidden)
    end
  end
end