import * as React from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Typography, Modal
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Check as CheckIcon } from 'src/icons/check';
import { t } from 'i18next';
import { useEffect } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function WelcomeModal() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    globalThis.localStorage.setItem('hideWelcomeMesasge', true);
    setOpen(false);
  }

  useEffect(() => {
    const hideWelcomeMesasge = globalThis.localStorage.getItem('hideWelcomeMesasge')
    console.log({ hideWelcomeMesasge });

    if (!hideWelcomeMesasge) {
      handleOpen()
    }
  }, [])

  return (
    <>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          sx={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            minHeight: '100%',
            p: 3,
          }}
        >
          <Container maxWidth="sm">
            <Paper
              elevation={12}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: theme => alpha(theme.palette.success.main, 0.08),
                  color: 'success.main',
                  mb: 2,
                }}
              >
                <CheckIcon fontSize="small" />
              </Avatar>
              <Typography variant="h5">
                {t('This is a demo dashboard')}
              </Typography>
              <Typography
                align="center"
                color="textSecondary"
                sx={{ mt: 1 }}
                variant="body2"
              >
                <p>Welcome to My personalized dashboard! </p>
                <p>The data in this dashboard will reset every hours.</p>

              </Typography>
              <Button
                fullWidth size="large" sx={{ mt: 4 }} variant="contained"
                onClick={handleClose}
              >
                {t('Go to dashboard')}
              </Button>
            </Paper>
          </Container>
        </Box></Modal>
    </>
  );
}

export default WelcomeModal;