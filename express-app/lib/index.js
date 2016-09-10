"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var app = function app(req, res) {
        app.req = req;
        app.res = res;
        app.nextIndex = 0;
        app.next();
    };

    app.handle = function () {};

    app.hasFather = false;
    app.isApp = true;

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
                if (hasError && tempUseM.handle.length === 4 || !hasError && tempUseM.handle.length !== 4) {
                    useMethod = tempUseM;
                    break;
                }
            } while (app.nextIndex < app.stack.length);

            var matchObj = useMethod.match(app.req.url);
            if (matchObj) {
                app.req.params = matchObj.params;
            } else {
                app.req.params = {};
            }

            if (hasError) {
                if (useMethod && matchObj) {
                    useMethod.handle(error, app.req, app.res, app.next);
                } else {
                    app.next(error);
                }
            } else {
                if (useMethod && matchObj) {
                    useMethod.handle(app.req, app.res, app.next);
                } else {
                    app.next();
                }
            }
        } catch (error) {
            app.next(error);
            // app.res.statusCode = 500;
            // app.res.end("error");
            return;
        }
    };

    app.stack = [];

    app.listen = function () {
        var server = _http2.default.createServer(app);
        server.listen(4000);
    };

    app.use = function (pathOrFunc, useFunc) {
        var path = "/";
        var func = pathOrFunc;
        if (typeof pathOrFunc === 'string') {
            path = pathOrFunc;
            func = useFunc;
        }

        var _require = require("../lib/layer");

        var Layer = _require.Layer;

        var layer = new Layer(path, func);

        layer.hasFather = true;
        layer.father = app;
        app.stack.push(layer);
    };

    return app;
};

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map