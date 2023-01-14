const User = require('../models/user.model.js')

exports.find_all_user = () => {
  return User.find()
}

exports.create_user = (username_in, password_in, enabled_in) => {
  return new User({
    username: username_in,
    password: password_in,
    enabled: enabled_in,
  })
}

exports.list_all_username = () => {
  return User.find({}, 'username')
}

exports.helloworld = () => {
  console.log('helloworld from user model')
  return 'helloworld'
}

exports.delete_user = _id => {
  console.log('delete user')
  return User.findByIdAndRemove(_id)
}

exports.find_user_by_id = _id => {
  return User.findById(_id)
}

exports.update = (_id, username_in, password_in) => {
  return User.findByIdAndUpdate(
    _id,
    {
      username: username_in,
      password: password_in,
    },
    {
      new: true,
    },
  )
}

function get_user(username_in, cb) {
  User.findOne({ username: username_in }, function (err, user) {
    if (err) console.log(err)
    cb(user)
  })
}

function check_password_by_username(username_in, password_in, cb) {
  get_user(username_in, function (user) {
    cb(password_in == user.password)
  })
}

exports.check_valid_user = (username_in, password_in, cb) => {
  var user_ok = false
  get_user(username_in, function (user) {
    user_ok = password_in == user.password
    user_ok &= user.enabled
    cb(user_ok)
  })
}
