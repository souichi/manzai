class ScriptsController < ApplicationController
  before_action :set_script, only: [:show]

  def index
    scripts = Script.order('created_at desc').take(10)
    @top = scripts.first
    @scripts = scripts.reject do |script|
      script == @top
    end
  end

  def show
  end

  def new
    @script = Script.new
  end

  def hot
    # TODO take hot scripts
    @top = Script.first
    @scripts = Script.take(10)
    render "index"
  end

  def popular
    # TODO take popular scripts
    @top = Script.first
    @scripts = Script.take(10)
    render "index"
  end

  def create
    @script = Script.new(script_params)

    respond_to do |format|
      if @script.save
        format.html { redirect_to @script, notice: 'Script was successfully created.' }
        format.json { render action: 'show', status: :created, location: @script }
      else
        format.html { render action: 'new' }
        format.json { render json: @script.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def set_script
    @script = Script.find(params[:id])
  end

  def script_params
    params.require(:script).permit(:title, sentences_attributes: [:id, :actor, :action, :message, :script_id])
  end
end
