import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';


import { Asynchronous } from 'src/components/widgets/mui-autocomplete/asynchronous.js';
import { AutocompleteHint } from 'src/components/widgets/mui-autocomplete/autocomplete-hint.js';
import { CheckboxesTags } from 'src/components/widgets/mui-autocomplete/checkboxes-tags.js';
import { ComboBox } from 'src/components/widgets/mui-autocomplete/combo-box.js';
import { ControllableStates } from 'src/components/widgets/mui-autocomplete/controllable-states.js';
import { CountrySelect } from 'src/components/widgets/mui-autocomplete/country-select.js';
import { CustomInputAutocomplete } from 'src/components/widgets/mui-autocomplete/custom-input-autocomplete.js';
// import { CustomizedHook } from 'src/components/widgets/mui-autocomplete/customized-hook.js';
import { DisabledOptions } from 'src/components/widgets/mui-autocomplete/disabled-options.js';
import { Filter } from 'src/components/widgets/mui-autocomplete/filter.js';
import { FixedTags } from 'src/components/widgets/mui-autocomplete/fixed-tags.js';
import { FreeSolo } from 'src/components/widgets/mui-autocomplete/free-solo.js';
import { FreeSoloCreateOption } from 'src/components/widgets/mui-autocomplete/free-solo-create-option.js';
import { FreeSoloCreateOptionDialog } from 'src/components/widgets/mui-autocomplete/free-solo-create-option-dialog.js';
import { GitHubLabel } from 'src/components/widgets/mui-autocomplete/git-hub-label.js';
// import { GoogleMaps } from 'src/components/widgets/mui-autocomplete/google-maps.js';
import { Grouped } from 'src/components/widgets/mui-autocomplete/grouped.js';
// import { Highlights } from 'src/components/widgets/mui-autocomplete/highlights.js';
import { LimitTags } from 'src/components/widgets/mui-autocomplete/limit-tags.js';
import { Playground } from 'src/components/widgets/mui-autocomplete/playground.js';
import { RenderGroup } from 'src/components/widgets/mui-autocomplete/render-group.js';
import { Sizes } from 'src/components/widgets/mui-autocomplete/sizes.js';
import { Tags } from 'src/components/widgets/mui-autocomplete/tags.js';
// import { UseAutocomplete } from 'src/components/widgets/mui-autocomplete/use-autocomplete.js';
// import { Virtualize } from 'src/components/widgets/mui-autocomplete/virtualize.js';




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
          <WidgetPreviewer element={<Asynchronous />} name="asynchronous.js" />
          <WidgetPreviewer element={<AutocompleteHint />} name="autocomplete-hint.js" />
          <WidgetPreviewer element={<CheckboxesTags />} name="checkboxes-tags.js" />
          <WidgetPreviewer element={<ComboBox />} name="combo-box.js" />
          <WidgetPreviewer element={<ControllableStates />} name="controllable-states.js" />
          <WidgetPreviewer element={<CountrySelect />} name="country-select.js" />
          <WidgetPreviewer element={<CustomInputAutocomplete />} name="custom-input-autocomplete.js" />
          {/* <WidgetPreviewer element={<CustomizedHook />} name="customized-hook.js" /> */}
          <WidgetPreviewer element={<DisabledOptions />} name="disabled-options.js" />
          <WidgetPreviewer element={<Filter />} name="filter.js" />
          <WidgetPreviewer element={<FixedTags />} name="fixed-tags.js" />
          <WidgetPreviewer element={<FreeSolo />} name="free-solo.js" />
          <WidgetPreviewer element={<FreeSoloCreateOption />} name="free-solo-create-option.js" />
          <WidgetPreviewer element={<FreeSoloCreateOptionDialog />} name="free-solo-create-option-dialog.js" />
          <WidgetPreviewer element={<GitHubLabel />} name="git-hub-label.js" />
          {/* <WidgetPreviewer element={<GoogleMaps />} name="google-maps.js" /> */}
          <WidgetPreviewer element={<Grouped />} name="grouped.js" />
          {/* <WidgetPreviewer element={<Highlights />} name="highlights.js" /> */}
          <WidgetPreviewer element={<LimitTags />} name="limit-tags.js" />
          <WidgetPreviewer element={<Playground />} name="playground.js" />
          <WidgetPreviewer element={<RenderGroup />} name="render-group.js" />
          <WidgetPreviewer element={<Sizes />} name="sizes.js" />
          <WidgetPreviewer element={<Tags />} name="tags.js" />
          {/* <WidgetPreviewer element={<UseAutocomplete />} name="use-autocomplete.js" /> */}
          {/* <WidgetPreviewer element={<Virtualize />} name="virtualize.js" /> */}
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
