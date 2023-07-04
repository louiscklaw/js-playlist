import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';

import { ActiveLastBreadcrumb } from 'src/components/widgets/mui-breadcrumbs/active-last-breadcrumb.js';
import { BasicBreadcrumbs } from 'src/components/widgets/mui-breadcrumbs/basic-breadcrumbs.js';
import { CollapsedBreadcrumbs } from 'src/components/widgets/mui-breadcrumbs/collapsed-breadcrumbs.js';
import { CustomSeparator } from 'src/components/widgets/mui-breadcrumbs/custom-separator.js';
import { CustomizedBreadcrumbs } from 'src/components/widgets/mui-breadcrumbs/customized-breadcrumbs.js';
import { IconBreadcrumbs } from 'src/components/widgets/mui-breadcrumbs/icon-breadcrumbs.js';
// import { RouterBreadcrumbs } from 'src/components/widgets/mui-breadcrumbs/router-breadcrumbs.js';

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
            element={<ActiveLastBreadcrumb />}
            name="active-last-breadcrumb.js"
          />
          <WidgetPreviewer
            element={<BasicBreadcrumbs />}
            name="basic-breadcrumbs.js"
          />
          <WidgetPreviewer
            element={<CollapsedBreadcrumbs />}
            name="collapsed-breadcrumbs.js"
          />
          <WidgetPreviewer
            element={<CustomSeparator />}
            name="custom-separator.js"
          />
          <WidgetPreviewer
            element={<CustomizedBreadcrumbs />}
            name="customized-breadcrumbs.js"
          />
          <WidgetPreviewer
            element={<IconBreadcrumbs />}
            name="icon-breadcrumbs.js"
          />
          {/* <WidgetPreviewer element={<RouterBreadcrumbs />} name="router-breadcrumbs.js" /> */}
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
