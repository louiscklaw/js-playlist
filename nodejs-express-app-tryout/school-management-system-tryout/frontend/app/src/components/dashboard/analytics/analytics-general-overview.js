import { Grid } from '@mui/material';

import TotalAdministratorCard from './cards/total-administrator-card';
import TotalAttendanceCard from './cards/total-attendance-card';
import TotalClassroomCard from './cards/total-classroom-card';
import TotalExamCard from './cards/total-exam-card';
import TotalExamResultCard from './cards/total-exam-result-card';
import TotalPaymentInfoCard from './cards/total-payment-info-card';
import TotalScheduleCard from './cards/total-schedule-card';
import TotalStudentCard from './cards/total-student-card';
import TotalSubjectCard from './cards/total-subject-card';
import TotalTeacherCard from './cards/total-teacher-card';

export const AnalyticsGeneralOverview = () => {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={3} sm={6} xs={12}>
          <TotalStudentCard />
        </Grid>

        <Grid item md={3} sm={6} xs={12}>
          <TotalTeacherCard />
        </Grid>

        <Grid item md={3} sm={6} xs={12}>
          <TotalAdministratorCard />
        </Grid>

        <Grid item md={3} sm={6} xs={12}>
          <TotalSubjectCard />
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mt: 0.1 }}>
        <Grid item md={3} sm={6} xs={12}>
          <TotalScheduleCard />
        </Grid>

        <Grid item md={3} sm={6} xs={12}>
          <TotalClassroomCard />
        </Grid>

        <Grid item md={3} sm={6} xs={12}>
          <TotalAttendanceCard />
        </Grid>

        <Grid item md={3} sm={6} xs={12}>
          <TotalExamCard />
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mt: 0.1 }}>
        <Grid item md={3} sm={6} xs={12}>
          <TotalExamResultCard />
        </Grid>

        <Grid item md={3} sm={6} xs={12}>
          <TotalPaymentInfoCard />
        </Grid>

        <Grid item md={3} sm={6} xs={12}>
          <TotalAdministratorCard />
        </Grid>

        <Grid item md={3} sm={6} xs={12}>
          <TotalAdministratorCard />
        </Grid>
      </Grid>
    </>
  );
};
