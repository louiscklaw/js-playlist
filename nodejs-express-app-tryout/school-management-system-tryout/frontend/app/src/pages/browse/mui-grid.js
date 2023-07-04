import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';

import { AutoGrid } from 'src/components/widgets/mui-grid/auto-grid.js';
import { AutoGridNoWrap } from 'src/components/widgets/mui-grid/auto-grid-no-wrap.js';
import { BasicGrid } from 'src/components/widgets/mui-grid/basic-grid.js';
import { CSSGrid } from 'src/components/widgets/mui-grid/cssgrid.js';
import { ColumnsGrid } from 'src/components/widgets/mui-grid/columns-grid.js';
import { ComplexGrid } from 'src/components/widgets/mui-grid/complex-grid.js';
import { FullWidthGrid } from 'src/components/widgets/mui-grid/full-width-grid.js';
// import { InteractiveGrid } from 'src/components/widgets/mui-grid/interactive-grid.js';
import { NestedGrid } from 'src/components/widgets/mui-grid/nested-grid.js';
import { ResponsiveGrid } from 'src/components/widgets/mui-grid/responsive-grid.js';
import { RowAndColumnSpacing } from 'src/components/widgets/mui-grid/row-and-column-spacing.js';
// import { SpacingGrid } from 'src/components/widgets/mui-grid/spacing-grid.js';
import { VariableWidthGrid } from 'src/components/widgets/mui-grid/variable-width-grid.js';

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
          <div>
            <WidgetPreviewer element={<AutoGrid />} name="auto-grid.js" />
            <WidgetPreviewer
              element={<AutoGridNoWrap />}
              name="auto-grid-no-wrap.js"
            />
            <WidgetPreviewer element={<BasicGrid />} name="basic-grid.js" />
            <WidgetPreviewer element={<CSSGrid />} name="cssgrid.js" />
            <WidgetPreviewer element={<ColumnsGrid />} name="columns-grid.js" />
            <WidgetPreviewer element={<ComplexGrid />} name="complex-grid.js" />
            <WidgetPreviewer
              element={<FullWidthGrid />}
              name="full-width-grid.js"
            />
            {/* <WidgetPreviewer element={<InteractiveGrid />} name="interactive-grid.js" /> */}
            <WidgetPreviewer element={<NestedGrid />} name="nested-grid.js" />
            <WidgetPreviewer
              element={<ResponsiveGrid />}
              name="responsive-grid.js"
            />
            <WidgetPreviewer
              element={<RowAndColumnSpacing />}
              name="row-and-column-spacing.js"
            />
            {/* <WidgetPreviewer element={<SpacingGrid />} name="spacing-grid.js" /> */}
            <WidgetPreviewer
              element={<VariableWidthGrid />}
              name="variable-width-grid.js"
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
