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

// import { getInitials } from '../../../utils/get-initials';
import { getInitials } from 'src/utils/get-initials';

// import { Scrollbar } from '../../scrollbar';
import { Scrollbar } from 'src/components/scrollbar';
import { useTranslation } from 'react-i18next';

export const StudentListTable = props => {
  const {
    students,
    studentsCount,
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
    [students],
  );

  const handleSelectAllCustomers = event => {
    setSelectedCustomers(
      event.target.checked ? students.map(customer => customer.id) : [],
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
    selectedCustomers.length > 0 && selectedCustomers.length < students.length;
  const selectedAllCustomers = selectedCustomers.length === students.length;

  const studentId = '64a12f7d92da2661085fa445';

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
          Delete
        </Button>
        <Button size="small" sx={{ ml: 2 }}>
          Edit
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
            {students.map(student => {
              const isCustomerSelected = selectedCustomers.includes(student.id);

              return (
                <TableRow hover key={student.id} selected={isCustomerSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isCustomerSelected}
                      onChange={event =>
                        handleSelectOneCustomer(event, student.id)
                      }
                      value={isCustomerSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                      <Avatar
                        src={student.avatar}
                        sx={{ height: 42, width: 42 }}
                      >
                        {getInitials(student.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink href="/dashboard/students/1" passHref>
                          <Link color="inherit" variant="subtitle2">
                            {student.name}
                          </Link>
                        </NextLink>
                        <Typography color="textSecondary" variant="body2">
                          {student.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{`${student.city}, ${student.state}, ${student.country}`}</TableCell>
                  <TableCell>{student.totalOrders}</TableCell>
                  <TableCell>
                    <Typography color="success.main" variant="subtitle2">
                      {numeral(student.totalAmountSpent).format(
                        `${student.currency}0,0.00`,
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <NextLink
                      href={`/dashboard/students/${student.id}/edit`}
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href={`/dashboard/students/${student.id}`}
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
        count={studentsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

StudentListTable.propTypes = {
  customers: PropTypes.array.isRequired,
  customersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
