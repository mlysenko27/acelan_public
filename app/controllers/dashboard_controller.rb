class DashboardController < ApplicationController
  before_action :authorize_user
  def index
    @models = [
      {id: 1, name: 'A', status: 'done', date: '7:40 PM'},
      {id: 4, name: 'B', status: 'failed', date: '8:40 PM'},
      {id: 337, name: 'C', status: 'in_process', date: '9:40 PM'},
    ]
  end
end