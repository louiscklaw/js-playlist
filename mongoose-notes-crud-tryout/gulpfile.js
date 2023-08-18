// npm install gulp gulp-pug gulp-less gulp-csso gulp-concat gulp-javascript-obfuscator gulp-rename --save -D
const { src, dest, parallel, series } = require('gulp')
const pug = require('gulp-pug')
const less = require('gulp-less')
const minifyCSS = require('gulp-csso')
const concat = require('gulp-concat')

const rename = require('gulp-rename')
const javascriptObfuscator = require('gulp-javascript-obfuscator')

function html() {
  return src('app/src/*.pug').pipe(pug()).pipe(dest('app/public'))
}

function css() {
  return src('app/src/css/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(dest('app/public/css'))
}

function js() {
  return src(
    [
      'app/src/js/const.js',
      'app/src/js/common.js',
      'app/src/js/user.js',
      'app/src/js/app.js',
    ],
    {
      sourcemaps: true,
    },
  )
    .pipe(concat('app.js'))
    .pipe(
      dest('app/public/js', {
        sourcemaps: true,
      }),
    )
}

// function js_compress() {
//     return src( './build/js/app.js' )
//         .pipe( javascriptObfuscator( {
//             compact: true
//         } ) )
//         .pipe( rename( 'app.min.js' ) )
//         .pipe( sourcemaps.write() )
//         .pipe( dest( 'build/js', ) )
// }

// exports.js = js;
// exports.css = css;
exports.html = html
// css, js, js_compress,
exports.default = series(css, js, html)
