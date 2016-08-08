class AddTempAvgRatingToPin < ActiveRecord::Migration[5.0]
  def change
    add_column :pins, :temp_avg_rating, :float
  end
end
