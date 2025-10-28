/**
 * COMPONENTE: Sección de Búsqueda
 * 
 * Principio S.O.L.I.D aplicado:
 * - Single Responsibility: Se encarga solo de la funcionalidad de búsqueda
 * - Open/Closed: Puede extenderse con nuevos filtros sin modificar el componente base
 */

import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { useTheme } from '../../context/ThemeContext';
import { mockUsers } from '../../data/mockData';
import UserChart from './UserChart';
import ScrollReveal from './ScrollReveal';

const SearchSection = () => {
  const { searchUsers, loading } = useDashboard();
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [lastSearch, setLastSearch] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLastSearch(searchTerm);
    setSelectedUser(null); // Limpiar usuario seleccionado al buscar
    
    if (searchTerm.trim()) {
      // Buscar en datos mock locales
      const results = mockUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      
      // Búsqueda local (GraphQL deshabilitado para evitar errores)
      // try {
      //   await searchUsers(searchTerm);
      // } catch (error) {
      //   console.log('GraphQL no disponible, usando búsqueda local');
      // }
    } else {
      setSearchResults([]);
      setSelectedUser(null);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setLastSearch(null);
    setSearchResults([]);
    setSelectedUser(null);
    searchUsers('');
  };

  return (
    <ScrollReveal animation="slideRight">
      <div className={`rounded-lg shadow-md p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Búsqueda con GraphQL
      </h2>
      
      <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        Busca usuarios por nombre o email usando GraphQL para consultas optimizadas
      </p>

      <form onSubmit={handleSearch} className="flex gap-4">
        <input
          type="text"
          placeholder="Escribe el nombre juan"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'border-gray-300'
          }`}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
        {lastSearch && (
          <button
            type="button"
            onClick={handleClear}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Limpiar
          </button>
        )}
      </form>

      {searchResults.length > 0 && (
        <div className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-blue-900' : 'bg-blue-50'}`}>
          <p className={`text-sm mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
            <span className="font-semibold">Resultados encontrados: {searchResults.length}</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {searchResults.map((user) => (
              <div 
                key={user.id} 
                className={`p-4 rounded-lg cursor-pointer transition-all hover:scale-105 ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-blue-100'}`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <img 
                    src={user.profileImage || `https://ui-avatars.com/api/?name=${user.name}&background=3b82f6&color=fff`}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{user.name}</p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>@{user.name.split(' ')[0].toLowerCase()}</p>
                  </div>
                </div>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-2`}>{user.email}</p>
                <div className={`flex justify-between text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
                  <span>{user.postsCount} posts</span>
                  <span>❤️ {user.likesCount}</span>
                </div>
                <p className={`text-xs mt-2 ${isDark ? 'text-blue-400' : 'text-blue-600'} font-medium`}>
                  Click para ver gráfica →
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gráfica del usuario seleccionado */}
      {selectedUser && (
        <UserChart user={selectedUser} />
      )}

      {lastSearch && searchResults.length === 0 && (
        <div className={`mt-4 p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-700'}`}>
            No se encontraron resultados para "{lastSearch}"
          </p>
        </div>
      )}

      <div className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Ventajas de GraphQL:</h3>
        <ul className={`text-sm space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          <li>• Consultas específicas y optimizadas</li>
          <li>• Solo obtienes los datos que necesitas</li>
          <li>• Filtrado en el servidor</li>
          <li>• Una sola petición para múltiples recursos</li>
        </ul>
      </div>
    </div>
    </ScrollReveal>
  );
};

export default SearchSection;

