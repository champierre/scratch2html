#! /usr/bin/env ruby
require 'socket'
require 'uri'

server = TCPServer.new 5678
html = ""
loop do
  client = server.accept
  headers = {}
  while line = client.gets.split(' ', 2)
    break if line[0] == ""
    headers[line[0] == 'POST' ? line[0] : line[0].chop] = line[1].strip
  end
  if headers['POST'] =~ /^\/add/
    data = client.read(headers["Content-Length"].to_i)
    params = Hash[URI::decode_www_form(data)]
    html = '' if params['tag'] =~ /^<!DOCTYPE html>/
    html = html + "#{params['tag']}\n"
    if params['tag'] =~ /^<\/html>/
      puts "=== #{Time.now} ==="
      puts html
    end
  else
    client.puts "HTTP/1.0 200 OK"
    client.puts "Content-Type: text/html"
    client.puts
    client.puts html
  end
  client.close
end
