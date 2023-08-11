const { myLogger } = require("./utils/myLogger");

async function mySleep(timeout) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve();
    }, timeout);
  })
}

(async () =>{
  for (var i = 0; i < 99+1;i ++){
    await mySleep(4)
    myLogger.log('error', { message: `world, ${__filename}-${i}` });
  }
})();

// logger.info('hello', { message: 'world' });

// logger.log({
//   level: 'info',
//   message: 'What time is the testing at?'
// });
