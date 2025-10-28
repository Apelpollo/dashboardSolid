/**
 * PATRÓN FACTORY
 * Permite crear componentes dinámicamente sin conocer sus clases específicas.
 * 
 * Principio S.O.L.I.D aplicado:
 * - Open/Closed: Se pueden agregar nuevos tipos de componentes
 *   sin modificar la clase Factory existente
 * - Dependency Inversion: Depende de abstracciones (componente React)
 *   en lugar de implementaciones concretas
 */

import StatCard from '../components/dashboard/StatCard';
import UserCard from '../components/dashboard/UserCard';
import ChartCard from '../components/dashboard/ChartCard';

class ComponentFactory {
  constructor() {
    // Mapeo de tipos de componentes
    this.componentMap = {
      stat: StatCard,
      user: UserCard,
      chart: ChartCard,
    };
  }

  /**
   * Crea un componente basado en el tipo especificado
   * 
   * @param {string} type - Tipo de componente a crear
   * @param {object} props - Propiedades para el componente
   * @returns {React.Component} Componente creado
   */
  createComponent(type, props) {
    const Component = this.componentMap[type];

    if (!Component) {
      console.warn(`Tipo de componente desconocido: ${type}`);
      return null;
    }

    return Component;
  }

  /**
   * Registra un nuevo tipo de componente
   * Open/Closed: Permite extender sin modificar
   * 
   * @param {string} type - Nombre del tipo
   * @param {React.Component} component - Componente React
   */
  registerComponent(type, component) {
    this.componentMap[type] = component;
  }

  /**
   * Retorna los tipos de componentes disponibles
   */
  getAvailableTypes() {
    return Object.keys(this.componentMap);
  }
}

export default new ComponentFactory();

