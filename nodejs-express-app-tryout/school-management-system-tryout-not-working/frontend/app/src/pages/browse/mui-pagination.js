import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';


import { BasicPagination } from 'src/components/widgets/mui-pagination/basic-pagination.js';
import { CustomIcons } from 'src/components/widgets/mui-pagination/custom-icons.js';
import { PaginationButtons } from 'src/components/widgets/mui-pagination/pagination-buttons.js';
import { PaginationControlled } from 'src/components/widgets/mui-pagination/pagination-controlled.js';
// import { PaginationLink } from 'src/components/widgets/mui-pagination/pagination-link.js';
import { PaginationOutlined } from 'src/components/widgets/mui-pagination/pagination-outlined.js';
import { PaginationRanges } from 'src/components/widgets/mui-pagination/pagination-ranges.js';
import { PaginationRounded } from 'src/components/widgets/mui-pagination/pagination-rounded.js';
import { PaginationSize } from 'src/components/widgets/mui-pagination/pagination-size.js';
import { TablePagination } from 'src/components/widgets/mui-pagination/table-pagination.js';
import { UsePagination } from 'src/components/widgets/mui-pagination/use-pagination.js';




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
          <WidgetPreviewer element={<BasicPagination />} name="basic-pagination.js" />
          <WidgetPreviewer element={<CustomIcons />} name="custom-icons.js" />
          <WidgetPreviewer element={<PaginationButtons />} name="pagination-buttons.js" />
          <WidgetPreviewer element={<PaginationControlled />} name="pagination-controlled.js" />
{/* <WidgetPreviewer element={<PaginationLink />} name="pagination-link.js" /> */}
          <WidgetPreviewer element={<PaginationOutlined />} name="pagination-outlined.js" />
          <WidgetPreviewer element={<PaginationRanges />} name="pagination-ranges.js" />
          <WidgetPreviewer element={<PaginationRounded />} name="pagination-rounded.js" />
          <WidgetPreviewer element={<PaginationSize />} name="pagination-size.js" />
          {/* <WidgetPreviewer element={<TablePagination />} name="table-pagination.js" /> */}
          <WidgetPreviewer element={<UsePagination />} name="use-pagination.js" />
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
