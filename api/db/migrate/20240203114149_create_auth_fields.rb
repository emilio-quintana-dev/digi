class CreateAuthFields < ActiveRecord::Migration[7.1]
  def change
    create_table :auth_fields do |t|
      t.string :name
      t.string :type
      t.boolean :interactive
      t.boolean :optional
      t.string :label_es
      t.string :label_en
      t.references :provider, null: false, foreign_key: true

      t.timestamps
    end
  end
end
