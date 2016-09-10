"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {

    var app = function app(req, res, next) {
        app.req = req;
        app.res = res;
        // app.fatherNext = next;
        if (next) {
            next();
        } else {
            app.next();
        }



        // res.writeHead(200, { 'Content-Type': 'text/plain' });
        // res.statusCode = 404;
        // res.end("not found");
    };

    app.isApp = 1;

    app.next = function (error) {
        if (app.stack.length === 0) {
            if (app.father) {
                app.father(app.req, app.res);
            }

            if (error) {
                app.res.statusCode = 500;
                app.res.end("get error");
            }

            app.res.statusCode = 404;
            app.res.end("not found");
        } else {
            console.log("length :" + app.stack.length);
            var handleMethod = void 0;

            var argLength = 3;
            if (error) {
                argLength = 4;
            }

            console.log("argLength: " + argLength);
            // if (handleMethod.isApp === 1) {
            //     argLength = 2;
            // }

            do {
                handleMethod = app.stack[0];
                app.stack.shift();
            } while (handleMethod.length !== argLength);

            // console.log("func :" + handleMethod);
            // if (handleMethod === undefined) {
            //     if (error) {
            //         app.res.statusCode = 500;
            //         app.res.end("get error");
            //     }

            //     app.res.statusCode = 404;
            //     app.res.end("not found");
            // }


            try {
                if (error) {
                    handleMethod(error, app.req, app.res, app.next);
                } else {
                    handleMethod(app.req, app.res, app.next);
                }
            } catch (error) {
                app.res.statusCode = 500;
                app.res.end("get error");
            }
        }
    };

    app.listen = function () {
        var server = _http2.default.createServer(app);
        server.listen(4000);
    };

    app.stack = [];

    app.use = function (nextFunc) {
        nextFunc.father = app;
        app.stack.push(nextFunc);
    };

    return app;
};

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index1.js.map