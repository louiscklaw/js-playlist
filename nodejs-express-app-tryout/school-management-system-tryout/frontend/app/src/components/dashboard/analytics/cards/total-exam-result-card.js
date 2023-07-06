import {
  Box,
  Button,
  Card,
  CardActions,
  Divider,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';

import { alpha, useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { adminApi } from 'src/api/admin-api';
import { examResultApi } from 'src/api/exam_result-api';
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

const TotalExamResultCard = () => {
  const { t } = useTranslation();
  const isMounted = useMounted();
  const [examResultCount, setExamResultCount] = useState(0);

  useEffect(() => {
    if (isMounted) {
      examResultApi
        .getExamResultCount()
        .then(({ data }) => setExamResultCount(data.count));
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
              {t('ExamResult')}
            </Typography>

            <Typography sx={{ mt: 1 }} variant="h5">
              {examResultCount}
            </Typography>
          </div>
          <LineChart />
        </Box>
        <Divider />

        <CardActions>
          <NextLink href="/dashboard/exam-results" passHref>
            <Button endIcon={<ArrowRightIcon fontSize="small" />}>
              {t('See all visits')}
            </Button>
          </NextLink>
        </CardActions>
      </Card>
    </>
  );
};

export default TotalExamResultCard;
