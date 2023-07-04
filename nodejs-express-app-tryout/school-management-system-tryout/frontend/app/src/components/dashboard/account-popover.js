import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from '@mui/material';

import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../hooks/use-auth';
import { Cog as CogIcon } from '../../icons/cog';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';
import { SwitchHorizontalOutlined as SwitchHorizontalOutlinedIcon } from '../../icons/switch-horizontal-outlined';
import { useTranslation } from 'react-i18next';

export const AccountPopover = props => {
  const { t } = useTranslation();

  const { anchorEl, onClose, open, ...other } = props;
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleClosePopover = () => {
    onClose?.();
  };

  const handleLogout = async () => {
    try {
      onClose?.();
      await logout();
      router.push('/').catch(console.error);
    } catch (err) {
      console.error(err);
      toast.error('Unable to logout.');
    }
  };

  if (!user) {
    if (process.env.NODE_ENV == 'development') {
      return <>user is null</>;
    } else {
      return <>logging out</>;
    }
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      keepMounted
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={0}
      {...other}
    >
      <Box sx={{ alignItems: 'center', p: 2, display: 'flex' }}>
        <Avatar src={user && user.avatar} sx={{ height: 40, width: 40 }}>
          <UserCircleIcon fontSize="small" />
        </Avatar>
        <Box sx={{ ml: 1 }}>
          <Typography variant="body1">{user.name}</Typography>
          <Typography color="textSecondary" variant="body2">
            Acme Inc
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ my: 1 }}>
        <NextLink href="/dashboard/social/profile" passHref>
          <MenuItem component="a" onClick={handleClosePopover}>
            <ListItemIcon>
              <UserCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">{t('Profile')}</Typography>}
            />
          </MenuItem>
        </NextLink>

        <NextLink href="/dashboard/account" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <CogIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">{t('Settings')}</Typography>}
            />
          </MenuItem>
        </NextLink>

        <NextLink href="/dashboard" passHref>
          <MenuItem component="a" onClick={handleClosePopover}>
            <ListItemIcon>
              <SwitchHorizontalOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1">
                  {t('Change organization')}
                </Typography>
              }
            />
          </MenuItem>
        </NextLink>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1">{t('Logout')}</Typography>}
          />
        </MenuItem>
      </Box>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
