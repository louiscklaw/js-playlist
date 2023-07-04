import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';

import { CustomImageList } from 'src/components/widgets/mui-image-list/custom-image-list.js';
import { MasonryImageList } from 'src/components/widgets/mui-image-list/masonry-image-list.js';
import { QuiltedImageList } from 'src/components/widgets/mui-image-list/quilted-image-list.js';
import { StandardImageList } from 'src/components/widgets/mui-image-list/standard-image-list.js';
import { TitlebarBelowImageList } from 'src/components/widgets/mui-image-list/titlebar-below-image-list.js';
import { TitlebarBelowMasonryImageList } from 'src/components/widgets/mui-image-list/titlebar-below-masonry-image-list.js';
import { TitlebarImageList } from 'src/components/widgets/mui-image-list/titlebar-image-list.js';
import { WovenImageList } from 'src/components/widgets/mui-image-list/woven-image-list.js';
// import { tslinton } from 'src/components/widgets/mui-image-list/tslint.json';

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
            element={<CustomImageList />}
            name="custom-image-list.js"
          />
          <WidgetPreviewer
            element={<MasonryImageList />}
            name="masonry-image-list.js"
          />
          <WidgetPreviewer
            element={<QuiltedImageList />}
            name="quilted-image-list.js"
          />
          <WidgetPreviewer
            element={<StandardImageList />}
            name="standard-image-list.js"
          />
          <WidgetPreviewer
            element={<TitlebarBelowImageList />}
            name="titlebar-below-image-list.js"
          />
          <WidgetPreviewer
            element={<TitlebarBelowMasonryImageList />}
            name="titlebar-below-masonry-image-list.js"
          />
          <WidgetPreviewer
            element={<TitlebarImageList />}
            name="titlebar-image-list.js"
          />
          <WidgetPreviewer
            element={<WovenImageList />}
            name="woven-image-list.js"
          />
          {/* <WidgetPreviewer element={<tslinton />} name="tslint.json" /> */}
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
