import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { gtm } from '../../lib/gtm';
import { VariableWidth } from 'src/components/widgets/mui-tooltips/variable-width';
import { TriggersTooltips } from 'src/components/widgets/mui-tooltips/triggers-tooltips';
import { TransitionsTooltips } from 'src/components/widgets/mui-tooltips/transitions-tooltips';
import { PositionedTooltips } from 'src/components/widgets/mui-tooltips/positioned-tooltips';
import { NotInteractiveTooltips } from 'src/components/widgets/mui-tooltips/non-interactive-tooltips';
import { FollowCursorTooltips } from 'src/components/widgets/mui-tooltips/follow-cursor-tooltips';
import { DisabledTooltips } from 'src/components/widgets/mui-tooltips/disabled-tooltips';
import { DelayTooltips } from 'src/components/widgets/mui-tooltips/delay-tooltips';
import { CustomizedTooltips } from 'src/components/widgets/mui-tooltips/customized-tooltips';
import { ControlledTooltips } from 'src/components/widgets/mui-tooltips/controlled-tooltips';
import { BasicTooltip } from 'src/components/widgets/mui-tooltips/basic-tooltip';
import { ArrowTooltips } from 'src/components/widgets/mui-tooltips/arrow-tooltips';
import { AnchorElTooltips } from 'src/components/widgets/mui-tooltips/anchor-el-tooltips';
import { AccessibilityTooltips } from 'src/components/widgets/mui-tooltips/accessibility-tooltips';

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
          <WidgetPreviewer element={<AccessibilityTooltips />} name="accessibility-tooltips.js" />
          <WidgetPreviewer element={<AnchorElTooltips />} name="anchor-el-tooltips.js" />
          <WidgetPreviewer element={<ArrowTooltips />} name="arrow-tooltips.js" />
          <WidgetPreviewer element={<BasicTooltip />} name="basic-tooltip.js" />
          <WidgetPreviewer element={<ControlledTooltips />} name="controlled-tooltips.js" />
          <WidgetPreviewer element={<CustomizedTooltips />} name="customized-tooltips.js" />
          <WidgetPreviewer element={<DelayTooltips />} name="delay-tooltips.js" />
          <WidgetPreviewer element={<DisabledTooltips />} name="disabled-tooltips.js" />
          <WidgetPreviewer element={<FollowCursorTooltips />} name="follow-cursor-tooltips.js" />
          <WidgetPreviewer element={<NotInteractiveTooltips />} name="non-interactive-tooltips.js" />
          <WidgetPreviewer element={<PositionedTooltips />} name="positioned-tooltips.js" />
          <WidgetPreviewer element={<TransitionsTooltips />} name="transitions-tooltips.js" />
          <WidgetPreviewer element={<TriggersTooltips />} name="triggers-tooltips.js" />
          <WidgetPreviewer element={<VariableWidth />} name="variable-width.js" />

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
