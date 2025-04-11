import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUsers } from '../../../hooks/useUsers';
import { 
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import UsersTable from './UsersTable';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';
import ApiEndpoints from './ApiEndpoints';
import './styles.scss';

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
  
  const [editUser, setEditUser] = useState<{ id: number, name: string, email: string, role: string } | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (userData: { name: string, email: string, role: string }) => {
    await addUser(userData);
  };

  const handleUpdateUser = async (id: number, userData: { name: string, email: string, role: string }) => {
    await updateUser(id, userData);
    setEditUser(null);
  };

  const handleDeleteUser = async (id: number) => {
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
    <Box sx={{ padding: 3 }} className="users-list-container">
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
      
      <UsersTable 
        users={users || []}
        onEdit={startEdit} 
        onDelete={handleDeleteUser} 
      />
      
      {editUser ? (
        <EditUserForm 
          user={editUser} 
          onSubmit={handleUpdateUser} 
          onCancel={cancelEdit} 
        />
      ) : (
        <AddUserForm onSubmit={handleAddUser} />
      )}
      
      <ApiEndpoints />
    </Box>
  );
};

export default UsersList;
