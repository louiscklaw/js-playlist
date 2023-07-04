import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { gtm } from '../../lib/gtm';

import { AccessibleBadges } from 'src/components/widgets/mui-badges/accessible-badges.js';
// import { BadgeAlignment } from 'src/components/widgets/mui-badges/badge-alignment.js';
import { BadgeMax } from 'src/components/widgets/mui-badges/badge-max.js';
import { BadgeOverlap } from 'src/components/widgets/mui-badges/badge-overlap.js';
import { BadgeVisibility } from 'src/components/widgets/mui-badges/badge-visibility.js';
import { ColorBadge } from 'src/components/widgets/mui-badges/color-badge.js';
import { CustomizedBadges } from 'src/components/widgets/mui-badges/customized-badges.js';
import { DotBadge } from 'src/components/widgets/mui-badges/dot-badge.js';
import { ShowZeroBadge } from 'src/components/widgets/mui-badges/show-zero-badge.js';
import { SimpleBadge } from 'src/components/widgets/mui-badges/simple-badge.js';

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
              element={<AccessibleBadges />}
              name="accessible-badges.js"
            />
            {/* <WidgetPreviewer element={<BadgeAlignment />} name="badge-alignment.js" /> */}
            <WidgetPreviewer element={<BadgeMax />} name="badge-max.js" />
            <WidgetPreviewer
              element={<BadgeOverlap />}
              name="badge-overlap.js"
            />
            <WidgetPreviewer
              element={<BadgeVisibility />}
              name="badge-visibility.js"
            />
            <WidgetPreviewer element={<ColorBadge />} name="color-badge.js" />
            <WidgetPreviewer
              element={<CustomizedBadges />}
              name="customized-badges.js"
            />
            <WidgetPreviewer element={<DotBadge />} name="dot-badge.js" />
            <WidgetPreviewer
              element={<ShowZeroBadge />}
              name="show-zero-badge.js"
            />
            <WidgetPreviewer element={<SimpleBadge />} name="simple-badge.js" />
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
