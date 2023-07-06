import { useState, useCallback, useEffect } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Avatar, Box, Chip, Container, Link, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { customerApi } from 'src/__fake-api__/customer-api';

import { studentApi } from 'src/api/student-api';
import { adminApi } from 'src/api/admin-api';

import { AuthGuard } from 'src/components/authentication/auth-guard';
import { DashboardLayout } from 'src/components/dashboard/dashboard-layout';

import { AdminEditForm } from 'src/components/dashboard/admin/admin-edit-form';
// import { StudentEditForm } from 'src/components/dashboard/student/student-edit-form';

import { useMounted } from 'src/hooks/use-mounted';
import { gtm } from 'src/lib/gtm';
import { getInitials } from 'src/utils/get-initials';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import LoadingTable from 'src/components/LoadingTable';

const AdminEdit = () => {
  const router = useRouter();
  const isMounted = useMounted();
  const [admin, setStudent] = useState(null);

  const { t } = useTranslation();

  const { adminId } = router.query;

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getStudent = useCallback(async () => {
    try {
      const data = await adminApi.getAdminById(adminId);

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

  if (!admin) {
    return (
      <>
        <LoadingTable resource_name={'admin'} />
      </>
    );
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
            <NextLink href="/dashboard/admins" passHref>
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">{t('Admins')}</Typography>
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
              src={admin.avatar}
              sx={{
                height: 64,
                mr: 2,
                width: 64,
              }}
            >
              {getInitials(admin.name)}
            </Avatar>
            <div>
              <Typography noWrap variant="h4">
                {admin.email}
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
                <Chip label={admin.id} size="small" sx={{ ml: 1 }} />
              </Box>
            </div>
          </Box>

          <Box mt={3}>
            <AdminEditForm admin={admin} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

AdminEdit.getLayout = page => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default AdminEdit;
