/**
 * Require Browsersync
 */
var browserSync = require('browser-sync')

/**
 * Run Browsersync with server config
 */
browserSync({
  files: ['app/*.html', 'app/css/*.css'],

  // Using a localhost address with a port
  proxy: 'localhost:8000',
})
