import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { EmptyTextarea } from 'src/components/widgets/mui-textarea-autosize/empty-textarea';
import { MaxHeightTextarea } from 'src/components/widgets/mui-textarea-autosize/max-height-textarea';
import { MinHeightTextarea } from 'src/components/widgets/mui-textarea-autosize/min-height-textarea';
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
          <WidgetPreviewer
            element={<EmptyTextarea />}
            name="empty-textarea.js"
          />
          <WidgetPreviewer
            element={<MaxHeightTextarea />}
            name="max-height-textarea.js"
          />
          <WidgetPreviewer
            element={<MinHeightTextarea />}
            name="min-height-textarea.js"
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
