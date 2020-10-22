#!/usr/bin/env node

var fs = require( "fs" ),
  PNG = require( "pngjs" ).PNG;

var temp_png = PNG.sync.read(
  fs.readFileSync( 'in.png' )
)