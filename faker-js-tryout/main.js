const fs = require('fs')
var faker = require('faker/locale/ja');
var uuid = require('uuid');

// https://github.com/Marak/faker.js

var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
var randomCard = faker.helpers.createCard(); // random contact card containing many properties

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

console.log(`randomName ${randomName}`)
console.log(`randomEmail ${randomEmail}`)
// console.log(`randomCard ${JSON.stringify(randomCard)}`)

let helloworld = []
for (var i=0; i< 30;i++){
  temp_card=faker.helpers.createCard()
  helloworld[i]={
        id: uuid.v4(),
        address: {
          country: temp_card.country,
          state: temp_card.state,
          city: temp_card.city,
          street: temp_card.street
        },
        avatarUrl: `/static/images/avatars/avatar_${getRandomInt(10)}.png`,
        createdAt: temp_card.date,
        email: temp_card.email,
        name: temp_card.name,
        phone: temp_card.phone,
        notes: temp_card.posts[0].sentences
  }
}

console.log(JSON.stringify(helloworld))
fs.writeFileSync('/home/logic/_workspace/lynked-demo-tryout/manage/src/views/queue_manage/QueueManageListView/temp_name_list.json',JSON.stringify(helloworld))