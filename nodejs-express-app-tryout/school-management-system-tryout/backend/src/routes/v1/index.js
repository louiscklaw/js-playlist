const express = require('express');

const authRoute = require('./auth.route');

const userRoute = require('./user.route');

const studentRoute = require('./student.route');
const subjectRoute = require('./subject.route');
const scheduleRoute = require('./schedule.route');
const teacherRoute = require('./teacher.route');
const attendanceRoute = require('./attendance.route');
const classroomRoute = require('./classroom.route');
const examRoute = require('./exam.route');
const examResultRoute = require('./exam_result.route');
const paymentInfoRoute = require('./payment_info.route');
const notificationRoute = require('./notification.route');
const permissionRoute = require('./permission.route');

const adminRoute = require('./admin.route');

const helloworldRoute = require('./helloworld.route');

const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  { path: '/auth', route: authRoute },
  { path: '/users', route: userRoute },
  { path: '/teachers', route: teacherRoute },
  { path: '/admins', route: adminRoute },
  { path: '/students', route: studentRoute },
  { path: '/subjects', route: subjectRoute },
  { path: '/schedules', route: scheduleRoute },
  { path: '/attendances', route: attendanceRoute },
  { path: '/classrooms', route: classroomRoute },
  { path: '/exams', route: examRoute },
  { path: '/exam-results', route: examResultRoute },
  { path: '/payment-infos', route: paymentInfoRoute },
  { path: '/notifications', route: notificationRoute },
  { path: '/permissions', route: permissionRoute },

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
