function isChrome() {
  var userAgent = navigator.userAgent
  if (userAgent.indexOf('Chrome') > -1) {
    return true
  } else {
    return false
  }
}
