const axios = require('axios');

for (var i = 0; i < 10; i++) {
    axios.get('http://localhost:3000/protected_helloworld')
        .then((result) => console.log(`result ${result.data}`))
        .catch(err => console.error('result fail'));
}

// // should be tripped here, should be all failed
// for (var i = 0; i < 10; i++) {
//     axios.get('http://localhost:3000/protected_helloworld')
//         .then((result) => console.log(`result ${result.data}`))
//         .catch(err => console.error('result fail'));
// }
