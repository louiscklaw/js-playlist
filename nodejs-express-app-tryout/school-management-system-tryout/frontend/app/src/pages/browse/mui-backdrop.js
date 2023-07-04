import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { SimpleBackdrop } from 'src/components/widgets/mui-backdrop/simple-backdrop';
import { gtm } from '../../lib/gtm';

const BrowseButtons = () => {
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
            element={<SimpleBackdrop />}
            name="background-letter-avatars.js"
          />
        </Container>
      </Box>
    </>
  );
};

BrowseButtons.getLayout = page => (
  <MainLayout>
    <BrowseLayout>{page}</BrowseLayout>
  </MainLayout>
);

export default BrowseButtons;
