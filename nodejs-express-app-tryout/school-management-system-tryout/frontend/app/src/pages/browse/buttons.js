import { useEffect } from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';
import { Buttons1 } from '../../components/widgets/buttons/buttons-1';
import { Buttons2 } from '../../components/widgets/buttons/buttons-2';
import { Buttons3 } from '../../components/widgets/buttons/buttons-3';
import { Buttons4 } from '../../components/widgets/buttons/buttons-4';
import { gtm } from '../../lib/gtm';
import { Rating1 } from 'src/components/widgets/buttons/rating-1';
import { TestMuiButton } from 'src/components/widgets/inputs/mui-button';
import { BasicButtons } from 'src/components/widgets/mui-buttons/basic-buttons';
import { ButtonBases } from 'src/components/widgets/mui-buttons/button-base';
import { TextButtons } from 'src/components/widgets/mui-buttons/text-buttons';
import { ButtonSizes } from 'src/components/widgets/mui-buttons/button-sizes';
import { OutlinedButtons } from 'src/components/widgets/mui-buttons/outlined-buttons';
import { LoadingButtonsTransition } from 'src/components/widgets/mui-buttons/loading-buttons-transition';
import { LoadingButtons } from 'src/components/widgets/mui-buttons/loading-buttons';
import { IconLabelButtons } from 'src/components/widgets/mui-buttons/icon-label-buttons';
import { IconButtons } from 'src/components/widgets/mui-buttons/icon-buttons';
import { IconButtonSizes } from 'src/components/widgets/mui-buttons/icon-button-sizes';
import { IconButtonColors } from 'src/components/widgets/mui-buttons/icon-button-colors';
import { DisableElevation } from 'src/components/widgets/mui-buttons/disable-elevation';
import { CustomizedButtons } from 'src/components/widgets/mui-buttons/customized-buttons';
import { ContainedButtons } from 'src/components/widgets/mui-buttons/contained-buttons';
import { ColorButtons } from 'src/components/widgets/mui-buttons/color-buttons';

const BrowseButtons = () => {
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
        sx={{
          backgroundColor: 'background.paper',
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <WidgetPreviewer element={<ButtonSizes />} name="button-sizes.js" />
          <WidgetPreviewer element={<ColorButtons />} name="color-buttons.js" />
          <WidgetPreviewer
            element={<ContainedButtons />}
            name="contained-buttons.js"
          />
          <WidgetPreviewer
            element={<CustomizedButtons />}
            name="customized-buttons.js"
          />
          <WidgetPreviewer
            element={<DisableElevation />}
            name="disable-elevation.js"
          />
          <WidgetPreviewer
            element={<IconButtonColors />}
            name="icon-button-colors.js"
          />
          <WidgetPreviewer
            element={<IconButtonSizes />}
            name="icon-button-sizes.js"
          />
          <WidgetPreviewer element={<IconButtons />} name="icon-buttons.js" />
          <WidgetPreviewer
            element={<IconLabelButtons />}
            name="icon-label-buttons.js"
          />
          <WidgetPreviewer
            element={<LoadingButtons />}
            name="loading-buttons.js"
          />
          <WidgetPreviewer
            element={<LoadingButtonsTransition />}
            name="loading-buttons-transition.js"
          />
          <WidgetPreviewer
            element={<OutlinedButtons />}
            name="outlined-buttons.js"
          />
          <WidgetPreviewer element={<TextButtons />} name="text-buttons.js" />
          {/* <WidgetPreviewer element={<ButtonMaterialYouPlayground />} name="button-material-you-playground.js" /> */}
          <WidgetPreviewer element={<BasicButtons />} name="basic-buttons.js" />
          <WidgetPreviewer element={<ButtonBases />} name="button-base.js" />

          <WidgetPreviewer element={<Buttons1 />} name="Simple buttons" />
          <WidgetPreviewer
            element={<Buttons2 />}
            name="Buttons with text and icon"
          />
          <WidgetPreviewer element={<Buttons3 />} name="Button groups" />
          <WidgetPreviewer element={<Buttons4 />} name="Button groups" />
          <WidgetPreviewer element={<Rating1 />} name="rating-1.js" />
          <WidgetPreviewer element={<TestMuiButton />} name="mui-button.js" />
        </Container>
      </Box>
    </>
  );
};

BrowseButtons.getLayout = page => (
  <MainLayout>
    <BrowseLayout>{page}</BrowseLayout>
  </MainLayout>
);

export default BrowseButtons;
