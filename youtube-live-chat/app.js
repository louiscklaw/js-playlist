const YouTube = require('youtube-live-chat')

const yt = new YouTube('Hu1FkdAOws0', 'AIzaSyAniivNFUiBiyK_MELdOr2DT3d4Y1ZijNs')

yt.on('ready', () => {
  console.log('ready!')
  yt.listen(1000)
})

yt.on('message', data => {
  console.log(data.snippet.displayMessage)
})

yt.on('error', error => {
  console.error(error)
})

// API key
// AIzaSyCbIQF1Q6VBT3SdI3bPVgf6PNlTr5ngXwM

// client id
// 423679156486-1hbbq0t78ca75kag1l6smlj1lu7vue29.apps.googleusercontent.com

// client secret
// EtqELDz-sJPb1IK8i6dv4ugT
