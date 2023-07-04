import WarningIcon from '@mui/icons-material/WarningOutlined';
import { useFormik } from 'formik';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import toast from 'react-hot-toast';
import { X as XIcon } from 'src/icons/x';

import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

import * as Yup from 'yup';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  IconButton,
  Modal,
  Paper,
  Switch,
  TextField,
  Typography,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { studentApi } from 'src/api/student-api';

export const StudentEditForm = props => {
  const { t } = useTranslation();
  const route = useRouter();

  const { student, ...other } = props;

  const formik = useFormik({
    initialValues: {
      address1: student.address1 || '',
      address2: student.address2 || '',
      country: student.country || '',
      email: student.email || '',
      hasDiscount: student.hasDiscount || false,
      isVerified: student.isVerified || false,
      name: student.name || '',
      phone: student.phone || '',
      state: student.state || '',
      submit: null,
    },
    validationSchema: Yup.object({
      address1: Yup.string().max(255),
      address2: Yup.string().max(255),
      country: Yup.string().max(255),
      email: Yup.string()
        .email(t('Must be a valid email'))
        .max(255)
        .required(t('Email is required')),
      hasDiscount: Yup.bool(),
      isVerified: Yup.bool(),
      name: Yup.string().max(255).required(t('Name is required')),
      phone: Yup.string().max(15),
      state: Yup.string().max(255),
    }),
    onSubmit: async (values, helpers) => {
      // backend/src/validations/student.validation.js
      const payload = {
        email: values.email,
        password: values.password,
        name: values.name,
        address1: values.address1,
        address2: values.address2,
        country: values.country,
        hasDiscount: values.hasDiscount,
        phone: values.phone,
        state: values.state,
        isVerified: values.isVerified,
      };

      await studentApi
        .updateStudentById(student.id, payload)
        .then(response => {
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
          toast.success(t('Student updated!'));
        })
        .catch(err => {
          console.error(err);
          toast.error(t('Something went wrong!'));

          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        });
    },
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    p: 4,
  };

  const handleDeleteStudent = async () => {
    await studentApi
      .deleteStudentById(student.id)
      .then(() => {
        toast.success(t('Student deleted!'));
        handleClose();
        route.replace(`/dashboard/students`);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container maxWidth="sm">
            <Paper elevation={12} sx={{ position: 'relative' }}>
              <IconButton sx={{ position: 'absolute', top: 8, right: 8 }}>
                <XIcon fontSize="small" />
              </IconButton>
              <Box sx={{ display: 'flex', pb: 2, pt: 3, px: 3 }}>
                <Avatar
                  sx={{ backgroundColor: 'white', color: 'error.main', mr: 2 }}
                >
                  <WarningIcon fontSize="small" />
                </Avatar>
                <div>
                  <Typography variant="h5">
                    {t('Deactivate account')}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    sx={{ mt: 1 }}
                    variant="body2"
                  >
                    Are you sure you want to deactivate your account? All of
                    your data will be permanently removed. This action cannot be
                    undone.
                  </Typography>
                </div>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  px: 3,
                  py: 1.5,
                }}
              >
                <Button
                  onClick={handleClose}
                  sx={{ mr: 2 }}
                  variant="outlined"
                  startIcon={<CancelIcon />}
                >
                  {t('Cancel')}
                </Button>
                <Button
                  sx={{
                    backgroundColor: 'error.main',
                    '&:hover': { backgroundColor: 'error.dark' },
                  }}
                  variant="contained"
                  onClick={handleDeleteStudent}
                  startIcon={<DeleteIcon />}
                >
                  {t('Delete')}
                </Button>
              </Box>
            </Paper>
          </Container>
        </Box>
      </Modal>

      <form onSubmit={formik.handleSubmit} {...other}>
        <Card>
          <CardHeader title={t('Edit student')} />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Full name"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.name}
                  disabled={formik.isSubmitting}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.email}
                  disabled={formik.isSubmitting}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(
                    formik.touched.country && formik.errors.country,
                  )}
                  fullWidth
                  helperText={formik.touched.country && formik.errors.country}
                  label="Country"
                  name="country"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.country}
                  disabled={formik.isSubmitting}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.state && formik.errors.state)}
                  fullWidth
                  helperText={formik.touched.state && formik.errors.state}
                  label="State/Region"
                  name="state"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.state}
                  disabled={formik.isSubmitting}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(
                    formik.touched.address1 && formik.errors.address1,
                  )}
                  fullWidth
                  helperText={formik.touched.address1 && formik.errors.address1}
                  label="Address 1"
                  name="address1"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.address1}
                  disabled={formik.isSubmitting}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(
                    formik.touched.address2 && formik.errors.address2,
                  )}
                  fullWidth
                  helperText={formik.touched.address2 && formik.errors.address2}
                  label="Address 2"
                  name="address2"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.address2}
                  disabled={formik.isSubmitting}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.phone && formik.errors.phone)}
                  fullWidth
                  helperText={formik.touched.phone && formik.errors.phone}
                  label="Phone number"
                  name="phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                mt: 3,
              }}
            >
              <div>
                <Typography gutterBottom variant="subtitle1">
                  Make Contact Info Public
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body2"
                  sx={{ mt: 1 }}
                >
                  Means that anyone viewing your profile will be able to see
                  your contacts details
                </Typography>
              </div>
              <Switch
                checked={formik.values.isVerified}
                color="primary"
                edge="start"
                name="isVerified"
                onChange={formik.handleChange}
                value={formik.values.isVerified}
                disabled={formik.isSubmitting}
              />
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <Typography gutterBottom variant="subtitle1">
                  Available to hire
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body2"
                  sx={{ mt: 1 }}
                >
                  Toggling this will let your teammates know that you are
                  available for acquiring new projects
                </Typography>
              </div>
              <Switch
                checked={formik.values.hasDiscount}
                color="primary"
                edge="start"
                name="hasDiscount"
                onChange={formik.handleChange}
                value={formik.values.hasDiscount}
                disabled={formik.isSubmitting}
              />
            </Box>
          </CardContent>
          <CardActions sx={{ flexWrap: 'wrap', m: -1 }}>
            <LoadingButton
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
              type="submit"
              sx={{ m: 1 }}
              variant="contained"
              startIcon={<SaveIcon />}
            >
              {t('Update')}
            </LoadingButton>
            <NextLink href="/dashboard/customers/1" passHref>
              <Button
                component="a"
                disabled={formik.isSubmitting}
                sx={{ m: 1, mr: 'auto' }}
                variant="outlined"
                startIcon={<CancelIcon />}
              >
                {t('Cancel')}
              </Button>
            </NextLink>

            <Button
              // loading={formik.isSubmitting}
              // disabled={formik.isSubmitting}
              color="error"
              onClick={handleOpen}
              disabled={open}
              startIcon={<DeleteIcon />}
            >
              {t('Delete user')}
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
};

StudentEditForm.propTypes = {
  customer: PropTypes.object.isRequired,
};
