class Task < ApplicationRecord
  belongs_to :user
  enum status: [:queued, :working, :failure, :success]
  has_many :artifacts
  validates :status, presence: true

  def api_model
    {
      id: id,
      name: name,
      status: status,
      started_at: started_at,
      finished_at: finished_at
    }
  end

  def api_detailed_model
    {
      id: id,
      name: name,
      status: status,
      started_at: started_at,
      finished_at: finished_at,
      artifacts: artifacts.map{|a| a.api_model}
    }
  end
end