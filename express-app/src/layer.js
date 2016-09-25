import p2re from "path-to-regexp"
import uri from 'uridecode'

export function Layer(path, handle) {
    const layerThis = this;
    this.name = [];
    this.name1 = [];
    this.re = p2re(path, this.name, { end: false });
    this.re1 = p2re(path + "/:a", this.name1, { end: false });
    this.path = path;
    this.handle = handle;
    this.match = function (matchPath) {
        let subPath = uri(matchPath);
        // console.log("subPath:" + subPath + "  layer Path:" + layerThis.path);
        // if (subPath.length >= layerThis.path.length && subPath.startsWith(layerThis.path)) {
        // if (layerThis.path === '/' && subPath === '/') {
        //     return newObject;
        // }

        // console.log(p2re(layerThis.path, { end: false }).test('/') + '  layer path: ' + layerThis.path + "  " + layerThis.re.test(subPath));

        if (layerThis.re.test(subPath)) {
            const matchObject = new Object;
            const matchArr = layerThis.re.exec(subPath)
            matchObject.path = matchArr[0]; 

            let params = {};
            for (let i = 0; i < layerThis.name.length; i++) {
                params[layerThis.name[i].name] = matchArr[i + 1];
            }
            matchObject.params = params;

            if (this.handle && this.handle.hasFather) {
                matchObject.url = subPath.slice(this.path.length, subPath.length);
                // console.log("a" + matchObject.url);
            }
            else {
                matchObject.url = subPath;
                // console.log(subPath);
            }

            // console.log(layerThis.name);
            // console.log(matchArr);
            // console.log(params);

            return matchObject;
        }
    }
}