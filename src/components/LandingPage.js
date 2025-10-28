/**
 * COMPONENTE: Landing Page - Diseño Moderno Minimalista
 * 
 * Principio S.O.L.I.D aplicado:
 * - Single Responsibility: Solo se encarga del landing
 * - Animaciones modulares y limpias
 */

import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';
import BackgroundParticles from './BackgroundParticles';

const LandingPage = () => {
  const { isDark } = useTheme();
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const subtitleRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const ctaButtonRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useLayoutEffect(() => {
    if (!heroRef.current || !featuresRef.current) return;

    const features = featuresRef.current?.children;
    const featuresArray = features ? Array.from(features) : [];
    const stats = statsRef.current?.children;
    const statsArray = stats ? Array.from(stats) : [];

    if (featuresArray.length === 0) return;

    // Set initial states with more dramatic effects
      gsap.set(titleLine1Ref.current, { opacity: 0, x: -150, rotation: -10, scale: 0.7 });
      gsap.set(titleLine2Ref.current, { opacity: 0, x: 150, rotation: 10, scale: 0.7 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 50, x: -30 });
      gsap.set(ctaGroupRef.current, { opacity: 0, scale: 0.5, rotation: 360 });
      gsap.set(featuresArray, { opacity: 0, y: 150, rotation: 15, scale: 0.5 });
      gsap.set(statsArray, { opacity: 0, y: 80, scale: 0.6, rotation: 10 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Title lines from opposite sides
      tl.to(titleLine1Ref.current, {
        opacity: 1,
        x: 0,
        rotation: 0,
        scale: 1,
        duration: 1.2,
        ease: 'back.out(2)'
      }, '-=0.5')
      .to(titleLine2Ref.current, {
        opacity: 1,
        x: 0,
        rotation: 0,
        scale: 1,
        duration: 1.2,
        ease: 'back.out(2)'
      }, '-=1.0')
      // Subtitle
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.6)'
      }, '-=0.8')
      // Features SOLO - ULTRA RÁPIDO (estas son las tarjetas)
      .to(featuresArray, {
        opacity: 1,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.2,
        stagger: 0.05,
        ease: 'power3.out'
      }, '-=0.8')
      // CTA Button
      .to(ctaButtonRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 1)'
      }, '-=0.6')

      // Animación continua del botón
      .to(ctaButtonRef.current, {
        y: -5,
        duration: 1.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      }, '-=1.0')
      // Stats
      .to(statsArray, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      }, '-=0.6')
      .call(() => setShowScrollIndicator(true));

    // Animaciones continuas - floating effect (MUCHO MÁS RÁPIDO)
    featuresArray.forEach((feature, index) => {
      gsap.to(feature, {
        y: -10,
        duration: 0.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: index * 0.1
      });
    });

    return () => {
      tl.kill();
      featuresArray.forEach(feature => gsap.killTweensOf(feature));
    };
  }, []);

  useEffect(() => {
    if (!showScrollIndicator || !scrollIndicatorRef.current) return;

    const indicator = scrollIndicatorRef.current;
    
    // Pulse animation for scroll indicator
    gsap.from(indicator, {
      opacity: 0,
      y: 20,
      scale: 0.8,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => {
        // Continuous pulse effect
        gsap.to(indicator, {
          scale: 1.1,
          duration: 1,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        });
      }
    });

  }, [showScrollIndicator]);

  // Ya no necesitamos animaciones GSAP para el fondo
  // BackgroundParticles maneja todo con canvas

  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      data-landing
      ref={containerRef}
      className={`min-h-screen relative ${
        isDark ? 'bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900' : 'bg-gradient-to-br from-indigo-50 via-white to-blue-50'
      }`}
    >
      {/* Background Particles - Canvas animado */}
      <BackgroundParticles />
      
      {/* Overlay suave para mejor legibilidad */}
      <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-slate-900/50 to-transparent' : 'bg-gradient-to-b from-white/30 to-transparent'}`} />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20">
        {/* Hero Section */}
        <div ref={heroRef} className="text-center max-w-5xl mb-20">
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight overflow-hidden">
            <div ref={titleLine1Ref} className={isDark ? 'text-white' : 'text-gray-900'}>Solid</div>
            <div ref={titleLine2Ref} className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"> Dashboard</div>
          </h1>
          
          <p ref={subtitleRef} className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Arquitectura limpia con principios 
            <span className="font-bold text-indigo-400"> S.O.L.I.D </span>
            y animaciones fluidas con GSAP
          </p>
        </div>

        {/* Features Grid - Ahora directamente debajo del texto */}
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mb-8 mx-auto">
          {/* Feature 1 */}
          <div className={`group p-8 rounded-3xl backdrop-blur-sm border ${
            isDark 
              ? 'bg-white/5 border-white/10 hover:bg-white/10' 
              : 'bg-white/70 border-gray-200 hover:bg-white hover:shadow-xl'
          } transition-all duration-300 transform hover:-translate-y-2`}>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              S.O.L.I.D
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Principios de diseño que garantizan código limpio, mantenible y escalable para proyectos de cualquier tamaño.
            </p>
          </div>

          {/* Feature 2 */}
          <div className={`group p-8 rounded-3xl backdrop-blur-sm border ${
            isDark 
              ? 'bg-white/5 border-white/10 hover:bg-white/10' 
              : 'bg-white/70 border-gray-200 hover:bg-white hover:shadow-xl'
          } transition-all duration-300 transform hover:-translate-y-2`}>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              GSAP Animations
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Animaciones fluidas y profesionales con GreenSock Animation Platform para experiencias de usuario excepcionales.
            </p>
          </div>

          {/* Feature 3 */}
          <div className={`group p-8 rounded-3xl backdrop-blur-sm border ${
            isDark 
              ? 'bg-white/5 border-white/10 hover:bg-white/10' 
              : 'bg-white/70 border-gray-200 hover:bg-white hover:shadow-xl'
          } transition-all duration-300 transform hover:-translate-y-2`}>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Modern Stack
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              React, Tailwind CSS y las mejores herramientas modernas para construir aplicaciones de clase empresarial.
            </p>
          </div>
        </div>

        {/* CTA Button - Movido después de las features */}
        <div ref={ctaGroupRef} className="flex justify-center items-center mb-12">
          <button
            ref={ctaButtonRef}
            onClick={scrollDown}
            className="group px-10 py-5 rounded-2xl font-bold text-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all transform hover:scale-110 shadow-2xl shadow-purple-500/50 flex items-center gap-3 relative overflow-hidden"
          >
            <span className="relative z-10">Explorar Dashboard</span>
            <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            {/* Shine effect */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </button>
        </div>

        {/* Stats Bar */}
        <div ref={statsRef} className="flex flex-wrap justify-center gap-12 mb-16">
          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">9</div>
            <div className={`text-sm font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Usuarios</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">3</div>
            <div className={`text-sm font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Patrones</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">5</div>
            <div className={`text-sm font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Principios</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <div ref={scrollIndicatorRef} className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer" onClick={scrollDown}>
            <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Desliza para explorar
            </div>
            <svg className={`w-6 h-6 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
