// all seeder

const { seedStudent } = require('./student');
const { seedUser } = require('./user');

// require('./student');

(async () => {
  await seedUser();
  await seedStudent();
})()
