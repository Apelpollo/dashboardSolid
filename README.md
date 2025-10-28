# Solid Dashboard

Dashboard interactivo construido con React, GSAP, y principios S.O.L.I.D.

## 🚀 Características

- **Principios S.O.L.I.D**: Código limpio, mantenible y escalable
- **Patrones de Diseño**: Singleton, Factory, Observer
- **Animaciones Fluidas**: GSAP para transiciones suaves
- **GraphQL Integration**: Búsqueda dinámica de usuarios
- **REST API**: Integración con servicios REST
- **Dark/Light Mode**: Tema adaptable

## 🛠️ Tecnologías

- React 18
- GSAP 3
- Tailwind CSS
- Recharts
- Apollo Client
- GraphQL

## 📦 Instalación

```bash
npm install
npm start
```

## 🎨 Componentes

- **LandingPage**: Página de bienvenida con animaciones GSAP
- **Navigation**: Navegación sticky con modo oscuro
- **StatsPanel**: Panel de estadísticas con gráficos
- **SearchSection**: Búsqueda con GraphQL
- **UsersList**: Lista horizontal de usuarios

## 🏗️ Arquitectura

- `services/`: Servicios API (Singleton, REST, GraphQL)
- `context/`: Context API para estado global
- `components/`: Componentes React
- `utils/`: Utilidades (Observer, Factory)
- `data/`: Datos mock

## 📝 Licencia

MIT

