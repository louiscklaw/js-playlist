// all seeder

const { seedUser } = require('./user');
const { seedStudent } = require('./student');

// require('./student');

(async () => {
  await seedUser();
  await seedStudent();
})()
