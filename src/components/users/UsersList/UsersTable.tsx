import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  Typography,
  Box
} from '@mui/material';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onEdit, onDelete }) => {
  const { t } = useTranslation();

  if (!users || users.length === 0) {
    return (
      <Box mt={3}>
        <Typography variant="h6" component="h3" mb={1}>
          {t('api.users.existingUsers', 'Existing Users')}
        </Typography>
        <Typography variant="body1">
          {t('api.users.noUsers', 'No users found')}
        </Typography>
      </Box>
    );
  }

  return (
    <Box mt={3}>
      <Typography variant="h6" component="h3" mb={1}>
        {t('api.users.existingUsers', 'Existing Users')}
      </Typography>
      <TableContainer component={Paper} className="users-table">
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
                    onClick={() => onEdit(user)}
                    sx={{ mr: 1 }}
                  >
                    {t('common.edit', 'Edit')}
                  </Button>
                  <Button 
                    variant="contained" 
                    size="small"
                    color="error"
                    onClick={() => onDelete(user.id)}
                  >
                    {t('common.delete', 'Delete')}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersTable;
