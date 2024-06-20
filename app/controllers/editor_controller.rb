class EditorController < ApplicationController
  before_action :authorize_user
  def show
    @bees = [
      {
        type:'Local',
        name:'Пчела 17',
        status:'Busy',
        RAM:'256 Mb'
      },
      {
        type:'Remote',
        name:'Трутень 9',
        status:'Available',
        RAM:'512 Mb'
      },
      {
        type:'Remote',
        name:'Трутень 7',
        status:'Available',
        RAM:'512 Mb'
      }
    ]
  end
end