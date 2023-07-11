const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const config = require('../src/config/config');
const userSchema = require('../src/schemas/user');

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

// clear before run
const seedUser = () =>
  mongoose
    .connect('mongodb://localhost:27017/node-boilerplate', config.mongoose.options)
    .then(() => {
      console.log('seeding User');
      console.log('clean all user');

      return User.deleteMany({});
    })
    .then(() => {
      // console.log('clear Student done')
      // console.log('connected')
    })
    .then(async () => {
      const password = await bcrypt.hash('password1', 8);
      const newUser = new User({
        name: `fake exaple user`,
        email: `fake@example.com`,
        password: password,
        avatar:
          'https://images.unsplash.com/photo-1660798027105-5da8ad164e27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
        role: 'admin',
      });
      newUser.save();

      const Password123 = await bcrypt.hash('Password123!', 8);
      const webPageTestUser = new User({
        name: `demo devias user`,
        email: `demo@devias.io`,
        password: Password123,
        avatar:
          'https://images.unsplash.com/photo-1660798027105-5da8ad164e27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
        role: 'admin',
      });
      webPageTestUser.save();

      const saving = Array(5)
        .fill(0)
        .map((_, idx) => {
          const newUser = new User({
            name: `fake name_${idx}`,
            email: `demo${idx}@devias.io`,
            password: password,
            avatar:
              'https://images.unsplash.com/photo-1660798027105-5da8ad164e27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
          });

          return newUser.save();
        });

      // wait for all saving completed
      return Promise.all(saving);
    })
    .then(() => {
      console.log('seeding done');
      mongoose.connection.close();
    })
    .catch((error) => console.error(error));

module.exports = { seedUser };
