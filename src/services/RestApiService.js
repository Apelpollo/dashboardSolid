/**
 * SERVICIO API REST
 * 
 * Principio S.O.L.I.D aplicado:
 * - Single Responsibility: Este servicio se encarga exclusivamente
 *   de realizar operaciones REST
 * - Dependency Inversion: Depende de una abstracción (ApiConnection)
 *   en lugar de crear su propia implementación
 */

import apiConnection from './ApiConnection';

class RestApiService {
  constructor(connection = apiConnection) {
    // Dependency Inversion: Recibe la conexión como parámetro
    this.connection = connection;
  }

  /**
   * Obtiene usuarios de la API REST
   */
  async getUsers() {
    try {
      const users = await this.connection.get('/users');
      
      // Generar fotos aleatorias para cada usuario
      const generatePhotos = () => [
        `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}&sig=1`,
        `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}&sig=2`,
        `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}&sig=3`,
      ];
      
      // Agregamos estadísticas adicionales para el dashboard
      return users.map((user, index) => ({
        ...user,
        // Simulamos estadísticas adicionales
        postsCount: Math.floor(Math.random() * 200),
        commentsCount: Math.floor(Math.random() * 1000),
        likesCount: Math.floor(Math.random() * 5000),
        // Agregamos foto de perfil
        profileImage: `https://i.pravatar.cc/150?img=${index + 1}`,
        // Agregamos fotos recientes
        photos: generatePhotos(),
      }));
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      throw error;
    }
  }

  /**
   * Obtiene las estadísticas generales
   */
  async getStats() {
    try {
      const [users, posts] = await Promise.all([
        this.connection.get('/users'),
        this.connection.get('/posts'),
      ]);

      return {
        totalUsers: users.length,
        totalPosts: posts.length,
        activeUsers: Math.floor(users.length * 0.7),
        totalComments: Math.floor(posts.length * 5.5),
      };
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      throw error;
    }
  }

  /**
   * Obtiene un usuario específico por ID
   */
  async getUserById(id) {
    try {
      return await this.connection.get(`/users/${id}`);
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      throw error;
    }
  }
}

export default new RestApiService();

