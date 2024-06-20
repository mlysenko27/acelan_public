module Grace
  module Models
    class Point2d

      attr_accessor :id, :x, :y

      def show
        {
          x: @x,
          y: @y,
          z: @z
        }
      end
    end
  end
end
