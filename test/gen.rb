require 'json'
dimension = 4
puts Array.new(3) {|i|
  h = {}
  dimension.times {|d| h[:"x#{d}"] = rand }
  h
}.to_json
