'use strict'

const fs = require('fs')
var path = require('path')

const fetch = require('node-fetch')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

var kue = require('kue-scheduler')

const PORT = 3002
const DBAPI_HOST = 'http://dbapi:3001/api/v1'
const JOBPOST_ENDPOINT = `${DBAPI_HOST}/JobPost`

var Queue = kue.createQueue({
  redis: { host: 'redis', port: 6379 },
})

//processing jobs
Queue.process('now', 1, function (job, done) {
  console.log('\nProcessing job with id %s at %s', job.id, new Date())
  const { data } = job
  const { new_job_id, job_link } = data

  // http://dbapi:3001/api/v1/JobPost/${new_job_id}
  fetch(`${JOBPOST_ENDPOINT}/${new_job_id}`, {
    method: 'patch',
    body: JSON.stringify({ state: 'job_process_done' }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(res_json => {
      // console.log(res_json)
      done(null, {
        deliveredAt: new Date(),
        res_json
      })
    })
    .catch(err => console.log(err))
})

//listen on scheduler errors
Queue.on('schedule error', function (error) {
  //handle all scheduling errors here
  console.log(error)
})

//listen on success scheduling
Queue.on('schedule success', function (job) {
  //a highly recommended place to attach
  //job instance level events listeners

  job
    .on('complete', function (result) {
      console.log('Job completed with data ', result)
    })
    .on('failed attempt', function (errorMessage, doneAttempts) {
      console.log('Job failed')
    })
    .on('failed', function (errorMessage) {
      console.log('Job failed')
    })
    .on('progress', function (progress, data) {
      console.log('\r  job #' + job.id + ' ' + progress + '% complete with data ', data)
    })
})

app.post('/process_new_job_post', async (req, res) => {
  const req_body = req.body
  const { new_job_id, job_post } = req_body
  const { job_link } = job_post
  console.log({ job_link })

  //prepare a job to perform
  //dont save it
  var job = Queue.createJob('now', {
    new_job_id,
    job_link,
  })
    .attempts(3)
    .backoff({ delay: 60000, type: 'fixed' })
    .priority('normal')

  Queue.now(job)

  res.send({ hello: 'done' })
})

try {
  app.listen(PORT)
  console.log(`express init done on oprt ${PORT}.`)
} catch (error) {
  console.log(error)
} finally {
  // browser.close();
}
