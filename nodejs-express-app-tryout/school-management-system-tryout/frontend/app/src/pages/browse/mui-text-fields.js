import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { WidgetPreviewer } from '../../components/widget-previewer';

import { BackgroundLetterAvatars } from 'src/components/widgets/mui-avatars/background-letter-avatars';
import { FullWidthTextField } from 'src/components/widgets/mui-text-fields/full-width-text-field';
import { HelperTextAligned } from 'src/components/widgets/mui-text-fields/helper-text-aligned';
import { HelperTextMisaligned } from 'src/components/widgets/mui-text-fields/helper-text-misaligned';
import { InputAdornments } from 'src/components/widgets/mui-text-fields/input-adornments';
import { InputWithIcon } from 'src/components/widgets/mui-text-fields/input-with-icon';
import { Inputs } from 'src/components/widgets/mui-text-fields/inputs';
import { LayoutTextFields } from 'src/components/widgets/mui-text-fields/layout-text-fields';
import { MultilineTextFields } from 'src/components/widgets/mui-text-fields/multiline-text-fields';
import { SelectTextFields } from 'src/components/widgets/mui-text-fields/select-text-fields';
import { StateTextFields } from 'src/components/widgets/mui-text-fields/state-text-fields';
import { TextFieldHiddenLabel } from 'src/components/widgets/mui-text-fields/text-field-hidden-label';
import { TextFieldSizes } from 'src/components/widgets/mui-text-fields/text-field-sizes';
import { UseFormControl } from 'src/components/widgets/mui-text-fields/use-form-control';
import { ValidationTextFields } from 'src/components/widgets/mui-text-fields/validation-text-fields';
import { gtm } from '../../lib/gtm';

// import { FormattedInputs } from 'src/components/widgets/mui-text-fields/formatted-inputs';

import { BasicTextFields } from 'src/components/widgets/mui-text-fields/basic-text-fields';
import { ColorTextFields } from 'src/components/widgets/mui-text-fields/color-text-fields';
import { ComposedTextField } from 'src/components/widgets/mui-text-fields/composed-text-field';
import { CustomizedInputBase } from 'src/components/widgets/mui-text-fields/customized-input-base';
import { CustomizedInputsStyleOverrides } from 'src/components/widgets/mui-text-fields/customized-inputs-style-overrides';
import { CustomizedInputsStyled } from 'src/components/widgets/mui-text-fields/customized-inputs-styled';
import { FormPropsTextFields } from 'src/components/widgets/mui-text-fields/form-props-text-fields';

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
            element={<BasicTextFields />}
            name="basic-text-fields.js"
          />
          <WidgetPreviewer
            element={<ColorTextFields />}
            name="color-text-fields.js"
          />
          <WidgetPreviewer
            element={<ComposedTextField />}
            name="composed-text-field.js"
          />
          <WidgetPreviewer
            element={<CustomizedInputBase />}
            name="customized-input-base.js"
          />
          <WidgetPreviewer
            element={<CustomizedInputsStyleOverrides />}
            name="customized-inputs-style-overrides.js"
          />
          <WidgetPreviewer
            element={<CustomizedInputsStyled />}
            name="customized-inputs-styled.js"
          />
          <WidgetPreviewer
            element={<FormPropsTextFields />}
            name="form-props-text-fields.js"
          />

          {/* <WidgetPreviewer element={<FormattedInputs />} name="formatted-inputs.js" /> */}

          <WidgetPreviewer
            element={<FullWidthTextField />}
            name="full-width-text-field.js"
          />
          <WidgetPreviewer
            element={<HelperTextAligned />}
            name="helper-text-aligned.js"
          />
          <WidgetPreviewer
            element={<HelperTextMisaligned />}
            name="helper-text-misaligned.js"
          />
          <WidgetPreviewer
            element={<InputAdornments />}
            name="input-adornments.js"
          />
          <WidgetPreviewer
            element={<InputWithIcon />}
            name="input-with-icon.js"
          />
          <WidgetPreviewer element={<Inputs />} name="inputs.js" />
          <WidgetPreviewer
            element={<LayoutTextFields />}
            name="layout-text-fields.js"
          />
          <WidgetPreviewer
            element={<MultilineTextFields />}
            name="multiline-text-fields.js"
          />
          <WidgetPreviewer
            element={<SelectTextFields />}
            name="select-text-fields.js"
          />
          <WidgetPreviewer
            element={<StateTextFields />}
            name="state-text-fields.js"
          />
          <WidgetPreviewer
            element={<TextFieldHiddenLabel />}
            name="text-field-hidden-label.js"
          />
          <WidgetPreviewer
            element={<TextFieldSizes />}
            name="text-field-sizes.js"
          />
          <WidgetPreviewer
            element={<UseFormControl />}
            name="use-form-control.js"
          />
          <WidgetPreviewer
            element={<ValidationTextFields />}
            name="validation-text-fields.js"
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
