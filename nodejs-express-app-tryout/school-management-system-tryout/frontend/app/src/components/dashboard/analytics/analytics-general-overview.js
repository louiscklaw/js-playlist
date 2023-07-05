import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { ArrowRight as ArrowRightIcon } from 'src/icons/arrow-right';
import { ChevronDown as ChevronDownIcon } from 'src/icons/chevron-down';
import { ChevronUp as ChevronUpIcon } from 'src/icons/chevron-up';
import { Chart } from '../../chart';
import { useTranslation } from 'react-i18next';

import TotalStudentCard from './cards/total-student-card';
import TotalTeacherCard from './cards/total-teacher-card';
import TotalAdministratorCard from './cards/total-administrator-card';

import TotalSubjectCard from './cards/total-subject-card';
import TotalScheduleCard from './cards/total-schedule-card';
import TotalClassroomCard from './cards/total-classroom-card';
import TotalAttendanceCard from './cards/total-attendance-card';
import TotalExamCard from './cards/total-exam-card';
import TotalExamResultCard from './cards/total-exam-result-card';

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
          <TotalAdministratorCard />
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
