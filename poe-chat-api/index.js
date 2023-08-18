'use strict'
const POE_TOKEN = 'jNTPkBw3L8pxyEe01nZQLg%3D%3D'

const Client = require("poe-chat-api");

(async () => {
  try {
    const client = new Client(POE_TOKEN, {
      showSteps: true,
    });
    const instance = await client.init();
    instance.sendMessage({
      message: 'hello ?'
    }, (response, text) => {
      console.log(response);
      console.log('hello response')
    })
  } catch (error) {
    console.log(error)
  }

  // | Parameter | Type | Default | Description |
  // | : -------- | : -------: | : -------: |  : ----------- | 
  // | `message` | `string` | `null` | ** Required **.The text of your message |
  // | `withChatBreak` | `boolean` | `false` | ** Optional **.Will the chat be broken ? |
  // | `messageId` | `number` | `random` | ** Optional **.It only works if ** noPattern: false **. |
  // | `paginationMethod` | `boolean` | `false` | ** Optional **.This method makes the GraphQl request to receive the result of the message instead of using the websocket.which is not more efficient than the websocket method.It is recommended to use it only when you use groups and you put many bots in the group. |
  // | `paginationCount` | `number` | `10` | ** Optional **.Specifies the number of messages received from pagination requests.The more it is, the higher the probability of ratelimit, and the greater the inefficiency.But if it is balanced, it will help to better check the message response.It is best to set it to a level that can cover the last few messages. |
  // | `paginationRefreshDelay` | `number` | `3000` | ** Optional **.If the response is not received, it tries to resend the request to receive the response.This property is related to the delay in sending each time.Example 3000ms means every 3000 milliseconds re - request is sent until a response is received. |


  console.log('helloworld')
})();
