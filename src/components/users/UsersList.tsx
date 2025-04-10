import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUsers } from '../../hooks/useUsers';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editUser) return;
    
    const { name, value } = e.target;
    setEditUser(prev => ({ ...prev!, [name]: value }));
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
    <div className="users-container">
      <h2>API Test - {t('api.users.title', 'Users List')}</h2>
      
      {isLoading && <div className="loading">{t('common.loading', 'Loading...')}</div>}
      {error && <div className="error">{t('common.error', 'Error')}: {error.message}</div>}
      
      <div className="users-list">
        <h3>{t('api.users.existingUsers', 'Existing Users')}</h3>
        {users && users.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>{t('api.users.name', 'Name')}</th>
                <th>{t('api.users.email', 'Email')}</th>
                <th>{t('api.users.role', 'Role')}</th>
                <th>{t('common.actions', 'Actions')}</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button 
                      onClick={() => startEdit(user)}
                      className="edit-button"
                    >
                      {t('common.edit', 'Edit')}
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="delete-button"
                    >
                      {t('common.delete', 'Delete')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>{t('api.users.noUsers', 'No users found')}</p>
        )}
      </div>
      
      {editUser ? (
        <div className="edit-user-form">
          <h3>{t('api.users.editUser', 'Edit User')}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label htmlFor="edit-name">{t('api.users.name', 'Name')}:</label>
              <input
                type="text"
                id="edit-name"
                name="name"
                value={editUser.name}
                onChange={handleEditInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="edit-email">{t('api.users.email', 'Email')}:</label>
              <input
                type="email"
                id="edit-email"
                name="email"
                value={editUser.email}
                onChange={handleEditInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="edit-role">{t('api.users.role', 'Role')}:</label>
              <select
                id="edit-role"
                name="role"
                value={editUser.role}
                onChange={handleEditInputChange}
              >
                <option value="user">{t('api.users.roles.user', 'User')}</option>
                <option value="admin">{t('api.users.roles.admin', 'Admin')}</option>
                <option value="moderator">{t('api.users.roles.moderator', 'Moderator')}</option>
              </select>
            </div>
            
            <div className="form-buttons">
              <button type="submit">{t('common.save', 'Save')}</button>
              <button type="button" onClick={cancelEdit}>{t('common.cancel', 'Cancel')}</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="add-user-form">
          <h3>{t('api.users.addNew', 'Add New User')}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{t('api.users.name', 'Name')}:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">{t('api.users.email', 'Email')}:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="role">{t('api.users.role', 'Role')}:</label>
              <select
                id="role"
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
              >
                <option value="user">{t('api.users.roles.user', 'User')}</option>
                <option value="admin">{t('api.users.roles.admin', 'Admin')}</option>
                <option value="moderator">{t('api.users.roles.moderator', 'Moderator')}</option>
              </select>
            </div>
            
            <button type="submit">{t('api.users.addButton', 'Add User')}</button>
          </form>
        </div>
      )}
      
      <div className="api-info">
        <h3>{t('api.endpoints.title', 'API Endpoints')}</h3>
        <ul>
          <li><code>GET /.netlify/functions/api/users</code> - {t('api.endpoints.getAll', 'Get all users')}</li>
          <li><code>GET /.netlify/functions/api/users/:id</code> - {t('api.endpoints.getOne', 'Get user by ID')}</li>
          <li><code>POST /.netlify/functions/api/users</code> - {t('api.endpoints.create', 'Create new user')}</li>
          <li><code>PUT /.netlify/functions/api/users/:id</code> - {t('api.endpoints.update', 'Update user')}</li>
          <li><code>DELETE /.netlify/functions/api/users/:id</code> - {t('api.endpoints.delete', 'Delete user')}</li>
        </ul>
      </div>
    </div>
  );
};

export default UsersList;