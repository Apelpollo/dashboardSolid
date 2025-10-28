/**
 * COMPONENTE PRINCIPAL DE LA APLICACIÓN
 * 
 * Arquitectura basada en principios S.O.L.I.D:
 * - Separación de responsabilidades
 * - Composición de componentes
 * - Gestión de estado global mediante Context API
 */

import React, { useLayoutEffect } from 'react';
import { DashboardProvider } from './context/DashboardContext';
import { ThemeProvider } from './context/ThemeContext';
import Dashboard from './components/dashboard/Dashboard';
import './styles/index.css';

function App() {
  // Multiple strategies to ensure scroll to top
  useLayoutEffect(() => {
    // Strategy 1: Immediate scroll
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Strategy 2: Disable automatic restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <ThemeProvider>
      <DashboardProvider>
        <Dashboard />
      </DashboardProvider>
    </ThemeProvider>
  );
}

export default App;

