import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';


import { BasicSwitches } from 'src/components/widgets/mui-switches/basic-switches.js';
import { ColorSwitches } from 'src/components/widgets/mui-switches/color-switches.js';
import { ControlledSwitches } from 'src/components/widgets/mui-switches/controlled-switches.js';
import { CustomizedSwitches } from 'src/components/widgets/mui-switches/customized-switches.js';
import { FormControlLabelPosition } from 'src/components/widgets/mui-switches/form-control-label-position.js';
import { SwitchLabels } from 'src/components/widgets/mui-switches/switch-labels.js';
import { SwitchesGroup } from 'src/components/widgets/mui-switches/switches-group.js';
import { SwitchesSize } from 'src/components/widgets/mui-switches/switches-size.js';




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
          <WidgetPreviewer element={<BasicSwitches />} name="basic-switches.js" />
          <WidgetPreviewer element={<ColorSwitches />} name="color-switches.js" />
          <WidgetPreviewer element={<ControlledSwitches />} name="controlled-switches.js" />
          <WidgetPreviewer element={<CustomizedSwitches />} name="customized-switches.js" />
          <WidgetPreviewer element={<FormControlLabelPosition />} name="form-control-label-position.js" />
          <WidgetPreviewer element={<SwitchLabels />} name="switch-labels.js" />
          <WidgetPreviewer element={<SwitchesGroup />} name="switches-group.js" />
          <WidgetPreviewer element={<SwitchesSize />} name="switches-size.js" />
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
