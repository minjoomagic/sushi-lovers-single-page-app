class SushisController < ApplicationController

  def index
    @sushis = Sushi.all
    render json: @sushis
  end

  def show
    @sushi = Sushi.find(params[:id].to_i)
    render json: @sushi
  end

  def create
    @user = User.find_or_create_by(username:params[:username])
    @sushi = Sushi.create(sushi_params.merge({user_id: @user.id}))
    render json: @sushi
  end

  def update
    @posts = Sushi.all
    @user = User.find_or_create_by(username:params[:username])
    @post = Sushi.find(params[:id])
    @post.update(post_params.merge({user_id: @user.id}))
    render json: @posts
  end

  def destroy
    @posts = Sushi.all
    @post = Sushi.find(params[:id])
    @post.destroy
    render json: @posts
  end

  private
  def post_params
    params.require(:post).permit(:title, :description, :reward, :location, :contact)
  end


end #end of controller
