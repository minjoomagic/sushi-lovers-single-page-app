class CreateSushis < ActiveRecord::Migration[5.2]
  def change
    create_table :sushis do |t|
      t.string :name
      t.string :image
      t.string :sushilevel

      t.timestamps
    end
  end
end
