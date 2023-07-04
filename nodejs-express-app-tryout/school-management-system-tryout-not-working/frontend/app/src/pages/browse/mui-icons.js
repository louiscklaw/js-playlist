import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';


import { CreateSvgIcon } from 'src/components/widgets/mui-icons/create-svg-icon.js';
// import { FontAwesomeIcon } from 'src/components/widgets/mui-icons/font-awesome-icon.js';
// import { FontAwesomeIconSize } from 'src/components/widgets/mui-icons/font-awesome-icon-size.js';
// import { FontAwesomeSvgIconDemo } from 'src/components/widgets/mui-icons/font-awesome-svg-icon-demo.js';
import { Icons } from 'src/components/widgets/mui-icons/icons.js';
import { SvgIconChildren } from 'src/components/widgets/mui-icons/svg-icon-children.js';
import { SvgIconsColor } from 'src/components/widgets/mui-icons/svg-icons-color.js';
import { SvgIconsSize } from 'src/components/widgets/mui-icons/svg-icons-size.js';
import { SvgMaterialIcons } from 'src/components/widgets/mui-icons/svg-material-icons.js';
import { TwoToneIcons } from 'src/components/widgets/mui-icons/two-tone-icons.js';




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
          <WidgetPreviewer element={<CreateSvgIcon />} name="create-svg-icon.js" />
          {/* <WidgetPreviewer element={<FontAwesomeIcon />} name="font-awesome-icon.js" /> */}
          {/* <WidgetPreviewer element={<FontAwesomeIconSize />} name="font-awesome-icon-size.js" /> */}
          {/* <WidgetPreviewer element={<FontAwesomeSvgIconDemo />} name="font-awesome-svg-icon-demo.js" /> */}
          <WidgetPreviewer element={<Icons />} name="icons.js" />
          <WidgetPreviewer element={<SvgIconChildren />} name="svg-icon-children.js" />
          <WidgetPreviewer element={<SvgIconsColor />} name="svg-icons-color.js" />
          <WidgetPreviewer element={<SvgIconsSize />} name="svg-icons-size.js" />
          <WidgetPreviewer element={<SvgMaterialIcons />} name="svg-material-icons.js" />
          <WidgetPreviewer element={<TwoToneIcons />} name="two-tone-icons.js" />
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
