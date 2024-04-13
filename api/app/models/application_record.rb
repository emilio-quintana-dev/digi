class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  self.belongs_to_required_by_default = false

  def to_api(**options)
    ActiveModelSerializers::SerializableResource.new(self, **options)
  end
end
