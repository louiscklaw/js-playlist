const axios = require('axios')
const config = require('dotenv').config()

const ERR_HELLOWORLD = 'helloworld error'

try {
  const { TELEGRAM_APIKEY, TELEGRAM_CHATID } = config.parsed

  const apiKey = TELEGRAM_APIKEY
  const chatId = TELEGRAM_CHATID

  // throw ERR_HELLOWORLD;

  // Construct the API endpoint URL
  const apiUrl = `https://api.telegram.org/bot${apiKey}/sendMessage`

  // Define the message payload
  const message = {
    chat_id: chatId,
    text: 'Hello from Node.js!',
  }

  // Send the message via POST request
  axios
    .post(apiUrl, message)
    .then(response => {
      // console.log('Message sent successfully:', response.data);
      console.log('send message done')
    })
    .catch(error => {
      // console.error('Error sending message:', error.response.data.description);
      throw error
    })
} catch (error) {
  if (error == ERR_HELLOWORLD) {
    console.log('this is a helloworld error')
  } else {
    console.log(error)
  }
}
