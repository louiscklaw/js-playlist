import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';

import { BasicAccordion } from 'src/components/widgets/mui-accordion/basic-accordion.js';
// import { ControlledAccordions } from 'src/components/widgets/mui-accordion/controlled-accordions.js';
import { CustomizedAccordions } from 'src/components/widgets/mui-accordion/customized-accordions.js';

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
            element={<BackgroundLetterAvatars />}
            name="background-letter-avatars.js"
          />
          <div>
            <WidgetPreviewer
              element={<BasicAccordion />}
              name="basic-accordion.js"
            />
            {/* <WidgetPreviewer element={<ControlledAccordions />} name="controlled-accordions.js" /> */}
            <WidgetPreviewer
              element={<CustomizedAccordions />}
              name="customized-accordions.js"
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
