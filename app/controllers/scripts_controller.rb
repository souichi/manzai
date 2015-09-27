class ScriptsController < ApplicationController
  def index
    scripts = Script.order('created_at desc').take(10)
    @top = scripts.first
    @scripts = scripts.reject do |script|
      script == @top
    end
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

  def show
    @script = Script.find(params[:id])
  end
end
