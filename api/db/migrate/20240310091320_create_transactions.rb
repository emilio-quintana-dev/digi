class CreateTransactions < ActiveRecord::Migration[7.1]
  def change
    create_table :transactions do |t|
      t.string :prometeo_account_id
      t.integer :account_id
      t.string :reference
      t.string :detail
      t.date :date
      t.float :debit
      t.float :credit
      t.string :extra_data
      t.string :category

      t.timestamps
    end
  end
end
