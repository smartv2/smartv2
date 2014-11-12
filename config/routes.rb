Rails.application.routes.draw do
	root 'page#createapp'
  get 'viewapps.html' => 'page#viewapps'
end
