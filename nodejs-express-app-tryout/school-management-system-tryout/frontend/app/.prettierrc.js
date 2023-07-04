module.exports = {
  "arrowParens": "avoid",
  "bracketSpacing": true,
  "endOfLine": "lf",
  "htmlWhitespaceSensitivity": "strict",
  "insertPragma": false,
  "jsxBracketSameLine": false,
  "jsxSingleQuote": false,
  "printWidth": 80,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "useTabs": false,
  // singleQuote: true,
  // trailingComma: 'es5',
  "overrides": [
    {
      "files": ["*.html"],
      "options": {}
    },
    {
      "files": ["*.{j,t}sx", "*.{j,t}s"],
      "options": {}
    }
  ]
};
