import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import WarningIcon from '@mui/icons-material/WarningOutlined';
import { useTranslation } from 'react-i18next';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CancelIcon from '@mui/icons-material/Cancel';

export const Modal13 = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{ backgroundColor: 'background.default', minHeight: '100%', p: 3 }}
    >
      <Container maxWidth="sm">
        <Paper elevation={12}>
          <Box sx={{ display: 'flex', pb: 2, pt: 3, px: 3 }}>
            <Avatar
              sx={{
                backgroundColor: theme => alpha(theme.palette.error.main, 0.08),
                color: 'error.main',
                mr: 2,
              }}
            >
              <WarningIcon fontSize="small" />
            </Avatar>
            <div>
              <Typography variant="h5">{t('Deactivate account')}</Typography>
              <Typography color="textSecondary" sx={{ mt: 1 }} variant="body2">
                Are you sure you want to deactivate your account? All of your
                data will be permanently removed. This action cannot be undone.
              </Typography>
            </div>
          </Box>

          <Box sx={{ display: 'flex', px: 3, py: 1.5 }}>
            <Button
              startIcon={<CancelIcon />}
              sx={{ mr: 2 }}
              variant="outlined"
            >
              {t('取消')}
            </Button>

            <Button
              startIcon={<DeleteForeverIcon />}
              sx={{
                backgroundColor: 'error.main',
                '&:hover': { backgroundColor: 'error.dark' },
              }}
              variant="contained"
            >
              {t('停用')}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
