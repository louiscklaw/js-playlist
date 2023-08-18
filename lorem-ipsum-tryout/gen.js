const fs = require('fs')
const _ = require('lodash')
const loremIpsum = require('lorem-ipsum-japanese')
const output = loremIpsum({
  count: 10, // Number of words, sentences, or paragraphs to generate.
  units: 'sentences', // Generate words, sentences, or paragraphs.
  sentenceLowerBound: 5, // Minimum words per sentence.
  sentenceUpperBound: 15, // Maximum words per sentence.
  paragraphLowerBound: 3, // Minimum sentences per paragraph.
  paragraphUpperBound: 7, // Maximum sentences per paragraph.
  format: 'plain', // Plain text or html
})

const input_fs = fs.readFileSync(
  '/home/logic/_workspace/react-playlist/admin-template/material-kit-react/public/locales/en/translation.json',
  {
    encoding: 'utf-8',
  },
)
const input_json = JSON.parse(input_fs)

function iter(o) {
  Object.keys(o).forEach(function (k) {
    if (o[k] !== null && typeof o[k] === 'object') {
      iter(o[k])
      return
    }
    if (typeof o[k] === 'string') {
      if (k.search(/_original/) > 0) {
      } else {
        o[`${k}_original`] = o[k]
        let output = loremIpsum({
          count: Math.max(o[k].split(' ').length, 5),
          units: 'words',
        })
        o[`${k}`] = output
      }
    }
  })
}

var data = {
  ffs: false,
  customer: { customer_id: 1544248, z_cx_id: '123456' },
  selected_items: {
    3600196: [
      { id: 4122652, name: "Essential Large (up to 8'x10')", selected: true },
    ],
  },
  service_partner: { id: 3486, name: 'Some String', street: '1234 King St.' },
  subject: 'Project-2810191 - Orange Juice Stain (Rug)',
  description:
    'Product Type: \n\nIssue: (copy/paste service request details here)\n\nAction Required:',
}

iter(input_json)
console.log(JSON.stringify(input_json, null, 2))

fs.writeFileSync(
  '/home/logic/_workspace/react-playlist/admin-template/material-kit-react/public/locales/en/translation.json',
  JSON.stringify(input_json, null, 2),
  {
    encoding: 'utf-8',
  },
)
