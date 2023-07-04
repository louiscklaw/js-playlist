import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';


import { DividerText } from 'src/components/widgets/mui-dividers/divider-text.js';
import { InsetDividers } from 'src/components/widgets/mui-dividers/inset-dividers.js';
import { ListDividers } from 'src/components/widgets/mui-dividers/list-dividers.js';
import { MiddleDividers } from 'src/components/widgets/mui-dividers/middle-dividers.js';
import { SubheaderDividers } from 'src/components/widgets/mui-dividers/subheader-dividers.js';
import { VerticalDividerMiddle } from 'src/components/widgets/mui-dividers/vertical-divider-middle.js';
import { VerticalDividerText } from 'src/components/widgets/mui-dividers/vertical-divider-text.js';
import { VerticalDividers } from 'src/components/widgets/mui-dividers/vertical-dividers.js';




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
          <WidgetPreviewer element={<DividerText />} name="divider-text.js" />
          <WidgetPreviewer element={<InsetDividers />} name="inset-dividers.js" />
          <WidgetPreviewer element={<ListDividers />} name="list-dividers.js" />
          <WidgetPreviewer element={<MiddleDividers />} name="middle-dividers.js" />
          <WidgetPreviewer element={<SubheaderDividers />} name="subheader-dividers.js" />
          <WidgetPreviewer element={<VerticalDividerMiddle />} name="vertical-divider-middle.js" />
          <WidgetPreviewer element={<VerticalDividerText />} name="vertical-divider-text.js" />
          <WidgetPreviewer element={<VerticalDividers />} name="vertical-dividers.js" />
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
