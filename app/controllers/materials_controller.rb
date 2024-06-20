class MaterialsController < ApplicationController

  before_action :authorize_user
  def index
    @materials = Material.for_user(current_user)
    if params[:search].present?
      @materials = @materials.search(params[:search])
      @search = params[:search]
    end

    @materials.order!(:id)
  end

  def show
    @material = current_user.materials.find_by_id(params[:id])
  end

  def new
    @material = Materials::AnisotropicMaterial.new
  end

  def create
    @material = MaterialsHelper.create_material(material_params, current_user)
    if @material.valid?
      redirect_to materials_path
    else
      redirect_to materials_new_path
    end
  end
  def edit

  end


  def material_params
    params.permit(:material_type, :name, :density, :source, iso: {}, aniso: {})
  end
end