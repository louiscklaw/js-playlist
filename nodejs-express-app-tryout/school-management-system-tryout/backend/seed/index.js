// all seeder

const { seedUser } = require('./user');
const { seedStudent } = require('./student');
const { seedTeacher } = require('./teacher');
const { seedAdmin } = require('./admin');

(async () => {
  await seedUser();
  await seedStudent();
  await seedTeacher();
  await seedAdmin();
})()
