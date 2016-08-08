class PinsController < ApplicationController
	protect_from_forgery with: :null_session
	after_action :allow_iframe
	def show
		# could be a problem if pinterest id isn't unique
		@pin = Pin.find_by pinterest_id: params[:pinterest_id]
		session[:return_to] = request.url
		if not @pin
			create
		elsif @pin.avg_rating || @pin.temp_avg_rating
			r = 0
			@img = ""
			if @pin.avg_rating
				r = @pin.avg_rating
			else
				r = @pin.temp_avg_rating
			end

			case r
			when 0...1.25
				@img = "star_1.png"
			when 1.25...1.75
				@img = "star_1_half.png"
			when 1.75...2.25
				@img = "star_2.png"
			when 2.25...2.75
				@img = "star_2_half.png"
			when 2.75...3.25
				@img = "star_3.png"
			when 3.25...3.75
				@img = "star_3_half.png"
			when 3.75...4.25
				@img = "star_4.png"
			when 4.25...4.75
				@img = "star_4_half.png"
			when 4.75..5.0
				@img = "star_5.png"
			end
			
		end



	end

	def new
		@pin = Pin.new
		@rating = @pin.ratings.build
	end

	def create
		@pin = Pin.new(pin_params)
		@pin.n_ratings = 0

		if params[:comments] != ""
			# TODO: Replace quotes in comments with something else
			@pin.temp_avg_rating = `python bin/pinterestSentimentConcept.py \
				"#{params[:comments]}"`.to_f
		end

		if @pin.save
			# we should probably change this later since this will automatically
			# happen when adding a rating to a pin that doesn't exist
			redirect_to @pin
		else
			render 'new'
		end
	end

	private
		def pin_params
			params.permit(:pinterest_id, :title, :avg_rating)
		end
		def allow_iframe
			response.headers.except! 'X-Frame-Options'
		end
end
