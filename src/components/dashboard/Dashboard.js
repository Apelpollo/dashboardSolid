/**
 * COMPONENTE PRINCIPAL: Dashboard
 * 
 * Principio S.O.L.I.D aplicado:
 * - Single Responsibility: Orquesta los sub-componentes del dashboard
 * - Open/Closed: Puede extenderse con nuevas secciones sin modificar código
 */

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { useTheme } from '../../context/ThemeContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../Navigation';
import LandingPage from '../LandingPage';
import StatsPanel from './StatsPanel';
import UsersList from './UsersList';
import SearchSection from './SearchSection';
import ScrollReveal from './ScrollReveal';
import BackgroundParticles from '../BackgroundParticles';

gsap.registerPlugin(ScrollTrigger);

const Dashboard = () => {
  const { error, dataObserver } = useDashboard();
  const { isDark } = useTheme();
  const [activeSection, setActiveSection] = useState('stats');
  const landingRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);
  const searchRef = useRef(null);
  const usersRef = useRef(null);

  useEffect(() => {
    // Scroll al top al cargar
    window.scrollTo(0, 0);
    
    // Ejemplo de uso del patrón Observer
    const unsubscribe = dataObserver.subscribe((event) => {
      console.log('Evento recibido:', event);
    });

    // Limpiar al desmontar
    return () => unsubscribe();
  }, [dataObserver]);

  // Función para hacer scroll a una sección
  const scrollToSection = (ref) => {
    if (ref.current) {
      const elementTop = ref.current.offsetTop;
      const offset = 100; // Altura de la navegación + padding
      
      window.scrollTo({
        top: elementTop - offset,
        behavior: 'smooth'
      });
    }
  };

  // Función para manejar cambios desde la navegación
  const handleSectionChange = (section) => {
    setActiveSection(section);
    
    switch(section) {
      case 'stats':
        scrollToSection(statsRef);
        break;
      case 'search':
        scrollToSection(searchRef);
        break;
      case 'users':
        scrollToSection(usersRef);
        break;
      default:
        scrollToSection(statsRef);
    }
  };

  // Animación de transición landing → contenido con GSAP (simplificada)
  useLayoutEffect(() => {
    if (!landingRef.current) return;
    
    const ctx = gsap.context(() => {
      // Solo animar la landing page al hacer scroll
      gsap.to(landingRef.current, {
        opacity: 0.8,
        scale: 0.98,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: landingRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    });

    return () => ctx.revert();
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      if (statsRef.current && scrollPosition >= statsRef.current.offsetTop - 200 && 
          scrollPosition < (searchRef.current?.offsetTop || Infinity) - 200) {
        setActiveSection('stats');
      } else if (searchRef.current && scrollPosition >= searchRef.current.offsetTop - 200 && 
                 scrollPosition < (usersRef.current?.offsetTop || Infinity) - 200) {
        setActiveSection('search');
      } else if (usersRef.current && scrollPosition >= usersRef.current.offsetTop - 200) {
        setActiveSection('users');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fondo animado con gradiente y partículas */}
      <div className={`fixed inset-0 -z-10 overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-600' 
          : 'bg-gradient-to-b from-blue-100 via-indigo-100 to-purple-200'
      }`}>
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className={`absolute w-2 h-2 ${isDark ? 'bg-white/70' : 'bg-white/50'} rounded-full animate-float`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>
      
      {/* Background Particles - Para TODA la página */}
      <BackgroundParticles />
      
      {/* Overlay suave adicional */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-slate-900/20 to-transparent' : 'bg-gradient-to-b from-white/20 to-transparent'}`} />
      </div>

      {/* Navegación Sticky */}
      <Navigation activeSection={activeSection} onSectionChange={handleSectionChange} />
      
      {/* Landing Page con transición */}
      <div ref={landingRef}>
        <LandingPage />
      </div>

      {/* Contenido Principal - Con transición suave */}
      <main ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 relative z-10 min-h-screen">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Sección 1: Estadísticas */}
        <section id="stats" ref={statsRef}>
          <StatsPanel />
        </section>

        {/* Sección 2: Búsqueda */}
        <section id="search" ref={searchRef}>
          <SearchSection />
        </section>

        {/* Sección 3: Todos los Usuarios */}
        <section id="users" ref={usersRef}>
          <UsersList />
        </section>
      </main>

      {/* Footer con Animación */}
      <ScrollReveal animation="slideUp" duration={1}>
        <footer className={`mt-12 ${isDark ? 'bg-gray-800' : 'bg-white'} border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Sobre este Dashboard
            </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Principios S.O.L.I.D</h4>
              <ul className={`text-sm space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>✅ Single Responsibility</li>
                <li>✅ Open/Closed</li>
                <li>✅ Liskov Substitution</li>
                <li>✅ Interface Segregation</li>
                <li>✅ Dependency Inversion</li>
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Patrones de Diseño</h4>
              <ul className={`text-sm space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>🏭 Factory</li>
                <li>🔧 Singleton</li>
                <li>👀 Observer</li>
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Tecnologías</h4>
              <ul className={`text-sm space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>⚛️ React</li>
                <li>🌐 API REST</li>
                <li>🔍 GraphQL</li>
                <li>🎨 Tailwind CSS</li>
              </ul>
            </div>
          </div>
          <div className={`mt-6 pt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2024 Solid Dashboard - Demostración de arquitectura limpia con React y principios S.O.L.I.D
            </p>
          </div>
        </div>
      </footer>
      </ScrollReveal>
    </div>
  );
};

export default Dashboard;
