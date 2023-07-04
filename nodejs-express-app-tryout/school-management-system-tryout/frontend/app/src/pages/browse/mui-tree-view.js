import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BarTreeView } from 'src/components/widgets/mui-tree-view/bar-tree-view.js';
import { ControlledTreeView } from 'src/components/widgets/mui-tree-view/controlled-tree-view.js';
// import { CustomizedTreeView } from 'src/components/widgets/mui-tree-view/customized-tree-view.js';
import { DisabledTreeItems } from 'src/components/widgets/mui-tree-view/disabled-tree-items.js';
import { FileSystemNavigator } from 'src/components/widgets/mui-tree-view/file-system-navigator.js';
import { GmailTreeView } from 'src/components/widgets/mui-tree-view/gmail-tree-view.js';
import { IconExpansionTreeView } from 'src/components/widgets/mui-tree-view/icon-expansion-tree-view.js';
import { MultiSelectTreeView } from 'src/components/widgets/mui-tree-view/multi-select-tree-view.js';
import { RichObjectTreeView } from 'src/components/widgets/mui-tree-view/rich-object-tree-view.js';
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
        sx={{ backgroundColor: 'background.paper', flexGrow: 1, py: 8 }}
      >
        <Container maxWidth="lg">
          <WidgetPreviewer element={<BarTreeView />} name="bar-tree-view.js" />
          <WidgetPreviewer
            element={<ControlledTreeView />}
            name="controlled-tree-view.js"
          />

          {/* need react spring */}
          {/* <WidgetPreviewer element={<CustomizedTreeView />} name="customized-tree-view.js" /> */}
          <WidgetPreviewer
            element={<DisabledTreeItems />}
            name="disabled-tree-items.js"
          />
          <WidgetPreviewer
            element={<FileSystemNavigator />}
            name="file-system-navigator.js"
          />
          <WidgetPreviewer
            element={<GmailTreeView />}
            name="gmail-tree-view.js"
          />
          <WidgetPreviewer
            element={<IconExpansionTreeView />}
            name="icon-expansion-tree-view.js"
          />
          <WidgetPreviewer
            element={<MultiSelectTreeView />}
            name="multi-select-tree-view.js"
          />
          <WidgetPreviewer
            element={<RichObjectTreeView />}
            name="rich-object-tree-view.js"
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
