const { rollup } = require("rollup");

// Rollup's promise API works great in an `async` task
exports.rollup_test = async function () {
  const bundle = await rollup({
    input: "src/index.js",
  });

  return bundle.write({
    file: "output/bundle.js",
    format: "iife",
  });
};

const del = require("delete");

exports.delete_test = function (cb) {
  // Use the `delete` module directly, instead of using gulp-rimraf
  del(["output/*.js"], cb);
};

// Conditional plugins

let { src, dest } = require("gulp");
const gulpif = require("gulp-if");
const uglify = require("gulp-uglify");

function isJavaScript(file) {
  // Check if file extension is '.js'
  return file.extname === ".js";
}

exports.cond_plugins = function () {
  // Include JavaScript and CSS files in a single pipeline
  return (
    src(["src/*.js", "src/*.css"])
      // Only apply gulp-uglify plugin to JavaScript files
      .pipe(gulpif(isJavaScript, uglify()))
      .pipe(dest("output/"))
  );
};

// Inline plugins

// let { src, dest } = require("gulp");
const uglify_js = require("uglify-js");
const through2 = require("through2");

exports.inilne_plugins = function () {
  return (
    src("src/*.js")
      // Instead of using gulp-uglify, you can create an inline plugin
      .pipe(
        through2.obj(function (file, _, cb) {
          if (file.isBuffer()) {
            const code = uglify_js.minify(file.contents.toString());
            file.contents = Buffer.from(code.code);
          }
          cb(null, file);
        })
      )
      .pipe(dest("output/"))
  );
};
