module Grace
  module Models
    class Point

      attr_accessor :id, :x, :y, :z

      def show
        {
          x: @x,
          y: @y,
          z: @z,
          id: @id
        }
      end
    end
  end
end
