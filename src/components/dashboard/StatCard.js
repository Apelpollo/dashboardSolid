/**
 * COMPONENTE: Tarjeta de Estadística
 * 
 * Principio S.O.L.I.D aplicado:
 * - Single Responsibility: Se encarga solo de mostrar una estadística
 * - Open/Closed: Puede extenderse mediante props sin modificar su código
 */

import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const StatCard = ({ title, value, color = 'blue', trend }) => {
  const { isDark } = useTheme();
  
  // Mapeo de colores para border
  const colorMap = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    yellow: 'border-yellow-500',
    purple: 'border-purple-500',
  };

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 border-l-4 ${colorMap[color]} hover:shadow-lg transition-shadow duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{title}</p>
          <p className={`text-3xl font-bold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '+' : ''}{trend}% este mes
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;

