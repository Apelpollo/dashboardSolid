/**
 * COMPONENTE: Lista de Usuarios con Scroll Horizontal y Rueda
 * 
 * Principio S.O.L.I.D aplicado:
 * - Single Responsibility: Se encarga solo de mostrar la lista de usuarios
 * - Liskov Substitution: Los usuarios pueden ser reemplazados por otras
 *   implementaciones sin romper el componente
 */

import React, { useRef, useEffect, useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { useTheme } from '../../context/ThemeContext';
import UserCard from './UserCard';
import ScrollReveal from './ScrollReveal';

const UsersList = () => {
  const { users, filteredUsers, loading } = useDashboard();
  const { isDark } = useTheme();
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Usar usuarios filtrados si hay búsqueda, sino usar todos
  const displayUsers = filteredUsers.length > 0 ? filteredUsers : users;

  // Actualizar botones según scroll
  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll horizontal con rueda del mouse - MEJORADO
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      // Solo interceptar si hay elementos para hacer scroll
      if (container.scrollWidth > container.clientWidth) {
        // Convertir scroll vertical en horizontal
        container.scrollLeft += e.deltaY;
        e.preventDefault();
        updateScrollButtons();
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('scroll', updateScrollButtons);

    // Update inicial
    updateScrollButtons();

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('scroll', updateScrollButtons);
    };
  }, [displayUsers]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      });
      setTimeout(updateScrollButtons, 300);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
      setTimeout(updateScrollButtons, 300);
    }
  };

  return (
    <ScrollReveal animation="fade">
      <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {filteredUsers.length > 0 ? 'Usuarios Filtrados' : 'Todos los Usuarios'}
        </h2>
        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {displayUsers.length} usuario{displayUsers.length !== 1 ? 's' : ''}
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className={isDark ? 'text-gray-300' : 'text-gray-600'}>Cargando usuarios...</div>
        </div>
      ) : (
        <div className="relative group">
          {/* Botón Izquierda - Visible si puede hacer scroll */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              } transition-all animate-pulse`}
            >
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Scroll horizontal container */}
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-6 min-w-max">
              {displayUsers.map((user, index) => (
                <div key={user.id} className="flex-shrink-0 w-80">
                  <UserCard user={user} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Botón Derecha - Visible si puede hacer scroll */}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              } transition-all animate-pulse`}
            >
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Indicador de scroll */}
          <div className={`text-xs text-center mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            ← Usa la rueda del mouse o haz click en las flechas →
          </div>
        </div>
      )}
    </div>
    </ScrollReveal>
  );
};

export default UsersList;
