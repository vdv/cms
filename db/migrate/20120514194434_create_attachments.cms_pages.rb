# This migration comes from cms_pages (originally 20120413160018)
class CreateAttachments < ActiveRecord::Migration
  def change
    create_table :cms_pages_attachments do |t|
      
      t.string  :data_file_name, :null => false
      t.string  :data_content_type
      t.integer :data_file_size

      t.timestamps
    end
  end
end
