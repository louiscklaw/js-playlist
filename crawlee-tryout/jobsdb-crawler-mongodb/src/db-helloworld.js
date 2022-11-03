// const mongoose = require('mongoose')
import mongoose from 'mongoose'
mongoose.connect('mongodb://admin:admin@mongo:27017/test')

const Cat = mongoose.model('Cat', { name: String })

const kitty = new Cat({ name: 'Zildjian' })
kitty.save().then(() => console.log('meow'))
