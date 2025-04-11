import React from 'react';
import { styled } from '@mui/material/styles';
import { 
  Typography, 
  Box, 
  Paper, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Divider
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

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

const SalesReport: React.FC = () => {
  const { t } = useTranslation();
  
  // Mock sales data
  const salesData = [
    { id: 1, product: 'Product A', quantity: 245, revenue: 12350, growth: 12.5 },
    { id: 2, product: 'Product B', quantity: 187, revenue: 9350, growth: 8.2 },
    { id: 3, product: 'Product C', quantity: 321, revenue: 16050, growth: 15.7 },
    { id: 4, product: 'Product D', quantity: 92, revenue: 4600, growth: -3.8 },
    { id: 5, product: 'Product E', quantity: 153, revenue: 7650, growth: 5.2 },
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
          {t('reports.sales.title', 'Sales Reports')}
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Item>
            <Typography variant="h6" gutterBottom>
              {t('reports.sales.monthlySales', 'Monthly Sales')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {/* Here would be a chart component */}
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
                [Bar Chart Visualization]
              </Typography>
            </Box>
          </Item>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Item>
            <Typography variant="h6" gutterBottom>
              {t('reports.sales.summary', 'Summary')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                {t('reports.sales.totalRevenue', 'Total Revenue')}
              </Typography>
              <Typography variant="h4" sx={{ color: 'success.main' }}>
                $50,000
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                {t('reports.sales.totalOrders', 'Total Orders')}
              </Typography>
              <Typography variant="h4">
                998
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                {t('reports.sales.growth', 'Growth')}
              </Typography>
              <Typography variant="h4" sx={{ color: 'primary.main' }}>
                +8.5%
              </Typography>
            </Box>
          </Item>
        </Grid>
        
        <Grid size={{ xs: 12 }}>
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('reports.sales.productName', 'Product Name')}</TableCell>
                    <TableCell align="right">{t('reports.sales.quantity', 'Quantity')}</TableCell>
                    <TableCell align="right">{t('reports.sales.revenue', 'Revenue')}</TableCell>
                    <TableCell align="right">{t('reports.sales.growth', 'Growth')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salesData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">{row.product}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">${row.revenue}</TableCell>
                      <TableCell 
                        align="right"
                        sx={{ 
                          color: row.growth >= 0 ? 'success.main' : 'error.main',
                          fontWeight: 'bold'
                        }}
                      >
                        {row.growth > 0 ? '+' : ''}{row.growth}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalesReport;
