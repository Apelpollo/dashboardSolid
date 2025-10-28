/**
 * CUSTOM HOOK: useScrollAnimation
 * Encapsula la lógica de animación con GSAP y ScrollTrigger
 * 
 * Principio S.O.L.I.D aplicado:
 * - Single Responsibility: Gestiona solo la animación de scroll
 * - Reusability: Puede usarse en cualquier componente
 */

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar ScrollTrigger una sola vez
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const useScrollAnimation = ({
  ref,
  animation = 'fade',
  start = 'top 80%',
  duration = 1,
  stagger = 0.1,
  once = true,
  markers = false
}) => {
  const elementRef = ref || useRef(null);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Configurar propiedades de animación según el tipo
    let animationProps = {};
    const children = element.children;
    const hasChildren = children && children.length > 0;

    switch (animation) {
      case 'slideUp':
        animationProps = {
          y: 100,
          opacity: 0,
          duration,
          ease: 'power3.out'
        };
        break;
      case 'slideLeft':
        animationProps = {
          x: -100,
          opacity: 0,
          duration,
          ease: 'power3.out'
        };
        break;
      case 'slideRight':
        animationProps = {
          x: 100,
          opacity: 0,
          duration,
          ease: 'power3.out'
        };
        break;
      case 'scale':
        animationProps = {
          scale: 0.8,
          opacity: 0,
          duration,
          ease: 'back.out(1.7)'
        };
        break;
      case 'rotate':
        animationProps = {
          rotation: 180,
          opacity: 0,
          duration,
          ease: 'power2.out'
        };
        break;
      default: // fade
        animationProps = {
          opacity: 0,
          y: 50,
          duration,
          ease: 'power2.out'
        };
    }

    // Si hay children, animar con stagger
    if (hasChildren && stagger > 0) {
      const childrenArray = Array.from(children);
      
      // Setear propiedades iniciales
      gsap.set(childrenArray, animationProps);

      // Animación con stagger
      const anim = gsap.to(childrenArray, {
        ...Object.keys(animationProps).reduce((acc, key) => {
          if (key !== 'duration' && key !== 'ease') {
            acc[key] = animationProps.key === 'opacity' ? 1 : 0;
            if (key === 'scale') acc[key] = 1;
            if (key === 'rotation') acc[key] = 0;
          }
          return acc;
        }, {}),
        opacity: 1,
        duration,
        ease: animationProps.ease || 'power2.out',
        stagger,
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
          markers
        }
      });

      return () => {
        anim.kill();
      };
    } else {
      // Setear propiedades iniciales
      gsap.set(element, animationProps);

      // Animación simple
      const anim = gsap.to(element, {
        autoAlpha: 1,
        ...(animationProps.opacity === undefined ? {} : { opacity: 1 }),
        ...(animationProps.y === undefined ? {} : { y: 0 }),
        ...(animationProps.x === undefined ? {} : { x: 0 }),
        ...(animationProps.scale === undefined ? {} : { scale: 1 }),
        ...(animationProps.rotation === undefined ? {} : { rotation: 0 }),
        duration,
        ease: animationProps.ease || 'power2.out',
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
          markers
        }
      });

      return () => {
        anim.kill();
      };
    }
  }, [animation, start, duration, stagger, once, markers]);

  return elementRef;
};

export default useScrollAnimation;

