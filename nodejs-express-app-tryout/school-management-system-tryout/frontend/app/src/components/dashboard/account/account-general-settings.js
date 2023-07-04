import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'src/hooks/use-auth';
import { useMounted } from 'src/hooks/use-mounted';
import { useUser } from 'src/hooks/use-user';
import { UserCircle as UserCircleIcon } from 'src/icons/user-circle';
import * as Yup from 'yup';

import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

export const AccountGeneralSettings = props => {
  const { t } = useTranslation();
  const isMounted = useMounted();
  const [saving, setSaving] = useState(false);

  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`
  // const user = {
  //   avatar: '/static/mock-images/avatars/avatar-anika_visser.png',
  //   name: 'Anika Visser',
  // };
  const { user, updateSelfBasicDetails, updateSelfBasicDetailsDone } =
    useAuth();

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user.email,
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required(t('name is required')),
    }),
    onSubmit: async (values, helpers) => {
      try {
        setSaving(true);
        const payload = { ...values, email: user.email };
        console.log(payload);

        await updateSelfBasicDetails(payload)
          .then(() => updateSelfBasicDetailsDone())
          .catch(err => console.error(err));

        if (isMounted()) {
          //     const returnUrl = router.query.returnUrl || '/dashboard';
          //     router.push(returnUrl).catch(console.error);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          //     if (err.code === 'UserNotConfirmedException') {
          //       sessionStorage.setItem('username', values.email);
          //       router.push('/authentication/verify-code').catch(console.error);
          //       return;
          //     }

          helpers.setStatus({ success: false });
          //     helpers.setErrors({ submit: err.message });
          //     helpers.setSubmitting(false);
        }
      } finally {
        setSaving(false);
      }
    },
  });

  return (
    <Box sx={{ mt: 4 }} {...props}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">{t('Basic details')}</Typography>
            </Grid>

            <Grid item md={8} xs={12}>
              <Box sx={{ alignItems: 'center', display: 'flex' }}>
                <Avatar
                  src={'user.avatar'}
                  sx={{ height: 64, mr: 2, width: 64 }}
                >
                  <UserCircleIcon fontSize="small" />
                </Avatar>
                <Button>{t('Change')}</Button>
              </Box>

              <form noValidate onSubmit={formik.handleSubmit} {...props}>
                <Box sx={{ display: 'flex', mt: 3, alignItems: 'center' }}>
                  <TextField
                    disabled={saving}
                    defaultValue={user?.name || ''}
                    label="Full Name"
                    size="small"
                    sx={{ flexGrow: 1, mr: 3 }}
                    {...formik.getFieldProps('name')}
                  />
                  <LoadingButton
                    loading={saving}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    type="submit"
                  >
                    {t('Save')}
                  </LoadingButton>
                </Box>
              </form>

              <Box sx={{ display: 'flex', mt: 3, alignItems: 'center' }}>
                <TextField
                  defaultValue={user.email}
                  disabled
                  label={t('Email Address')}
                  required
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderStyle: 'dashed',
                    },
                  }}
                />
                <LoadingButton
                  loading={saving}
                  loadingPosition="start"
                  startIcon={<EditIcon />}
                  type="submit"
                >
                  {t('Edit')}
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Public profile</Typography>
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 3,
                }}
              >
                <div>
                  <Typography variant="subtitle1">
                    {t('Make Contact Info Public')}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    sx={{ mt: 1 }}
                    variant="body2"
                  >
                    Means that anyone viewing your profile will be able to see
                    your contacts details.
                  </Typography>
                </div>
                <Switch />
              </Box>

              <Divider />

              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 3,
                }}
              >
                <div>
                  <Typography variant="subtitle1">
                    {t('Available to hire')}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    sx={{ mt: 1 }}
                    variant="body2"
                  >
                    Toggling this will let your teammates know that you are
                    available for acquiring new projects.
                  </Typography>
                </div>
                <Switch defaultChecked />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">{t('Delete Account')}</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Typography sx={{ mb: 3 }} variant="subtitle1">
                Delete your account and all of your source data. This is
                irreversible.
              </Typography>
              <Button color="error" variant="outlined">
                {t('Delete account')}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
