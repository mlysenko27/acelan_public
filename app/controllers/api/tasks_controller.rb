# frozen_string_literal: true
class Api::TasksController < Api::BaseApiController

  skip_before_action :verify_authenticity_token
  def index
    token_data = extract_data_from_token
    return head(:forbidden) unless token_data.present?
    user = User.find_by_id(token_data["user_id"])
    return head(:forbidden) unless user.present?

    render json: {tasks: user.tasks.map{|t| t.api_model}}
  end

  def show
    token_data = extract_data_from_token
    return head(:forbidden) unless token_data.present?
    user = User.find_by_id(token_data["user_id"])
    return head(:forbidden) unless user.present?
    task = user.tasks.find_by_id(params[:id])
    return head(:not_found) unless task.present?
    render json: task.api_detailed_model
  end


end
