module Grace
  module Functions

    class Fiber < DisplayFunction

      def perform(arguments)
        super
        return error_result unless valid_types?
        n, w, h, r, type = @computed_arguments
        @result[:data] = {n: n, w: w, h: h, r: r, type: type}
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
        [Integer, Numeric, Numeric, Numeric, String]
      end

      def suggestion

        { value: readable_name,
          score: 2,
          meta: "#{readable_name}(n, width, height, radius, type)" }
      end
    end

  end
end