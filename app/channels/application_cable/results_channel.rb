module ApplicationCable
  class ResultsChannel < Channel
    def subscribed
      Rails.logger.info 'Subscribed'
    end

  end
end
