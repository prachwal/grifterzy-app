import React from 'react';
import { 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  CardMedia,
  Divider
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import PieChartIcon from '@mui/icons-material/PieChart';

const ReportsHome: React.FC = () => {
  const { t } = useTranslation();
  
  const reportTypes = [
    {
      id: 'sales',
      title: t('reports.sales.title', 'Sales Reports'),
      description: t('reports.sales.description', 'View comprehensive reports on sales performance, revenue trends, and product analysis.'),
      icon: <BarChartIcon sx={{ fontSize: 80, color: 'primary.main', opacity: 0.7 }} />,
      path: '/reports/sales'
    },
    {
      id: 'trends',
      title: t('reports.trends.title', 'Trend Reports'),
      description: t('reports.trends.description', 'Analyze market trends, user behavior patterns, and seasonal fluctuations.'),
      icon: <TimelineIcon sx={{ fontSize: 80, color: 'secondary.main', opacity: 0.7 }} />,
      path: '/reports/trends'
    },
    {
      id: 'analytics',
      title: t('reports.analytics.title', 'Analytics'),
      description: t('reports.analytics.description', 'Deep dive into data analytics, user engagement metrics, and conversion rates.'),
      icon: <PieChartIcon sx={{ fontSize: 80, color: 'success.main', opacity: 0.7 }} />,
      path: '/reports/analytics'
    }
  ];
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('reports.title', 'Reports')}
      </Typography>
      
      <Typography variant="body1" paragraph>
        {t('reports.introText', 'Select a report type to view detailed insights and data visualizations.')}
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {reportTypes.map((report) => (
          <Grid size={{ xs: 12, md: 4 }} key={report.id} > 
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 140 }}>
                {report.icon}
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {report.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {report.description}
                </Typography>
              </CardContent>
              <Divider />
              <CardActions>
                <Button 
                  component={Link} 
                  to={report.path} 
                  size="small" 
                  color="primary"
                  sx={{ ml: 'auto' }}
                >
                  {t('reports.viewReport', 'View Report')}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ReportsHome;
