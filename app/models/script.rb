class Script < ActiveRecord::Base
  has_many :sentences
  accepts_nested_attributes_for :sentences, allow_destroy: true
end
