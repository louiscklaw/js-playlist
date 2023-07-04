import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';

import { BasicRating } from 'src/components/widgets/mui-rating/basic-rating.js';
import { CustomizedRating } from 'src/components/widgets/mui-rating/customized-rating.js';
import { HalfRating } from 'src/components/widgets/mui-rating/half-rating.js';
import { HoverRating } from 'src/components/widgets/mui-rating/hover-rating.js';
import { RadioGroupRating } from 'src/components/widgets/mui-rating/radio-group-rating.js';
import { RatingSize } from 'src/components/widgets/mui-rating/rating-size.js';
import { TextRating } from 'src/components/widgets/mui-rating/text-rating.js';

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
          <WidgetPreviewer element={<BasicRating />} name="basic-rating.js" />
          <WidgetPreviewer
            element={<CustomizedRating />}
            name="customized-rating.js"
          />
          <WidgetPreviewer element={<HalfRating />} name="half-rating.js" />
          <WidgetPreviewer element={<HoverRating />} name="hover-rating.js" />
          <WidgetPreviewer
            element={<RadioGroupRating />}
            name="radio-group-rating.js"
          />
          {/* <WidgetPreviewer element={<RatingSize />} name="rating-size.js" /> */}
          <WidgetPreviewer element={<TextRating />} name="text-rating.js" />
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
