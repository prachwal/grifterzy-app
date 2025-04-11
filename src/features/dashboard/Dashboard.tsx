import React from 'react';
import { Typography, Paper, Box, Divider, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Counter from '../../components/Counter';
import LanguageSwitcher from '../../components/common/LanguageSwitcher';
import ThemeToggler from '../../components/common/ThemeToggler';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2
        }}
      >
        <Typography variant="h4" component="h1">
          {t('dashboard.title', 'Dashboard')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <LanguageSwitcher />
          <ThemeToggler />
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }} > 
          <Paper
            elevation={2}
            sx={{
              p: 2,
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Typography variant="h6" gutterBottom>
              {t('dashboard.totalUsers', 'Total Users')}
            </Typography>
            <Typography variant="h3" sx={{ mt: 2, color: 'primary.main' }}>
              1,245
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Typography variant="h6" gutterBottom>
              {t('dashboard.newOrders', 'New Orders')}
            </Typography>
            <Typography variant="h3" sx={{ mt: 2, color: 'success.main' }}>
              64
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Typography variant="h6" gutterBottom>
              {t('dashboard.revenue', 'Revenue')}
            </Typography>
            <Typography variant="h3" sx={{ mt: 2, color: 'secondary.main' }}>
              $12,634
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Typography variant="h6" gutterBottom>
              {t('dashboard.tasks', 'Tasks')}
            </Typography>
            <Typography variant="h3" sx={{ mt: 2, color: 'error.main' }}>
              23
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h6" gutterBottom>
              {t('dashboard.counterDemo', 'Counter Demo')}
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Counter />
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h6" gutterBottom>
              {t('dashboard.recentActivity', 'Recent Activity')}
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Box sx={{ flexGrow: 1 }}>
              {[...Array(5)].map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant="body2">
                    {t('dashboard.activity.user', 'User')} #{index + 1}{' '}
                    {t('dashboard.activity.action', 'performed an action')}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary' }}
                  >
                    {index * 2 + 1}{' '}
                    {t('dashboard.activity.timeAgo', 'minutes ago')}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
