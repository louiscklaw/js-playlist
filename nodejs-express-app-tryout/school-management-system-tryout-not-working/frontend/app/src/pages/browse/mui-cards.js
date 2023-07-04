import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';


import { ActionAreaCard } from 'src/components/widgets/mui-cards/action-area-card.js';
import { ImgMediaCard } from 'src/components/widgets/mui-cards/img-media-card.js';
import { MediaCard } from 'src/components/widgets/mui-cards/media-card.js';
import { MediaControlCard } from 'src/components/widgets/mui-cards/media-control-card.js';
import { MultiActionAreaCard } from 'src/components/widgets/mui-cards/multi-action-area-card.js';
import { OutlinedCard } from 'src/components/widgets/mui-cards/outlined-card.js';
import { RecipeReviewCard } from 'src/components/widgets/mui-cards/recipe-review-card.js';
// import { basic-card } from 'src/components/widgets/mui-cards/basic-card.js';




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
          <WidgetPreviewer element={<ActionAreaCard />} name="action-area-card.js" />
          <WidgetPreviewer element={<ImgMediaCard />} name="img-media-card.js" />
          <WidgetPreviewer element={<MediaCard />} name="media-card.js" />
          <WidgetPreviewer element={<MediaControlCard />} name="media-control-card.js" />
          <WidgetPreviewer element={<MultiActionAreaCard />} name="multi-action-area-card.js" />
          <WidgetPreviewer element={<OutlinedCard />} name="outlined-card.js" />
          <WidgetPreviewer element={<RecipeReviewCard />} name="recipe-review-card.js" />
          {/* <WidgetPreviewer element={<basic-card />} name="basic-card.js" /> */}
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
