import { useState, useRef } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useTranslation } from 'react-i18next';

const options = [
  'Create a merge commit',
  'Squash and merge',
  'Rebase and merge',
];

export const Buttons4 = () => {
  const { t } = useTranslation();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleMenuItemClick = index => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Box sx={{ backgroundColor: 'background.paper', p: 3 }}>
      <LoadingButton loading variant="outlined">
        Submit
      </LoadingButton>
      <LoadingButton
        loading
        loadingIndicator="Loading…"
        variant="outlined"
        sx={{ ml: 1 }}
      >
        Fetch data
      </LoadingButton>
      <LoadingButton
        loading
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="outlined"
        sx={{ ml: 1 }}
      >
        {t('Save')}
      </LoadingButton>

      <Box sx={{ mt: 1 }}>
        <ButtonGroup ref={anchorRef} variant="contained">
          <LoadingButton loading variant="outlined">
            Submit
          </LoadingButton>
          <LoadingButton loading loadingIndicator="Loading…" variant="outlined">
            Fetch data
          </LoadingButton>
          <LoadingButton
            loading
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
          >
            Save
          </LoadingButton>
        </ButtonGroup>
      </Box>

      <Popper anchorEl={anchorRef.current} open={open} transition>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      disabled={index === 2}
                      key={option}
                      onClick={() => handleMenuItemClick(index)}
                      selected={index === selectedIndex}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};
