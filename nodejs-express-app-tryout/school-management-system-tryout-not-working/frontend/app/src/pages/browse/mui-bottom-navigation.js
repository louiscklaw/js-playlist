import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';


import { FixedBottomNavigation } from 'src/components/widgets/mui-bottom-navigation/fixed-bottom-navigation.js';
import { LabelBottomNavigation } from 'src/components/widgets/mui-bottom-navigation/label-bottom-navigation.js';
import { SimpleBottomNavigation } from 'src/components/widgets/mui-bottom-navigation/simple-bottom-navigation.js';




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
          <WidgetPreviewer element={<FixedBottomNavigation />} name="fixed-bottom-navigation.js" />
          <WidgetPreviewer element={<LabelBottomNavigation />} name="label-bottom-navigation.js" />
          <WidgetPreviewer element={<SimpleBottomNavigation />} name="simple-bottom-navigation.js" />
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
