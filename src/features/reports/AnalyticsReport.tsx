import React from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Button, 
  Divider,
  Grid,
  LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import PieChartIcon from '@mui/icons-material/PieChart';

// Create styled component for consistent Paper styling
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  height: '100%',
  color: theme.palette.text.secondary,
  ...theme.applyStyles?.('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const AnalyticsReport: React.FC = () => {
  const { t } = useTranslation();
  
  // Mock analytics data
  const analyticsData = [
    { id: 1, metric: 'Page Views', value: 124568, previous: 98745, change: 26.15 },
    { id: 2, metric: 'Unique Visitors', value: 45732, previous: 38512, change: 18.75 },
    { id: 3, metric: 'Avg. Session Duration', value: '4:32', previous: '3:58', change: 14.29 },
    { id: 4, metric: 'Bounce Rate', value: '32%', previous: '38%', change: -15.79 }
  ];
  
  // Mock conversion data
  const conversionData = [
    { id: 1, source: 'Organic Search', rate: 68 },
    { id: 2, source: 'Direct', rate: 42 },
    { id: 3, source: 'Social Media', rate: 35 },
    { id: 4, source: 'Email', rate: 59 },
    { id: 5, source: 'Referral', rate: 47 }
  ];
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <Button 
          component={Link} 
          to="/reports" 
          startIcon={<ArrowBackIcon />}
          sx={{ mr: 2 }}
        >
          {t('common.back', 'Back')}
        </Button>
        <Typography variant="h4" component="h1">
          {t('reports.analytics.title', 'Analytics Dashboard')}
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {analyticsData.map(item => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.id}>
            <Item>
              <Typography variant="subtitle2" color="text.secondary">
                {item.metric}
              </Typography>
              <Typography variant="h5" sx={{ my: 1 }}>
                {item.value}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography 
                  variant="body2"
                  sx={{ 
                    color: item.change >= 0 ? 'success.main' : 'error.main',
                    fontWeight: 'bold'
                  }}
                >
                  {item.change > 0 ? '+' : ''}{item.change}%
                </Typography>
                <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                  vs previous period
                </Typography>
              </Box>
            </Item>
          </Grid>
        ))}
        
        <Grid size={{ xs: 12, md: 7 }}>
          <Item>
            <Typography variant="h6" gutterBottom>
              {t('reports.analytics.userEngagement', 'User Engagement')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box 
              sx={{ 
                height: 300, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                bgcolor: 'action.hover',
                borderRadius: 1
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                <PieChartIcon sx={{ mr: 1 }} />
                [Multi-chart Visualization]
              </Typography>
            </Box>
            
            <Typography variant="body1" sx={{ mt: 2 }}>
              {t('reports.analytics.engagementSummary', 'User engagement metrics show a healthy growth across all channels. Mobile engagement continues to lead with a 32% increase compared to the previous quarter.')}
            </Typography>
          </Item>
        </Grid>
        
        <Grid size={{ xs: 12, md: 5 }}>
          <Item>
            <Typography variant="h6" gutterBottom>
              {t('reports.analytics.conversionRates', 'Conversion Rates by Source')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {conversionData.map(item => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">{item.source}</Typography>
                  <Typography variant="body2" fontWeight="bold">{item.rate}%</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={item.rate}
                  sx={{ 
                    height: 8, 
                    borderRadius: 1,
                    backgroundColor: 'action.hover',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 1,
                    }
                  }}
                />
              </Box>
            ))}
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsReport;
