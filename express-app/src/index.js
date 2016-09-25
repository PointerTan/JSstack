import http from "http";
import { Layer } from "../lib/layer";

export default function () {
    const app = function (req, res) {
        app.req = req;
        app.res = res;
        app.nextIndex = 0;
        app.next();
    }

    app.handle = function () {

    }

    app.originUrl = "";
    app.hasFather = false;
    app.isApp = true;

    app.next = function (error) {
        // console.log(app.nextIndex + "aa" + app.stack.length);

        if (app.nextIndex === app.stack.length) {
            if (app.hasFather) {
                console.log("hasFather and end");
                app.req.url = app.req.originUrl;
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

        let hasError = false;
        if (error) {
            hasError = true;
        }

        try {
            let useMethod;
            do {
                let tempUseM = app.stack[app.nextIndex];
                app.nextIndex += 1;
                if ((hasError && tempUseM.handle.length === 4) || (!hasError && tempUseM.handle.length !== 4)) {
                    useMethod = tempUseM;
                    break;
                }
            } while (app.nextIndex < app.stack.length);

            let matchObj = useMethod.match(app.req.url);
            let req = app.req;
            if (matchObj) {
                app.req.params = matchObj.params;
                app.req.originUrl = req.url;
                req.url = matchObj.url;
            }
            else {
                // console.log(app.req.url)
                app.req.params = {};
            }

            if (hasError) {
                if (useMethod && matchObj) {
                    useMethod.handle(error, req, app.res, app.next);
                }
                else {
                    app.next(error);
                }
            }
            else {
                if (useMethod && matchObj) {
                    useMethod.handle(req, app.res, app.next);
                }
                else {
                    app.next();
                }
            }
        } catch (error) {
            app.next(error);
            // app.res.statusCode = 500;
            // app.res.end("error");
            return;
        }
    }

    app.stack = [];

    app.listen = function () {
        const server = http.createServer(app);
        server.listen(4000);
    }

    app.use = function (pathOrFunc, useFunc) {
        var path = "/";
        var func = pathOrFunc;
        if (typeof pathOrFunc === 'string') {
            path = pathOrFunc;
            func = useFunc;
        }

        let layer = new Layer(path, func);

        if (layer.handle && layer.handle.isApp) {
            layer.handle.hasFather = true;
            layer.handle.father = app;
        }
        app.stack.push(layer);
    }

    return app;
}