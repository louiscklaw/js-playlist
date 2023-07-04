import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';
import { TransitionsSnackbar } from 'src/components/widgets/mui-snackbars/transitions-snackbar';
import { SimpleSnackbar } from 'src/components/widgets/mui-snackbars/simple-snackbar';
import { PositionedSnackbar } from 'src/components/widgets/mui-snackbars/positioned-snackbar';
import { LongTextSnackbar } from 'src/components/widgets/mui-snackbars/long-text-snackbar';
// import { IntegrationNotistack } from 'src/components/widgets/mui-snackbars/integration-notistack';
import { FabIntegrationSnackbar } from 'src/components/widgets/mui-snackbars/fab-integration-snackbar';
import { DirectionSnackbar } from 'src/components/widgets/mui-snackbars/direction-snackbar';
import { CustomizedSnackbars } from 'src/components/widgets/mui-snackbars/customized-snackbars';
import { ConsecutiveSnackbars } from 'src/components/widgets/mui-snackbars/consecutive-snackbars';

const BrowseHelloworld = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>Browse: Buttons | Material Kit Pro</title>
      </Head>
      <Box
        component="main"
        sx={{ backgroundColor: 'background.paper', flexGrow: 1, py: 8, }}
      >
        <Container maxWidth="lg">
          <WidgetPreviewer element={<ConsecutiveSnackbars />} name="consecutive-snackbars.js" />
          <WidgetPreviewer element={<CustomizedSnackbars />} name="customized-snackbars.js" />
          <WidgetPreviewer element={<DirectionSnackbar />} name="direction-snackbar.js" />
          <WidgetPreviewer element={<FabIntegrationSnackbar />} name="fab-integration-snackbar.js" />
          {/* <WidgetPreviewer element={<IntegrationNotistack />} name="integration-notistack.js" /> */}
          <WidgetPreviewer element={<LongTextSnackbar />} name="long-text-snackbar.js" />
          <WidgetPreviewer element={<PositionedSnackbar />} name="positioned-snackbar.js" />
          <WidgetPreviewer element={<SimpleSnackbar />} name="simple-snackbar.js" />
          <WidgetPreviewer element={<TransitionsSnackbar />} name="transitions-snackbar.js" />  

        </Container>
      </Box>
    </>
  );
};

BrowseHelloworld.getLayout = page => (
  <MainLayout>
    <BrowseLayout>{page}</BrowseLayout>
  </MainLayout>
);

export default BrowseHelloworld;
