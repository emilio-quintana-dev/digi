user = User.create!(email: "emilioquintana90@gmail.com", password: "password123")

api_gateway = Prometeo::ApiGateway.new

provider_responses = api_gateway.get_providers

provider_responses.each do |provider_response|
  puts "Creating provider #{provider_response.name}..."
  provider = Provider.create!(
    code: provider_response.code,
    name: provider_response.name,
    country: provider_response.country,
  )
  puts "Provided created!"

  code = provider.code
  provider_response = api_gateway.get_provider(code:)

  puts "Creating auth fields for provider #{provider.name}..."
  provider_response.auth_fields.each do |auth_field|
    AuthField.create!(
      name: auth_field.name,
      type: auth_field.type,
      interactive: auth_field.interactive,
      optional: auth_field.optional,
      label_es: auth_field.label_es,
      label_en: auth_field.label_en,
      provider_id: provider.id,
    )
  end
  puts "Auth Fields for #{provider.name} created!"
end
