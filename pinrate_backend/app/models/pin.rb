class Pin < ApplicationRecord
	has_many :ratings
	def to_param
		pinterest_id
	end
end
