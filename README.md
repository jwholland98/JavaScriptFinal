# JavaScriptFinal
This will be a proof of concept for our _Advanced Programming: Javascript_ class to show that we can make a webpage that works in full virtual reality, whether that be on a phone or in a virtual reality headset. The idea is to have some interactibility within the webpage such as clicking your phone screen or pulling a trigger on a virtual reality headset controller to have different animation techniques begin/end.



Index.html is the main file to open on a local server in order to open the program in the webpage. If on a personal computer, we recommend using firefox as it is much easier to get set up and the only thing needed is the following extension:

https://addons.mozilla.org/en-US/firefox/addon/webxr-api-emulator/

We have also added the tools to get a local server set using https as the WebXR that the program uses will only work on separate computers when https is used. However, to test locally on machine in which the program is running, you can make a simple http server.

To get a https server running for this program, first use "python3 -m http.server <port num>" if python 3 is installed, "python -m SimpleHTTPServer <port num>" if python 2 is installed or "http-server" if nodejs with http-server is installed. Then, in a seperate terminal, run "./ngrok http <same port used as before>" from the root folder of the project. The ngrok tool will then show several links, including one for https. The link can be accessed locally or online for everyone who has the link. This will take a minute to load and may not work for the first load. In our testing we sometimes had to refresh after the first load and it worked after.
