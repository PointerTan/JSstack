"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var app = function app(req, res) {
        app.req = req;
        app.res = res;

        app.next();
    };

    app.hasFather = false;
    app.isApp = true;
    app.nextIndex = 0;

    app.next = function (error) {
        // console.log(app.nextIndex + "aa" + app.stack.length);

        if (app.nextIndex === app.stack.length) {
            if (app.hasFather) {
                console.log("hasFather and end");
                app.father.next(error);
                return;
            }

            if (error) {
                app.res.statusCode = 500;
                app.res.end("error");
                return;
            }

            app.res.statusCode = 404;
            app.res.end("not found");
            return;
        }

        var hasError = false;
        if (error) {
            hasError = true;
        }

        try {
            var useMethod = void 0;
            do {
                var tempUseM = app.stack[app.nextIndex];
                app.nextIndex += 1;
                if (hasError && tempUseM.length === 4 || !hasError && tempUseM.length !== 4) {
                    useMethod = tempUseM;
                    break;
                }
            } while (app.nextIndex < app.stack.length);

            if (hasError) {
                if (useMethod) {
                    useMethod(error, app.req, app.res, app.next);
                } else {
                    app.next(error);
                }
            } else {
                if (useMethod) {
                    useMethod(app.req, app.res, app.next);
                } else {
                    app.next();
                }
            }
        } catch (error) {
            app.res.statusCode = 500;
            app.res.end("error");
            return;
        }
    };

    app.stack = [];

    app.listen = function () {
        var server = _http2.default.createServer(app);
        server.listen(4000);
    };

    app.use = function (useFunc) {
        useFunc.hasFather = true;
        useFunc.father = app;
        app.stack.push(useFunc);
    };

    return app;
};

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=appV1.js.map