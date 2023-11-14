import { router } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
  router(); // Inicializa el enrutador para configurar la vista inicial
});

export const navigate = (path) => {
  window.history.pushState({}, '', path);
  router();
};

// Escucha cambios en el estado de la navegación para manejar el historial del navegador
window.addEventListener('popstate', router);
