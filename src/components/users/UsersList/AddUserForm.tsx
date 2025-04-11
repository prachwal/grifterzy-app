import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  SelectChangeEvent
} from '@mui/material';

interface AddUserFormProps {
  onSubmit: (userData: { name: string, email: string, role: string }) => Promise<void>;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState({ name: '', email: '', role: 'user' });

  // Handler for text inputs
  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  // Handler for select inputs
  const handleSelectInputChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userData.name && userData.email) {
      await onSubmit(userData);
      setUserData({ name: '', email: '', role: 'user' });
    }
  };

  return (
    <Box mt={3} className="user-form add-user-form">
      <Typography variant="h6" component="h3" gutterBottom>
        {t('api.users.addNew', 'Add New User')}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 300 }}>
          <TextField 
            label={t('api.users.name', 'Name')}
            id="name"
            name="name"
            value={userData.name}
            onChange={handleTextInputChange}
            required
            margin="normal"
            size="small"
          />
          
          <TextField
            label={t('api.users.email', 'Email')}
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleTextInputChange}
            required
            margin="normal"
            size="small"
          />
          
          <FormControl fullWidth margin="normal" size="small">
            <InputLabel id="role-label">{t('api.users.role', 'Role')}</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={userData.role}
              label={t('api.users.role', 'Role')}
              onChange={handleSelectInputChange}
            >
              <MenuItem value="user">{t('api.users.roles.user', 'User')}</MenuItem>
              <MenuItem value="admin">{t('api.users.roles.admin', 'Admin')}</MenuItem>
              <MenuItem value="moderator">{t('api.users.roles.moderator', 'Moderator')}</MenuItem>
            </Select>
          </FormControl>
          
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            {t('api.users.addButton', 'Add User')}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddUserForm;
