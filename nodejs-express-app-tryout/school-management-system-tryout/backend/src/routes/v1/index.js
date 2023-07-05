const express = require('express');

const authRoute = require('./auth.route');

const userRoute = require('./user.route');

const studentRoute = require('./student.route');
const subjectRoute = require('./subject.route');
const scheduleRoute = require('./schedule.route');
const teacherRoute = require('./teacher.route');
const attendanceRoute = require('./attendance.route');
const classroomRoute = require('./classroom.route');

const adminRoute = require('./admin.route');

const helloworldRoute = require('./helloworld.route');

const docsRoute = require('./docs.route');
const config = require('../../config/config');


const router = express.Router();

const defaultRoutes = [
  { path: '/auth', route: authRoute },
  { path: '/users', route: userRoute },
  { path: '/students', route: studentRoute },
  { path: '/subjects', route: subjectRoute },
  { path: '/schedules', route: scheduleRoute },
  { path: '/attendances', route: attendanceRoute },
  { path: '/classrooms', route: classroomRoute },
  { path: '/teachers', route: teacherRoute },
  { path: '/admins', route: adminRoute },
  { path: '/helloworld', route: helloworldRoute },
];

const devRoutes = [
  // BOOKMARK: routes available only in development mode
  { path: '/docs', route: docsRoute },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
