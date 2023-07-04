import { useEffect } from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { gtm } from '../../lib/gtm';

import { BasicCard } from 'src/components/widgets/mui-cards/basic-card';
import { MediaCard } from 'src/components/widgets/mui-cards/media-card';
import { ActionAreaCard } from 'src/components/widgets/mui-cards/action-area-card';
import { RecipeReviewCard } from 'src/components/widgets/mui-cards/recipe-review-card';
import { OutlinedCard } from 'src/components/widgets/mui-cards/outlined-card';
import { MultiActionAreaCard } from 'src/components/widgets/mui-cards/multi-action-area-card';
import { MediaControlCard } from 'src/components/widgets/mui-cards/media-control-card';
import { ImgMediaCard } from 'src/components/widgets/mui-cards/img-media-card';

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
        sx={{
          backgroundColor: 'background.paper',
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <WidgetPreviewer element={<ImgMediaCard />} name="ImgMediaCard.js" />
          <WidgetPreviewer element={<MediaCard />} name="MediaCard.js" />
          <WidgetPreviewer
            element={<MediaControlCard />}
            name="MediaControlCard.js"
          />
          <WidgetPreviewer
            element={<MultiActionAreaCard />}
            name="MultiActionAreaCard.js"
          />
          <WidgetPreviewer element={<OutlinedCard />} name="OutlinedCard.js" />
          <WidgetPreviewer
            element={<RecipeReviewCard />}
            name="RecipeReviewCard.js"
          />
          <WidgetPreviewer
            element={<ActionAreaCard />}
            name="ActionAreaCard.js"
          />
          <WidgetPreviewer element={<BasicCard />} name="BasicCard" />
          <WidgetPreviewer element={<MediaCard />} name="MediaCard" />
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
