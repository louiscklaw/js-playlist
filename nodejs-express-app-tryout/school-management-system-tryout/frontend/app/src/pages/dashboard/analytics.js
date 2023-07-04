import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import Head from 'next/head';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthGuard } from 'src/components/authentication/auth-guard';
import { AnalyticsGeneralOverview } from 'src/components/dashboard/analytics/analytics-general-overview';
import { AnalyticsMostVisited } from 'src/components/dashboard/analytics/analytics-most-visited';
import { AnalyticsSocialSources } from 'src/components/dashboard/analytics/analytics-social-sources';
import { AnalyticsTrafficSources } from 'src/components/dashboard/analytics/analytics-traffic-sources';
import { AnalyticsVisitsByCountry } from 'src/components/dashboard/analytics/analytics-visits-by-country';
import { DashboardLayout } from 'src/components/dashboard/dashboard-layout';
import { Reports as ReportsIcon } from 'src/icons/reports';
import { gtm } from 'src/lib/gtm';

const Analytics = () => {
  const { t } = useTranslation();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard: Analytics | Material Kit Pro</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">{t('Analytics')}</Typography>
              </Grid>
              <Grid item sx={{ alignItems: 'center', display: 'flex', m: -1 }}>
                <Button
                  startIcon={<ReportsIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="outlined"
                >
                  {t('Reports')}
                </Button>
                <TextField
                  defaultValue="week"
                  label="Period"
                  select
                  size="small"
                  sx={{ m: 1 }}
                >
                  <MenuItem value="week">{t('Last week')}</MenuItem>
                  <MenuItem value="month">{t('Last month')}</MenuItem>
                  <MenuItem value="year">{t('Last year')}</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Box>

          <AnalyticsGeneralOverview />

          <Box sx={{ mt: 4 }}>
            <Grid container spacing={4}>
              <Grid item md={8} xs={12}>
                <AnalyticsTrafficSources sx={{ height: '100%' }} />
              </Grid>
              <Grid item md={4} xs={12}>
                <AnalyticsVisitsByCountry />
              </Grid>
              <Grid item md={8} xs={12}>
                <AnalyticsMostVisited />
              </Grid>
              <Grid item md={4} xs={12}>
                <AnalyticsSocialSources />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

Analytics.getLayout = page => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Analytics;
