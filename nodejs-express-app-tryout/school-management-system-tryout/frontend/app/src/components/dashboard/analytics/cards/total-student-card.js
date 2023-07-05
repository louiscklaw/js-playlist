import {
  Box,
  Button,
  Card,
  CardActions,
  Divider,
  Typography,
} from '@mui/material';

import { alpha, useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { studentApi } from 'src/api/student-api';
import { Chart } from 'src/components/chart';
import { useMounted } from 'src/hooks/use-mounted';
import { ArrowRight as ArrowRightIcon } from 'src/icons/arrow-right';

const LineChart = () => {
  const theme = useTheme();

  const chartOptions = {
    chart: {
      background: 'transparent',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ['#2F3EB1'],
    dataLabels: { enabled: false },
    fill: { opacity: 1 },
    grid: { show: false },
    stroke: { width: 3 },
    theme: { mode: theme.palette.mode },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      show: false,
    },
  };

  const chartSeries = [{ data: [0, 60, 30, 60, 0, 30, 10, 30, 0] }];

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="line"
      width={120}
    />
  );
};

const TotalStudentCard = () => {
  const { t } = useTranslation();
  const isMounted = useMounted();
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    if (isMounted) {
      studentApi
        .getStudentCount()
        .then(({ data }) => setStudentCount(data.count));
    }
  }, [isMounted]);

  return (
    <>
      <Card>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            px: 3,
            py: 2,
          }}
        >
          <div>
            <Typography color="textSecondary" variant="body2">
              {t('Students')}
            </Typography>
            <Typography sx={{ mt: 1 }} variant="h5">
              {studentCount}
            </Typography>
          </div>
          <LineChart />
        </Box>
        <Divider />
        <CardActions>
          <Button endIcon={<ArrowRightIcon fontSize="small" />}>
            See all visits
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default TotalStudentCard;
