const loremIpsum = require('lorem-ipsum-japanese')
const output = loremIpsum({
  count: 1, // Number of words, sentences, or paragraphs to generate.
  units: 'sentences', // Generate words, sentences, or paragraphs.
  sentenceLowerBound: 5, // Minimum words per sentence.
  sentenceUpperBound: 15, // Maximum words per sentence.
  paragraphLowerBound: 3, // Minimum sentences per paragraph.
  paragraphUpperBound: 7, // Maximum sentences per paragraph.
  format: 'plain', // Plain text or html
})

console.log(output)
