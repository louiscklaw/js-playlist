import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';

import { BasicModal } from 'src/components/widgets/mui-modal/basic-modal.js';
import { KeepMountedModal } from 'src/components/widgets/mui-modal/keep-mounted-modal.js';
import { NestedModal } from 'src/components/widgets/mui-modal/nested-modal.js';
import { ServerModal } from 'src/components/widgets/mui-modal/server-modal.js';
// import { SpringModal } from 'src/components/widgets/mui-modal/spring-modal.js';
import { TransitionsModal } from 'src/components/widgets/mui-modal/transitions-modal.js';

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
          <WidgetPreviewer element={<BasicModal />} name="basic-modal.js" />
          <WidgetPreviewer
            element={<KeepMountedModal />}
            name="keep-mounted-modal.js"
          />
          <WidgetPreviewer element={<NestedModal />} name="nested-modal.js" />
          <WidgetPreviewer element={<ServerModal />} name="server-modal.js" />
          {/* <WidgetPreviewer element={<SpringModal />} name="spring-modal.js" /> */}
          <WidgetPreviewer
            element={<TransitionsModal />}
            name="transitions-modal.js"
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
