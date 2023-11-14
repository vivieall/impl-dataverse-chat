import { Footer } from '../components/footer.js';
import { navigate } from "../main.js"

export default function ApiKeyView() {
  const rootElement = document.getElementById('root');

  rootElement.innerHTML = `
    <div class="api-key-container">
      <input type="text" id="apiKeyInput" placeholder="Ingresa el apiKey" />
      <button id="continueButton">Continuar</button>
    </div>
  `;

  const continueButton = document.getElementById('continueButton');
  const apiKeyInput = document.getElementById('apiKeyInput');

  continueButton.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    if(apiKey) {
      //TODO: Llamada a lógica a OpenAI
      console.log('ApiKey:', apiKey);
      localStorage.setItem('apiKey', apiKey)
      navigate('/panel');
    } else {
      alert('Por favor, ingresa un apiKey válido.');
    }
  });

 Footer();
}
