import * as React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';

export function StandaloneToggleButton() {
  const [selected, setSelected] = React.useState(false);

  return (
    <ToggleButton
      value="check"
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
    >
      <CheckIcon />
    </ToggleButton>
  );
}
