const mongoose = require('mongoose');

const config = require('../src/config/config');
const studentSchema = require('../src/schemas/student');

const Student = mongoose.model('Student', studentSchema);

// Connect to the "node-boilerplate" database
const seedStudent = () =>
  mongoose
    .connect('mongodb://localhost:27017/node-boilerplate', config.mongoose.options)
    .then(() => {
      console.log('seeding Student');
      console.log('clean all student');

      return Student.deleteMany({});
    })
    .then(() => {
      // console.log('clear Student done')
      // console.log('connected')
    })
    .then(() => {
      const saving = Array(3)
        .fill(0)
        .map((_, idx) => {
          const newStudent = new Student({
            avatar:
              'https://images.unsplash.com/photo-1660798027105-5da8ad164e27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
            city: 'Cleveland',
            country: 'USA',
            currency: '$',
            email: `student_${idx}@devias.io`,
            hasAcceptedMarketing: true,
            isProspect: false,
            isReturning: true,
            name: 'Carson Darrin',
            state: 'Ohio',
            totalAmountSpent: 300.01,
            totalOrders: 3.1,
            isVerified: false,
          });

          return newStudent.save();
        });

      // wait for all saving completed
      return Promise.all(saving);
    })
    .then(() => {
      mongoose.connection.close();

      console.log('seeding done');
    })
    .catch((error) => console.error(error));

module.exports = { seedStudent };
