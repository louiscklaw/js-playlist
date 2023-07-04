import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';

import { CircularColor } from 'src/components/widgets/mui-progress/circular-color.js';
import { CircularDeterminate } from 'src/components/widgets/mui-progress/circular-determinate.js';
import { CircularIndeterminate } from 'src/components/widgets/mui-progress/circular-indeterminate.js';
import { CircularIntegration } from 'src/components/widgets/mui-progress/circular-integration.js';
import { CircularUnderLoad } from 'src/components/widgets/mui-progress/circular-under-load.js';
import { CircularWithValueLabel } from 'src/components/widgets/mui-progress/circular-with-value-label.js';
import { CustomizedProgressBars } from 'src/components/widgets/mui-progress/customized-progress-bars.js';
import { DelayingAppearance } from 'src/components/widgets/mui-progress/delaying-appearance.js';
import { LinearBuffer } from 'src/components/widgets/mui-progress/linear-buffer.js';
import { LinearColor } from 'src/components/widgets/mui-progress/linear-color.js';
import { LinearDeterminate } from 'src/components/widgets/mui-progress/linear-determinate.js';
import { LinearIndeterminate } from 'src/components/widgets/mui-progress/linear-indeterminate.js';
import { LinearWithValueLabel } from 'src/components/widgets/mui-progress/linear-with-value-label.js';

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
            element={<CircularColor />}
            name="circular-color.js"
          />
          <WidgetPreviewer
            element={<CircularDeterminate />}
            name="circular-determinate.js"
          />
          <WidgetPreviewer
            element={<CircularIndeterminate />}
            name="circular-indeterminate.js"
          />
          <WidgetPreviewer
            element={<CircularIntegration />}
            name="circular-integration.js"
          />
          <WidgetPreviewer
            element={<CircularUnderLoad />}
            name="circular-under-load.js"
          />
          {/* <WidgetPreviewer element={<CircularWithValueLabel />} name="circular-with-value-label.js" /> */}
          <WidgetPreviewer
            element={<CustomizedProgressBars />}
            name="customized-progress-bars.js"
          />
          <WidgetPreviewer
            element={<DelayingAppearance />}
            name="delaying-appearance.js"
          />
          <WidgetPreviewer element={<LinearBuffer />} name="linear-buffer.js" />
          <WidgetPreviewer element={<LinearColor />} name="linear-color.js" />
          <WidgetPreviewer
            element={<LinearDeterminate />}
            name="linear-determinate.js"
          />
          <WidgetPreviewer
            element={<LinearIndeterminate />}
            name="linear-indeterminate.js"
          />
          <WidgetPreviewer
            element={<LinearWithValueLabel />}
            name="linear-with-value-label.js"
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
