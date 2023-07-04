const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const config = require('../src/config/config');
const userSchema = require('../src/schemas/user');


// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

// clear before run
const seedUser = () => mongoose.connect("mongodb://localhost:27017/node-boilerplate", config.mongoose.options)
  .then(() => {
    console.log('seeding User');

    return User.deleteMany({})
  }).then(() => {
    // console.log('clear Student done')
    // console.log('connected')
  })
  .then(async () => {
    const password = await bcrypt.hash('password1', 8)
    const newUser = new User({
      name: `fake name`,
      email: `fake@example.com`,
      password: password,
      avatar: "avatar.jpg",
    });
    newUser.save()

    const saving = Array(5).fill(0).map((_, idx) => {
      const newUser = new User({
        name: `fake name_${idx}`,
        email: `demo${idx}@devias.io`,
        password: password,
        avatar: "avatar.jpg",
      });

      return newUser.save()
    })

    // wait for all saving completed
    return Promise.all(saving)
  })
  .then(() => {
    console.log('seeding done')
    mongoose.connection.close();

  })
  .catch((error) => console.error(error));

module.exports = { seedUser }
