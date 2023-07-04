import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import { ArrowRight as ArrowRightIcon } from 'src/icons/arrow-right';
import { PencilAlt as PencilAltIcon } from 'src/icons/pencil-alt';

import { getInitials } from 'src/utils/get-initials';
import { Scrollbar } from 'src/components/scrollbar';
import { useTranslation } from 'react-i18next';

export const TeacherListTable = props => {
  const {
    teachers,
    teachersCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const { t } = useTranslation();

  // Reset selected customers when customers change
  useEffect(
    () => {
      if (selectedCustomers.length) {
        setSelectedCustomers([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [teachers],
  );

  const handleSelectAllCustomers = event => {
    setSelectedCustomers(
      event.target.checked ? teachers.map(customer => customer.id) : [],
    );
  };

  const handleSelectOneCustomer = (event, customerId) => {
    if (!selectedCustomers.includes(customerId)) {
      setSelectedCustomers(prevSelected => [...prevSelected, customerId]);
    } else {
      setSelectedCustomers(prevSelected =>
        prevSelected.filter(id => id !== customerId),
      );
    }
  };

  const enableBulkActions = selectedCustomers.length > 0;
  const selectedSomeCustomers =
    selectedCustomers.length > 0 && selectedCustomers.length < teachers.length;
  const selectedAllCustomers = selectedCustomers.length === teachers.length;


  return (
    <div {...other}>
      <Box
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.100',
          display: enableBulkActions ? 'block' : 'none',
          px: 2,
          py: 0.5,
        }}
      >
        <Checkbox
          checked={selectedAllCustomers}
          indeterminate={selectedSomeCustomers}
          onChange={handleSelectAllCustomers}
        />
        <Button size="small" sx={{ ml: 2 }}>
          {t('Delete')}
        </Button>
        <Button size="small" sx={{ ml: 2 }}>
          {t('Edit')}
        </Button>
      </Box>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead
            sx={{ visibility: enableBulkActions ? 'collapse' : 'visible' }}
          >
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAllCustomers}
                  indeterminate={selectedSomeCustomers}
                  onChange={handleSelectAllCustomers}
                />
              </TableCell>
              <TableCell>{t('Name')}</TableCell>
              <TableCell>{t('Location')}</TableCell>
              <TableCell>{t('Orders')}</TableCell>
              <TableCell>{t('Spent')}</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map(teacher => {
              const isCustomerSelected = selectedCustomers.includes(teacher.id);

              return (
                <TableRow hover key={teacher.id} selected={isCustomerSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isCustomerSelected}
                      onChange={event =>
                        handleSelectOneCustomer(event, teacher.id)
                      }
                      value={isCustomerSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                      <Avatar
                        src={teacher.avatar}
                        sx={{ height: 42, width: 42 }}
                      >
                        {getInitials(teacher.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink href={`/dashboard/teachers/${teacher.id}`} passHref>
                          <Link color="inherit" variant="subtitle2">
                            {teacher.name}
                          </Link>
                        </NextLink>
                        <Typography color="textSecondary" variant="body2">
                          {teacher.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{`${teacher.city}, ${teacher.state}, ${teacher.country}`}</TableCell>
                  <TableCell>{teacher.totalOrders}</TableCell>
                  <TableCell>
                    <Typography color="success.main" variant="subtitle2">
                      {numeral(teacher.totalAmountSpent).format(
                        `${teacher.currency}0,0.00`,
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <NextLink
                      href={`/dashboard/teachers/${teacher.id}/edit`}
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href={`/dashboard/teachers/${teacher.id}`}
                      passHref
                    >
                      <IconButton component="a">
                        <ArrowRightIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={teachersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

TeacherListTable.propTypes = {
  teachers: PropTypes.array.isRequired,
  teachersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
