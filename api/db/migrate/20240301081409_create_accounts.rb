class CreateAccounts < ActiveRecord::Migration[7.1]
  def change
    create_table :accounts do |t|
      t.integer :provider_id
      t.integer :prometeo_account_id
      t.integer :user_id
      t.string :username
      t.string :password
      t.string :name
      t.integer :account_number
      t.float :balance
      t.string :currency

      t.timestamps
    end
  end
end
