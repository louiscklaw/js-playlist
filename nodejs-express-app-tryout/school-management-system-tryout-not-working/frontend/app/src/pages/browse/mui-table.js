import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';
import { StickyHeadTable } from 'src/components/widgets/mui-table/sticky-head-table';
import { SpanningTable } from 'src/components/widgets/mui-table/spanning-table';
// import { ReactVirtualizedTable } from 'src/components/widgets/mui-table/react-virtualized-table';
import { EnhancedTable } from 'src/components/widgets/mui-table/enhanced-table';
import { DenseTable } from 'src/components/widgets/mui-table/dense-table';
import { AccessibleTable } from 'src/components/widgets/mui-table/accessible-table';
import { BasicTable } from 'src/components/widgets/mui-table/basic-table';
import { CollapsibleTable } from 'src/components/widgets/mui-table/collapsible-table';
import { ColumnGroupingTable } from 'src/components/widgets/mui-table/column-grouping-table';
import { CustomPaginationActionsTable } from 'src/components/widgets/mui-table/custom-pagination-actions-table';
import { CustomizedTables } from 'src/components/widgets/mui-table/customized-tables';
// import { DataTable } from 'src/components/widgets/mui-table/data-table';
// import { CustomizedTables } from 'src/components/widgets/mui-table/customized-tables';
// import { DataTable } from 'src/components/widgets/mui-table/data-table';

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
          <WidgetPreviewer element={<AccessibleTable />} name="accessible-table.js" />
          <WidgetPreviewer element={<BasicTable />} name="basic-table.js" />
          <WidgetPreviewer element={<CollapsibleTable />} name="collapsible-table.js" />
          <WidgetPreviewer element={<ColumnGroupingTable />} name="column-grouping-table.js" />
          <WidgetPreviewer element={<CustomPaginationActionsTable />} name="custom-pagination-actions-table.js" />
          <WidgetPreviewer element={<CustomizedTables />} name="customized-tables.js" />
          {/* <WidgetPreviewer element={<DataTable />} name="data-table.js" /> */}
          <WidgetPreviewer element={<DenseTable />} name="dense-table.js" />
          <WidgetPreviewer element={<EnhancedTable />} name="enhanced-table.js" />
          {/* <WidgetPreviewer element={<ReactVirtualizedTable />} name="react-virtualized-table.js" /> */}
          <WidgetPreviewer element={<SpanningTable />} name="spanning-table.js" />
          <WidgetPreviewer element={<StickyHeadTable />} name="sticky-head-table.js" />

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
