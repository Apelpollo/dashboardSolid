/**
 * COMPONENTE: Scroll Reveal con GSAP
 * Animación que se activa cuando el componente entra en viewport
 * 
 * Principio S.O.L.I.D aplicado:
 * - Single Responsibility: Solo maneja animaciones de scroll
 * - Open/Closed: Extensible con diferentes tipos de animación
 */

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ScrollReveal = ({ children, className, animation = 'fade', duration = 1, stagger = 0 }) => {
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Configurar propiedades de animación
    let animationProps = {};
    const hasChildren = element.children && element.children.length > 0;
    
    switch (animation) {
      case 'slideUp':
        animationProps = { y: 100, opacity: 0, duration, ease: 'power3.out' };
        break;
      case 'slideLeft':
        animationProps = { x: -100, opacity: 0, duration, ease: 'power3.out' };
        break;
      case 'slideRight':
        animationProps = { x: 100, opacity: 0, duration, ease: 'power3.out' };
        break;
      case 'scale':
        animationProps = { scale: 0.5, opacity: 0, duration, ease: 'back.out(1.7)' };
        break;
      case 'rotate':
        animationProps = { rotation: 180, opacity: 0, duration, ease: 'power2.out' };
        break;
      default: // fade
        animationProps = { opacity: 0, y: 50, duration, ease: 'power2.out' };
    }

    // Si hay children y stagger, animar con stagger
    if (hasChildren && stagger > 0) {
      const childrenArray = Array.from(element.children);
      
      gsap.set(childrenArray, animationProps);
      
      const anim = gsap.to(childrenArray, {
        autoAlpha: 1,
        ...(animationProps.y !== undefined ? { y: 0 } : {}),
        ...(animationProps.x !== undefined ? { x: 0 } : {}),
        ...(animationProps.scale !== undefined ? { scale: 1 } : {}),
        ...(animationProps.rotation !== undefined ? { rotation: 0 } : {}),
        opacity: 1,
        duration,
        stagger,
        ease: animationProps.ease,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse',
          scrub: false,
        }
      });

      return () => {
        anim.kill();
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars && trigger.vars.trigger === element) {
            trigger.kill();
          }
        });
      };
    } else {
      // Animación simple del elemento
      gsap.set(element, animationProps);
      
      const anim = gsap.to(element, {
        autoAlpha: 1,
        ...(animationProps.y !== undefined ? { y: 0 } : {}),
        ...(animationProps.x !== undefined ? { x: 0 } : {}),
        ...(animationProps.scale !== undefined ? { scale: 1 } : {}),
        ...(animationProps.rotation !== undefined ? { rotation: 0 } : {}),
        duration,
        ease: animationProps.ease,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse',
          scrub: false,
        }
      });

      return () => {
        anim.kill();
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars && trigger.vars.trigger === element) {
            trigger.kill();
          }
        });
      };
    }
  }, [animation, duration, stagger]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;


