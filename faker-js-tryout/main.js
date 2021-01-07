var faker = require('faker');

// https://github.com/Marak/faker.js

var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
var randomCard = faker.helpers.createCard(); // random contact card containing many properties

console.log(`randomName ${randomName}`)
console.log(`randomEmail ${randomEmail}`)
console.log(`randomCard ${randomCard}`)
