import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from '@mui/material';

const languageOptions = {
  en: {
    icon: '/static/icons/uk_flag.svg',
    label: 'English',
  },
  cn: {
    icon: '/static/icons/cn_flag.svg',
    label: 'Chinese (Simplified)',
  },
  hk: {
    icon: '/static/icons/hk_flag.svg',
    label: 'Chinese (Traditional)',
  },
  jp: {
    icon: '/static/icons/jp_flag.svg',
    label: 'Japanese',
  },
};

export const LanguagePopover = props => {
  const { anchorEl, onClose, open, ...other } = props;
  const { i18n, t } = useTranslation();

  const handleChange = async language => {
    onClose?.();
    await i18n.changeLanguage(language);
    toast.success(t('Language changed'));
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom',
      }}
      keepMounted
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 240 } }}
      transitionDuration={0}
      {...other}
    >
      {Object.keys(languageOptions).map(language => (
        <MenuItem onClick={() => handleChange(language)} key={language}>
          <ListItemIcon>
            <Box
              sx={{
                display: 'flex',
                height: 20,
                width: 20,
                '& img': {
                  width: '100%',
                },
              }}
            >
              <img
                alt={languageOptions[language].label}
                src={languageOptions[language].icon}
              />
            </Box>
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="subtitle2">
                {languageOptions[language].label}
              </Typography>
            }
          />
        </MenuItem>
      ))}
    </Popover>
  );
};

LanguagePopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
