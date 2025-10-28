/**
 * COMPONENTE: Panel de Estadísticas
 * 
 * Principio S.O.L.I.D aplicado:
 * - Single Responsibility: Se encarga solo de mostrar el panel de estadísticas
 * - Dependency Inversion: Recibe datos desde el contexto en lugar de
 *   crearlos internamente
 */

import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import StatCard from './StatCard';
import ChartCard from './ChartCard';
import ScrollReveal from './ScrollReveal';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StatsPanel = () => {
  const { stats, loading } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600 dark:text-gray-300">Cargando estadísticas...</div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  // Datos para gráfica de barras
  const barChartData = [
    { name: 'Usuarios', value: stats.totalUsers },
    { name: 'Posts', value: stats.totalPosts },
    { name: 'Activos', value: stats.activeUsers },
    { name: 'Comentarios', value: stats.totalComments },
  ];

  // Datos para gráfica de pastel (mes)
  const pieChartData = [
    { name: 'Usuarios Nuevos', value: stats.activeUsers, color: '#3b82f6' },
    { name: 'Usuarios Activos', value: stats.totalUsers - stats.activeUsers, color: '#10b981' },
    { name: 'Otros', value: stats.totalComments / 10, color: '#f59e0b' },
  ];

  return (
    <ScrollReveal animation="slideUp">
      <div className="space-y-6">
      {/* Grid de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total de Usuarios"
          value={stats.totalUsers}
          color="blue"
          trend={5}
        />
        <StatCard
          title="Total de Posts"
          value={stats.totalPosts}
          color="green"
          trend={12}
        />
        <StatCard
          title="Usuarios Activos"
          value={stats.activeUsers}
          color="yellow"
          trend={3}
        />
        <StatCard
          title="Comentarios"
          value={stats.totalComments}
          color="purple"
          trend={8}
        />
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfica de Barras */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Estadísticas por Tipo
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica de Pastel */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Distribución del Mes
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    </ScrollReveal>
  );
};

export default StatsPanel;

