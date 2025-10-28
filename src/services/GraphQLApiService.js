/**
 * SERVICIO API GraphQL
 * 
 * Principio S.O.L.I.D aplicado:
 * - Single Responsibility: Este servicio se encarga exclusivamente
 *   de realizar operaciones GraphQL
 * - Open/Closed: Las queries pueden extenderse sin modificar la clase
 */

class GraphQLApiService {
  constructor(endpoint = 'https://graphqlzero.almagest.co/graphql') {
    this.endpoint = endpoint;
  }

  /**
   * Método genérico para ejecutar queries GraphQL
   * 
   * Open/Closed Principle: Permite agregar nuevas queries
   * sin modificar esta clase
   */
  async query(query, variables = {}) {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      return data.data;
    } catch (error) {
      console.error('Error en la query GraphQL:', error);
      throw error;
    }
  }

  /**
   * Buscar usuarios por nombre
   * Query específica que usa el método genérico
   */
  async searchUsers(searchTerm) {
    const query = `
      query SearchUsers($searchTerm: String!) {
        users(filter: { or: [
          { name: { contains: $searchTerm } },
          { email: { contains: $searchTerm } }
        ]}) {
          data {
            id
            name
            email
            phone
          }
        }
      }
    `;

    return this.query(query, { searchTerm });
  }

  /**
   * Obtener usuarios con filtros avanzados
   */
  async getFilteredUsers(filters) {
    const query = `
      query GetFilteredUsers($filters: FilterFindManyUserInput) {
        users(filter: $filters) {
          data {
            id
            name
            email
            phone
            website
          }
        }
      }
    `;

    return this.query(query, { filters });
  }

  /**
   * Obtener estadísticas filtradas
   */
  async getFilteredStats(filter) {
    const query = `
      query GetStats {
        users {
          data {
            id
            name
          }
        }
        posts {
          data {
            id
            title
          }
        }
      }
    `;

    const data = await this.query(query);
    
    return {
      filteredUsers: data.users?.data?.length || 0,
      filteredPosts: data.posts?.data?.length || 0,
    };
  }
}

export default new GraphQLApiService();

