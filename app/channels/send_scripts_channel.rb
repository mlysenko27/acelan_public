class SendScriptsChannel < ApplicationCable::Channel
  def subscribed
     stream_from "send_scripts_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
