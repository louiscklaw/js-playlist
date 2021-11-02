const { watch, series } = require("gulp");

function clean(cb) {
  // body omitted
  cb();
}

function javascript(cb) {
  // body omitted
  cb();
}

function css(cb) {
  // body omitted
  cb();
}

exports.default = function () {
  // You can use a single task
  watch("src/*.css", { delay: 500 }, css);
  // Or a composed task
  watch("src/*.js", { delay: 500 }, series(clean, javascript));
};
