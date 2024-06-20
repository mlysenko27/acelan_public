class Material < ApplicationRecord
  validates :name, presence: true
  belongs_to :owner,  class_name: 'User', foreign_key: "user_id", optional: true
  scope :shared, -> { where(core: true) }
  scope :for_user, ->(user) { where(core: true).or(Material.where(owner: user))}

  scope :search, ->(filter) {where("lower(name) LIKE ? or lower(type) LIKE ? or lower(source) LIKE ?",
                                   "%#{filter.downcase}%","%#{filter.downcase}%", "%#{filter.downcase}%")}


  def owner_name
    owner.present? ? owner.username : 'ACELAN Library'
  end

  def type_name
    "Built-in material"
  end

  def api_index_model
    {
      id: id,
      name: name,
      type: type,
      source: source,
      core: core,
      created_at: created_at,
      updated_at: updated_at
    }
  end

  def api_show_model
    api_index_model.merge({properties: properties})
  end
end