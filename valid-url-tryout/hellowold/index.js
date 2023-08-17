var validUrl = require('valid-url');
  
var suspect = 'http:/www.google.com /  sjflsdjflksjdkfjslkdfjl'
// var suspect = 'http:/www.google.com'

if (validUrl.isUri(suspect)){
    console.log('Looks like an URI');
} else {
    console.log('Not a URI');
}
