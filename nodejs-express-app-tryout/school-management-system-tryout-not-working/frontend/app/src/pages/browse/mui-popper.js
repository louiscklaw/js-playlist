import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';


// import { PopperPopupState } from 'src/components/widgets/mui-popper/popper-popup-state.js';
import { PositionedPopper } from 'src/components/widgets/mui-popper/positioned-popper.js';
// import { ScrollPlayground } from 'src/components/widgets/mui-popper/scroll-playground.js';
import { SimplePopper } from 'src/components/widgets/mui-popper/simple-popper.js';
// import { SpringPopper } from 'src/components/widgets/mui-popper/spring-popper.js';
import { TransitionsPopper } from 'src/components/widgets/mui-popper/transitions-popper.js';
import { VirtualElementPopper } from 'src/components/widgets/mui-popper/virtual-element-popper.js';




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
          {/* <WidgetPreviewer element={<PopperPopupState />} name="popper-popup-state.js" /> */}
          <WidgetPreviewer element={<PositionedPopper />} name="positioned-popper.js" />
          {/* <WidgetPreviewer element={<ScrollPlayground />} name="scroll-playground.js" /> */}
          <WidgetPreviewer element={<SimplePopper />} name="simple-popper.js" />
          {/* <WidgetPreviewer element={<SpringPopper />} name="spring-popper.js" /> */}
          <WidgetPreviewer element={<TransitionsPopper />} name="transitions-popper.js" />
          <WidgetPreviewer element={<VirtualElementPopper />} name="virtual-element-popper.js" />
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
