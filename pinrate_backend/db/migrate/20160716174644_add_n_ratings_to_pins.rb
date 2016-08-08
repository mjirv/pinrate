class AddNRatingsToPins < ActiveRecord::Migration[5.0]
  def change
    add_column :pins, :n_ratings, :integer
  end
end
