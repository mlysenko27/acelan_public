module Grace
  module Functions

    class Mesh < DisplayFunction

      def perform(arguments)
        super

      end

      def valid_types?
        super
        points = []
      end

      def suggestion
        { value: readable_name,
          score: 1,
          meta: "#{readable_name}([point1, point2, point3],'method_name'))\nBuild a mesh from array of points." }
      end
    end
  end
end

