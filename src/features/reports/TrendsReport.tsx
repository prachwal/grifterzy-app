import React from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Button, 
  Divider,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

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

const TrendsReport: React.FC = () => {
  const { t } = useTranslation();
  
  // Mock trends data
  const trendsData = [
    { id: 1, category: 'Mobile', value: 62, trend: 'up', change: 12.3 },
    { id: 2, category: 'Desktop', value: 28, trend: 'down', change: 5.7 },
    { id: 3, category: 'Tablet', value: 10, trend: 'up', change: 2.1 },
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
          {t('reports.trends.title', 'Trend Analysis')}
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Item>
            <Typography variant="h6" gutterBottom>
              {t('reports.trends.marketTrends', 'Market Trends')}
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
              <Typography variant="body2" color="text.secondary">
                [Line Chart Visualization]
              </Typography>
            </Box>
          </Item>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Item>
            <Typography variant="h6" gutterBottom>
              {t('reports.trends.platformDistribution', 'Platform Distribution')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {trendsData.map(item => (
              <Box 
                key={item.id} 
                sx={{ 
                  mb: 2,
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: 'background.default',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Box>
                  <Typography variant="subtitle2">{item.category}</Typography>
                  <Typography variant="h5" sx={{ my: 0.5 }}>{item.value}%</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {item.trend === 'up' ? (
                    <TrendingUpIcon sx={{ color: 'success.main', mr: 0.5 }} />
                  ) : (
                    <TrendingDownIcon sx={{ color: 'error.main', mr: 0.5 }} />
                  )}
                  <Typography 
                    variant="body2"
                    sx={{ 
                      color: item.trend === 'up' ? 'success.main' : 'error.main',
                      fontWeight: 'bold'
                    }}
                  >
                    {item.trend === 'up' ? '+' : '-'}{Math.abs(item.change).toFixed(1)}%
                  </Typography>
                </Box>
              </Box>
            ))}
          </Item>
        </Grid>
        
        <Grid size={{ xs: 12 }}>
          <Item>
            <Typography variant="h6" gutterBottom>
              {t('reports.trends.seasonalPatterns', 'Seasonal Patterns')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box 
              sx={{ 
                height: 250, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                bgcolor: 'action.hover',
                borderRadius: 1
              }}
            >
              <Typography variant="body2" color="text.secondary">
                [Area Chart Visualization]
              </Typography>
            </Box>
            
            <Typography variant="body1" sx={{ mt: 2 }}>
              {t('reports.trends.seasonalDescription', 'Seasonal analysis shows distinctive patterns in user engagement throughout the year. Q4 consistently shows the highest activity levels, while Q2 tends to have lower engagement metrics. Understanding these patterns can help with resource allocation and marketing campaign timing.')}
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrendsReport;
