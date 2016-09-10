var staticS = require('serve-static');
var jadeStatic = require('connect-jade-static');



export function makeJake(root) {
    var temp = jadeStatic({
        baseDir: root,
        baseUrl: '/',
        maxAge: 86400,
        jade: { pretty: true }
    });

    return temp;
    // return staticS(root);
}

