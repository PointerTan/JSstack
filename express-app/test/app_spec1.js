var request = require("supertest")
  , expect = require("chai").expect
  , http = require("http");

var express = require("../").default;

console.log("=========================");
var date = Date();
console.log(date.toString());

describe("Layer class and the match method", function () {
  var layer, fn;
  beforeEach(function () {
    var { Layer } = require("../lib/layer");
    fn = function () { };

    layer = new Layer("/foo", fn);
  });

  it("sets layer.handle to be the middleware", function () {
    expect(layer.handle).to.eql(fn);
  });

  it("returns undefined if path doesn't match", function () {
    expect(layer.match("/bar")).to.be.undefined;
  });

  it("returns matched path if layer matches the request path exactly", function () {
    var match = layer.match("/foo");
    expect(match).to.not.be.undefined;
    expect(match).to.have.property("path", "/foo");
  });

  it("returns matched prefix if the layer matches the prefix of the request path", function () {
    var match = layer.match("/foo/bar");
    expect(match).to.not.be.undefined;
    expect(match).to.have.property("path", "/foo");
  });
});


describe("app.use should add a Layer to stack", function () {
  var app, Layer;
  beforeEach(function () {
    app = express();
    Layer = require("../lib/layer").Layer;
    app.use(function () { });
    app.use("/foo", function () { });
  });

  it("first layer's path should be /", function () {
    layer = app.stack[0];
    expect(layer.match("/foo")).to.not.be.undefined;
  });

  it("second layer's path should be /foo", function () {
    layer = app.stack[1];
    expect(layer.match("/")).to.be.undefined;
    expect(layer.match("/foo")).to.not.be.undefined;
  });
});

describe("The middlewares called should match request path:", function () {
  var app;
  before(function () {
    app = express();

    app.use("/foo", function (req, res, next) {
      res.end("foo");
    });

    app.use("/", function (req, res, next) {
      res.end("root");
    });

  });

  it("returns root for GET /", function (done) {
    request(app).get("/").expect("root").end(done);
  });

  it("returns foo for GET /foo", function (done) {
    request(app).get("/foo").expect("foo").end(done);
  });

  it("returns foo for GET /foo/bar", function (done) {
    request(app).get("/foo/bar").expect("foo").end(done);
  });

  describe("The error handlers called should match request path:", function () {
    var app;
    before(function () {
      app = express();
      app.use("/foo", function (req, res, next) {
        throw "boom!"
        // next("boom!");
      });

      app.use("/foo/a", function (err, req, res, next) {
        res.end("error handled /foo/a");
      });

      app.use("/foo/b", function (err, req, res, next) {
        res.end("error handled /foo/b");
      });
    });

    it("handles error with /foo/a", function (done) {
      request(app).get("/foo/a").expect("error handled /foo/a").end(done);
    });

    it("handles error with /foo/b", function (done) {
      request(app).get("/foo/b").expect("error handled /foo/b").end(done);
    });

    it("returns 500 for /foo", function (done) {
      request(app).get("/foo").expect(500).end(done);
    });
  });

  describe("Path parameters extraction", function () {
    var Layer, layer;

    before(function () {
      Layer = require("../lib/layer").Layer;
      layer = new Layer("/foo/:a/:b");
    });

    it("returns undefined for unmatched path", function () {
      expect(layer.match("/bar")).to.be.undefined;
    });

    it("returns undefined if there isn't enough parameters", function () {
      expect(layer.match("/foo/apple")).to.be.undefined;
    });

    it("returns match data for exact match", function () {
      var match = layer.match("/foo/apple/xiaomi");
      expect(match).to.not.be.undefined;
      expect(match).to.have.property("path", "/foo/apple/xiaomi");
      expect(match.params).to.deep.equal({ a: "apple", b: "xiaomi" });
    });

    it("returns match data for prefix match", function () {
      var match = layer.match("/foo/apple/xiaomi/htc");
      expect(match).to.not.be.undefined;
      expect(match).to.have.property("path", "/foo/apple/xiaomi");
      expect(match.params).to.deep.equal({ a: "apple", b: "xiaomi" });
    });

    it("should decode uri encoding", function () {
      var match = layer.match("/foo/apple/xiao%20mi");
      expect(match.params).to.deep.equal({ a: "apple", b: "xiao mi" });
    });

    it("should strip trialing slash", function () {
      layer = new Layer("/")
      expect(layer.match("/foo")).to.not.be.undefined;
      expect(layer.match("/")).to.not.be.undefined;

      layer = new Layer("/foo/")
      expect(layer.match("/foo")).to.not.be.undefined;
      expect(layer.match("/foo/")).to.not.be.undefined;
    });
  });

  describe("Implement req.params", function () {
    var app;
    before(function () {
      app = express();
      app.use("/foo/:a", function (req, res, next) {
        res.end(req.params.a);
      });

      app.use("/foo", function (req, res, next) {
        res.end("" + req.params.a);
      });
    });

    it("should make path parameters accessible in req.params", function (done) {
      request(app).get("/foo/google").expect("google").end(done);
    })

    it("should make {} the default for req.params", function (done) {
      request(app).get("/foo").expect("undefined").end(done);
    });
  })

  describe("app should have the handle method", function () {
    it("should have the handle method", function () {
      var app = express();
      expect(app.handle).to.be.a("function");
    });
  });

  describe("Prefix path trimming", function () {
    var app, subapp, barapp;
    beforeEach(function () {
      app = express();
      subapp = express();

      subapp.use("/bar", function (req, res) {
        res.end("embedded app: " + req.url);
      });

      app.use("/foo", subapp);

      app.use("/foo", function (req, res) {
        res.end("handler: " + req.url);
      });
    });

    it("trims request path prefix when calling embedded app", function (done) {
      request(app).get("/foo/bar").expect("embedded app: /bar").end(done);
    });

    // it("restore trimmed request path to original when going to the next middleware", function (done) {
    //   request(app).get("/foo").expect("handler: /foo").end(done);
    // });

    // describe("ensures leading slash", function () {
    //   beforeEach(function () {
    //     barapp = express();
    //     barapp.use("/", function (req, res) {
    //       res.end("/bar");
    //     });
    //     app.use("/bar", barapp);
    //   });

    //   it("ensures that first char is / for trimmed path", function (done) {
    //     // request(app).get("/bar").expect("/bar").end(done);
    //     request(app).get("/bar/").expect("/bar").end(done);
    //   });
    // });
  });

});