module Grace
  module Functions

    class Mix < DisplayFunction

      def perform(arguments)
        super
        return error_result unless (valid_types? and valid_values?)
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
        [Float, String]
      end

      def valid_values?
        return false if @miss_matches.any?
        @computed_arguments.each_with_index do |arg, i|
          unless expected_values[i]==[] or expected_values[i].include? arg
            @miss_matches << "Got #{arg} for argument #{i+1} in #{readable_name}, expected #{expected_values[i]}"
          end
        end
        unless valid_coef?
          @miss_matches << "Got #{@computed_arguments[0]} in #{readable_name}, expected coef from 0.0 to 1.0"
        end
        @miss_matches.empty?
      end

      def expected_values
        [[],['3-3', '3-0', '🎉']]
      end

      def valid_coef?
        return (0<=@computed_arguments[0].to_f and @computed_arguments[0].to_f<=1)
      end

      def suggestion
        { value: readable_name,
          score: 2,
          meta: "#{readable_name}(coef, type_of_mixing) \n Mix materials with float coef by this string type of mixing."}
      end


    end
  end
end
