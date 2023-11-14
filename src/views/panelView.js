import Chat, { setupChat, addMessageToChat } from '../components/chat.js';
import { Footer } from '../components/footer.js';
import { addPublicMessage, getPublicMessagesFor, formatCharacterName } from "../lib/chatFunctions.js";
import { getOpenAiCompletion } from "../lib/openaiApi.js";
import people from '../data/dataset.js';

export default function PanelView() {
  document.getElementById('root').innerHTML = Chat();
  setupChat(handleUserSubmit);
  Footer();
}

function handleUserSubmit(message) {
  // Añadir el mensaje del usuario al chat
  addMessageToChat('user', message, 'user');

  // Procesar el mensaje a través de la IA para cada personaje
  people.forEach(person => {
    const initialMessage = getPublicMessagesFor(person, people)[0];
    const formattedInitialMessage = { ...initialMessage, name: formatCharacterName(initialMessage.name) };

    const userMessage = {
      role: 'user',
      content: message,
      name: 'user' // Nombre para el mensaje del usuario
    };

    getOpenAiCompletion([formattedInitialMessage, userMessage])
      .then(aiResponse => {
        addPublicMessage({ role: 'ai', content: aiResponse.content }, person, people);
        addMessageToChat(`${person.name}`, `${aiResponse.content}`, 'ai');
      });
  });
}

