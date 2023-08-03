var kue = require('kue')
  , queue = kue.createQueue();

function isValidEmail() {
  return true;
}


function email1(address, done) {
  console.log('into email');

  if (!isValidEmail(address)) {
    //done('invalid to address') is possible but discouraged
    return done(new Error('invalid to address'));
  }
  done();
}

function email(address) {
  console.log('function email');
  return 'hello email'
}

queue.inactiveCount((err, count) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Current job queue length: ${count}`);
});

queue.process('email', 1, function (job, done) {
  console.log('process email');
  var result = email(job.data.to);
  done('blablabla');
});

queue.on('error', function (err) {
  console.log('Oops... ', err);
});

var job = queue.create('email', {
  title: 'welcome email for tj'
  , to: 'tj@learnboost.com'
  , template: 'welcome-email'
})
  .attempts(3)
  .on('complete', function (result) {
    console.log('Job completed with data ', result);

  }).on('failed attempt', function (errorMessage, doneAttempts) {
    console.log(`Job failed ${doneAttempts}`);

  }).on('failed', function (errorMessage) {
    console.log('Job failed');

  }).on('progress', function (progress, data) {
    console.log('\r  job #' + job.id + ' ' + progress + '% complete with data ', data);

  }).on('job enqueue', function (id, type) {
    console.log('Job %s got queued of type %s', id, type);

  }).save(function (err) {
    if (err) console.log(`${job.id} error ?`);

  });




// queue.process('email', function (job, done) {
//   email(job.data.to, done);
// });

// function email(address, done) {
//   if (!isValidEmail(address)) {
//     //done('invalid to address') is possible but discouraged
//     return done(new Error('invalid to address'));
//   }
//   // email send stuff...
//   done();
// }
