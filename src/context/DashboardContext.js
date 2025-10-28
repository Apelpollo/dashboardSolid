/**
 * CONTEXT API
 * Gestiona el estado global del dashboard
 * 
 * Principio S.O.L.I.D aplicado:
 * - Single Responsibility: Se encarga solo de la gestión de estado global
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import restApiService from '../services/RestApiService';
import graphqlApiService from '../services/GraphQLApiService';
import Observer from '../utils/Observer';

// Crear el contexto
const DashboardContext = createContext();

// Observer para notificaciones en tiempo real
const dataObserver = new Observer();

/**
 * Hook personalizado para usar el contexto
 */
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard debe ser usado dentro de DashboardProvider');
  }
  return context;
};

/**
 * Provider que envuelve la aplicación
 * Gestiona el estado global y las operaciones API
 */
export const DashboardProvider = ({ children }) => {
  // Estados del dashboard
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Cargar usuarios desde la API REST
   */
  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await restApiService.getUsers();
      setUsers(data);
      
      // Notificar a los observadores
      dataObserver.notify({ type: 'USERS_LOADED', data });
    } catch (err) {
      setError(err.message);
      dataObserver.notify({ type: 'ERROR', data: err.message });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cargar estadísticas desde la API REST
   */
  const loadStats = async () => {
    try {
      const data = await restApiService.getStats();
      setStats(data);
      
      // Notificar a los observadores
      dataObserver.notify({ type: 'STATS_UPDATED', data });
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Buscar usuarios con GraphQL
   */
  const searchUsers = async (searchTerm) => {
    if (!searchTerm) {
      setFilteredUsers([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await graphqlApiService.searchUsers(searchTerm);
      const users = result.users?.data || [];
      setFilteredUsers(users);
      
      // Notificar a los observadores
      dataObserver.notify({ type: 'SEARCH_COMPLETED', data: users });
    } catch (err) {
      setError(err.message);
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cargar datos iniciales
   */
  useEffect(() => {
    loadUsers();
    loadStats();
  }, []);

  const value = {
    users,
    stats,
    filteredUsers,
    loading,
    error,
    loadUsers,
    loadStats,
    searchUsers,
    dataObserver, // Exponemos el observer para suscripciones externas
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;

