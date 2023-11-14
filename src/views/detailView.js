import Detail from "../components/detail.js";
import Chat, { setupChat, addMessageToChat } from "../components/chat.js";
import { Footer } from "../components/footer.js";
import {
  addPublicMessage,
  getPublicMessagesFor,
  formatCharacterName,
} from "../lib/chatFunctions.js";
import { getOpenAiCompletion } from "../lib/openaiApi.js";
import people from "../data/dataset.js";

export default function DetailView() {
  // Extraer el ID desde la URL
  const path = window.location.pathname;
  const pathParts = path.split('-');
  const id = pathParts.slice(1).join('-'); // Extrae y reconstruye el ID

  console.log(id);
  const character = people.find(person => person.id === id);
  console.log(character, "character");

  if (!character) {
    window.location.href = '/error';
    return;
  }
  // Continuar con la lógica de la vista de detalles
  document.getElementById("root").innerHTML = Detail(character);
  setupChat(handleUserSubmit);
  Footer();


function handleUserSubmit(message) {
  // Añadir el mensaje del usuario al chat
  addMessageToChat('user', message, 'user');

  // Procesar el mensaje a través de la IA para cada personaje
  const initialMessage = getPublicMessagesFor(character, people)[0];
  const formattedInitialMessage = {
    ...initialMessage,
    name: formatCharacterName(initialMessage.name),
  };

  const userMessage = {
    role: "user",
    content: message,
    name: "user", // Nombre para el mensaje del usuario
  };

  getOpenAiCompletion([formattedInitialMessage, userMessage]).then(
    (aiResponse) => {
      addPublicMessage({ role: "ai", content: aiResponse.content }, character, people);
      addMessageToChat(`${character.name}`, `${aiResponse.content}`, "ai");
    }
  );
}

}
