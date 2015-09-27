class Sentence < ActiveRecord::Base
  belongs_to :script
  enum actor: [:whole, :boke, :tsukkomi]
  enum action: [:message, :bokeru, :tsukkomu]
end
