/**
 * COMPONENTE: Gráfica del Usuario
 * Muestra una gráfica personalizada con las estadísticas del usuario
 */

import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserChart = ({ user }) => {
  const { isDark } = useTheme();

  // Datos para la gráfica personalizada
  const chartData = [
    { name: 'Posts', valor: user.postsCount || 0 },
    { name: 'Comentarios', valor: user.commentsCount || 0 },
    { name: 'Likes', valor: Math.floor((user.likesCount || 0) / 100) }, // Escalado
  ];

  return (
    <div className={`mt-6 p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gradient-to-br from-blue-50 to-purple-50'} shadow-lg`}>
      <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Estadísticas de {user.name}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#4b5563' : '#e5e7eb'} />
          <XAxis 
            dataKey="name" 
            stroke={isDark ? '#9ca3af' : '#6b7280'}
          />
          <YAxis 
            stroke={isDark ? '#9ca3af' : '#6b7280'}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: isDark ? '#1f2937' : '#ffffff',
              color: isDark ? '#ffffff' : '#000000',
              border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
            }}
          />
          <Legend />
          <Bar 
            dataKey="valor" 
            fill="#3b82f6" 
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      
      <div className={`mt-4 p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-inner`}>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {user.postsCount || 0}
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Posts</p>
          </div>
          <div>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {user.commentsCount || 0}
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Comentarios</p>
          </div>
          <div>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {user.likesCount || 0}
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Likes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChart;

