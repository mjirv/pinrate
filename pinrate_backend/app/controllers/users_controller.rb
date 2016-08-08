class UsersController < ApplicationController
	after_action :allow_iframe

	def new
	end

	def create
		user = User.new(user_params)
		if user.save
			session[:user_id] = user.id
			redirect_to session[:redirect_to] # TODO: Change this to redirect to the right Pin page
		else
			redirect_to '/signup'
		end
	end

	private

		def user_params
			params.require(:user).permit(:name, :last_name, :email, :password, :password_confirmation)
		end

		def allow_iframe
			response.headers.except! 'X-Frame-Options'
		end
end