const mongoose = require('mongoose');

const config = require('../src/config/config');
const teacherSchema = require('../src/schemas/teacher');

const Teacher = mongoose.model('Teacher', teacherSchema);

// Connect to the "node-boilerplate" database
const seedTeacher = () =>
  mongoose
    .connect('mongodb://localhost:27017/node-boilerplate', config.mongoose.options)
    .then(() => {
      console.log('seeding Teacher');
      console.log('clean all teacher');

      return Teacher.deleteMany({});
    })
    .then(() => {
      // console.log('clear Teacher done')
      // console.log('connected')
    })
    .then(() => {
      const saving = Array(1)
        .fill(0)
        .map((_, idx) => {
          const newTeacher = new Teacher({
            avatar:
              'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
            city: 'Cleveland',
            country: 'USA',
            currency: '$',
            email: `teacher_${idx}@devias.io`,
            hasAcceptedMarketing: true,
            isProspect: false,
            isReturning: true,
            name: 'Carson Darrin',
            state: 'Ohio',
            totalAmountSpent: 300.01,
            totalOrders: 3.1,
            isVerified: false,
          });

          return newTeacher.save();
        });

      // wait for all saving completed
      return Promise.all(saving);
    })
    .then(() => {
      mongoose.connection.close();

      console.log('seeding done');
    })
    .catch((error) => console.error(error));

module.exports = { seedTeacher };
