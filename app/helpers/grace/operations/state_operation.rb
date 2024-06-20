module Grace
  module Operations
    class StateOperation
      class OpVisitor < SyntaxTree::Visitor
        def visit_binary(node)
          if node in { left: SyntaxTree::Node, operator: :+ | :- | :* | :/, right: SyntaxTree::Node  }
            res = State.new.compute_argument(node.left).
              public_send(node.operator,
                          State.new.compute_argument(node.right))
            res
          end
        end

        # def visit_assign(node)
        #   if node in SyntaxTree::Assign{ left: SyntaxTree::Node, operator: :=, right: SyntaxTree::Node  }
        #     res = State.new.compute_argument(node.left).
        #       public_send(node.operator,
        #                   State.new.compute_argument(node.right))
        #     res
        #   end
        # end
      end
    end
  end
end
