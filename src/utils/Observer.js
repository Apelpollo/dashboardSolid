/**
 * PATRÓN OBSERVER
 * Permite a objetos suscribirse a eventos y ser notificados cuando ocurren cambios.
 * 
 * Principio S.O.L.I.D aplicado:
 * - Open/Closed: Se puede agregar nuevos observadores sin modificar la clase
 * - Single Responsibility: Se encarga solo de gestionar suscripciones y notificaciones
 */

class Observer {
  constructor() {
    // Almacenamos todos los observadores
    this.observers = [];
  }

  /**
   * Suscribe un callback a los eventos
   * @param {Function} callback - Función a ejecutar cuando ocurre un evento
   * @returns {Function} Función para desuscribirse
   */
  subscribe(callback) {
    this.observers.push(callback);

    // Retornamos una función para desuscribirse
    return () => {
      this.observers = this.observers.filter(obs => obs !== callback);
    };
  }

  /**
   * Notifica a todos los observadores suscritos
   * @param {*} data - Datos a pasar a los observadores
   */
  notify(data) {
    this.observers.forEach(observer => observer(data));
  }

  /**
   * Limpia todos los observadores
   */
  clear() {
    this.observers = [];
  }

  /**
   * Retorna el número de observadores actuales
   */
  getObserverCount() {
    return this.observers.length;
  }
}

export default Observer;

