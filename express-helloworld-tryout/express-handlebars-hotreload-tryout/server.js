const express = require('express')

const { hotreload, engine } = require('express-handlebars-hotreload')

if (process.env.NODE_ENV !== 'production') hotreload()

const app = express()

console.log(process.cwd() + '/views')

app.engine(
  'handlebars',
  engine({
    hotreload: process.env.NODE_ENV !== 'production',
  }),
)
app.set('view engine', 'handlebars')
app.set('views', process.cwd() + '/views')

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(4200)
