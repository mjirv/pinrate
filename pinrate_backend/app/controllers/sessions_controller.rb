class SessionsController < ApplicationController
	after_action :allow_iframe

	def new
	end

	def create
		user = User.find_by_email(params[:email])
		if user && user.authenticate(params[:password])
			session[:user_id] = user.id
			redirect_to session[:return_to] # TODO: change this to proper Pin
		else
			redirect_to '/login'
		end
	end

	def destroy
		session[:user_id] = nil
		redirect_to session[:return_to]
	end

	private
		def allow_iframe
			response.headers.except! 'X-Frame-Options'
		end

end
