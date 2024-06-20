class  Api::MaterialsController < Api::BaseApiController
  before_action :preload_user
  def index
    @materials = Material.for_user(@current_user)
    if params[:search].present?
      @materials = @materials.search(params[:search])
      @search = params[:search]
    end

    @materials.order!(:id)
    render json: @materials.map(&:api_index_model)
  end

  def show
    @material = Material.for_user(@current_user).find_by_id(params[:id])
    render json: @material.api_show_model
  end


end