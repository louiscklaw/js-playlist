import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';
import { SpeedDialTooltipOpen } from 'src/components/widgets/mui-speed-dial/speed-dial-tooltip-open';
import { PlaygroundSpeedDial } from 'src/components/widgets/mui-speed-dial/playground-speed-dial';
import { OpenIconSpeedDial } from 'src/components/widgets/mui-speed-dial/open-icon-speed-dial';
import { ControlledOpenSpeedDial } from 'src/components/widgets/mui-speed-dial/controlled-open-speed-dial';
import { BasicSpeedDial } from 'src/components/widgets/mui-speed-dial/basic-speed-dial';

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
          <WidgetPreviewer element={<BasicSpeedDial />} name="basic-speed-dial.js" />
          <WidgetPreviewer element={<ControlledOpenSpeedDial />} name="controlled-open-speed-dial.js" />
          <WidgetPreviewer element={<OpenIconSpeedDial />} name="open-icon-speed-dial.js" />
          <WidgetPreviewer element={<PlaygroundSpeedDial />} name="playground-speed-dial.js" />
          <WidgetPreviewer element={<SpeedDialTooltipOpen />} name="speed-dial-tooltip-open.js" />

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
