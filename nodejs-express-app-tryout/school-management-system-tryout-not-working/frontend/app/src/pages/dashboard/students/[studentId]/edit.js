import { useState, useCallback, useEffect } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Avatar, Box, Chip, Container, Link, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { customerApi } from 'src/__fake-api__/customer-api';
import { AuthGuard } from 'src/components/authentication/auth-guard';
import { DashboardLayout } from 'src/components/dashboard/dashboard-layout';
import { CustomerEditForm } from 'src/components/dashboard/customer/customer-edit-form';
import { useMounted } from 'src/hooks/use-mounted';
import { gtm } from 'src/lib/gtm';
import { getInitials } from 'src/utils/get-initials';
import { useTranslation } from 'react-i18next';

const CustomerEdit = () => {
  const isMounted = useMounted();
  const [customer, setCustomer] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getCustomer = useCallback(async () => {
    try {
      const data = await customerApi.getCustomer();

      if (isMounted()) {
        setCustomer(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getCustomer();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (!customer) {
    return null;
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
              src={customer.avatar}
              sx={{
                height: 64,
                mr: 2,
                width: 64,
              }}
            >
              {getInitials(customer.name)}
            </Avatar>
            <div>
              <Typography noWrap variant="h4">
                {customer.email}
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
                <Chip label={customer.id} size="small" sx={{ ml: 1 }} />
              </Box>
            </div>
          </Box>
          <Box mt={3}>
            <CustomerEditForm customer={customer} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

CustomerEdit.getLayout = page => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CustomerEdit;
