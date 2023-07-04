import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';

import { AlertDialog } from 'src/components/widgets/mui-dialogs/alert-dialog.js';
import { AlertDialogSlide } from 'src/components/widgets/mui-dialogs/alert-dialog-slide.js';
import { ConfirmationDialog } from 'src/components/widgets/mui-dialogs/confirmation-dialog.js';
import { CustomizedDialogs } from 'src/components/widgets/mui-dialogs/customized-dialogs.js';
// import { DraggableDialog } from 'src/components/widgets/mui-dialogs/draggable-dialog.js';
import { FormDialog } from 'src/components/widgets/mui-dialogs/form-dialog.js';
import { FullScreenDialog } from 'src/components/widgets/mui-dialogs/full-screen-dialog.js';
import { MaxWidthDialog } from 'src/components/widgets/mui-dialogs/max-width-dialog.js';
import { ResponsiveDialog } from 'src/components/widgets/mui-dialogs/responsive-dialog.js';
import { ScrollDialog } from 'src/components/widgets/mui-dialogs/scroll-dialog.js';
// import { SimpleDialog } from 'src/components/widgets/mui-dialogs/simple-dialog.js';

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
          <WidgetPreviewer element={<AlertDialog />} name="alert-dialog.js" />
          <WidgetPreviewer
            element={<AlertDialogSlide />}
            name="alert-dialog-slide.js"
          />
          <WidgetPreviewer
            element={<ConfirmationDialog />}
            name="confirmation-dialog.js"
          />
          <WidgetPreviewer
            element={<CustomizedDialogs />}
            name="customized-dialogs.js"
          />
          {/* <WidgetPreviewer element={<DraggableDialog />} name="draggable-dialog.js" /> */}
          <WidgetPreviewer element={<FormDialog />} name="form-dialog.js" />
          <WidgetPreviewer
            element={<FullScreenDialog />}
            name="full-screen-dialog.js"
          />
          <WidgetPreviewer
            element={<MaxWidthDialog />}
            name="max-width-dialog.js"
          />
          <WidgetPreviewer
            element={<ResponsiveDialog />}
            name="responsive-dialog.js"
          />
          <WidgetPreviewer element={<ScrollDialog />} name="scroll-dialog.js" />
          {/* <WidgetPreviewer element={<SimpleDialog />} name="simple-dialog.js" /> */}
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
