import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export const TestMuiButton = () => (
  <Box
    sx={{
      backgroundColor: 'background.paper',
      p: 2,
    }}
  >
    <Box>
      <Button variant="text">Text</Button>
      <Button sx={{ ml: 1 }} variant="contained">
        Contained
      </Button>
      <Button sx={{ ml: 1 }} variant="outlined">
        Outlined
      </Button>
    </Box>

    <Box sx={{ mt: 1 }}>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Box>

    <Box sx={{ mt: 1 }}>
      <Button variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
    </Box>
  </Box>
);
