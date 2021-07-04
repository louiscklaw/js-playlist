function isFirefox() {
  var userAgent = navigator.userAgent;
  if (userAgent.indexOf("Firefox") > -1) {
    return true;
  } else {
    return false;
  }
}
