import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';

import { BasicSelect } from 'src/components/widgets/mui-selects/basic-select.js';
import { ControlledOpenSelect } from 'src/components/widgets/mui-selects/controlled-open-select.js';
import { CustomizedSelects } from 'src/components/widgets/mui-selects/customized-selects.js';
import { DialogSelect } from 'src/components/widgets/mui-selects/dialog-select.js';
import { GroupedSelect } from 'src/components/widgets/mui-selects/grouped-select.js';
import { MultipleSelect } from 'src/components/widgets/mui-selects/multiple-select.js';
import { MultipleSelectCheckmarks } from 'src/components/widgets/mui-selects/multiple-select-checkmarks.js';
import { MultipleSelectChip } from 'src/components/widgets/mui-selects/multiple-select-chip.js';
import { MultipleSelectNative } from 'src/components/widgets/mui-selects/multiple-select-native.js';
import { MultipleSelectPlaceholder } from 'src/components/widgets/mui-selects/multiple-select-placeholder.js';
import { NativeSelect } from 'src/components/widgets/mui-selects/native-select.js';
import { SelectAutoWidth } from 'src/components/widgets/mui-selects/select-auto-width.js';
import { SelectLabels } from 'src/components/widgets/mui-selects/select-labels.js';
import { SelectOtherProps } from 'src/components/widgets/mui-selects/select-other-props.js';
import { SelectSmall } from 'src/components/widgets/mui-selects/select-small.js';
import { SelectVariants } from 'src/components/widgets/mui-selects/select-variants.js';

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
          <WidgetPreviewer element={<BasicSelect />} name="basic-select.js" />
          <WidgetPreviewer
            element={<ControlledOpenSelect />}
            name="controlled-open-select.js"
          />
          <WidgetPreviewer
            element={<CustomizedSelects />}
            name="customized-selects.js"
          />
          <WidgetPreviewer element={<DialogSelect />} name="dialog-select.js" />
          <WidgetPreviewer
            element={<GroupedSelect />}
            name="grouped-select.js"
          />
          <WidgetPreviewer
            element={<MultipleSelect />}
            name="multiple-select.js"
          />
          <WidgetPreviewer
            element={<MultipleSelectCheckmarks />}
            name="multiple-select-checkmarks.js"
          />
          <WidgetPreviewer
            element={<MultipleSelectChip />}
            name="multiple-select-chip.js"
          />
          <WidgetPreviewer
            element={<MultipleSelectNative />}
            name="multiple-select-native.js"
          />
          <WidgetPreviewer
            element={<MultipleSelectPlaceholder />}
            name="multiple-select-placeholder.js"
          />
          {/* <WidgetPreviewer element={<NativeSelect />} name="native-select.js" /> */}
          <WidgetPreviewer
            element={<SelectAutoWidth />}
            name="select-auto-width.js"
          />
          <WidgetPreviewer element={<SelectLabels />} name="select-labels.js" />
          <WidgetPreviewer
            element={<SelectOtherProps />}
            name="select-other-props.js"
          />
          <WidgetPreviewer element={<SelectSmall />} name="select-small.js" />
          <WidgetPreviewer
            element={<SelectVariants />}
            name="select-variants.js"
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
