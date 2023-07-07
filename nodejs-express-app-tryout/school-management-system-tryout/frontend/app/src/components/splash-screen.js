import { Box, Stack } from '@mui/material';
import { Logo } from './logo';
import { keyframes } from '@emotion/react';
import { useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import PuffLoader from 'react-spinners/PuffLoader';

const bounce1 = keyframes`
  0% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, 1px, 0); }
  100% { transform: translate3d(0, 0, 0); }
`;

const bounce3 = keyframes`
  0% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, 3px, 0); }
  100% { transform: translate3d(0, 0, 0); }
`;

export const SplashScreen = () => {
  const { t } = useTranslation();

  return (
    <>
      <Stack
        direction="column"
        alignItems={'center'}
        justifyContent={'space-between'}
        sx={{ height: '95vh' }}>
        <Box></Box>
        <Box>
          <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        left: 0,
        p: 3,
        position: 'fixed',
        top: 0,
        width: '100vw',
        zIndex: 2000,
      }}
    >
      <Box>
              <PuffLoader color="#36d7b7" height={70} radius={10} width={8} />

      </Box>
      <Box sx={{ mt: 4 }}>{t('hello')}...</Box>
    </Box>
        </Box>
        <Box>
          louislabs 2023
        </Box>
      </Stack>
    </>
  );
};
