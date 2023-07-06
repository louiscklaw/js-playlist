import { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import { AuthGuard } from 'src/components/authentication/auth-guard';
import { DashboardLayout } from 'src/components/dashboard/dashboard-layout';
import { OverviewBanner } from 'src/components/dashboard/overview/overview-banner';
import { OverviewCryptoWallet } from 'src/components/dashboard/overview/overview-crypto-wallet';
import { OverviewInbox } from 'src/components/dashboard/overview/overview-inbox';
import { OverviewLatestTransactions } from 'src/components/dashboard/overview/overview-latest-transactions';
import { OverviewPrivateWallet } from 'src/components/dashboard/overview/overview-private-wallet';
import { OverviewTotalBalance } from 'src/components/dashboard/overview/overview-total-balance';
import { OverviewTotalTransactions } from 'src/components/dashboard/overview/overview-total-transactions';
import { ArrowRight as ArrowRightIcon } from 'src/icons/arrow-right';
import { Briefcase as BriefcaseIcon } from 'src/icons/briefcase';
import { Download as DownloadIcon } from 'src/icons/download';
import { ExternalLink as ExternalLinkIcon } from 'src/icons/external-link';
import { InformationCircleOutlined as InformationCircleOutlinedIcon } from 'src/icons/information-circle-outlined';
import { Reports as ReportsIcon } from 'src/icons/reports';
import { Users as UsersIcon } from 'src/icons/users';
import { gtm } from 'src/lib/gtm';
import { useTranslation } from 'react-i18next';

const Overview = () => {
  const { t } = useTranslation();

  const [displayBanner, setDisplayBanner] = useState(true);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    // Restore the persistent state from local/session storage
    const value = globalThis.sessionStorage.getItem('dismiss-banner');
    console.log('findme', value);

    if (value === 'true') {
      setDisplayBanner(false);
    }
  }, []);

  const handleDismissBanner = () => {
    // Update the persistent state
    globalThis.sessionStorage.setItem('dismiss-banner', 'true');

    setDisplayBanner(false);
  };

  return (
    <>
      <Head>
        <title>Dashboard: Overview | Material Kit Pro</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">{t('Good Morning')}</Typography>
              </Grid>
              <Grid
                item
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  m: -1,
                }}
              >
                <Button
                  startIcon={<ReportsIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="outlined"
                >
                  Reports
                </Button>
                <TextField
                  defaultValue="week"
                  label="Period"
                  select
                  size="small"
                  sx={{ m: 1 }}
                >
                  <MenuItem value="week">Last week</MenuItem>
                  <MenuItem value="month">Last month</MenuItem>
                  <MenuItem value="year">Last year</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={4}>
            {displayBanner && (
              <Grid item xs={12}>
                <OverviewBanner onDismiss={handleDismissBanner} />
              </Grid>
            )}
            <Grid item md={6} xs={12}>
              <OverviewCryptoWallet />
            </Grid>
            <Grid item md={6} xs={12}>
              <OverviewPrivateWallet />
            </Grid>
            <Grid item md={8} xs={12}>
              <OverviewTotalTransactions />
            </Grid>
            <Grid item md={4} xs={12}>
              <OverviewTotalBalance />
            </Grid>
            <Grid item md={8} xs={12}>
              <OverviewLatestTransactions />
            </Grid>
            <Grid item md={4} xs={12}>
              <OverviewInbox />
            </Grid>
            <Grid item md={6} xs={12}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                    }}
                  >
                    <BriefcaseIcon color="primary" fontSize="small" />
                    <Typography
                      color="primary.main"
                      sx={{ pl: 1 }}
                      variant="subtitle2"
                    >
                      Jobs
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Find your dream job
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button
                    endIcon={<ArrowRightIcon fontSize="small" />}
                    size="small"
                  >
                    {t('Search Jobs')}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ alignItems: 'center', display: 'flex' }}>
                    <InformationCircleOutlinedIcon color="primary" />
                    <Typography
                      color="primary.main"
                      sx={{ pl: 1 }}
                      variant="subtitle2"
                    >
                      {t('Help Center')}
                    </Typography>
                  </Box>
                  <Typography sx={{ mt: 2 }} variant="h6">
                    Need help figuring things out?
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button
                    endIcon={<ExternalLinkIcon fontSize="small" />}
                    size="small"
                  >
                    Help Center
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ alignItems: 'center', display: 'flex' }}>
                    <DownloadIcon color="primary" />
                    <Typography
                      color="primary.main"
                      sx={{ pl: 1 }}
                      variant="subtitle2"
                    >
                      {t('Download')}
                    </Typography>
                  </Box>
                  <Typography sx={{ mt: 2 }} variant="h6">
                    Download our Free PDF and learn how to get more job leads
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button
                    endIcon={<DownloadIcon fontSize="small" />}
                    size="small"
                    variant="outlined"
                  >
                    Download Free PDF
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ alignItems: 'center', display: 'flex' }}>
                    <UsersIcon color="primary" />
                    <Typography
                      color="primary.main"
                      sx={{ pl: 1 }}
                      variant="subtitle2"
                    >
                      {t('Contacts')}
                    </Typography>
                  </Box>
                  <Typography sx={{ mt: 2 }} variant="h6">
                    Contacts allow you to manage your company contracts
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button
                    endIcon={<ArrowRightIcon fontSize="small" />}
                    size="small"
                    variant="outlined"
                  >
                    {t('My Contacts')}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Overview.getLayout = page => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Overview;
