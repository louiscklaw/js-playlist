import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';

// import { Animations } from 'src/components/widgets/mui-skeleton/animations.js';
// import { Facebook } from 'src/components/widgets/mui-skeleton/facebook.js';
// import { SkeletonChildren } from 'src/components/widgets/mui-skeleton/skeleton-children.js';
// import { SkeletonColor } from 'src/components/widgets/mui-skeleton/skeleton-color.js';
// import { SkeletonTypography } from 'src/components/widgets/mui-skeleton/skeleton-typography.js';
// import { Variants } from 'src/components/widgets/mui-skeleton/variants.js';
// import { YouTube } from 'src/components/widgets/mui-skeleton/you-tube.js';

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
            element={<BackgroundLetterAvatars />}
            name="background-letter-avatars.js"
          />
          <div>
            {/* <WidgetPreviewer element={<Animations />} name="animations.js" /> */}
            {/* <WidgetPreviewer element={<Facebook />} name="facebook.js" /> */}
            {/* <WidgetPreviewer element={<SkeletonChildren />} name="skeleton-children.js" /> */}
            {/* <WidgetPreviewer element={<SkeletonColor />} name="skeleton-color.js" /> */}
            {/* <WidgetPreviewer element={<SkeletonTypography />} name="skeleton-typography.js" /> */}
            {/* <WidgetPreviewer element={<Variants />} name="variants.js" /> */}
            {/* <WidgetPreviewer element={<YouTube />} name="you-tube.js" /> */}
          </div>
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
