import NextLink from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import Head from 'next/head';

import { Download as DownloadIcon } from 'src/icons/download';
import { Plus as PlusIcon } from 'src/icons/plus';
import { Search as SearchIcon } from 'src/icons/search';
import { Upload as UploadIcon } from 'src/icons/upload';
import { AuthGuard } from 'src/components/authentication/auth-guard';
import { DashboardLayout } from 'src/components/dashboard/dashboard-layout';
import { AttendanceListTable } from 'src/components/dashboard/attendance/attendance-list-table';
import { useMounted } from 'src/hooks/use-mounted';
import { gtm } from 'src/lib/gtm';

import { useTranslation } from 'react-i18next';
import { studentApi } from 'src/api/student-api';

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'Accepts Marketing', value: 'hasAcceptedMarketing' },
  { label: 'Prospect', value: 'isProspect' },
  { label: 'Returning', value: 'isReturning' },
];

const sortOptions = [
  { label: 'Last update (newest)', value: 'updatedAt|desc' },
  { label: 'Last update (oldest)', value: 'updatedAt|asc' },
  { label: 'Total orders (highest)', value: 'totalOrders|desc' },
  { label: 'Total orders (lowest)', value: 'totalOrders|asc' },
];

const applyFilters = (customers, filters) =>
  customers.filter(customer => {
    if (filters.query) {
      let queryMatched = false;
      const properties = ['email', 'name'];

      properties.forEach(property => {
        if (
          customer[property].toLowerCase().includes(filters.query.toLowerCase())
        ) {
          queryMatched = true;
        }
      });

      if (!queryMatched) {
        return false;
      }
    }

    if (filters.hasAcceptedMarketing && !customer.hasAcceptedMarketing) {
      return false;
    }

    if (filters.isProspect && !customer.isProspect) {
      return false;
    }

    if (filters.isReturning && !customer.isReturning) {
      return false;
    }

    return true;
  });

const descendingComparator = (a, b, sortBy) => {
  // When compared to something undefined, always returns false.
  // This means that if a field does not exist from either element ('a' or 'b') the return will be 0.

  if (b[sortBy] < a[sortBy]) {
    return -1;
  }

  if (b[sortBy] > a[sortBy]) {
    return 1;
  }

  return 0;
};

const getComparator = (sortDir, sortBy) =>
  sortDir === 'desc'
    ? (a, b) => descendingComparator(a, b, sortBy)
    : (a, b) => -descendingComparator(a, b, sortBy);

const applySort = (customers, sort) => {
  const [sortBy, sortDir] = sort.split('|');
  const comparator = getComparator(sortDir, sortBy);
  const stabilizedThis = customers.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map(el => el[0]);
};

const applyPagination = (customers, page, rowsPerPage) =>
  customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const StudentList = () => {
  const { t } = useTranslation();
  const isMounted = useMounted();
  const queryRef = useRef(null);
  const [students, setStudents] = useState([]);
  const [currentTab, setCurrentTab] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    query: '',
    hasAcceptedMarketing: undefined,
    isProspect: undefined,
    isReturning: undefined,
  });

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getStudents = useCallback(async () => {
    try {
      // const data = await customerApi.getStudents();
      const data = await studentApi.getStudents();

      if (isMounted()) {
        setStudents(data.results);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getStudents();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleTabsChange = (event, value) => {
    const updatedFilters = {
      ...filters,
      hasAcceptedMarketing: undefined,
      isProspect: undefined,
      isReturning: undefined,
    };

    if (value !== 'all') {
      updatedFilters[value] = true;
    }

    setFilters(updatedFilters);
    setCurrentTab(value);
  };

  const handleQueryChange = event => {
    event.preventDefault();
    setFilters(prevState => ({
      ...prevState,
      query: queryRef.current?.value,
    }));
  };

  const handleSortChange = event => {
    setSort(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredStudents = applyFilters(students, filters);
  const sortedStudents = applySort(filteredStudents, sort);
  const paginatedStudents = applyPagination(sortedStudents, page, rowsPerPage);

  return (
    <>
      <Head>
        <title>Dashboard: Student List | Material Kit Pro</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">{t('Attendances')}</Typography>
              </Grid>

              <Grid item>
                <Grid container>
                  <Grid item>
                    <Button startIcon={<UploadIcon fontSize="small" />}>
                      {t('Import')}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      startIcon={<DownloadIcon fontSize="small" />}
                      sx={{ ml: 1 }}
                    >
                      {t('Export')}
                    </Button>
                  </Grid>
                  <Grid item>
                    <NextLink href="/dashboard/students/add" passHref>
                      <Button
                        startIcon={<PlusIcon fontSize="small" />}
                        variant="contained"
                        sx={{ ml: 1 }}
                      >
                        {t('Add')}
                      </Button>
                    </NextLink>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Card>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ px: 3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map(tab => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
            <Divider />
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
                m: -1.5,
                p: 3,
              }}
            >
              <Box
                component="form"
                onSubmit={handleQueryChange}
                sx={{ flexGrow: 1, m: 1.5 }}
              >
                <TextField
                  defaultValue=""
                  fullWidth
                  inputProps={{ ref: queryRef }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search students"
                />
              </Box>
              <TextField
                label="Sort By"
                name="sort"
                onChange={handleSortChange}
                select
                SelectProps={{ native: true }}
                sx={{ m: 1.5 }}
                value={sort}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Box>

            <AttendanceListTable
              attendances={paginatedStudents}
              attendancesCount={filteredStudents.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPage={rowsPerPage}
              page={page}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

StudentList.getLayout = page => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default StudentList;
