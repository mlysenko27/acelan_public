class Api::ReportsController < ApplicationController
  skip_forgery_protection

  before_action :check_signature

  def create
    render json: {message: 'thank you!'}
  end

  private

  def check_signature
    #todo actual signature
    render status: :bad_request unless params['signature'] == '123'
  end
end