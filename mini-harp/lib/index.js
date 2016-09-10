"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (path) {
  var app = (0, _connect2.default)();
  console.log("path:" + path);
  if (path) {

    app.use(disallowUnprocessedAssets);

    app.use((0, _serveStatic2.default)(path));
    app.use(function (req, res) {
      console.log(req.url);
      var lastPointIndex = req.url.lastIndexOf('.');
      var typeString = req.url.substring(lastPointIndex, req.url.length);
      console.log(typeString);
      if (typeString === ".html") {
        var name = req.url.substring(0, lastPointIndex);

        _fs2.default.readFile(path + name + '.jade', 'utf-8', function (err, data) {
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
        });
      } else if (req.url === "/foo.css") {
        // let fs = require("fs");
        _fs2.default.readFile(path + '/foo.less', 'utf-8', function (err, data) {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
            var less = require('less');
            less.render(data, function (e, css) {
              res.setHeader("Content-Type", "text/css; charset=UTF-8");
              res.end(css);
            });
          }
        });
      } else if (req.url === "/") {
        // var fs = require("fs");
        _fs2.default.readFile(path + '/index.jade', 'utf-8', function (err, data) {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
            var options = { pretty: true };
            var jade = require('jade');
            var fn = jade.render(data, options);
            res.end(fn);
          }
        });
      } else {
        res.statusCode = 404;
        res.end("not found");
      }
    });
  }
  return app;
};

var _minimist = require("minimist");

var _minimist2 = _interopRequireDefault(_minimist);

var _serveStatic = require("serve-static");

var _serveStatic2 = _interopRequireDefault(_serveStatic);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _connect = require("connect");

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function disallowUnprocessedAssets(req, res, next) {
  var lastPointIndex = req.url.lastIndexOf('.');
  var typeString = req.url.substring(lastPointIndex, req.url.length);
  if (typeString === ".jade" || typeString === ".less") {

    res.statusCode = 404;
    res.end("not found");
  } else {
    next();
  }
}
//# sourceMappingURL=index.js.map