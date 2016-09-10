'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeJake = makeJake;
var staticS = require('serve-static');
var jadeStatic = require('connect-jade-static');

function makeJake(root) {
    var temp = jadeStatic({
        baseDir: root,
        baseUrl: '/',
        maxAge: 86400,
        jade: { pretty: true }
    });

    return temp;
    // return staticS(root);
}
//# sourceMappingURL=jade.js.map