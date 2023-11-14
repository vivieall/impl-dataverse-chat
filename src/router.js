import HomeView from './views/homeView.js';
import DetailView from './views/detailView.js';
import PanelView from './views/panelView.js';
import ErrorView from './views/errorView.js';
import ApiKeyView from './views/apiKeyView.js';

// Este objeto mapea rutas a componentes
const routes = {
  '/': HomeView,
  '/detail/:id': DetailView,
  '/apiKey': ApiKeyView,
  '/panel': PanelView,
  '/error': ErrorView,
};

export function router() {
  const path = window.location.pathname;

  // Encuentra la vista que coincide con la ruta actual
  const routeMatch = Object.keys(routes).find(route => {
    if (route.includes(':id')) {
      const baseRoute = route.split('/:id')[0];
      return path.startsWith(baseRoute);
    }
    return route === path;
  });

  let viewFunction;
  let param;

  if (routeMatch) {
    viewFunction = routes[routeMatch];
    if (routeMatch.includes(':id')) {
      // Extraer el ID del personaje de la URL
      param = path.split('/detail/')[1];
    }
  } else {
    viewFunction = ErrorView;
  }

  // Renderiza la vista seleccionada dentro del elemento 'root'
  viewFunction(param);
}
