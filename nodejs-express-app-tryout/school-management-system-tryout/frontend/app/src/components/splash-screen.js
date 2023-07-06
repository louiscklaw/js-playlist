import { Box } from '@mui/material';
import { Logo } from './logo';
import { keyframes } from '@emotion/react';
import { useTransition } from 'react';
import { useTranslation } from 'react-i18next';

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
        <img
          width="100px"
          height="100px"
          src="https://cdns.iconmonstr.com/wp-content/releases/preview/2012/240/iconmonstr-github-1.png"
        />
      </Box>
      <Box sx={{ mt: 4 }}>{t('hello')}...</Box>
    </Box>
  )
}
