module Grace
  module Functions

    class Circle < StateFunction
      def perform(arguments)
        #todo Add proper state management
        @computed_arguments = arguments.map{ |a| State.new.compute_argument a}
      end

      def valid_types?(arguments)
        arguments.all? {|x| x}
      end
    end
  end
end