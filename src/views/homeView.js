import { Home } from '../components/home.js';
import { Footer } from '../components/footer.js';
import { setupEventListeners } from '../lib/eventHandlers.js';
import { navigate } from "../main.js"

export default function HomeView() {
  document.getElementById('root').innerHTML = Home();

  setupEventListeners();
  Footer();

  const apiKeyButton = document.getElementById('apiKeyButton');
  if (apiKeyButton) {
    apiKeyButton.addEventListener('click', () => {
      console.log("Dirigiendo a vista apiKey")
      navigate('/apiKey');
    });
  }

  const chatRoomButton = document.getElementById('chatRoomButton');
  let getApiKey = localStorage.getItem('apiKey');
  if (chatRoomButton) {
    chatRoomButton.addEventListener('click', () => {
      console.log("apiKey guardada: ", getApiKey)
      getApiKey ? navigate('/panel') : navigate('/apiKey');
    });
  }

  const homeButton = document.getElementById('home');
  if (homeButton) {
    homeButton.addEventListener('click', () => {
      console.log("Volviendo a home")
      navigate('/');
    });
  }
}
