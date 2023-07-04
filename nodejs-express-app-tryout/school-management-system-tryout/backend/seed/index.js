// all seeder

const { seedUser } = require('./user');
const { seedStudent } = require('./student');
const { seedTeacher } = require('./teacher');

(async () => {
  await seedUser();
  await seedStudent();
  await seedTeacher();
})()
