import { Box } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import PuffLoader from 'react-spinners/PuffLoader';

const LoadingTable = resource_name => {
  const { t } = useTranslation();
  let [color, setColor] = useState('#10B981');
  let [loading, setLoading] = useState(true);

  return (
    <>
      <Stack
        spacing={2}
        sx={{ height: '80vh', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box></Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <PuffLoader color="#36d7b7" height={70} radius={10} width={8} />

            <Box sx={{ mt: '1rem' }}>{`loading ...`}</Box>
          </Box>
        </Box>
        <Box></Box>
      </Stack>
    </>
  );
};

export default LoadingTable;
