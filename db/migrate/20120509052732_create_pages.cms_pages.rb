# This migration comes from cms_pages (originally 20120315195316)
class CreatePages < ActiveRecord::Migration
  def change
    create_table :cms_pages do |t|
      t.string :title,      :null => false
      t.string :url,        :null => false
      t.text :body,         :null => false, :default => ''
      t.integer :parent_id, :null => true, :default => nil
      t.integer :lft
      t.integer :rgt
      t.boolean :active,    :default => 1
 
      t.timestamps
    end
    add_index :cms_pages, :url, :unique => true
  end
end
