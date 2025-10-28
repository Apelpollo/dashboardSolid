/**
 * COMPONENTE: Navegación con animación GSAP
 * 
 * Principio S.O.L.I.D aplicado:
 * - Single Responsibility: Navegación y su animación de entrada
 */

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';

const Navigation = ({ activeSection, onSectionChange }) => {
  const { isDark, toggleTheme } = useTheme();
  const navContainerRef = useRef(null);
  const logoRef = useRef(null);
  const buttonsRef = useRef([]);
  const themeButtonRef = useRef(null);
  const navRef = useRef(null);

  useLayoutEffect(() => {
    // Esperar a que los refs estén listos
    if (!logoRef.current || !themeButtonRef.current) return;

    const tl = gsap.timeline({ defaults: { duration: 0.8 } });
    
    // Logo desde izquierda con efecto elástico
    gsap.set(logoRef.current, { x: -100, opacity: 0, scale: 0.8 });
    
    tl.to(logoRef.current, {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'elastic.out(1, 0.6)'
    });
    
    // Recopilar todos los botones
    const allButtons = [...buttonsRef.current].filter(Boolean);
    
    if (allButtons.length > 0) {
      // Establecer estado inicial para botones SIN rotación
      gsap.set(allButtons, {
        x: 150,
        opacity: 0,
        scale: 0.8
      });
      
      // Animar botones con stagger SIN rotación
      tl.to(allButtons, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)'
      }, '-=0.5');
    }
    
    // Botón de tema desde arriba con spin
    gsap.set(themeButtonRef.current, { 
      y: -100, 
      opacity: 0,
      rotation: -180,
      scale: 0.5
    });
    
    tl.to(themeButtonRef.current, {
      y: 0,
      opacity: 1,
      rotation: 0,
      scale: 1,
      duration: 1,
      ease: 'bounce.out'
    }, '-=0.5');

    // Animaciones continuas - pulse en logo y navegación
    gsap.to(logoRef.current, {
      scale: 1.05,
      duration: 1.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    // Animación continua: hover effect en elementos
    allButtons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.15,
          rotation: 5,
          duration: 0.3,
          ease: 'back.out(2)'
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      button.addEventListener('click', () => {
        gsap.from(button, {
          scale: 0.8,
          duration: 0.2,
          ease: 'back.out(4)'
        });
      });
    });

    // Animación del botón de tema al hover
    themeButtonRef.current?.addEventListener('mouseenter', () => {
      gsap.to(themeButtonRef.current, {
        rotation: 180,
        scale: 1.2,
        duration: 0.5,
        ease: 'back.out(2)'
      });
    });
    
    themeButtonRef.current?.addEventListener('mouseleave', () => {
      gsap.to(themeButtonRef.current, {
        rotation: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Animación de entrada cuando se hace scroll
  useLayoutEffect(() => {
    if (!navRef.current) return;

    // Set initial state - NAV VISIBLE siempre pero con animación de entrada
    gsap.set(navRef.current, { 
      y: 0,
      opacity: 1,
      pointerEvents: 'auto'
    });
    
    // Observer para animar cuando se hace scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting && navRef.current) {
            // Landing page salió de vista - animar nav si no está visible
            if (navRef.current.style.opacity !== '1') {
              gsap.to(navRef.current, {
                y: 0,
                opacity: 1,
                pointerEvents: 'auto',
                duration: 0.6,
                ease: 'power3.out'
              });
            }
          } else if (entry.isIntersecting && navRef.current) {
            // Landing page visible - mantener nav visible pero con efecto
            // La nav se mantiene visible siempre
          }
        });
      },
      { threshold: 0 }
    );
    
    // Observe the landing page
    const landingPageElement = document.querySelector('[data-landing]');
    if (landingPageElement) {
      observer.observe(landingPageElement);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const sections = [
    { id: 'stats', name: 'Estadísticas Generales' },
    { id: 'search', name: 'Búsqueda con GraphQL' },
    { id: 'users', name: 'Todos los Usuarios' },
  ];

  const getIconForSection = (sectionId) => {
    switch (sectionId) {
      case 'stats':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'search':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        );
      case 'users':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <nav ref={navRef} className={`sticky top-0 z-50 border-b transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white shadow-md'}`}>
      <div ref={navContainerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div ref={logoRef} className="flex items-center">
            <div className={`flex-shrink-0 font-bold text-xl ${isDark ? 'text-white' : 'text-gray-900'} flex items-center gap-2`}>
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Solid Dashboard
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="hidden md:flex items-center space-x-1">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  activeSection === section.id
                    ? isDark
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-600 text-white'
                    : isDark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                ref={el => {
                  if (buttonsRef.current) {
                    buttonsRef.current[index] = el;
                  }
                }}
              >
                {getIconForSection(section.id)}
                <span>{section.name}</span>
              </button>
            ))}
          </div>

          {/* Theme toggle button */}
          <div className="flex items-center">
            <button
              ref={themeButtonRef}
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'text-yellow-400 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={isDark ? 'Modo Claro' : 'Modo Oscuro'}
            >
              {isDark ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9 9 0 0012 21a9 9 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
