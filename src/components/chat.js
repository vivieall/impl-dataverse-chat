export default function Chat() {
  return `
    <div class="chat-container">
      <h1>Panel Chat</h1>
      <div id="chatMessages" class="chat-messages"></div>
      <div class="input-button-chat">
        <input type="text" id="chatInput" placeholder="Escribe un mensaje..." />
        <button id="sendButton">Enviar</button>
      </div>
    </div>
  `;
}

export function addMessageToChat(person, message, sender) {
  const chatMessages = document.getElementById('chatMessages');

  // Crear un elemento para el nombre del remitente
  const senderNameElement = document.createElement('span');
  senderNameElement.className = 'label-user';
  senderNameElement.textContent = sender === 'user' ? '' : person + ' dice:';
  chatMessages.appendChild(senderNameElement);

  const messageElement = document.createElement('div');
  messageElement.className = `message-${sender}`;
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

export function setupChat(submitCallback) {
  const chatInput = document.getElementById('chatInput');
  const sendButton = document.getElementById('sendButton');

  sendButton.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
      submitCallback(message);
      chatInput.value = '';
    }
  });

  chatInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      const message = chatInput.value.trim();
      if (message) {
        submitCallback(message);
        chatInput.value = '';
      }
    }
  });
}
