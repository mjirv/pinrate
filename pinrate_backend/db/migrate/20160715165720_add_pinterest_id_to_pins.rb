class AddPinterestIdToPins < ActiveRecord::Migration[5.0]
  def change
    add_column :pins, :pinterest_id, :string
  end
end
