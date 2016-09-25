"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Layer = Layer;

var _pathToRegexp = require("path-to-regexp");

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _uridecode = require("uridecode");

var _uridecode2 = _interopRequireDefault(_uridecode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Layer(path, handle) {
    var layerThis = this;
    this.name = [];
    this.name1 = [];
    this.re = (0, _pathToRegexp2.default)(path, this.name, { end: false });
    this.re1 = (0, _pathToRegexp2.default)(path + "/:a", this.name1, { end: false });
    this.path = path;
    this.handle = handle;
    this.match = function (matchPath) {
        var subPath = (0, _uridecode2.default)(matchPath);
        // console.log("subPath:" + subPath + "  layer Path:" + layerThis.path);
        // if (subPath.length >= layerThis.path.length && subPath.startsWith(layerThis.path)) {
        // if (layerThis.path === '/' && subPath === '/') {
        //     return newObject;
        // }

        // console.log(p2re(layerThis.path, { end: false }).test('/') + '  layer path: ' + layerThis.path + "  " + layerThis.re.test(subPath));

        if (layerThis.re.test(subPath)) {
            var matchObject = new Object();
            var matchArr = layerThis.re.exec(subPath);
            matchObject.path = matchArr[0];

            var params = {};
            for (var i = 0; i < layerThis.name.length; i++) {
                params[layerThis.name[i].name] = matchArr[i + 1];
            }
            matchObject.params = params;

            if (this.handle && this.handle.hasFather) {
                matchObject.url = subPath.slice(this.path.length, subPath.length);
                // console.log("a" + matchObject.url);
            } else {
                matchObject.url = subPath;
                // console.log(subPath);
            }

            // console.log(layerThis.name);
            // console.log(matchArr);
            // console.log(params);

            return matchObject;
        }
    };
}
//# sourceMappingURL=layer.js.map