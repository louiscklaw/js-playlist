module.exports = app => {
  const users = require('../controllers/user.controller.js')

  app.post('/user', (req, res) => {
    console.log('add user')
    if (req.body != null) {
      console.log('create user')
      var new_user = users.create_user(req.body.username, req.body.password, req.body.enabled)
      new_user
        .save()
        .then(user => {
          console.log('save done')
          res.send(user)
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || 'error occur',
          })
        })
    } else {
      console.log('body not found')
      res.send(
        JSON.stringify({
          err: 'body not found',
        }),
      )
    }
  })

  app.delete('/user/:userId', (req, res) => {
    console.log('delete user')
    console.log(req.params.userId)
    users.delete_user(req.params.userId).then(user => {
      res.send(
        JSON.stringify({
          result: 'done',
        }),
      )
    })
  })

  app.put('/user', (req, res) => {
    console.log('update user')
  })

  app.post('/try_login', (req, res) => {
    // console.log( users.check_valid_user( req.body.username, req.body.password ) );

    users.check_valid_user(req.body.username, req.body.password, function (ret) {
      if (ret) {
        console.log('user valid')
        res.send('user valid')
      } else {
        console.log('user invalid')
        res.send('user invalid')
      }
    })
  })

  app.get('/user_list', (req, res) => {
    console.log('user_list')
    users.list_all_username().then(usernames => {
      res.send(JSON.stringify(usernames))
    })
  })

  app.get('/user', (req, res) => {
    console.log('/user')
    users
      .find_all_user()
      .then(users => {
        res.send(JSON.stringify(users))
      })
      .catch(err => {
        res.send('testing error')
      })
  })

  app.get('/users_helloworld', (req, res) => {
    console.log('helloworld from users route')
    res.send(users.helloworld())
  })

  app.put('/user/:userId', (req, res) => {
    console.log('update user')
    console.log(req.body)
    users.update(req.params.userId, req.body.username, req.body.password).then(user => {
      res.send(user)
    })
  })
}
