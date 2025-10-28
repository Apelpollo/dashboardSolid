/**
 * PATRÓN SINGLETON
 * Asegura que solo exista una única instancia de la conexión API
 * en toda la aplicación, evitando múltiples conexiones innecesarias.
 * 
 * Principio S.O.L.I.D aplicado:
 * - Single Responsibility: Esta clase se encarga exclusivamente de gestionar
 *   la conexión HTTP única de la aplicación.
 */

class ApiConnection {
  constructor() {
    // Si ya existe una instancia, la retornamos
    if (ApiConnection.instance) {
      return ApiConnection.instance;
    }

    // Configuración base para todas las peticiones
    this.baseURL = process.env.REACT_APP_API_URL || 'https://jsonplaceholder.typicode.com';
    
    // Guardamos la instancia
    ApiConnection.instance = this;
  }

  /**
   * Método para realizar peticiones HTTP
   * Centraliza toda la lógica de conexión en un solo lugar
   */
  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en la petición:', error);
      throw error;
    }
  }

  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Exportamos una instancia única
const apiConnection = new ApiConnection();
export default apiConnection;

