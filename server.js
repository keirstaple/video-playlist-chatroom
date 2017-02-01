"use strict";

var http = require('http'),
    express = require('express');

const app = express();

app.set("view engine", "pug");

//middleware is wrapping something in the pipeline
//browser -> node -> express -> M1 -> M2 -> M3 -> handler
//        <-      <-         <-    <-    <- M3 <-


app.use((request, response, next) =>{
  console.log('in middleware 1');
  //continues pipeline
  next();
  //pipeline finishes
  console.log('out of middleware 1');
});

app.use(express.static('./public'));

app.use((request, response, next) =>{
  console.log('in middleware 2');
  //continues pipeline so that the rest of the code can be executed
  next();
  //pipeline finishes
  console.log('out of middleware 2');
});

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

const port = 3000
server.listen(port, () => {
  console.log(`Server started on Port ${port}`);
});

//middleware is pipeline of code that can edit your request and response in a serial sort of way. Middleware can be nested and all that.
//middleware is just a function
