"use strict";

var http = require('http'),
    express = require('express'),
    socketIo = require('socket.io');

const app = express();
app.set("view engine", "pug");

//middleware is wrapping something in the pipeline
//browser -> node -> express -> M1 -> M2 -> M3 -> handler
//        <-      <-         <-    <-    <- M3 <-
app.use(express.static('./public'));

app.get('/', (request, response) => {
  //write out text to stream and end stream
  response.end('hello world');
  console.log('In handler');
});

app.get('/home', (request, response) => {
  //passes name of view into view engine
  response.render("index", {title: "Title!"});
});

const server = new http.Server(app);
//attaches itself to the http server
//io is applications view from the server...the servers application view into all of the clients that are connected
const io = socketIo(server);

//every time client connects, such as a refresh of the browser window, it will log out client connected
io.on("connection", socket => {
  console.log('client connected');
});

const port = 3000
server.listen(port, () => {
  console.log(`Server started on Port ${port}`);
});

//middleware is pipeline of code that can edit your request and response in a serial sort of way. Middleware can be nested and all that.
//middleware is just a function
