
export function main() {
  var args = parseArgs(process.argv);
  var createMiniHarp = require("mini-harp");

  var root = process.cwd();
  if (args['path']) {
    root = args['path'];
  }

  var app = createMiniHarp(root);
  console.log("Starting mini-harp on http://localhost:" + args["port"]);
  app.listen(args["port"]);
}