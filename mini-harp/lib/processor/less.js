'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeLess = makeLess;
var staticS = require('serve-static');
var jadeStatic = require('connect-jade-static');
var st = require('connect-static-transform');

function makeLess(root) {
    console.log(root);
    console.log(__dirname);
    var makeStatic = staticS(root);
    // var temp = st({
    //     root: root
    // });
    // var temp = st.less({
    //     root: root, // where to open the less files from
    //     path: '/assets', // optional, sets where to serve from
    //     cache: true, // optional, caches in memory as well as on the client
    //     maxage: 3600, // optional, sets the maximum number of seconds a client should keep the compiled file (defaults to one year)
    //     options: { // optional, options object to send directly to the LESS compiler
    //         compress: true
    //     }
    // });

    var makeRender = function makeRender(req, res) {
        console.log("req.url: " + req.url);
        if (req.url === "/foo.css") {
            var fs = require("fs");
            fs.readFile(root + '/foo.less', 'utf-8', function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    // console.log(data); 
                    var less = require('less');
                    less.render(data, function (e, css) {
                        res.end(css);
                    });
                }
            });
            // res.end("200");
            // less.render('.class { width: (1 + 1) }', function (e, css) {
            //     res.end(css);
            // });         
        } else {
            res.statusCode = 404;
            res.end("not found");
        }
    };
    return { makeStatic: makeStatic, makeRender: makeRender };
    // return staticS(root);
}
//# sourceMappingURL=less.js.map