class CreateSessionKeys < ActiveRecord::Migration[7.1]
  def change
    create_table :session_keys do |t|
      t.string :key
      t.integer :user_id
      t.integer :provider_id
      t.integer :account_id

      t.timestamps
    end
  end
end
