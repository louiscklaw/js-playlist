import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';

import { BasicStack } from 'src/components/widgets/mui-stack/basic-stack.js';
import { DirectionStack } from 'src/components/widgets/mui-stack/direction-stack.js';
import { DividerStack } from 'src/components/widgets/mui-stack/divider-stack.js';
import { FlexboxGapStack } from 'src/components/widgets/mui-stack/flexbox-gap-stack.js';
// import { InteractiveStack } from 'src/components/widgets/mui-stack/interactive-stack.js';
import { ResponsiveStack } from 'src/components/widgets/mui-stack/responsive-stack.js';
import { ZeroWidthStack } from 'src/components/widgets/mui-stack/zero-width-stack.js';

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
          <WidgetPreviewer element={<BasicStack />} name="basic-stack.js" />
          <WidgetPreviewer
            element={<DirectionStack />}
            name="direction-stack.js"
          />
          <WidgetPreviewer element={<DividerStack />} name="divider-stack.js" />
          <WidgetPreviewer
            element={<FlexboxGapStack />}
            name="flexbox-gap-stack.js"
          />
          {/* <WidgetPreviewer element={<InteractiveStack />} name="interactive-stack.js" /> */}
          <WidgetPreviewer
            element={<ResponsiveStack />}
            name="responsive-stack.js"
          />
          <WidgetPreviewer
            element={<ZeroWidthStack />}
            name="zero-width-stack.js"
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
