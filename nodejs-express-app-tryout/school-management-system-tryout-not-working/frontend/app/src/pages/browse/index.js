import { useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { Grid, Box, Card, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BrowseLayout } from '../../components/browse-layout';
import { MainLayout } from '../../components/main-layout';
import { ExternalLink as ExternalLinkIcon } from '../../icons/external-link';
import { gtm } from '../../lib/gtm';

const getSections = mode => [
  {
    title: 'Data Display',
    items: [
      {
        title: 'Detail Lists',
        subtitle: '8 components',
        image: `/static/browse/data-display-detail-list_${mode}.png`,
        path: '/browse/data-display/detail-lists',
      },
      {
        title: 'Tables',
        subtitle: '11 components',
        image: `/static/browse/data-display-tables_${mode}.png`,
        path: '/browse/data-display/tables',
      },
      {
        title: 'Quick Stats',
        subtitle: '8 components',
        image: `/static/browse/data-display-quick-stats_${mode}.png`,
        path: '/browse/data-display/quick-stats',
      },
    ],
  },
  {
    title: 'Lists',
    items: [
      {
        title: 'Grouped Lists',
        subtitle: '11 components',
        image: `/static/browse/lists-grouped_${mode}.png`,
        path: '/browse/lists/grouped-lists',
      },
      {
        title: 'Grid Lists',
        subtitle: '6 components',
        image: `/static/browse/lists-grid_${mode}.png`,
        path: '/browse/lists/grid-lists',
      },
    ],
  },
  {
    title: 'Forms',
    items: [
      {
        title: 'Forms',
        subtitle: '17 components',
        image: `/static/browse/forms_${mode}.png`,
        path: '/browse/forms',
      },
    ],
  },
  {
    title: 'Overlays',
    items: [
      {
        title: 'Modals',
        subtitle: '12 components',
        image: `/static/browse/overlays-dialog_${mode}.png`,
        path: '/browse/modals',
      },
    ],
  },
  {
    title: 'Charts',
    items: [
      {
        title: 'Charts',
        subtitle: '12 components',
        image: `/static/browse/charts_${mode}.png`,
        path: '/browse/charts',
      },
    ],
  },
  {
    title: 'Components',
    items: [




      {
        title: 'mui-accordion',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-accordion',
      },

      {
        title: 'mui-container',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-container',
      },

      {
        title: 'mui-pagination',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-pagination',
      },

      {
        title: 'mui-stack',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-stack',
      },

      {
        title: 'mui-steppers',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-steppers',
      },

      {
        title: 'mui-switches',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-switches',
      },






      {
        title: 'mui-paper',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-paper',
      },

      {
        title: 'mui-popover',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-popover',
      },

      {
        title: 'mui-popper',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-popper',
      },

      {
        title: 'mui-portal',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-portal',
      },

      {
        title: 'mui-progress',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-progress',
      },

      {
        title: 'mui-radio-buttons',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-radio-buttons',
      },

      {
        title: 'mui-rating',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-rating',
      },

      {
        title: 'mui-selects',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-selects',
      },


      {
        title: 'mui-grid',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-grid',
      },

      {
        title: 'mui-grid2',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-grid2',
      },

      {
        title: 'mui-hidden',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-hidden',
      },

      {
        title: 'mui-icons',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-icons',
      },

      {
        title: 'mui-chips',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-chips',
      },

      {
        title: 'mui-box',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-box',
      },

      {
        title: 'mui-breadcrumbs',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-breadcrumbs',
      },

      // {
      //   title: 'mui-button-group',
      //   subtitle: '',
      //   image: '/static/browse/base-typography_${mode}.png',
      //   path: '/browse/mui-button-group',
      // },

      {
        title: 'mui-cards',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-cards',
      },

      {
        title: 'mui-checkboxes',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-checkboxes',
      },

      {
        title: 'mui-app-bar',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-app-bar',
      },

      {
        title: 'mui-autocomplete',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-autocomplete',
      },

      {
        title: 'mui-avatars',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-avatars',
      },

      {
        title: 'mui-badges',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-badges',
      },

      {
        title: 'mui-bottom-navigation',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-bottom-navigation',
      },



      {
        title: 'mui-dialogs',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-dialogs',
      },

      {
        title: 'mui-dividers',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-dividers',
      },

      {
        title: 'mui-drawers',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-drawers',
      },

      {
        title: 'mui-floating-action-button',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-floating-action-button',
      },

      {
        title: 'mui-image-list',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-image-list',
      },

      {
        title: 'mui-links',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-links',
      },

      {
        title: 'mui-lists',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-lists',
      },

      {
        title: 'mui-masonry',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-masonry',
      },

      {
        title: 'mui-material-icons',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-material-icons',
      },

      {
        title: 'mui-menus',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-menus',
      },

      {
        title: 'mui-modal',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-modal',
      },

      {
        title: 'mui-slider',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-slider',
      },

      {
        title: 'mui-snackbars',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-snackbars',
      },

      {
        title: 'mui-speed-dial',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-speed-dial',
      },



      {
        title: 'mui-table',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-table',
      },

      {
        title: 'mui-textarea-autosize',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-textarea-autosize',
      },

      {
        title: 'mui-text-fields',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-text-fields',
      },

      {
        title: 'mui-timeline',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-timeline',
      },

      {
        title: 'mui-transitions',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-transitions',
      },

      {
        title: 'mui-snackbars',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-snackbars',
      },

      {
        title: 'mui-tree-view',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-tree-view',
      },


      {
        title: 'mui-toggle-button',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-toggle-button',
      },
      {
        title: 'mui-tooltips',
        subtitle: '',
        image: '/static/browse/base-typography_${mode}.png',
        path: '/browse/mui-tooltips',
      },
      {
        title: 'mui-avatars',
        subtitle: '',
        image: `/static/browse/base-avatars_${mode}.png`,
        path: '/browse/mui-avatars',
      },
      {
        title: 'mui-tabs',
        subtitle: '',
        image: `/static/browse/base-tabs_${mode}.png`,
        path: '/browse/mui-tabs',
      },

      {
        title: 'mui-typography',
        subtitle: '',
        image: `/static/browse/base-typography_${mode}.png`,
        path: '/browse/mui-typography',
      },

      {
        title: 'mui-avatars',
        subtitle: '',
        image: `/static/browse/base-avatars_${mode}.png`,
        path: '/browse/mui-avatars',
      },
      {
        title: 'mui-backdrop',
        subtitle: '',
        image: `/static/browse/base-backdrop_${mode}.png`,
        path: '/browse/mui-backdrop',
      },
      {
        title: 'Buttons',
        subtitle: '',
        image: `/static/browse/base-buttons_${mode}.png`,
        path: '/browse/buttons',
      },
      {
        title: 'checkboxes',
        subtitle: '',
        image: `/static/browse/base-buttons_${mode}.png`,
        path: '/browse/checkboxes',
      },
      {
        title: 'Cards',
        subtitle: '',
        image: `/static/browse/base-buttons_${mode}.png`,
        path: '/browse/cards',
      },
      {
        title: 'Typography',
        subtitle: '',
        image: `/static/browse/base-typography_${mode}.png`,
        path: '/browse/typography',
      },
      {
        title: 'Colors',
        subtitle: '',
        image: `/static/browse/base-colors_${mode}.png`,
        path: '/browse/colors',
      },
      {
        title: 'Inputs',
        subtitle: '',
        image: `/static/browse/base-inputs_${mode}.png`,
        path: '/browse/inputs',
      },


    ],
  },
  {
    title: 'Surface',
    items: [
      {
        title: 'Accordions, accordions.js',
        subtitle: '',
        image: "/static/browse/base-buttons_${mode}.png",
        path: '/browse/cards',
      }, {
        title: 'AppBars, appbars.js',
        subtitle: '',
        image: "/static/browse/base-buttons_${mode}.png",
        path: '/browse/cards',
      }, {
        title: 'Cards, cards.js',
        subtitle: '',
        image: "/static/browse/base-buttons_${mode}.png",
        path: '/browse/cards',
      }, {
        title: 'Papers, papers.js',
        subtitle: '',
        image: "/static/browse/base-buttons_${mode}.png",
        path: '/browse/papers',
      }

    ]
  },
  { title: 'Inputs', items: [] },
  { title: 'Data-Display', items: [] },
  { title: 'Feedback', items: [] },
  { title: 'Surfaces', items: [] },
  { title: 'Navigation', items: [] }
];

const Browse = () => {
  const theme = useTheme();
  const sections = getSections(theme.palette.mode);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>Browse | Material Kit Pro</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.paper',
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          {sections.map(section => (
            <Grid
              key={`section-${section.title}`}
              container
              spacing={3}
              sx={{
                mt: 0,
                pb: 8,
                '& + &': {
                  borderTop: 1,
                  borderColor: 'divider',
                  pt: 5,
                },
              }}
            >
              <Grid item lg={3} xs={12}>
                <Typography sx={{ fontWeight: 600 }} variant="h5">
                  {section.title}
                </Typography>
              </Grid>
              <Grid container item lg={9} spacing={3} xs={12}>
                {section.items.map(item => (
                  <Grid item key={`item-${item.title}`} md={4} sm={6} xs={12}>
                    <NextLink href={item.path} passHref>
                      <Card
                        component="a"
                        target={item.newTab ? '_blank' : '_self'}
                        sx={{
                          display: 'block',
                          textDecoration: 'none',
                          // gridColumn: { xs: 'span 1', sm: 'span 1', },
                        }}
                        variant="outlined"
                      >
                        <Box sx={{ p: 2 }}>
                          <Box
                            sx={{
                              display: 'none',
                              position: 'relative',
                              pt: 'calc(300 / 500 * 100%)',
                              '& img': {
                                height: 'auto',
                                position: 'absolute',
                                top: 0,
                                width: '100%',
                              },
                            }}
                          >
                            <img alt="" src={item.image} />
                          </Box>
                          <Box
                            sx={{
                              alignItems: 'flex-end',
                              display: 'flex',
                            }}
                          >
                            <Typography sx={{ mt: 2 }} variant="subtitle2">
                              {item.title}
                            </Typography>
                            {item.newTab && (
                              <ExternalLinkIcon
                                sx={{ color: 'text.secondary', ml: 1.5 }}
                                fontSize="small"
                              />
                            )}
                          </Box>
                          <Typography color="textSecondary" variant="body2">
                            {item.subtitle}
                          </Typography>
                        </Box>
                      </Card>
                    </NextLink>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Container>
      </Box>
    </>
  );
};

Browse.getLayout = page => (
  <MainLayout>
    <BrowseLayout>{page}</BrowseLayout>
  </MainLayout>
);

export default Browse;
