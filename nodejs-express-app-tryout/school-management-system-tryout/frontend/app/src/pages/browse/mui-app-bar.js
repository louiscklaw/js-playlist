import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';

import { BackToTop } from 'src/components/widgets/mui-app-bar/back-to-top.js';
import { BottomAppBar } from 'src/components/widgets/mui-app-bar/bottom-app-bar.js';
import { ButtonAppBar } from 'src/components/widgets/mui-app-bar/button-app-bar.js';
import { DenseAppBar } from 'src/components/widgets/mui-app-bar/dense-app-bar.js';
// import { DrawerAppBar } from 'src/components/widgets/mui-app-bar/drawer-app-bar.js';
import { ElevateAppBar } from 'src/components/widgets/mui-app-bar/elevate-app-bar.js';
import { EnableColorOnDarkAppBar } from 'src/components/widgets/mui-app-bar/enable-color-on-dark-app-bar.js';
import { HideAppBar } from 'src/components/widgets/mui-app-bar/hide-app-bar.js';
import { MenuAppBar } from 'src/components/widgets/mui-app-bar/menu-app-bar.js';
import { PrimarySearchAppBar } from 'src/components/widgets/mui-app-bar/primary-search-app-bar.js';
import { ProminentAppBar } from 'src/components/widgets/mui-app-bar/prominent-app-bar.js';
// import { ResponsiveAppBar } from 'src/components/widgets/mui-app-bar/responsive-app-bar.js';
import { SearchAppBar } from 'src/components/widgets/mui-app-bar/search-app-bar.js';

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
          <WidgetPreviewer element={<BackToTop />} name="back-to-top.js" />
          <WidgetPreviewer
            element={<BottomAppBar />}
            name="bottom-app-bar.js"
          />
          <WidgetPreviewer
            element={<ButtonAppBar />}
            name="button-app-bar.js"
          />
          <WidgetPreviewer element={<DenseAppBar />} name="dense-app-bar.js" />
          {/* <WidgetPreviewer element={<DrawerAppBar />} name="drawer-app-bar.js" /> */}
          <WidgetPreviewer
            element={<ElevateAppBar />}
            name="elevate-app-bar.js"
          />
          <WidgetPreviewer
            element={<EnableColorOnDarkAppBar />}
            name="enable-color-on-dark-app-bar.js"
          />
          <WidgetPreviewer element={<HideAppBar />} name="hide-app-bar.js" />
          <WidgetPreviewer element={<MenuAppBar />} name="menu-app-bar.js" />
          <WidgetPreviewer
            element={<PrimarySearchAppBar />}
            name="primary-search-app-bar.js"
          />
          <WidgetPreviewer
            element={<ProminentAppBar />}
            name="prominent-app-bar.js"
          />
          {/* <WidgetPreviewer element={<ResponsiveAppBar />} name="responsive-app-bar.js" /> */}
          <WidgetPreviewer
            element={<SearchAppBar />}
            name="search-app-bar.js"
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
