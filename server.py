import http.server, ssl

server_address = ('localhost', 5500)
httpd = http.server.HTTPServer(server_address, http.server.SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket(httpd.socket,
                               server_side=True,
                               certfile='https/localhost.pem',
                               ssl_version=ssl.PROTOCOL_TLSv1)
httpd.serve_forever()
#PEM pass phrase: 12345