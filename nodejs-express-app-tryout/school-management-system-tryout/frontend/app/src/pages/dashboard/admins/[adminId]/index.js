import { useCallback, useState, useEffect } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { customerApi } from 'src/__fake-api__/customer-api';
import { AuthGuard } from 'src/components/authentication/auth-guard';
import { DashboardLayout } from 'src/components/dashboard/dashboard-layout';
import { CustomerBasicDetails } from 'src/components/dashboard/customer/customer-basic-details';
import { CustomerDataManagement } from 'src/components/dashboard/customer/customer-data-management';
import { CustomerEmailsSummary } from 'src/components/dashboard/customer/customer-emails-summary';
import { CustomerInvoices } from 'src/components/dashboard/customer/customer-invoices';
import { CustomerPayment } from 'src/components/dashboard/customer/customer-payment';
import { CustomerLogs } from 'src/components/dashboard/customer/customer-logs';
import { useMounted } from 'src/hooks/use-mounted';
import { ChevronDown as ChevronDownIcon } from 'src/icons/chevron-down';
import { PencilAlt as PencilAltIcon } from 'src/icons/pencil-alt';
import { gtm } from 'src/lib/gtm';
import { getInitials } from 'src/utils/get-initials';
import { useTranslation } from 'react-i18next';
import { adminApi } from 'src/api/admin-api';

// import { getInitials } from '../../../../utils/get-initials';
import { useRouter } from 'next/router';

const tabs = [
  { label: 'Details', value: 'details' },
  { label: 'Invoices', value: 'invoices' },
  { label: 'Logs', value: 'logs' },
];

const AdminDetails = () => {
  const { t } = useTranslation();

  const isMounted = useMounted();
  const [customer, setCustomer] = useState(null);
  const [currentTab, setCurrentTab] = useState('details');

  const router = useRouter();
  const { adminId } = router.query;

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getCustomer = useCallback(async () => {
    try {
      const data = await adminApi.getAdminById(adminId);

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

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  if (!customer) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Customer Details | Material Kit Pro</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="md">
          <div>
            <Box sx={{ mb: 4 }}>
              <NextLink href="/dashboard/admins" passHref>
                <Link
                  color="textPrimary"
                  component="a"
                  sx={{ alignItems: 'center', display: 'flex' }}
                >
                  <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="subtitle2">{t('Admins')}</Typography>
                </Link>
              </NextLink>
            </Box>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid
                item
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  overflow: 'hidden',
                }}
              >
                <Avatar
                  src={customer.avatar}
                  sx={{ height: 64, mr: 2, width: 64 }}
                >
                  {getInitials(customer.name)}
                </Avatar>
                <div>
                  <Typography variant="h4">{customer.email}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle2">user_id:</Typography>
                    <Chip label={customer.id} size="small" sx={{ ml: 1 }} />
                  </Box>
                </div>
              </Grid>
              <Grid item sx={{ m: -1 }}>
                <NextLink
                  href={`/dashboard/admins/${customer.id}/edit`}
                  passHref
                >
                  <Button
                    component="a"
                    endIcon={<PencilAltIcon fontSize="small" />}
                    sx={{ m: 1 }}
                    variant="outlined"
                  >
                    {t('Edit')}
                  </Button>
                </NextLink>
                <Button
                  endIcon={<ChevronDownIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="contained"
                >
                  {t('Actions')}
                </Button>
              </Grid>
            </Grid>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ mt: 3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map(tab => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </div>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === 'details' && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <CustomerBasicDetails
                    address1={customer.address1}
                    address2={customer.address2}
                    country={customer.country}
                    email={customer.email}
                    isVerified={!!customer.isVerified}
                    phone={customer.phone}
                    state={customer.state}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomerPayment />
                </Grid>
                <Grid item xs={12}>
                  <CustomerEmailsSummary />
                </Grid>
                <Grid item xs={12}>
                  <CustomerDataManagement />
                </Grid>
              </Grid>
            )}
            {currentTab === 'invoices' && <CustomerInvoices />}
            {currentTab === 'logs' && <CustomerLogs />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

AdminDetails.getLayout = page => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default AdminDetails;
