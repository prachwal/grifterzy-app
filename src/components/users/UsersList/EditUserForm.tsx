import React, { useState, useEffect } from 'react';
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

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface EditUserFormProps {
  user: User;
  onSubmit: (id: number, userData: { name: string, email: string, role: string }) => Promise<void>;
  onCancel: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onSubmit, onCancel }) => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      role: user.role
    });
  }, [user]);

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
      await onSubmit(user.id, userData);
    }
  };

  return (
    <Box mt={3} className="user-form edit-user-form">
      <Typography variant="h6" component="h3" gutterBottom>
        {t('api.users.editUser', 'Edit User')}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 300 }}>
          <TextField 
            label={t('api.users.name', 'Name')}
            id="edit-name"
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
            id="edit-email"
            name="email"
            value={userData.email}
            onChange={handleTextInputChange}
            required
            margin="normal"
            size="small"
          />
          
          <FormControl fullWidth margin="normal" size="small">
            <InputLabel id="edit-role-label">{t('api.users.role', 'Role')}</InputLabel>
            <Select
              labelId="edit-role-label"
              id="edit-role"
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
          
          <Box mt={2}>
            <Button variant="contained" type="submit" sx={{ mr: 1 }}>
              {t('common.save', 'Save')}
            </Button>
            <Button variant="outlined" onClick={onCancel}>
              {t('common.cancel', 'Cancel')}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default EditUserForm;
