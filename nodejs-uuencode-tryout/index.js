#!/usr/bin/env node

var uuencode = require('uuencode')

// encode something
var encoded = uuencode.encode('Unix-to-Unix encoding')
// '556YI>"UT;RU5;FEX(&5N8V]D:6YG\n'

// decode something
var decoded = uuencode.decode('556YI>"UT;RU5;FEX(&5N8V]D:6YG\n')
// 'Unix-to-Unix encoding'

console.log(encoded)
