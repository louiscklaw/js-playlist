//
const express = require('express')
const app = express()

var birds = require('./birds');

app.use('/birds', birds)

app.listen(3001, function(){
    console.log('started');
})
