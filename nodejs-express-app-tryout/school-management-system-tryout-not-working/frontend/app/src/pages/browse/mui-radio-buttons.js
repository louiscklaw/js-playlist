import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';


import { ColorRadioButtons } from 'src/components/widgets/mui-radio-buttons/color-radio-buttons.js';
import { ControlledRadioButtonsGroup } from 'src/components/widgets/mui-radio-buttons/controlled-radio-buttons-group.js';
import { CustomizedRadios } from 'src/components/widgets/mui-radio-buttons/customized-radios.js';
import { ErrorRadios } from 'src/components/widgets/mui-radio-buttons/error-radios.js';
import { FormControlLabelPlacement } from 'src/components/widgets/mui-radio-buttons/form-control-label-placement.js';
import { RadioButtons } from 'src/components/widgets/mui-radio-buttons/radio-buttons.js';
import { RadioButtonsGroup } from 'src/components/widgets/mui-radio-buttons/radio-buttons-group.js';
import { RowRadioButtonsGroup } from 'src/components/widgets/mui-radio-buttons/row-radio-buttons-group.js';
import { SizeRadioButtons } from 'src/components/widgets/mui-radio-buttons/size-radio-buttons.js';
import { UseRadioGroup } from 'src/components/widgets/mui-radio-buttons/use-radio-group.js';


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
          <WidgetPreviewer element={<ColorRadioButtons />} name="color-radio-buttons.js" />
          <WidgetPreviewer element={<ControlledRadioButtonsGroup />} name="controlled-radio-buttons-group.js" />
          <WidgetPreviewer element={<CustomizedRadios />} name="customized-radios.js" />
          <WidgetPreviewer element={<ErrorRadios />} name="error-radios.js" />
          <WidgetPreviewer element={<FormControlLabelPlacement />} name="form-control-label-placement.js" />
          <WidgetPreviewer element={<RadioButtons />} name="radio-buttons.js" />
          <WidgetPreviewer element={<RadioButtonsGroup />} name="radio-buttons-group.js" />
          <WidgetPreviewer element={<RowRadioButtonsGroup />} name="row-radio-buttons-group.js" />
          <WidgetPreviewer element={<SizeRadioButtons />} name="size-radio-buttons.js" />
          <WidgetPreviewer element={<UseRadioGroup />} name="use-radio-group.js" />
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
