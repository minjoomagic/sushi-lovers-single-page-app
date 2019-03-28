class AddLikesToSushi < ActiveRecord::Migration[5.2]
  def change
    add_column :sushis, :likes, :integer
  end
end
