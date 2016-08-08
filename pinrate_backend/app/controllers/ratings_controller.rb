class RatingsController < ApplicationController
	protect_from_forgery with: :null_session

	def new
	end

	def create
		@pin = Pin.find_by(pinterest_id: params[:pin_pinterest_id])
		@rating = @pin.ratings.create(rating_params)
		if @pin.avg_rating
			@pin.avg_rating = (@pin.avg_rating * @pin.n_ratings + @rating.rating) / (@pin.n_ratings + 1)
			@pin.n_ratings = @pin.n_ratings + 1
		else
			@pin.avg_rating = @rating.rating
			@pin.n_ratings = 1
		end
		@rating.title = current_user.name + ' ' + current_user.last_name[0] + '.'
		@rating.save
		@pin.save
		redirect_to @pin
	end

	private
		def rating_params
			params.require(:rating).permit(:title, :rating, :comment)
		end
end
