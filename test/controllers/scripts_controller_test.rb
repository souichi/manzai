require 'test_helper'

class ScriptsControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get hot" do
    get :hot
    assert_response :success
  end

  test "should get popular" do
    get :popular
    assert_response :success
  end

  test "should get show" do
    get :show
    assert_response :success
  end

end
