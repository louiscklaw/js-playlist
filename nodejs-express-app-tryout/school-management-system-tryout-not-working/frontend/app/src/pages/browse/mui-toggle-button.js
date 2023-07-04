import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { ColorToggleButton } from 'src/components/widgets/mui-toggle-button/color-toggle-button';
import { CustomizedDividers } from 'src/components/widgets/mui-toggle-button/customized-dividers';
import { StandaloneToggleButton } from 'src/components/widgets/mui-toggle-button/standalone-toggle-button';
import { ToggleButtonNotEmpty } from 'src/components/widgets/mui-toggle-button/toggle-button-not-empty';
import { ToggleButtonSizes } from 'src/components/widgets/mui-toggle-button/toggle-button-sizes';
import { ToggleButtons } from 'src/components/widgets/mui-toggle-button/toggle-buttons';
import { ToggleButtonsMultiple } from 'src/components/widgets/mui-toggle-button/toggle-buttons-multiple';
import { VerticalToggleButtons } from 'src/components/widgets/mui-toggle-button/vertical-toggle-buttons';
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
        sx={{ backgroundColor: 'background.paper', flexGrow: 1, py: 8, }}
      >
        <Container maxWidth="lg">
          <WidgetPreviewer element={<ColorToggleButton />} name="color-toggle-button.js" />
          <WidgetPreviewer element={<CustomizedDividers />} name="customized-dividers.js" />
          <WidgetPreviewer element={<StandaloneToggleButton />} name="standalone-toggle-button.js" />
          <WidgetPreviewer element={<ToggleButtonNotEmpty />} name="toggle-button-not-empty.js" />
          <WidgetPreviewer element={<ToggleButtonSizes />} name="toggle-button-sizes.js" />
          <WidgetPreviewer element={<ToggleButtons />} name="toggle-buttons.js" />
          <WidgetPreviewer element={<ToggleButtonsMultiple />} name="toggle-buttons-multiple.js" />
          <WidgetPreviewer element={<VerticalToggleButtons />} name="vertical-toggle-buttons.js" />

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
