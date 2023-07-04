import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';

// import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars.js';
import { BadgeAvatars } from 'src/components/widgets/mui-avatars/badge-avatars.js';
import { FallbackAvatars } from 'src/components/widgets/mui-avatars/fallback-avatars.js';
import { GroupAvatars } from 'src/components/widgets/mui-avatars/group-avatars.js';
import { IconAvatars } from 'src/components/widgets/mui-avatars/icon-avatars.js';
import { ImageAvatars } from 'src/components/widgets/mui-avatars/image-avatars.js';
import { LetterAvatars } from 'src/components/widgets/mui-avatars/letter-avatars.js';
// import { SizeAvatars } from 'src/components/widgets/mui-avatars/size-avatars.js';
import { TotalAvatars } from 'src/components/widgets/mui-avatars/total-avatars.js';
import { VariantAvatars } from 'src/components/widgets/mui-avatars/variant-avatars.js';

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
          {/* <WidgetPreviewer element={<BackgroundLetterAvatars />} name="background-letter-avatars.js" /> */}
          <WidgetPreviewer element={<BadgeAvatars />} name="badge-avatars.js" />
          <WidgetPreviewer element={<FallbackAvatars />} name="fallback-avatars.js" />
          <WidgetPreviewer element={<GroupAvatars />} name="group-avatars.js" />
          <WidgetPreviewer element={<IconAvatars />} name="icon-avatars.js" />
          <WidgetPreviewer element={<ImageAvatars />} name="image-avatars.js" />
          <WidgetPreviewer element={<LetterAvatars />} name="letter-avatars.js" />
          {/* <WidgetPreviewer element={<SizeAvatars />} name="size-avatars.js" /> */}
          <WidgetPreviewer element={<TotalAvatars />} name="total-avatars.js" />
          <WidgetPreviewer element={<VariantAvatars />} name="variant-avatars.js" />

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
