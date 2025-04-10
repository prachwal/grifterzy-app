import { useState, useEffect } from 'react';

// Definicja typów
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

// Simplified API base URL construction
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? '/.netlify/functions/api'
  : 'http://localhost:8000/.netlify/functions/api';

// Funkcja hooka do pobierania użytkowników
export const useUsers = () => {
  const [state, setState] = useState<FetchState<User[]>>({
    data: null,
    isLoading: false,
    error: null
  });

  const fetchUsers = async () => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const apiUrl = `${API_BASE_URL}/users`;
      console.log('Fetching users from:', apiUrl);

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      console.error('Error fetching users:', error);
      setState({
        data: null,
        isLoading: false,
        error: error instanceof Error ? error : new Error('Nieznany błąd podczas pobierania danych')
      });
    }
  };

  // Funkcja do pobierania pojedynczego użytkownika
  const fetchUserById = async (id: number) => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const apiUrl = `${API_BASE_URL}/users/${id}`;
      console.log('Fetching user by ID from:', apiUrl);

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      setState({
        data: null,
        isLoading: false,
        error: error instanceof Error ? error : new Error('Nieznany błąd podczas pobierania użytkownika')
      });
      return null;
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Funkcja do dodawania nowego użytkownika
  const addUser = async (userData: Omit<User, 'id'>) => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const apiUrl = `${API_BASE_URL}/users`;

      console.log('Adding user with data:', userData);
      console.log('API URL:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server returned error:', response.status, errorText);
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
      }

      const newUser = await response.json();

      // Aktualizacja lokalnego stanu po dodaniu nowego użytkownika
      setState(prev => ({
        data: prev.data ? [...prev.data, newUser] : [newUser],
        isLoading: false,
        error: null
      }));

      return newUser;
    } catch (error) {
      console.error('Error adding user:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error : new Error('Nieznany błąd podczas dodawania użytkownika')
      }));
      return null;
    }
  };

  // Nowa funkcja do aktualizacji użytkownika
  const updateUser = async (id: number, userData: Partial<Omit<User, 'id'>>) => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const apiUrl = `${API_BASE_URL}/users/${id}`;
      console.log('Updating user at:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server returned error:', response.status, errorText);
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
      }

      const updatedUser = await response.json();

      // Aktualizacja lokalnego stanu
      setState(prev => ({
        data: prev.data ? prev.data.map(user => user.id === id ? updatedUser : user) : null,
        isLoading: false,
        error: null
      }));

      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error : new Error('Nieznany błąd podczas aktualizacji użytkownika')
      }));
      return null;
    }
  };

  // Nowa funkcja do usuwania użytkownika
  const deleteUser = async (id: number) => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const apiUrl = `${API_BASE_URL}/users/${id}`;
      console.log('Deleting user at:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server returned error:', response.status, errorText);
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
      }

      const deletedUser = await response.json();

      // Aktualizacja lokalnego stanu
      setState(prev => ({
        data: prev.data ? prev.data.filter(user => user.id !== id) : null,
        isLoading: false,
        error: null
      }));

      return deletedUser;
    } catch (error) {
      console.error('Error deleting user:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error : new Error('Nieznany błąd podczas usuwania użytkownika')
      }));
      return null;
    }
  };

  return {
    users: state.data,
    isLoading: state.isLoading,
    error: state.error,
    fetchUsers,
    fetchUserById,
    addUser,
    updateUser,
    deleteUser
  };
};