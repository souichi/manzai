class CreateSentences < ActiveRecord::Migration
  def change
    create_table :sentences do |t|
      t.integer :actor
      t.integer :action
      t.text :message
      t.references :script, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
