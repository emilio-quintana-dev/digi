class CreateProviders < ActiveRecord::Migration[7.1]
  def change
    create_table :providers do |t|
      t.string :code, null: false
      t.string :name, null: false
      t.string :country, null: false
      t.string :logo

      t.timestamps
    end
  end
end
