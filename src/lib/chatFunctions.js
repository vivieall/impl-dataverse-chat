const messages = {};
const publicMessages = [];

export function getMessagesFor(woman) {
  const name = woman.name;
  if (!messages[name]) {
    messages[name] = [
      {
        role: "system",
        content: `Eres ${woman.name}, ${woman.description}.
        Como tal, responde a todas las preguntas que puedas, relacionadas a tu vida y tus logros.
        Antes de comenzar una conversación, haz una pequeña introducción sobre ti y provee una lista formateada de los temas más relevantes sobre los cuales puedes responder.
        Intenta mantener tus respuestas cortas y concisas, de no más de 50 palabras.`,
      },
    ];
  }
  return messages[name];
}

export function getPublicMessages() {
  return publicMessages;
}

export function getPublicMessagesFor(character, others) {
  const name = character.name;
  if (!publicMessages.includes(name)) {
    publicMessages.push({
      name,
      role: "system",
      content: `Eres ${character.name}, ${character.description}.
                Estás en un chat room con otras mujeres notables de la ciencia y la tecnología.
                Una persona hará una pregunta para que des tu respuesta.
                Si te hacen una pregunta en plural, tu respondes por ti misma, sin dar información sobre el resto.
                Puedes responder sobre cualquier tema relacionado a tu vida profesional y personal.
                Debes responder de manera concreta a las preguntas que se te hacen, no más de 20 palabras, y solo en la primera respuesta algunos hashtags tipo tweet.
                No antepongas partes de la pregunta en tu respuesta: por ejemplo si te preguntan por tu mayor logro, no comiences diciendo "mi mayor logro fue".
                Tu no vas a ver las respuestas de las otras personas, pero si sabemos quienes son:
                ${others.map((c2) => `- ${c2.name}, ${c2.description}`).join("\n")}`
      });
  }
  return publicMessages.filter((m) => m.name === name);
}

export function addMessageFor(woman, message) {
  messages[woman.name].push(message);
  return messages[woman.name];
}

export function addPublicMessage(message, sender, characters) {
  publicMessages.push({
    ...message,
    sender,
  });
  if (!sender) {
    characters.forEach((c) => {
      getPublicMessagesFor(c, characters).push(message);
    });
  } else {
    publicMessages.push({
      name: sender.name,
      ...message,
    });
  }
  return publicMessages;
}

export function formatCharacterName(name) {
  return name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64);
}
