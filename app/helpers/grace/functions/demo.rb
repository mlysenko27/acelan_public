module Grace
  module Functions

    class Demo < StateFunction

      def perform(arguments)
        super
        return error_result unless valid_types?
        text = @computed_arguments[0]
        @result[:type] = 'demoResult'
        @result[:data] = {message: "The input was #{text}, i think answer is #{rand(10)}"}
        @result
      end

      def valid_types?
        super
        return false if @miss_matches.any?
        @computed_arguments.each_with_index do |arg, i|
          unless arg.is_a? expected_types[i]
            @miss_matches << "Got #{arg} for argument #{i+1} in #{readable_name}, expected #{expected_types[i]}"
          end
        end
        @miss_matches.empty?
      end

      def expected_types
        [String]
      end

      def suggestion

        { value: readable_name,
          score: 1,
          meta: "#{readable_name}(text)" }
      end
    end

  end
end