import React, { useState } from 'react';
import { 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  Divider,
  InputAdornment,
  Chip,
  Grid
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useTranslation } from 'react-i18next';

const Search: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<string[]>(['products', 'users']);
  
  // Mock data
  const searchResults = [
    { id: 1, title: 'Product 1', description: 'Description for product 1', type: 'products' },
    { id: 2, title: 'Product 2', description: 'Description for product 2', type: 'products' },
    { id: 3, title: 'User John', description: 'Administrator', type: 'users' },
    { id: 4, title: 'User Sarah', description: 'Customer', type: 'users' },
    { id: 5, title: 'Invoice #1234', description: 'Issued on 2023-05-15', type: 'invoices' },
  ].filter(item => searchQuery === '' || item.title.toLowerCase().includes(searchQuery.toLowerCase()))
   .filter(item => filters.includes(item.type));
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const toggleFilter = (filter: string) => {
    if (filters.includes(filter)) {
      setFilters(filters.filter(f => f !== filter));
    } else {
      setFilters([...filters, filter]);
    }
  };
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('search.title', 'Search')}
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={t('search.placeholder', 'Search for anything...')}
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Typography variant="body2" sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
            <FilterListIcon fontSize="small" sx={{ mr: 0.5 }} />
            {t('search.filters', 'Filters')}:
          </Typography>
          
          <Chip 
            label={t('search.filterProducts', 'Products')} 
            color={filters.includes('products') ? 'primary' : 'default'}
            onClick={() => toggleFilter('products')}
            variant={filters.includes('products') ? 'filled' : 'outlined'}
            sx={{ mr: 1 }}
          />
          
          <Chip 
            label={t('search.filterUsers', 'Users')} 
            color={filters.includes('users') ? 'primary' : 'default'}
            onClick={() => toggleFilter('users')}
            variant={filters.includes('users') ? 'filled' : 'outlined'}
            sx={{ mr: 1 }}
          />
          
          <Chip 
            label={t('search.filterInvoices', 'Invoices')} 
            color={filters.includes('invoices') ? 'primary' : 'default'}
            onClick={() => toggleFilter('invoices')}
            variant={filters.includes('invoices') ? 'filled' : 'outlined'}
          />
        </Box>
      </Paper>
      
      <Paper>
        <List>
          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <React.Fragment key={result.id}>
                {index > 0 && <Divider />}
                <ListItem>
                  <ListItemText 
                    primary={result.title} 
                    secondary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{result.description}</span>
                        <Chip 
                          label={result.type} 
                          size="small" 
                          variant="outlined" 
                          color={
                            result.type === 'products' ? 'primary' :
                            result.type === 'users' ? 'secondary' : 'default'
                          }
                        />
                      </Box>
                    } 
                  />
                </ListItem>
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <ListItemText 
                primary={t('search.noResults', 'No results found')} 
                secondary={t('search.tryDifferent', 'Try different search terms or filters')}
              />
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default Search;
