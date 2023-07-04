import { useState, useCallback, useEffect } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Avatar, Box, Chip, Container, Link, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { customerApi } from 'src/__fake-api__/customer-api';
import { studentApi } from 'src/api/student-api';
import { AuthGuard } from 'src/components/authentication/auth-guard';
import { DashboardLayout } from 'src/components/dashboard/dashboard-layout';
import { StudentEditForm } from 'src/components/dashboard/student/student-edit-form';
import { useMounted } from 'src/hooks/use-mounted';
import { gtm } from 'src/lib/gtm';
import { getInitials } from 'src/utils/get-initials';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

const StudentEdit = () => {
  const router = useRouter();
  const isMounted = useMounted();
  const [student, setStudent] = useState(null);

  const { t } = useTranslation();

  const { studentId } = router.query;

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getStudent = useCallback(async () => {
    try {
      const data = await studentApi.getStudentById(studentId);
      console.dir(data);

      if (isMounted()) {
        setStudent(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    console.log(`is mounted ${isMounted()}`);
  }, [isMounted]);

  useEffect(
    () => {
      getStudent();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (!student) {
    return <>loading attendances</>;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Customer Edit | Material Kit Pro</title>
      </Head>

      <Box
        component="main"
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <NextLink href="/dashboard/students" passHref>
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">{t('Students')}</Typography>
              </Link>
            </NextLink>
          </Box>

          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              overflow: 'hidden',
            }}
          >
            <Avatar
              src={student.avatar}
              sx={{
                height: 64,
                mr: 2,
                width: 64,
              }}
            >
              {getInitials(student.name)}
            </Avatar>
            <div>
              <Typography noWrap variant="h4">
                {student.email}
              </Typography>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                <Typography variant="subtitle2">user_id:</Typography>
                <Chip label={student.id} size="small" sx={{ ml: 1 }} />
              </Box>
            </div>
          </Box>

          <Box mt={3}>
            <StudentEditForm student={student} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

StudentEdit.getLayout = page => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default StudentEdit;
