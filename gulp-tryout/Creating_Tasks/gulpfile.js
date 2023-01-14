const { series, parallel } = require('gulp')

function clean(cb) {
  // body omitted
  cb()
}

function css(cb) {
  // body omitted
  cb()
}

function javascript(cb) {
  // body omitted
  cb()
}

exports.default = series(clean, parallel(css, javascript))
