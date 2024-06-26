# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_04_30_105801) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.integer "provider_id"
    t.integer "prometeo_account_id"
    t.integer "user_id"
    t.string "username"
    t.string "password"
    t.string "name"
    t.integer "account_number"
    t.float "balance"
    t.string "currency"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "auth_fields", force: :cascade do |t|
    t.string "name"
    t.string "type"
    t.boolean "interactive"
    t.boolean "optional"
    t.string "label_es"
    t.string "label_en"
    t.bigint "provider_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["provider_id"], name: "index_auth_fields_on_provider_id"
  end

  create_table "providers", force: :cascade do |t|
    t.string "code", null: false
    t.string "name", null: false
    t.string "country", null: false
    t.string "logo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "session_keys", force: :cascade do |t|
    t.string "key"
    t.integer "user_id"
    t.integer "provider_id"
    t.integer "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "transactions", force: :cascade do |t|
    t.string "prometeo_account_id"
    t.integer "account_id"
    t.string "reference"
    t.string "detail"
    t.date "date"
    t.float "debit"
    t.float "credit"
    t.string "extra_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "digibox_category"
    t.string "category"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "auth_fields", "providers"
end
