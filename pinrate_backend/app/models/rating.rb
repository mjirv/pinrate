class Rating < ApplicationRecord
  belongs_to :pin
  scope :desc, -> { order("ratings.updated_at DESC") }
end
