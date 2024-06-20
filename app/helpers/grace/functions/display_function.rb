module Grace
  module Functions

    class DisplayFunction < StateFunction
      def perform(arguments)
        super
        @result[:type] = "graphicResult"
      end
    end
  end
end