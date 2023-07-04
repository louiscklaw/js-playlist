import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';

import { AccountMenu } from 'src/components/widgets/mui-menus/account-menu.js';
import { BasicMenu } from 'src/components/widgets/mui-menus/basic-menu.js';
import { ContextMenu } from 'src/components/widgets/mui-menus/context-menu.js';
import { CustomizedMenus } from 'src/components/widgets/mui-menus/customized-menus.js';
import { DenseMenu } from 'src/components/widgets/mui-menus/dense-menu.js';
import { FadeMenu } from 'src/components/widgets/mui-menus/fade-menu.js';
import { IconMenu } from 'src/components/widgets/mui-menus/icon-menu.js';
import { LongMenu } from 'src/components/widgets/mui-menus/long-menu.js';
import { MenuListComposition } from 'src/components/widgets/mui-menus/menu-list-composition.js';
// import { MenuPopupState } from 'src/components/widgets/mui-menus/menu-popup-state.js';
import { PositionedMenu } from 'src/components/widgets/mui-menus/positioned-menu.js';
import { SimpleListMenu } from 'src/components/widgets/mui-menus/simple-list-menu.js';
import { TypographyMenu } from 'src/components/widgets/mui-menus/typography-menu.js';

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
            <WidgetPreviewer element={<AccountMenu />} name="account-menu.js" />
            <WidgetPreviewer element={<BasicMenu />} name="basic-menu.js" />
            <WidgetPreviewer element={<ContextMenu />} name="context-menu.js" />
            <WidgetPreviewer
              element={<CustomizedMenus />}
              name="customized-menus.js"
            />
            <WidgetPreviewer element={<DenseMenu />} name="dense-menu.js" />
            <WidgetPreviewer element={<FadeMenu />} name="fade-menu.js" />
            <WidgetPreviewer element={<IconMenu />} name="icon-menu.js" />
            <WidgetPreviewer element={<LongMenu />} name="long-menu.js" />
            <WidgetPreviewer
              element={<MenuListComposition />}
              name="menu-list-composition.js"
            />
            {/* <WidgetPreviewer element={<MenuPopupState />} name="menu-popup-state.js" /> */}
            <WidgetPreviewer
              element={<PositionedMenu />}
              name="positioned-menu.js"
            />
            <WidgetPreviewer
              element={<SimpleListMenu />}
              name="simple-list-menu.js"
            />
            <WidgetPreviewer
              element={<TypographyMenu />}
              name="typography-menu.js"
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
