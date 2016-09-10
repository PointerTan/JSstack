import http from "http";

export default function () {
    const app = function (req, res) {
        app.req = req;
        app.res = res;

        app.next();
    }

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

        let hasError = false;
        if (error) {
            hasError = true;
        }

        try {
            let useMethod;
            do {
                let tempUseM = app.stack[app.nextIndex];
                app.nextIndex += 1;
                if ((hasError && tempUseM.length === 4) || (!hasError && tempUseM.length !== 4)) {
                    useMethod = tempUseM;
                    break;
                }
            } while (app.nextIndex < app.stack.length);

            if (hasError) {
                if (useMethod) {
                    useMethod(error, app.req, app.res, app.next);
                }
                else {
                    app.next(error);
                }
            }
            else {
                if (useMethod) {
                    useMethod(app.req, app.res, app.next);
                }
                else {
                    app.next();
                }
            }
        } catch (error) {
            app.res.statusCode = 500;
            app.res.end("error");
            return;
        }
    }

    app.stack = [];

    app.listen = function () {
        const server = http.createServer(app);
        server.listen(4000);
    }

    app.use = function (useFunc) {
        useFunc.hasFather = true;
        useFunc.father = app;
        app.stack.push(useFunc);
    }


    return app;
}