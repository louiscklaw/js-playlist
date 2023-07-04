import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';
import { TransitionGroupExample } from 'src/components/widgets/mui-transitions/transition-group-example';
import { SlideFromContainer } from 'src/components/widgets/mui-transitions/slide-from-container';
import { SimpleZoom } from 'src/components/widgets/mui-transitions/simple-zoom';
import { SimpleSlide } from 'src/components/widgets/mui-transitions/simple-slide';
import { SimpleGrow } from 'src/components/widgets/mui-transitions/simple-grow';
import { SimpleFade } from 'src/components/widgets/mui-transitions/simple-fade';
import { SimpleCollapse } from 'src/components/widgets/mui-transitions/simple-collapse';

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
            element={<SimpleCollapse />}
            name="simple-collapse.js"
          />
          <WidgetPreviewer element={<SimpleFade />} name="simple-fade.js" />
          <WidgetPreviewer element={<SimpleGrow />} name="simple-grow.js" />
          <WidgetPreviewer element={<SimpleSlide />} name="simple-slide.js" />
          <WidgetPreviewer element={<SimpleZoom />} name="simple-zoom.js" />
          <WidgetPreviewer
            element={<SlideFromContainer />}
            name="slide-from-container.js"
          />
          <WidgetPreviewer
            element={<TransitionGroupExample />}
            name="transition-group-example.js"
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
