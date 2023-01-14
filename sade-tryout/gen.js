const fs = require('fs')

const pug = require('pug')

// Compile the source code
const compiledFunction = pug.compileFile('template.pug')

const OUTPUT_PATH = 'public'

fs.writeFileSync(
  `${OUTPUT_PATH}/index.html`,
  compiledFunction({
    name: 'Timothy',
  }),
)
