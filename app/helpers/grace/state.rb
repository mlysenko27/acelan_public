module Grace
  class State

    def compute_argument(argument)
      case argument
      when computed?(argument)
        return argument
      when SyntaxTree::Int
        argument.value.to_i
      when SyntaxTree::FloatLiteral
        argument.value.to_f
      when SyntaxTree::StringLiteral
        argument.parts[0].value
      when SyntaxTree::VCall
        f = build_function(argument)
        f.perform argument.arguments
      when SyntaxTree::ArrayLiteral
        argument.contents.parts.map do |x|
          compute_argument x
        end
      when SyntaxTree::VarRef
        compute_argument argument.value
      when SyntaxTree::Kw
        #todo There are many more Kws
        try_to_make_boolean(argument.value)
      else
        raise RuntimeError.new('I dunno what is this')
      end
    end

    def computed_types
      @computed_types ||= build_computed_types
    end

    def build_computed_types
      custom_types = Models.constants
                           .select {|c| Models.const_get(c).is_a? Class}
      plain_types = [Numeric, String, TrueClass, FalseClass]
      plain_types.concat custom_types
    end

    def computed?(argument)
      computed_types.include? argument.class
    end

    def try_to_make_boolean(value)
      s = value.downcase
      case s
      when 'true'
        true
      when 'false'
        false
      else
        nil
      end
    end
  end
end