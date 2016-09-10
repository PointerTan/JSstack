import parseArgs from "minimist";
import staticS from "serve-static";
import fs from "fs";
import connect from 'connect';

function disallowUnprocessedAssets(req, res, next) {
  const lastPointIndex = req.url.lastIndexOf('.');
  const typeString = req.url.substring(lastPointIndex, req.url.length);
  if (typeString === ".jade" || typeString === ".less") {

    res.statusCode = 404;
    res.end("not found");
  }
  else {
    next();
  }
}

export default function (path) {
  const app = connect();
  console.log("path:" + path);
  if (path) {

    app.use(disallowUnprocessedAssets);

    app.use(staticS(path));
    app.use(
      function (req, res) {
        console.log(req.url);
        var lastPointIndex = req.url.lastIndexOf('.');
        var typeString = req.url.substring(lastPointIndex, req.url.length);
        console.log(typeString);
        if (typeString === ".html") {
          var name = req.url.substring(0, lastPointIndex);

          fs.readFile(path + name + '.jade', 'utf-8', function (err, data) {
            if (err) {
              console.log(err);
            } else {
              // console.log(data); 
              // res.writeHead(200, {
              //     'Content-Length': data.length,
              //     'transfer-encoding': ''
              // });
              // res.end();
              var options = { pretty: true };
              var jade = require('jade');
              var output = jade.render(data, options);
              console.log("output: " + output);
              res.setHeader("Content-Type", "text/html; charset=UTF-8");
              res.end(output);
            }
          })
        }
        else if (req.url === "/foo.css") {
          // let fs = require("fs");
          fs.readFile(path + '/foo.less', 'utf-8', function (err, data) {
            if (err) {
              console.log(err);
            } else {
              console.log(data);
              let less = require('less');
              less.render(data, function (e, css) {
                res.setHeader("Content-Type", "text/css; charset=UTF-8");
                res.end(css);
              });
            }
          });
        }
        else if (req.url === "/") {
          // var fs = require("fs");
          fs.readFile(path + '/index.jade', 'utf-8', function (err, data) {
            if (err) {
              console.log(err);
            } else {
              console.log(data);
              var options = { pretty: true };
              var jade = require('jade');
              var fn = jade.render(data, options);
              res.end(fn);
            }
          })
        }
        else {
          res.statusCode = 404;
          res.end("not found");
        }
      }
    );
  }
  return app;
}
