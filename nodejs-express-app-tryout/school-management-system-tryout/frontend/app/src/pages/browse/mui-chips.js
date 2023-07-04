import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';

import { AvatarChips } from 'src/components/widgets/mui-chips/avatar-chips.js';
import { BasicChips } from 'src/components/widgets/mui-chips/basic-chips.js';
import { ChipsArray } from 'src/components/widgets/mui-chips/chips-array.js';
// import { ChipsPlayground } from 'src/components/widgets/mui-chips/chips-playground.js';
import { ClickableAndDeletableChips } from 'src/components/widgets/mui-chips/clickable-and-deletable-chips.js';
import { ClickableChips } from 'src/components/widgets/mui-chips/clickable-chips.js';
import { ClickableLinkChips } from 'src/components/widgets/mui-chips/clickable-link-chips.js';
import { ColorChips } from 'src/components/widgets/mui-chips/color-chips.js';
import { CustomDeleteIconChips } from 'src/components/widgets/mui-chips/custom-delete-icon-chips.js';
import { DeletableChips } from 'src/components/widgets/mui-chips/deletable-chips.js';
import { IconChips } from 'src/components/widgets/mui-chips/icon-chips.js';
import { MultilineChips } from 'src/components/widgets/mui-chips/multiline-chips.js';
import { SizesChips } from 'src/components/widgets/mui-chips/sizes-chips.js';

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
            <WidgetPreviewer element={<AvatarChips />} name="avatar-chips.js" />
            <WidgetPreviewer element={<BasicChips />} name="basic-chips.js" />
            <WidgetPreviewer element={<ChipsArray />} name="chips-array.js" />
            {/* <WidgetPreviewer element={<ChipsPlayground />} name="chips-playground.js" /> */}
            <WidgetPreviewer
              element={<ClickableAndDeletableChips />}
              name="clickable-and-deletable-chips.js"
            />
            <WidgetPreviewer
              element={<ClickableChips />}
              name="clickable-chips.js"
            />
            <WidgetPreviewer
              element={<ClickableLinkChips />}
              name="clickable-link-chips.js"
            />
            <WidgetPreviewer element={<ColorChips />} name="color-chips.js" />
            <WidgetPreviewer
              element={<CustomDeleteIconChips />}
              name="custom-delete-icon-chips.js"
            />
            <WidgetPreviewer
              element={<DeletableChips />}
              name="deletable-chips.js"
            />
            <WidgetPreviewer element={<IconChips />} name="icon-chips.js" />
            <WidgetPreviewer
              element={<MultilineChips />}
              name="multiline-chips.js"
            />
            <WidgetPreviewer element={<SizesChips />} name="sizes-chips.js" />
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
