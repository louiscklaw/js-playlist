import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';

import { BasicMasonry } from 'src/components/widgets/mui-masonry/basic-masonry.js';
import { FixedColumns } from 'src/components/widgets/mui-masonry/fixed-columns.js';
import { FixedSpacing } from 'src/components/widgets/mui-masonry/fixed-spacing.js';
import { ImageMasonry } from 'src/components/widgets/mui-masonry/image-masonry.js';
import { MasonryWithVariableHeightItems } from 'src/components/widgets/mui-masonry/masonry-with-variable-height-items.js';
import { ResponsiveColumns } from 'src/components/widgets/mui-masonry/responsive-columns.js';
import { ResponsiveSpacing } from 'src/components/widgets/mui-masonry/responsive-spacing.js';
import { SSRMasonry } from 'src/components/widgets/mui-masonry/ssrmasonry.js';

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
          <WidgetPreviewer element={<BasicMasonry />} name="basic-masonry.js" />
          <WidgetPreviewer element={<FixedColumns />} name="fixed-columns.js" />
          <WidgetPreviewer element={<FixedSpacing />} name="fixed-spacing.js" />
          <WidgetPreviewer element={<ImageMasonry />} name="image-masonry.js" />
          <WidgetPreviewer
            element={<MasonryWithVariableHeightItems />}
            name="masonry-with-variable-height-items.js"
          />
          <WidgetPreviewer
            element={<ResponsiveColumns />}
            name="responsive-columns.js"
          />
          <WidgetPreviewer
            element={<ResponsiveSpacing />}
            name="responsive-spacing.js"
          />
          <WidgetPreviewer element={<SSRMasonry />} name="ssrmasonry.js" />
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
