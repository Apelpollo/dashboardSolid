/**
 * COMPONENTE: Tarjeta de Usuario con Animaciones GSAP y Fade
 * 
 * Principio S.O.L.I.D aplicado:
 * - Single Responsibility: Se encarga solo de mostrar información de un usuario
 */

import React, { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const UserCard = ({ user, index = 0 }) => {
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef(null);

  // Animación de entrada en secuencia
  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Set initial state
    gsap.set(card, {
      opacity: 0,
      y: 50,
      scale: 0.8,
      rotation: 5
    });

    // Animate on mount with delay based on index
    const delay = index * 0.1;
    
    gsap.to(card, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotation: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
      delay: delay
    });

    return () => {
      gsap.killTweensOf(card);
    };
  }, [index]);


  // Funciones de iconos SVG
  const PostsIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );

  const CommentsIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );

  const LikesIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );

  return (
    <div 
      ref={cardRef}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-2 w-full h-full flex flex-col"
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {user.profileImage && !imgError ? (
            <img 
              src={user.profileImage}
              alt={user.name}
              className="h-12 w-12 rounded-full object-cover"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
              {user.name?.charAt(0) || 'U'}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {user.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{user.email}</p>
          <div className="mt-2 flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              {user.website}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {user.phone}
            </span>
          </div>
        </div>
      </div>
      
      {user.postsCount !== undefined && (
        <>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between text-sm">
            <div className="text-center flex-1">
              <p className="font-semibold text-gray-900 dark:text-white flex items-center justify-center gap-1">
                <PostsIcon /> {user.postsCount}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Posts</p>
            </div>
            <div className="text-center flex-1">
              <p className="font-semibold text-gray-900 dark:text-white flex items-center justify-center gap-1">
                <CommentsIcon /> {user.commentsCount}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Comentarios</p>
            </div>
            <div className="text-center flex-1">
              <p className="font-semibold text-gray-900 dark:text-white flex items-center justify-center gap-1">
                <LikesIcon /> {user.likesCount}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Likes</p>
            </div>
          </div>

          {/* Fotos Recientes con fade en bordes */}
          {user.photos && user.photos.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Fotos Recientes</p>
              <div className="flex gap-2">
                {user.photos.slice(0, 3).map((photo, idx) => (
                  <div
                    key={idx}
                    className="relative w-16 h-16 rounded-lg overflow-hidden group shadow-md hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={photo}
                      alt={`Foto ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    {/* Overlay sutil para mejor contraste */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserCard;
