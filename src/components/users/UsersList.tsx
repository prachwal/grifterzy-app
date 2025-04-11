import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUsers } from '../../hooks/useUsers';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  CircularProgress,
  SelectChangeEvent
} from '@mui/material';

const UsersList: React.FC = () => {
  const { t } = useTranslation();
  const { 
    users, 
    isLoading, 
    error, 
    fetchUsers, 
    addUser, 
    updateUser, 
    deleteUser 
  } = useUsers();
  
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });
  const [editUser, setEditUser] = useState<{ id: number, name: string, email: string, role: string } | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handler for text inputs in the new user form
  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  // Handler for select inputs in the new user form
  const handleSelectInputChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  // Handler for text inputs in the edit user form
  const handleEditTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editUser) return;
    
    const { name, value } = e.target;
    setEditUser(prev => {
      if (prev) {
        return { ...prev, [name]: value };
      }
      return prev;
    });
  };

  // Handler for select inputs in the edit user form
  const handleEditSelectInputChange = (e: SelectChangeEvent) => {
    if (!editUser) return;
    
    const { name, value } = e.target;
    setEditUser(prev => {
      if (prev) {
        return { ...prev, [name]: value };
      }
      return prev;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newUser.name && newUser.email) {
      await addUser(newUser);
      setNewUser({ name: '', email: '', role: 'user' });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editUser && editUser.name && editUser.email) {
      await updateUser(editUser.id, {
        name: editUser.name,
        email: editUser.email,
        role: editUser.role
      });
      setEditUser(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm(t('api.users.confirmDelete', 'Czy na pewno chcesz usunąć tego użytkownika?'))) {
      await deleteUser(id);
    }
  };

  const startEdit = (user: any) => {
    setEditUser(user);
  };

  const cancelEdit = () => {
    setEditUser(null);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        API Test - {t('api.users.title', 'Users List')}
      </Typography>
      
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 1 }}>{t('common.loading', 'Loading...')}</Typography>
        </Box>
      )}
      {error && (
        <Typography variant="body1" color="error" sx={{ mt: 2 }}>
          {t('common.error', 'Error')}: {error.message}
        </Typography>
      )}
      
      <Typography variant="h6" component="h3" mt={3}>
        {t('api.users.existingUsers', 'Existing Users')}
      </Typography>
      {users && users.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>{t('api.users.name', 'Name')}</TableCell>
                <TableCell>{t('api.users.email', 'Email')}</TableCell>
                <TableCell>{t('api.users.role', 'Role')}</TableCell>
                <TableCell>{t('common.actions', 'Actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => startEdit(user)}
                      sx={{ mr: 1 }}
                    >
                      {t('common.edit', 'Edit')}
                    </Button>
                    <Button 
                      variant="contained" 
                      size="small"
                      color="error"
                      onClick={() => handleDelete(user.id)}
                    >
                      {t('common.delete', 'Delete')}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1">{t('api.users.noUsers', 'No users found')}</Typography>
      )}
      
      {editUser ? (
        <Box mt={3}>
          <Typography variant="h6" component="h3" gutterBottom>
            {t('api.users.editUser', 'Edit User')}
          </Typography>
          <form onSubmit={handleUpdate}>
            <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 300 }}>
              <TextField 
                label={t('api.users.name', 'Name')}
                id="edit-name"
                name="name"
                value={editUser.name}
                onChange={handleEditTextInputChange}
                required
                margin="normal"
                size="small"
              />
              
              <TextField
                label={t('api.users.email', 'Email')}
                type="email"
                id="edit-email"
                name="email"
                value={editUser.email}
                onChange={handleEditTextInputChange}
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
                  value={editUser.role}
                  label={t('api.users.role', 'Role')}
                  onChange={handleEditSelectInputChange}
                >
                  <MenuItem value="user">{t('api.users.roles.user', 'User')}</MenuItem>
                  <MenuItem value="admin">{t('api.users.roles.admin', 'Admin')}</MenuItem>
                  <MenuItem value="moderator">{t('api.users.roles.moderator', 'Moderator')}</MenuItem>
                </Select>
              </FormControl>
              
              <Box mt={2}>
                <Button variant="contained" type="submit" sx={{ mr: 1 }}>{t('common.save', 'Save')}</Button>
                <Button variant="outlined" onClick={cancelEdit}>{t('common.cancel', 'Cancel')}</Button>
              </Box>
            </Box>
          </form>
        </Box>
      ) : (
        <Box mt={3}>
          <Typography variant="h6" component="h3" gutterBottom>
            {t('api.users.addNew', 'Add New User')}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 300 }}>
              <TextField 
                label={t('api.users.name', 'Name')}
                id="name"
                name="name"
                value={newUser.name}
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
                value={newUser.email}
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
                  value={newUser.role}
                  label={t('api.users.role', 'Role')}
                  onChange={handleSelectInputChange}
                >
                  <MenuItem value="user">{t('api.users.roles.user', 'User')}</MenuItem>
                  <MenuItem value="admin">{t('api.users.roles.admin', 'Admin')}</MenuItem>
                  <MenuItem value="moderator">{t('api.users.roles.moderator', 'Moderator')}</MenuItem>
                </Select>
              </FormControl>
              
              <Button variant="contained" type="submit" sx={{ mt: 2 }}>{t('api.users.addButton', 'Add User')}</Button>
            </Box>
          </form>
        </Box>
      )}
      
      <Box mt={4}>
        <Typography variant="h6" component="h3" gutterBottom>
          {t('api.endpoints.title', 'API Endpoints')}
        </Typography>
        <Box component="ul" sx={{ listStyleType: 'none', padding: 0 }}>
          <Box component="li"><code>GET /.netlify/functions/api/users</code> - {t('api.endpoints.getAll', 'Get all users')}</Box>
          <Box component="li"><code>GET /.netlify/functions/api/users/:id</code> - {t('api.endpoints.getOne', 'Get user by ID')}</Box>
          <Box component="li"><code>POST /.netlify/functions/api/users</code> - {t('api.endpoints.create', 'Create new user')}</Box>
          <Box component="li"><code>PUT /.netlify/functions/api/users/:id</code> - {t('api.endpoints.update', 'Update user')}</Box>
          <Box component="li"><code>DELETE /.netlify/functions/api/users/:id</code> - {t('api.endpoints.delete', 'Delete user')}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UsersList;