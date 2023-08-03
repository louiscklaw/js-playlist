const fetch = require('node-fetch')

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`writing log ${i}...`)
    const job_post = {
      job_link: "http://www.google.com",
      position: 'info',
      description: 'log comment ?',
      state: "job_found"
    }

    const new_job_response = await fetch('http://localhost:3001/api/v1/JobPost', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job_post),
      state: 'JOB_POST_FOUND'
    })
    const res_new_job_response = await new_job_response.json();
    const new_job_id = res_new_job_response._id;

    const response = await fetch('http://localhost:3002/process_new_job_post', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ new_job_id, job_post, }),
    })

    const res_json = await response.json()
    console.log({ res_new_job_response, res_json });
  })
