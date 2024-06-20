# frozen_string_literal: true
class Artifact < ApplicationRecord
  belongs_to :task

  def api_model
    {
      id: id,
      file_type: file_type,
      url: url
    }
  end
end
