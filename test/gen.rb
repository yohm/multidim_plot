require 'json'
puts Array.new(3) {|i| {x:rand,y:rand} }.to_json
