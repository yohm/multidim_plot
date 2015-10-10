require 'json'
dimension = 4
puts Array.new(3) {|i|
  h = {x:rand,y:rand}
  (dimension-2).times {|i| h[:"x#{i}"] = rand }
  h
}.to_json
