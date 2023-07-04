import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';

import { CustomizedSteppers } from 'src/components/widgets/mui-steppers/customized-steppers.js';
import { DotsMobileStepper } from 'src/components/widgets/mui-steppers/dots-mobile-stepper.js';
import { HorizontalLinearAlternativeLabelStepper } from 'src/components/widgets/mui-steppers/horizontal-linear-alternative-label-stepper.js';
import { HorizontalLinearStepper } from 'src/components/widgets/mui-steppers/horizontal-linear-stepper.js';
import { HorizontalNonLinearStepper } from 'src/components/widgets/mui-steppers/horizontal-non-linear-stepper.js';
import { HorizontalStepperWithError } from 'src/components/widgets/mui-steppers/horizontal-stepper-with-error.js';
import { ProgressMobileStepper } from 'src/components/widgets/mui-steppers/progress-mobile-stepper.js';
// import { SwipeableTextMobileStepper } from 'src/components/widgets/mui-steppers/swipeable-text-mobile-stepper.js';
import { TextMobileStepper } from 'src/components/widgets/mui-steppers/text-mobile-stepper.js';
import { VerticalLinearStepper } from 'src/components/widgets/mui-steppers/vertical-linear-stepper.js';

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
            <WidgetPreviewer
              element={<CustomizedSteppers />}
              name="customized-steppers.js"
            />
            <WidgetPreviewer
              element={<DotsMobileStepper />}
              name="dots-mobile-stepper.js"
            />
            {/* <WidgetPreviewer element={<HorizontalLinearAlternativeLabelStepper />} name="horizontal-linear-alternative-label-stepper.js" /> */}
            <WidgetPreviewer
              element={<HorizontalLinearStepper />}
              name="horizontal-linear-stepper.js"
            />
            <WidgetPreviewer
              element={<HorizontalNonLinearStepper />}
              name="horizontal-non-linear-stepper.js"
            />
            <WidgetPreviewer
              element={<HorizontalStepperWithError />}
              name="horizontal-stepper-with-error.js"
            />
            <WidgetPreviewer
              element={<ProgressMobileStepper />}
              name="progress-mobile-stepper.js"
            />
            {/* <WidgetPreviewer element={<SwipeableTextMobileStepper />} name="swipeable-text-mobile-stepper.js" /> */}
            <WidgetPreviewer
              element={<TextMobileStepper />}
              name="text-mobile-stepper.js"
            />
            <WidgetPreviewer
              element={<VerticalLinearStepper />}
              name="vertical-linear-stepper.js"
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
