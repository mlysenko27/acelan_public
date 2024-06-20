module Grace
  module Functions

    class StateFunction

      attr_accessor :miss_matches, :computed_arguments

      def initialize
        @miss_matches = []
      end

      def perform(arguments)
        #todo Add proper state management
        @computed_arguments = arguments.map { |a| State.new.compute_argument a }
        @result = {}
      end

      def valid_types?
        expected_number_of_args = expected_types.length
        number_of_args = @computed_arguments.length
        if expected_number_of_args != number_of_args
          @miss_matches << "#{readable_name} expected #{expected_number_of_args}, but got #{number_of_args} args"
        end
      end

      def expected_types

      end

      def suggestion
        { value: readable_name,
          score: 1,
          meta: "",
          caption: ""}
      end
      def readable_name
        self.class.to_s.split('::').last.downcase
      end

      def readable_types
        if expected_types.present?
          expected_types.map(&:to_s).join(', ')
        else
          nil
        end
      end

      def error_result
        {
          type: 'errorResult',
          data: {
            message: @miss_matches.join("\n")
          }
        }
      end
    end
  end
end