module ScriptsHelper
  def icon_class(target)
    case target
    when "whole"
      return "fa fa-users"
    when "boke"
      return "fa fa-male"
    when "tsukkomi"
      return "fa fa-female"
    when "message"
      return "fa fa-commenting"
    end
  end
end
