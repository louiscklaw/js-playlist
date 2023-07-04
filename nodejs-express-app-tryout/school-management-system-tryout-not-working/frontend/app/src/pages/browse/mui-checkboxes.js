import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';


import { CheckboxLabels } from 'src/components/widgets/mui-checkboxes/checkbox-labels.js';
import { Checkboxes } from 'src/components/widgets/mui-checkboxes/checkboxes.js';
import { CheckboxesGroup } from 'src/components/widgets/mui-checkboxes/checkboxes-group.js';
import { ColorCheckboxes } from 'src/components/widgets/mui-checkboxes/color-checkboxes.js';
import { ControlledCheckbox } from 'src/components/widgets/mui-checkboxes/controlled-checkbox.js';
import { CustomizedCheckbox } from 'src/components/widgets/mui-checkboxes/customized-checkbox.js';
import { FormControlLabelPosition } from 'src/components/widgets/mui-checkboxes/form-control-label-position.js';
import { IconCheckboxes } from 'src/components/widgets/mui-checkboxes/icon-checkboxes.js';
import { IndeterminateCheckbox } from 'src/components/widgets/mui-checkboxes/indeterminate-checkbox.js';
import { SizeCheckboxes } from 'src/components/widgets/mui-checkboxes/size-checkboxes.js';




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
          <WidgetPreviewer element={<CheckboxLabels />} name="checkbox-labels.js" />
          <WidgetPreviewer element={<Checkboxes />} name="checkboxes.js" />
          <WidgetPreviewer element={<CheckboxesGroup />} name="checkboxes-group.js" />
          <WidgetPreviewer element={<ColorCheckboxes />} name="color-checkboxes.js" />
          <WidgetPreviewer element={<ControlledCheckbox />} name="controlled-checkbox.js" />
          <WidgetPreviewer element={<CustomizedCheckbox />} name="customized-checkbox.js" />
          <WidgetPreviewer element={<FormControlLabelPosition />} name="form-control-label-position.js" />
          <WidgetPreviewer element={<IconCheckboxes />} name="icon-checkboxes.js" />
          <WidgetPreviewer element={<IndeterminateCheckbox />} name="indeterminate-checkbox.js" />
          <WidgetPreviewer element={<SizeCheckboxes />} name="size-checkboxes.js" />
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
