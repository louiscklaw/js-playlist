import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';

import { FloatingActionButtonExtendedSize } from 'src/components/widgets/mui-floating-action-button/floating-action-button-extended-size.js';
import { FloatingActionButtonSize } from 'src/components/widgets/mui-floating-action-button/floating-action-button-size.js';
// import { FloatingActionButtonZoom } from 'src/components/widgets/mui-floating-action-button/floating-action-button-zoom.js';
import { FloatingActionButtons } from 'src/components/widgets/mui-floating-action-button/floating-action-buttons.js';

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
        sx={{ backgroundColor: 'background.paper', flexGrow: 1, py: 8 }}
      >
        <Container maxWidth="lg">
          <WidgetPreviewer
            element={<FloatingActionButtonExtendedSize />}
            name="floating-action-button-extended-size.js"
          />
          <WidgetPreviewer
            element={<FloatingActionButtonSize />}
            name="floating-action-button-size.js"
          />
          {/* <WidgetPreviewer element={<FloatingActionButtonZoom />} name="floating-action-button-zoom.js" /> */}
          <WidgetPreviewer
            element={<FloatingActionButtons />}
            name="floating-action-buttons.js"
          />
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
