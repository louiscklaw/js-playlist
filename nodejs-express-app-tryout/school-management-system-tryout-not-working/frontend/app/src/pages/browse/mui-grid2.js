import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';


// import { AutoGrid } from 'src/components/widgets/mui-grid2/auto-grid.js';
// import { BasicGrid } from 'src/components/widgets/mui-grid2/basic-grid.js';
// import { CenteredElementGrid } from 'src/components/widgets/mui-grid2/centered-element-grid.js';
// import { ColumnsGrid } from 'src/components/widgets/mui-grid2/columns-grid.js';
// import { FullBorderedGrid } from 'src/components/widgets/mui-grid2/full-bordered-grid.js';
// import { FullWidthGrid } from 'src/components/widgets/mui-grid2/full-width-grid.js';
// import { HalfBorderedGrid } from 'src/components/widgets/mui-grid2/half-bordered-grid.js';
// import { NestedGrid } from 'src/components/widgets/mui-grid2/nested-grid.js';
// import { NestedGridColumns } from 'src/components/widgets/mui-grid2/nested-grid-columns.js';
// import { OffsetGrid } from 'src/components/widgets/mui-grid2/offset-grid.js';
// import { OverflowGrid } from 'src/components/widgets/mui-grid2/overflow-grid.js';
// import { ResponsiveGrid } from 'src/components/widgets/mui-grid2/responsive-grid.js';
// import { RowAndColumnSpacing } from 'src/components/widgets/mui-grid2/row-and-column-spacing.js';
// import { SpacingGrid } from 'src/components/widgets/mui-grid2/spacing-grid.js';
// import { VariableWidthGrid } from 'src/components/widgets/mui-grid2/variable-width-grid.js';




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
          <div>
            Module not found: Can't resolve '@mui/material/Unstable_Grid2'
            {/* <WidgetPreviewer element={<AutoGrid />} name="auto-grid.js" /> */}
            {/* <WidgetPreviewer element={<BasicGrid />} name="basic-grid.js" /> */}
            {/* <WidgetPreviewer element={<CenteredElementGrid />} name="centered-element-grid.js" /> */}
            {/* <WidgetPreviewer element={<ColumnsGrid />} name="columns-grid.js" /> */}
            {/* <WidgetPreviewer element={<FullBorderedGrid />} name="full-bordered-grid.js" /> */}
            {/* <WidgetPreviewer element={<FullWidthGrid />} name="full-width-grid.js" /> */}
            {/* <WidgetPreviewer element={<HalfBorderedGrid />} name="half-bordered-grid.js" /> */}
            {/* <WidgetPreviewer element={<NestedGrid />} name="nested-grid.js" /> */}
            {/* <WidgetPreviewer element={<NestedGridColumns />} name="nested-grid-columns.js" /> */}
            {/* <WidgetPreviewer element={<OffsetGrid />} name="offset-grid.js" /> */}
            {/* <WidgetPreviewer element={<OverflowGrid />} name="overflow-grid.js" /> */}
            {/* <WidgetPreviewer element={<ResponsiveGrid />} name="responsive-grid.js" /> */}
            {/* <WidgetPreviewer element={<RowAndColumnSpacing />} name="row-and-column-spacing.js" /> */}
            {/* <WidgetPreviewer element={<SpacingGrid />} name="spacing-grid.js" /> */}
            {/* <WidgetPreviewer element={<VariableWidthGrid />} name="variable-width-grid.js" /> */}
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
