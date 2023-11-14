export function getOpenAiCompletion(messages) {
  const TOKEN = localStorage.getItem('apiKey');
  const url = "https://api.openai.com/v1/chat/completions";
  const bearer = 'Bearer ' + TOKEN;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': bearer,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "model": "gpt-3.5-turbo",
      messages,
      "temperature": 0.7,
    })
  }).then(response => {
    return response.json();
  }).then(data=>{
    console.log(data)
    return data.choices[0].message;
  }).catch(e => {
    console.error(e);
  });

}
