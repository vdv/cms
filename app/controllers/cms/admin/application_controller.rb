class Cms::Admin::ApplicationController < ::ApplicationController
  before_filter :authorize
end
