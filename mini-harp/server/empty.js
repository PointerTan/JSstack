var connect = require('connect');
var http = require('http');
var logger = require('morgan');
var static = require('serve-static');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var createMiniHarp = require("mini-harp");
var main = require("mini-harp").main;

console.log(createMiniHarp);
console.log(main);
// var miniHarp = require('mini-harp').createMiniHarp;
// var qs = require('qs');

var root = process.cwd(); // current directory
console.log(root);
// console.log(__dirname + "/public");
var app = createMiniHarp(root);
app.listen(3000);

// var app = connect();
// app.use(static(__dirname + "/public"));
// app.listen(3000);


// connect()
//     .use(function(req, res){
//         if (req.url === "/current-time") {
//             var dateString = (new Date()).toISOString();
//             res.end(dateString);            
//         }
//     })
//     .listen(3000);

// connect()
//     .use(bodyParser())  // gives us req.body
//     .use(cookieParser()) // for session
//     .use(session({ secret: "asdf" }))     // gives us req.session
//     .use(function (req, res) {
//         res.write("req.url: " + req.url + "\n\n");
//         res.write("req.method: " + req.method + "\n\n");
//         res.write("req.headers: " + JSON.stringify(req.headers) + "\n\n");
//         res.write("req.query: " + JSON.stringify(req.query) + "\n\n");
//         res.write("req.body: " + JSON.stringify(req.body) + "\n\n");
//         res.write("req.cookies: " + JSON.stringify(req.cookies) + "\n\n");
//         res.write("req.session: " + JSON.stringify(req.session));
//         res.end();
//     }).listen(3000);


// connect()
//     .use(function (req, res, next) {
//         if (req.method === 'POST') {
//             res.end("This is a POST request");
//         } else {
//             next();
//         }
//     })
//     .use(function (req, res) {
//         res.end("This is not a POST request (probably a GET request)");
//     }).listen(3000);

// var app = connect();

// console.log(__dirname + "/src/public");
// app
// //   .use(logger())
//   .use(static(__dirname + "/public"))
//   .listen(3000);

// connect()
//     .use(cookieParser())
//     .use(session({ secret: 'some secret text', cookie: { maxAge: 30000 }}))
//     .use(function(req, res) {
//         var sess = req.session,
//             url = req.url.split("/");

//         if (url[1] == "name" && url[2]) {
//             sess.name = url[2];
//             res.end("name saved: " + url[2]);
//         } else if (sess.name) {
//             res.write("session-stored name: " + sess.name);    
//             res.end("stored for another: " + (sess.cookie.maxAge / 1000) + " seconds");
//         } else {
//             res.end("no stored name; go to /name/{name} to save a name");
//         }
//     })
//     .listen(3000);