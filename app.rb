require 'rubygems'
require 'bundler'
require 'sinatra'
require 'sinatra/assetpack'

# Source: https://gist.github.com/119874
module Sinatra::Partials
  def partial(template, *args)
    template_array = template.to_s.split('/')
    template = template_array[0..-2].join('/') + "/_#{template_array[-1]}"
    options = args.last.is_a?(Hash) ? args.pop : {}
    options.merge!(:layout => false)
    locals = options[:locals] || {}
    if collection = options.delete(:collection) then
      collection.inject([]) do |buffer, member|
        buffer << haml(:"#{template}", options.merge(:layout =>
        false, :locals => {template_array[-1].to_sym => member}.merge(locals)))
      end.join("\n")
    else
      haml(:"#{template}", options)
    end
  end

  def cp(path)
    "active" if ('/' + path) == request.path_info
  end
end


class RHOK < Sinatra::Base
  set :root, File.dirname(__FILE__)
  set :public_folder, File.dirname(__FILE__) + '/static'
  set :views, File.dirname(__FILE__) + '/views'

  register Sinatra::AssetPack
  helpers Sinatra::Partials

  assets {
  	serve '/js',  from: 'js'
  	serve '/css', from: 'css'
  	serve '/img', from: 'images'

  	js :application, '/js/application.js', [
  		'/js/zepto.js',
  		'/js/underscore.js',
  		'/js/backbone.js',
  		'/js/handlebars.js'
  	]

  	css :application, '/css/application.css', [
  		'/css/normalize.css',
  		'/css/screen.css'
  	]

  	js_compression :js_min
  	css_compression :sass
  }

  get '/' do
  	haml :index
  end
end

RHOK.run! :port => 4000