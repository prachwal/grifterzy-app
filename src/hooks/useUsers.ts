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
      // Adres URL będzie różny w zależności od środowiska (developerskie/produkcyjne)
      const apiUrl = process.env.NODE_ENV === 'development' 
        ? '/.netlify/functions/getUsers'
        : '/.netlify/functions/getUsers';
        
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setState({ data, isLoading: false, error: null });
    } catch (error) {
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
      const apiUrl = `/.netlify/functions/getUsers?id=${id}`;
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
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
      const apiUrl = '/.netlify/functions/getUsers';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
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
      setState(prev => ({ 
        ...prev,
        isLoading: false, 
        error: error instanceof Error ? error : new Error('Nieznany błąd podczas dodawania użytkownika') 
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
    addUser
  };
};