const { WebClient } = require('@slack/web-api')
const fs = require('fs')

// An access token (from your Slack app or custom integration - xoxp, xoxb)
const token = process.env.SLACK_TOKEN

const web = new WebClient(token)

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = '_debug'

;(async () => {
  // See: https://api.slack.com/methods/chat.postMessage

  const upload_img_result = await web.files.upload({
    channels: conversationId,
    file: fs.createReadStream('./tests/helloworld.png'),
    // filename: 'helloworld.png'
  })

  // console.log(upload_img_result.ok)
  const upload_img_url = upload_img_result.file.permalink
  console.log(upload_img_url)
})()
