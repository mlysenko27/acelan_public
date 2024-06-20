class Api::ScriptsController < ApplicationController
  skip_forgery_protection

  def run
    SendScriptsJob.perform_later(perform_params[:script], perform_params[:key])
    render json: { status: 'in progress'}
  end

  def suggestions
    render json: Grace::Parser.new.suggestions
  end

  private

  def perform_params
    params.permit :script, :key
  end

end