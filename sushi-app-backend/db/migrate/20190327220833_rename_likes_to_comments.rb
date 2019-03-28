class RenameLikesToComments < ActiveRecord::Migration[5.2]
  def change
    rename_table :likes, :comments 
  end
end
