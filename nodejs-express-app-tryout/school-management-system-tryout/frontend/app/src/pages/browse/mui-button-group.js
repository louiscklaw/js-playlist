import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';

import { BasicButtonGroup } from 'src/components/widgets/mui-button-group/basic-button-group.js';
import { DisableElevation } from 'src/components/widgets/mui-button-group/disable-elevation.js';
import { GroupOrientation } from 'src/components/widgets/mui-button-group/group-orientation.js';
import { GroupSizesColors } from 'src/components/widgets/mui-button-group/group-sizes-colors.js';
import { SplitButton } from 'src/components/widgets/mui-button-group/split-button.js';
import { VariantButtonGroup } from 'src/components/widgets/mui-button-group/variant-button-group.js';

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
            element={<BasicButtonGroup />}
            name="basic-button-group.js"
          />
          <WidgetPreviewer
            element={<DisableElevation />}
            name="disable-elevation.js"
          />
          <WidgetPreviewer
            element={<GroupOrientation />}
            name="group-orientation.js"
          />
          <WidgetPreviewer
            element={<GroupSizesColors />}
            name="group-sizes-colors.js"
          />
          <WidgetPreviewer element={<SplitButton />} name="split-button.js" />
          <WidgetPreviewer
            element={<VariantButtonGroup />}
            name="variant-button-group.js"
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
