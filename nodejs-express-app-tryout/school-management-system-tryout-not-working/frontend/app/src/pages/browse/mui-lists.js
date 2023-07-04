import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';


import { AlignItemsList } from 'src/components/widgets/mui-lists/align-items-list.js';
import { BasicList } from 'src/components/widgets/mui-lists/basic-list.js';
import { CheckboxList } from 'src/components/widgets/mui-lists/checkbox-list.js';
import { CheckboxListSecondary } from 'src/components/widgets/mui-lists/checkbox-list-secondary.js';
import { CustomizedList } from 'src/components/widgets/mui-lists/customized-list.js';
import { FolderList } from 'src/components/widgets/mui-lists/folder-list.js';
import { GutterlessList } from 'src/components/widgets/mui-lists/gutterless-list.js';
import { InsetList } from 'src/components/widgets/mui-lists/inset-list.js';
import { InteractiveList } from 'src/components/widgets/mui-lists/interactive-list.js';
import { NestedList } from 'src/components/widgets/mui-lists/nested-list.js';
import { PinnedSubheaderList } from 'src/components/widgets/mui-lists/pinned-subheader-list.js';
import { SelectedListItem } from 'src/components/widgets/mui-lists/selected-list-item.js';
import { SwitchListSecondary } from 'src/components/widgets/mui-lists/switch-list-secondary.js';
// import { VirtualizedList } from 'src/components/widgets/mui-lists/virtualized-list.js';




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
          <WidgetPreviewer element={<BackgroundLetterAvatars />} name="background-letter-avatars.js" />
          <div>
            <WidgetPreviewer element={<AlignItemsList />} name="align-items-list.js" />
            <WidgetPreviewer element={<BasicList />} name="basic-list.js" />
            <WidgetPreviewer element={<CheckboxList />} name="checkbox-list.js" />
            <WidgetPreviewer element={<CheckboxListSecondary />} name="checkbox-list-secondary.js" />
            <WidgetPreviewer element={<CustomizedList />} name="customized-list.js" />
            <WidgetPreviewer element={<FolderList />} name="folder-list.js" />
            <WidgetPreviewer element={<GutterlessList />} name="gutterless-list.js" />
            <WidgetPreviewer element={<InsetList />} name="inset-list.js" />
            <WidgetPreviewer element={<InteractiveList />} name="interactive-list.js" />
            <WidgetPreviewer element={<NestedList />} name="nested-list.js" />
            <WidgetPreviewer element={<PinnedSubheaderList />} name="pinned-subheader-list.js" />
            <WidgetPreviewer element={<SelectedListItem />} name="selected-list-item.js" />
            <WidgetPreviewer element={<SwitchListSecondary />} name="switch-list-secondary.js" />
{/* <WidgetPreviewer element={<VirtualizedList />} name="virtualized-list.js" /> */}
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
