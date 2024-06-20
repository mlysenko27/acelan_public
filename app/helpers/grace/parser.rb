module Grace
  class Parser

    def perform_line(line)
      statement = SyntaxTree.parse(line).statements.body[0]
      if statement.is_a? SyntaxTree::CallNode
        f = build_function(statement)
        f.perform statement.arguments.arguments.parts
      elsif statement.is_a? SyntaxTree::Binary
        visitor = Grace::Operations::StateOperation::OpVisitor.new
        oper_result = visitor.visit(statement)
        oper_result
      end

    end

    def build_function(statement)
      name = statement.message.value
      function_name = functions[name]
      # todo suggestions
      raise Grace::UnknownFunction.new("Can't find #{name}") unless function_name.present?

      function_from_name(function_name)
    end

    # @return [StateFunction]
    def function_from_name(name)
      ("Grace::Functions::#{name.to_s}").constantize.new
    end

    def functions
      @functions_list_cache ||= build_functions_map
    end

    def suggestions
      abstracts = [Grace::Functions::StateFunction, Grace::Functions::DisplayFunction,
                   Grace::Functions::RemoteFunction]
      Functions.constants
               .select { |c| Functions.const_get(c).is_a?(Class) }
               .map { |x| ("Grace::Functions::" + x.to_s)
                            .classify
                            .constantize }
               .reject { |x| abstracts.include?(x) }
               .map { |x| x.new.suggestion }
               .compact
    end

    def build_functions_map
      Functions.constants
               .select { |c| Functions.const_get(c).is_a? Class }
               .map { |x| [x.to_s.underscore, x] }
               .to_h
    end
  end
end