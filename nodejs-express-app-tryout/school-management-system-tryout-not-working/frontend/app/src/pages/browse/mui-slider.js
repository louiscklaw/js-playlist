import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';
import { VerticalSlider } from 'src/components/widgets/mui-slider/vertical-slider';
import { TrackInvertedSlider } from 'src/components/widgets/mui-slider/track-inverted-slider';
import { TrackFalseSlider } from 'src/components/widgets/mui-slider/track-false-slider';
import { SliderSizes } from 'src/components/widgets/mui-slider/slider-sizes';
import { RangeSlider } from 'src/components/widgets/mui-slider/range-slider';
import { NonLinearSlider } from 'src/components/widgets/mui-slider/non-linear-slider';
import { MusicPlayerSlider } from 'src/components/widgets/mui-slider/music-player-slider';
import { MinimumDistanceSlider } from 'src/components/widgets/mui-slider/minimum-distance-slider';
import { InputSlider } from 'src/components/widgets/mui-slider/input-slider';
import { DiscreteSliderValues } from 'src/components/widgets/mui-slider/discrete-slider-values';
import { DiscreteSliderSteps } from 'src/components/widgets/mui-slider/discrete-slider-steps';
import { DiscreteSliderMarks } from 'src/components/widgets/mui-slider/discrete-slider-marks';
import { DiscreteSliderLabel } from 'src/components/widgets/mui-slider/discrete-slider-label';
import { DiscreteSlider } from 'src/components/widgets/mui-slider/discrete-slider';
import { CustomizedSlider } from 'src/components/widgets/mui-slider/customized-slider';
import { ContinuousSlider } from 'src/components/widgets/mui-slider/continuous-slider';
import { ColorSlider } from 'src/components/widgets/mui-slider/color-slider';

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
          <WidgetPreviewer element={<ColorSlider />} name="color-slider.js" />
          <WidgetPreviewer element={<ContinuousSlider />} name="continuous-slider.js" />
          <WidgetPreviewer element={<CustomizedSlider />} name="customized-slider.js" />
          <WidgetPreviewer element={<DiscreteSlider />} name="discrete-slider.js" />
          <WidgetPreviewer element={<DiscreteSliderLabel />} name="discrete-slider-label.js" />
          <WidgetPreviewer element={<DiscreteSliderMarks />} name="discrete-slider-marks.js" />
          <WidgetPreviewer element={<DiscreteSliderSteps />} name="discrete-slider-steps.js" />
          <WidgetPreviewer element={<DiscreteSliderValues />} name="discrete-slider-values.js" />
          <WidgetPreviewer element={<InputSlider />} name="input-slider.js" />
          <WidgetPreviewer element={<MinimumDistanceSlider />} name="minimum-distance-slider.js" />

          {/* <WidgetPreviewer element={<MusicPlayerSlider />} name="music-player-slider.js" /> */}

          <WidgetPreviewer element={<NonLinearSlider />} name="non-linear-slider.js" />
          <WidgetPreviewer element={<RangeSlider />} name="range-slider.js" />

          {/* <WidgetPreviewer element={<SliderMaterialYouPlayground />} name="slider-material-you-playground.js" /> */}
          <WidgetPreviewer element={<SliderSizes />} name="slider-sizes.js" />
          <WidgetPreviewer element={<TrackFalseSlider />} name="track-false-slider.js" />
          <WidgetPreviewer element={<TrackInvertedSlider />} name="track-inverted-slider.js" />

          {/* <WidgetPreviewer element={<VerticalAccessibleSlider />} name="vertical-accessible-slider.js" /> */}

          <WidgetPreviewer element={<VerticalSlider />} name="vertical-slider.js" />

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
