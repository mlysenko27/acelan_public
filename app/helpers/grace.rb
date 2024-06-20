module Grace
  require 'syntax_tree'
  class UnexpectedLine < RuntimeError
  end

  class UnknownFunction < RuntimeError
  end
end