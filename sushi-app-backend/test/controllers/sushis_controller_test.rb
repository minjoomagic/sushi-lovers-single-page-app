require 'test_helper'

class SushisControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get sushis_index_url
    assert_response :success
  end

end
