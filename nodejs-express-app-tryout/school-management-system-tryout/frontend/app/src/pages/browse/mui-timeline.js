import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { AlternateReverseTimeline } from 'src/components/widgets/mui-timeline/alternate-reverse-timeline';
import { AlternateTimeline } from 'src/components/widgets/mui-timeline/alternate-timeline';
import { BasicTimeline } from 'src/components/widgets/mui-timeline/basic-timeline';
import { ColorsTimeline } from 'src/components/widgets/mui-timeline/colors-timeline';
import { CustomizedTimeline } from 'src/components/widgets/mui-timeline/customized-timeline';
import { OppositeContentTimeline } from 'src/components/widgets/mui-timeline/opposite-content-timeline';
import { OutlinedTimeline } from 'src/components/widgets/mui-timeline/outlined-timeline';
import { gtm } from '../../lib/gtm';

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
            element={<AlternateReverseTimeline />}
            name="alternate-reverse-timeline.js"
          />
          <WidgetPreviewer
            element={<AlternateTimeline />}
            name="alternate-timeline.js"
          />
          <WidgetPreviewer
            element={<BasicTimeline />}
            name="basic-timeline.js"
          />
          <WidgetPreviewer
            element={<ColorsTimeline />}
            name="colors-timeline.js"
          />
          <WidgetPreviewer
            element={<CustomizedTimeline />}
            name="customized-timeline.js"
          />
          {/* <WidgetPreviewer element={<LeftAlignedTimeline />} name="left-aligned-timeline.js" /> */}
          {/* <WidgetPreviewer element={<LeftPositionedTimeline />} name="left-positioned-timeline.js" /> */}
          {/* <WidgetPreviewer element={<NoOppositeContent />} name="no-opposite-content.js" /> */}
          <WidgetPreviewer
            element={<OppositeContentTimeline />}
            name="opposite-content-timeline.js"
          />
          <WidgetPreviewer
            element={<OutlinedTimeline />}
            name="outlined-timeline.js"
          />
          {/* <WidgetPreviewer element={<RightAlignedTimeline />} name="right-aligned-timeline.js" /> */}
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
