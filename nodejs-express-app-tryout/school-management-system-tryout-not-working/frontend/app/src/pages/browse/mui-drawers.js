import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';


import { ClippedDrawer } from 'src/components/widgets/mui-drawers/clipped-drawer.js';
import { MiniDrawer } from 'src/components/widgets/mui-drawers/mini-drawer.js';
import { PermanentDrawerLeft } from 'src/components/widgets/mui-drawers/permanent-drawer-left.js';
import { PermanentDrawerRight } from 'src/components/widgets/mui-drawers/permanent-drawer-right.js';
import { PersistentDrawerLeft } from 'src/components/widgets/mui-drawers/persistent-drawer-left.js';
import { PersistentDrawerRight } from 'src/components/widgets/mui-drawers/persistent-drawer-right.js';
// import { ResponsiveDrawer } from 'src/components/widgets/mui-drawers/responsive-drawer.js';
// import { SwipeableEdgeDrawer } from 'src/components/widgets/mui-drawers/swipeable-edge-drawer.js';
import { SwipeableTemporaryDrawer } from 'src/components/widgets/mui-drawers/swipeable-temporary-drawer.js';
import { TemporaryDrawer } from 'src/components/widgets/mui-drawers/temporary-drawer.js';




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
          <WidgetPreviewer element={<ClippedDrawer />} name="clipped-drawer.js" />
          <WidgetPreviewer element={<MiniDrawer />} name="mini-drawer.js" />
          <WidgetPreviewer element={<PermanentDrawerLeft />} name="permanent-drawer-left.js" />
          <WidgetPreviewer element={<PermanentDrawerRight />} name="permanent-drawer-right.js" />
          <WidgetPreviewer element={<PersistentDrawerLeft />} name="persistent-drawer-left.js" />
          <WidgetPreviewer element={<PersistentDrawerRight />} name="persistent-drawer-right.js" />
          {/* <WidgetPreviewer element={<ResponsiveDrawer />} name="responsive-drawer.js" /> */}
          {/* <WidgetPreviewer element={<SwipeableEdgeDrawer />} name="swipeable-edge-drawer.js" /> */}
          <WidgetPreviewer element={<SwipeableTemporaryDrawer />} name="swipeable-temporary-drawer.js" />
          <WidgetPreviewer element={<TemporaryDrawer />} name="temporary-drawer.js" />
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
