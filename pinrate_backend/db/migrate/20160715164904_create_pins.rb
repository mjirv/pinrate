class CreatePins < ActiveRecord::Migration[5.0]
  def change
    create_table :pins do |t|
      t.string :title
      t.float :avg_rating

      t.timestamps
    end
  end
end
