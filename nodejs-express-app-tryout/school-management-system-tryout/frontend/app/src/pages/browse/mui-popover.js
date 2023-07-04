import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';

// import { AnchorPlayground } from 'src/components/widgets/mui-popover/anchor-playground.js';
import { BasicPopover } from 'src/components/widgets/mui-popover/basic-popover.js';
import { MouseOverPopover } from 'src/components/widgets/mui-popover/mouse-over-popover.js';
// import { PopoverPopupState } from 'src/components/widgets/mui-popover/popover-popup-state.js';
import { VirtualElementPopover } from 'src/components/widgets/mui-popover/virtual-element-popover.js';

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
            {/* <WidgetPreviewer element={<AnchorPlayground />} name="anchor-playground.js" /> */}
            <WidgetPreviewer
              element={<BasicPopover />}
              name="basic-popover.js"
            />
            <WidgetPreviewer
              element={<MouseOverPopover />}
              name="mouse-over-popover.js"
            />
            {/* <WidgetPreviewer element={<PopoverPopupState />} name="popover-popup-state.js" /> */}
            <WidgetPreviewer
              element={<VirtualElementPopover />}
              name="virtual-element-popover.js"
            />
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
