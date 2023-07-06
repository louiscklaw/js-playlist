import { useEffect, useMemo, useRef, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { Calendar as CalendarIcon } from 'src/icons/calendar';
import { Cash as CashIcon } from 'src/icons/cash';
import { ChartBar as ChartBarIcon } from 'src/icons/chart-bar';
import { ChartPie as ChartPieIcon } from 'src/icons/chart-pie';
import { ChatAlt2 as ChatAlt2Icon } from 'src/icons/chat-alt2';
import { ClipboardList as ClipboardListIcon } from 'src/icons/clipboard-list';
import { CreditCard as CreditCardIcon } from 'src/icons/credit-card';
import { Home as HomeIcon } from 'src/icons/home';
import { LockClosed as LockClosedIcon } from 'src/icons/lock-closed';
import { Mail as MailIcon } from 'src/icons/mail';
import { MailOpen as MailOpenIcon } from 'src/icons/mail-open';
import { Newspaper as NewspaperIcon } from 'src/icons/newspaper';
import { OfficeBuilding as OfficeBuildingIcon } from 'src/icons/office-building';
import { ReceiptTax as ReceiptTaxIcon } from 'src/icons/receipt-tax';
import { Selector as SelectorIcon } from 'src/icons/selector';
import { Share as ShareIcon } from 'src/icons/share';
import { ShoppingBag as ShoppingBagIcon } from 'src/icons/shopping-bag';
import { ShoppingCart as ShoppingCartIcon } from 'src/icons/shopping-cart';
import { Truck as TruckIcon } from 'src/icons/truck';
import { UserCircle as UserCircleIcon } from 'src/icons/user-circle';
import { Users as UsersIcon } from 'src/icons/users';
import { XCircle as XCircleIcon } from 'src/icons/x-circle';
import { Logo } from '../../logo';
import { Scrollbar } from '../../scrollbar';
import { DashboardSidebarSection } from '../dashboard-sidebar-section';
import { OrganizationPopover } from '../organization-popover';

// bookmark: sidebar, config
const getSections = t => [
  {
    title: t('General'),
    items: [
      {
        title: t('Analytics'),
        path: '/dashboard/analytics',
        icon: <ChartBarIcon fontSize="small" />,
      },
      {
        title: t('Overview'),
        path: '/dashboard',
        icon: <HomeIcon fontSize="small" />,
        matching: 'exact',
      },

      {
        title: t('Account'),
        path: '/dashboard/account',
        icon: <UserCircleIcon fontSize="small" />,
      },
    ],
  },
  {
    title: t('Management'),
    items: [
      {
        title: t('Students'),
        path: '/dashboard/students',
        icon: <UsersIcon fontSize="small" />,
        matching: 'partial',
      },
      {
        title: t('Teachers'),
        path: '/dashboard/teachers',
        icon: <UsersIcon fontSize="small" />,
        matching: 'partial',
      },
      {
        title: t('Admins'),
        path: '/dashboard/admins',
        icon: <UsersIcon fontSize="small" />,
        matching: 'partial',
      },

      {
        title: t('Subjects'),
        path: '/dashboard/subjects',
        icon: <UsersIcon fontSize="small" />,
        matching: 'partial',
        // children: [
        //   { title: t('List'), path: '/dashboard/subjects' },
        //   { title: t('Details'), path: '/dashboard/subjects/1' },
        //   { title: t('Edit'), path: '/dashboard/subjects/1/edit' },
        // ],
      },
      {
        title: t('Schedules'),
        path: '/dashboard/schedules',
        icon: <UsersIcon fontSize="small" />,
        matching: 'partial',
        // children: [
        //   { title: t('List'), path: '/dashboard/schedules' },
        //   { title: t('Details'), path: '/dashboard/schedules/1' },
        //   { title: t('Edit'), path: '/dashboard/schedules/1/edit' },
        // ],
      },
      {
        title: t('Classrooms'),
        path: '/dashboard/classrooms',
        icon: <UsersIcon fontSize="small" />,
        matching: 'partial',
        // children: [
        //   { title: t('List'), path: '/dashboard/classrooms' },
        //   { title: t('Details'), path: '/dashboard/classrooms/1' },
        //   { title: t('Edit'), path: '/dashboard/classrooms/1/edit' },
        // ],
      },
      {
        title: t('Attendances'),
        path: '/dashboard/attendances',
        icon: <UsersIcon fontSize="small" />,
        matching: 'partial',
        // children: [
        //   { title: t('List'), path: '/dashboard/attendances' },
        //   { title: t('Details'), path: '/dashboard/attendances/1' },
        //   { title: t('Edit'), path: '/dashboard/attendances/1/edit' },
        // ],
      },
      {
        title: t('Exams'),
        path: '/dashboard/exams',
        icon: <UsersIcon fontSize="small" />,
        matching: 'partial',
        // children: [
        //   { title: t('List'), path: '/dashboard/exams' },
        //   { title: t('Details'), path: '/dashboard/exams/1' },
        //   { title: t('Edit'), path: '/dashboard/exams/1/edit' },
        // ],
      },
      {
        title: t('ExamResults'),
        path: '/dashboard/exam_results',
        icon: <UsersIcon fontSize="small" />,
        matching: 'partial',
        // children: [
        //   { title: t('List'), path: '/dashboard/exam_results' },
        //   { title: t('Details'), path: '/dashboard/exam_results/1' },
        //   { title: t('Edit'), path: '/dashboard/exam_results/1/edit' },
        // ],
      },
      {
        title: t('Payment Infos'),
        path: '/dashboard/payment_infos',
        icon: <UsersIcon fontSize="small" />,
        matching: 'partial',
        // children: [
        //   { title: t('List'), path: '/dashboard/payment_infos' },
        //   { title: t('Details'), path: '/dashboard/payment_infos/1' },
        //   { title: t('Edit'), path: '/dashboard/payment_infos/1/edit' },
        // ],
      },
      {
        title: t('Notifications'),
        path: '/dashboard/notifications',
        icon: <UsersIcon fontSize="small" />,
        matching: 'partial',
        // children: [
        //   { title: t('List'), path: '/dashboard/payment_infos' },
        //   { title: t('Details'), path: '/dashboard/payment_infos/1' },
        //   { title: t('Edit'), path: '/dashboard/payment_infos/1/edit' },
        // ],
      },
      {
        title: t('Permissions'),
        path: '/dashboard/permissions',
        icon: <UsersIcon fontSize="small" />,
        matching: 'partial',
        // children: [
        //   { title: t('List'), path: '/dashboard/payment_infos' },
        //   { title: t('Details'), path: '/dashboard/payment_infos/1' },
        //   { title: t('Edit'), path: '/dashboard/payment_infos/1/edit' },
        // ],
      },
      {
        title: t('Roles'),
        path: '/dashboard/roles',
        icon: <UsersIcon fontSize="small" />,
        matching: 'partial',
        // children: [
        //   { title: t('List'), path: '/dashboard/payment_infos' },
        //   { title: t('Details'), path: '/dashboard/payment_infos/1' },
        //   { title: t('Edit'), path: '/dashboard/payment_infos/1/edit' },
        // ],
      },
      {
        title: t('CMS'),
        path: '/dashboard/cms',
        icon: <UsersIcon fontSize="small" />,
        matching: 'partial',
        children: [
          { title: t('List'), path: '/dashboard/CMS' },
          { title: t('Details'), path: '/dashboard/CMS/1' },
          { title: t('Edit'), path: '/dashboard/CMS/1/edit' },
        ],
      },
      {
        title: t('Restaurants'),
        path: '/dashboard/restaurants',
        icon: <UsersIcon fontSize="small" />,
        matching: 'partial',
        // children: [
        //   { title: t('List'), path: '/dashboard/payment_infos' },
        //   { title: t('Details'), path: '/dashboard/payment_infos/1' },
        //   { title: t('Edit'), path: '/dashboard/payment_infos/1/edit' },
        // ],
      },
      {
        title: t('Products'),
        path: '/dashboard/foods',
        icon: <UsersIcon fontSize="small" />,
        matching: 'partial',
        children: [
          { title: t('Food'), path: '/dashboard/foods' },
          { title: t('Take away'), path: '/dashboard/take_aways' },
          { title: t('Food Set'), path: '/dashboard/food_sets' },
        ],
      },

      {
        title: t('Orders'),
        icon: <ShoppingCartIcon fontSize="small" />,
        path: '/dashboard/orders',
        children: [
          { title: t('List'), path: '/dashboard/orders' },
          { title: t('Details'), path: '/dashboard/orders/1' },
        ],
      },
      {
        title: t('Invoices'),
        path: '/dashboard/invoices',
        icon: <ReceiptTaxIcon fontSize="small" />,
        children: [
          { title: t('List'), path: '/dashboard/invoices' },
          { title: t('Details'), path: '/dashboard/invoices/1' },
        ],
      },
      {
        title: t('Mail'),
        path: '/dashboard/mail',
        icon: <MailIcon fontSize="small" />,
      },
    ],
  },
  {
    title: t('Contents'),
    items: [
      {
        title: t('Job Listings'),
        path: '/dashboard/jobs',
        icon: <OfficeBuildingIcon fontSize="small" />,
        children: [
          { title: t('Browse'), path: '/dashboard/jobs' },
          { title: t('Details'), path: '/dashboard/jobs/companies/1' },
          { title: t('Create'), path: '/dashboard/jobs/new' },
        ],
      },
      {
        title: t('Social Media'),
        path: '/dashboard/social',
        icon: <ShareIcon fontSize="small" />,
        children: [
          { title: t('Profile'), path: '/dashboard/social/profile' },
          { title: t('Feed'), path: '/dashboard/social/feed' },
        ],
      },
      {
        title: t('Blog'),
        path: '/blog',
        icon: <NewspaperIcon fontSize="small" />,
        children: [
          { title: t('Post List'), path: '/blog' },
          { title: t('Post Details'), path: '/blog/1' },
          { title: t('Post Create'), path: '/blog/new' },
        ],
      },
    ],
  },
  {
    title: t('Pages'),
    items: [
      {
        title: t('Kanban'),
        path: '/dashboard/kanban',
        icon: <ClipboardListIcon fontSize="small" />,
      },

      {
        title: t('Chat'),
        path: '/dashboard/chat',
        icon: <ChatAlt2Icon fontSize="small" />,
      },
      {
        title: t('Calendar'),
        path: '/dashboard/calendar',
        icon: <CalendarIcon fontSize="small" />,
      },
      {
        title: t('Products'),
        path: '/dashboard/products',
        icon: <ShoppingBagIcon fontSize="small" />,
        children: [
          { title: t('List'), path: '/dashboard/products' },
          { title: t('Create'), path: '/dashboard/products/new' },
        ],
      },
      {
        title: t('Customers'),
        path: '/dashboard/customers',
        icon: <UsersIcon fontSize="small" />,
        children: [
          { title: t('List'), path: '/dashboard/customers' },
          { title: t('Details'), path: '/dashboard/customers/1' },
          { title: t('Edit'), path: '/dashboard/customers/1/edit' },
        ],
      },
      {
        title: t('Auth'),
        path: '/authentication',
        icon: <LockClosedIcon fontSize="small" />,
        children: [
          {
            title: t('Register'),
            path: '/authentication/register?disableGuard=true',
          },
          {
            title: t('Login'),
            path: '/authentication/login?disableGuard=true',
          },
        ],
      },
      {
        title: t('Pricing'),
        path: '/dashboard/pricing',
        icon: <CreditCardIcon fontSize="small" />,
      },
      {
        title: t('Checkout'),
        path: '/checkout',
        icon: <CashIcon fontSize="small" />,
      },
      {
        title: t('Contact'),
        path: '/contact',
        icon: <MailOpenIcon fontSize="small" />,
      },
      {
        title: t('Error'),
        path: '/error',
        icon: <XCircleIcon fontSize="small" />,
        children: [
          { title: '401', path: '/401' },
          { title: '404', path: '/404' },
          { title: '500', path: '/500' },
        ],
      },

      {
        title: t('Finance'),
        path: '/dashboard/finance',
        icon: <ChartPieIcon fontSize="small" />,
      },
      {
        title: t('Logistics'),
        path: '/dashboard/logistics',
        icon: <TruckIcon fontSize="small" />,
        chip: (
          <Chip
            color="secondary"
            label={
              <Typography sx={{ fontSize: '10px', fontWeight: '600' }}>
                {t('NEW')}
              </Typography>
            }
            size="small"
          />
        ),
      },
    ],
  },
];

export const DashboardSidebar = props => {
  const { onClose, open } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const lgUp = useMediaQuery(theme => theme.breakpoints.up('lg'), {
    noSsr: true,
  });
  const sections = useMemo(() => getSections(t), [t]);
  const organizationsRef = useRef(null);
  const [openOrganizationsPopover, setOpenOrganizationsPopover] =
    useState(false);

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath],
  );

  const handleOpenOrganizationsPopover = () => {
    setOpenOrganizationsPopover(true);
  };

  const handleCloseOrganizationsPopover = () => {
    setOpenOrganizationsPopover(false);
  };

  const content = (
    <>
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div>
            <Box
              sx={{ p: 3 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <NextLink href="/" passHref>
                <a>
                  <Logo sx={{ height: 42, width: 42 }} />
                </a>
              </NextLink>
            </Box>
            <Box sx={{ px: 2 }}>
              <Box
                onClick={handleOpenOrganizationsPopover}
                ref={organizationsRef}
                sx={{
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  px: 3,
                  py: '11px',
                  borderRadius: 1,
                }}
              >
                <div>
                  <Typography color="inherit" variant="subtitle1">
                    Acme Inc
                  </Typography>
                  <Typography color="neutral.400" variant="body2">
                    {t('Your tier')} : {t('Premium')}
                  </Typography>
                </div>
                <SelectorIcon
                  sx={{ color: 'neutral.500', width: 14, height: 14 }}
                />
              </Box>
            </Box>
          </div>

          <Divider
            sx={{ borderColor: '#2D3748', my: 1 }}
            style={{ display: 'none' }}
          />

          <Box sx={{ flexGrow: 1 }}>
            {sections.map(section => (
              <DashboardSidebarSection
                key={section.title}
                path={router.asPath}
                sx={{
                  mt: 2,
                  '& + &': {
                    mt: 2,
                  },
                }}
                {...section}
              />
            ))}
          </Box>

          <Divider
            sx={{
              borderColor: '#2D3748', // dark divider
            }}
          />

          <Box sx={{ p: 2 }}>
            <Typography color="neutral.100" variant="subtitle2">
              {t('Need Help?')}
            </Typography>
            <Typography color="neutral.500" variant="body2">
              {t('Check our docs')}
            </Typography>

            {/* TODO: update documentation link */}
            <NextLink href="/docs/welcome" passHref>
              <Button
                color="secondary"
                component="a"
                fullWidth
                sx={{ mt: 2 }}
                variant="contained"
              >
                {t('Documentation')}
              </Button>
            </NextLink>
          </Box>

        </Box>
      </Scrollbar>
      <OrganizationPopover
        anchorEl={organizationsRef.current}
        onClose={handleCloseOrganizationsPopover}
        open={openOrganizationsPopover}
      />
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            borderRightColor: 'divider',
            borderRightStyle: 'solid',
            borderRightWidth: theme => (theme.palette.mode === 'dark' ? 1 : 0),
            color: '#FFFFFF',
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280,
        },
      }}
      sx={{ zIndex: theme => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
