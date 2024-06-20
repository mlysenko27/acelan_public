module MaterialsHelper
  class MaterialException < RuntimeError; end
  def self.isotropic(params, current_user)
    material = Materials::IsotropicMaterial.create(name: params[:name], core: false,
                                          owner: current_user, source: params[:source])
    material.properties = {young: params[:iso][:young], poison: params[:iso][:poison]}
    material.save
    material
  end

  def self.anisotropic(params, current_user)
    material = Materials::AnisotropicMaterial.create(name: params[:name], core: false,
                                                   owner: current_user, source: params[:source])
    material.properties = params[:aniso]
    material.save
    material
  end

  def self.acoustic_liquid(params, current_user)
    puts params
  end

  def self.create_material(params, current_user)
    case params[:material_type]
    when 'Isotropic'
      self.isotropic(params, current_user)
    when 'Anisotropic'
      self.anisotropic(params, current_user)
    when 'AcousticLiquid'
      self.acoustic_liquid(params, current_user)
    else
      raise MaterialException("Undefined material type: #{params[:material_type]}")
    end

  end



end