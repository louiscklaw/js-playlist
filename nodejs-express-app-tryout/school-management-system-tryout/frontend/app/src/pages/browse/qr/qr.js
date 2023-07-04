import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';

import { BrowseLayout } from 'src/components/browse-layout';
import { MainLayout } from 'src/components/main-layout';
import { WidgetPreviewer } from 'src/components/widget-previewer';

import Qr from 'src/components/widgets/qr';
import { gtm } from 'src/lib/gtm';

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
          <WidgetPreviewer element={<Qr />} name="qr.js" />
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
