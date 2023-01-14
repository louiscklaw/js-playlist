let NOT_SELECTED = 'not selected'

var JSON_HEADER = {
  'Content-Type': 'application/json',
}

function insert_into_select_list(ele_in, text_in, value_in) {
  var opt1 = document.createElement('option')
  opt1.value = value_in
  opt1.text = text_in
  ele_in.add(opt1, null)
}

function empty_select_list(ele_in) {
  console.log('calling empty list')
  var length = get_ele(ele_in).options.length
  for (i = 0; i < length; i++) {
    console.log('calling on ' + i)
    get_ele(ele_in).remove(0)
  }
}

function get_value(selector_in) {
  return get_ele(selector_in).value
}

function get_ele(selector) {
  return document.querySelector(selector)
}

function fetch_get_json(uri) {
  return fetch(uri, {
    method: 'GET',
  }).then(res => res.json())
}

function fetch_get_text(uri) {
  fetch(uri, {
    method: 'GET',
  })
    .then(res => res.text())
    .then(text => console.log(text))
}

function fetch_helloworld() {
  console.log('fetching')
  fetch('/helloworld').then(res => console.log(res.text()))
}

function empty_input_text(ele_in) {
  ele_in.value = ''
}

function empty_user_update_input_text() {
  empty_input_text(get_ele('#update_username'))
  empty_input_text(get_ele('#update_password'))
}

function click_update_user() {
  console.log('click update user')
  fetch('/user/' + get_value('#user_id_list_update'), {
    method: 'PUT',
    headers: JSON_HEADER,
    body: JSON.stringify({
      username: get_value('#update_username'),
      password: get_value('#update_password'),
    }),
  }).then(res => {
    console.log(res)
    refresh_screen_for_user()
    empty_user_update_input_text()
  })
}

function clear_ceate_user_input() {
  get_ele('#create_username').value = ''
  get_ele('#create_password').value = ''
}

function click_create_user() {
  console.log('click create user')
  fetch('/user', {
    method: 'POST',
    headers: JSON_HEADER,
    body: JSON.stringify({
      username: get_value('#create_username'),
      password: get_value('#create_password'),
      enabled: get_value('#create_user_enabled'),
    }),
  }).then(result => {
    refresh_screen_for_user()
    clear_ceate_user_input()
  })
}

function click_list_users() {
  console.log('click list user')
  fetch('/user')
    .then(res => res.json())
    .then(json => {
      get_ele('.list_user_result').innerHTML = '<pre>' + JSON.stringify(json, null, 2) + '</pre>'
    })
}

function get_user_list_from_server(ele_in) {
  fetch('/user_list')
    .then(res => res.json())
    .then(jsons => {
      jsons.forEach(json => {
        insert_into_select_list(ele_in, json['username'], json['_id'])
      })
    })
}

function update_delete_user_list() {
  console.log('update_delete_user_list')
  get_user_list_from_server(get_ele('#user_id_list_delete'))
}

function update_update_user_list() {
  console.log('update_update_user_list')
  get_user_list_from_server(get_ele('#user_id_list_update'))
}

function click_delete_user() {
  console.log('click_delete_user')

  fetch('/user/' + get_value('#user_id_list_delete'), {
    method: 'DELETE',
  }).then(data => {
    console.log('delete done')
    refresh_screen_for_user()
  })
}

function refresh_screen_for_user() {
  empty_select_list('#user_id_list_delete')
  update_delete_user_list()

  empty_select_list('#user_id_list_update')
  update_update_user_list()
}

document.addEventListener('DOMContentLoaded', () => {
  // helloworld();
  console.log('hello user.js')
  refresh_screen_for_user()
})

function create_noteId() {
  console.log('create_noteId')

  fetch('http://localhost:3001/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title_to_create: get_ele('#title_to_create').value,
      content_to_create: get_ele('#content_to_create').value,
    }),
  }).then(res => {
    console.log(res)
    refresh_info()
  })
}

function click_update() {
  if (get_value('#update_noteid_list') != NOT_SELECTED) {
    fetch('http://localhost:3001/notes/' + get_ele('#update_noteid_list').value, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title_to_update: get_value('#update_title'),
        content_to_update: get_value('#update_content'),
      }),
    }).then(res => {
      clear_update_box()
    })
  } else {
    console.log('not selected found')
  }
}

function get_noteid(note_id) {
  return fetch('http://localhost:3001/notes/' + note_id).then(res => res.json())
}

function read_single_noteId() {
  get_noteid(get_ele('#noteId_to_read').value).then(json => {
    get_ele('.read_result').innerHTML = JSON.stringify(json)
  })
}

function refresh_update_note_list() {
  empty_select_list('#update_noteid_list')
  update_update_list()
}

function refresh_delete_note_list() {
  empty_select_list('#delete_noteid_list')
  update_delete_list()
}

function delete_noteid() {
  if (get_ele('#delete_noteid_list').value != NOT_SELECTED) {
    fetch('http://localhost:3001/notes/' + get_ele('#delete_noteid_list').value, {
      method: 'DELETE',
    }).then(res => {
      refresh_delete_note_list()
    })
  } else {
    console.log('not select found on delete')
  }
}

function check_value_updated() {
  return true
}

function find_note() {
  fetch('http://localhost:3001/find_note', {
    method: 'POST',
    headers: JSON_HEADER,
    body: JSON.stringify({
      title: get_value('#title_to_find'),
      content: get_value('#content_to_find'),
    }),
  })
}

function click_list_notes() {
  console.log('click_list_notes')
  fetch('notes')
    .then((res, rej) => {
      return res.json()
    })
    .then(jsons => {
      get_ele('.list_note_result').innerHTML = '<pre>' + JSON.stringify(jsons, null, 2) + '</pre>'
    })
}

function search_noteid() {
  console.log('search note id')
  fetch('/find_note', {
    method: 'POST',
    headers: JSON_HEADER,
    body: JSON.stringify({
      title: get_value('#title_to_search'),
      content: get_value('#content_to_search'),
    }),
  })
    .then(res => res.json())
    .then(jsons => (get_ele('.search_result').innerHTML = JSON.stringify(jsons)))
}

function get_noteId_list() {
  return fetch_get_json('/all_noteid')
}

function assemble_update_noteid_list(json_noteId) {
  json_noteId.forEach(j => {
    var sel = get_ele('#update_noteid_list')
    var opt1 = document.createElement('option')
    opt1.value = j._id
    opt1.text = j._id
    sel.add(opt1, null)
  })
}

function assemble_delete_noteid_list(json_noteId) {
  json_noteId.forEach(j => {
    var sel = get_ele('#delete_noteid_list')
    var opt1 = document.createElement('option')

    opt1.value = j._id
    opt1.text = j._id

    sel.add(opt1, null)
  })
}

function update_delete_list() {
  console.log('calling update list')
  get_noteId_list().then(json => {
    assemble_delete_noteid_list(json)
    add_not_selected('#delete_noteid_list')
    get_ele('#delete_noteid_list').value = NOT_SELECTED
  })
}

function try_login() {
  fetch('/try_login', {
    method: 'POST',
    body: JSON.stringify({
      username: get_value('#username'),
      password: get_value('#password'),
    }),
    headers: JSON_HEADER,
  })
}

function add_not_selected(ele_in) {
  var opt_not_selected = document.createElement('option')
  opt_not_selected.text = NOT_SELECTED
  opt_not_selected.value = NOT_SELECTED

  get_ele(ele_in).add(opt_not_selected, null)
}

function update_update_list() {
  get_noteId_list().then(json => {
    assemble_update_noteid_list(json)
    add_not_selected('#update_noteid_list')
    get_ele('#update_noteid_list').value = NOT_SELECTED
  })
}

function clear_search_box() {
  console.log('clear_search_box')
  clear_input_box('#noteId_to_search')
  clear_input_box('#title_to_search')
  clear_input_box('#content_to_search')
}

function unselect_update_list() {
  get_ele('#update_noteid_list').value = NOT_SELECTED
}

function clear_update_box() {
  console.log('clear_update_box')
  // clear_input_box( '#update_noteid_list' );
  unselect_update_list()

  clear_input_box('#update_title')
  clear_input_box('#update_content')
}

function clear_input_box(ele_in) {
  get_ele(ele_in).value = ''
}

function refresh_info() {
  refresh_delete_note_list()
  refresh_update_note_list()
}

function update_noteid_change(ele_in) {
  console.log('update_noteid_change')
  console.log(ele_in.value)
  if (ele_in.value != NOT_SELECTED) {
    get_noteid(ele_in.value).then(json => {
      console.log(json)
      get_ele('#update_title').value = json.title
      get_ele('#update_content').value = json.content
    })
  } else {
    console.log('not selected found on update')
    get_ele('#update_title').value = ''
    get_ele('#update_content').value = ''
  }
}

function hello_user() {
  console.log('hello user')
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('hello app.js')
  refresh_info()
})

function helloworld() {
  console.log('helloworld')
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnN0LmpzIiwiY29tbW9uLmpzIiwidXNlci5qcyIsImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IE5PVF9TRUxFQ1RFRCA9ICdub3Qgc2VsZWN0ZWQnO1xuXG52YXIgSlNPTl9IRUFERVIgPSB7XG4gICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xufTtcbiIsIlxuZnVuY3Rpb24gaW5zZXJ0X2ludG9fc2VsZWN0X2xpc3QgKGVsZV9pbiwgdGV4dF9pbiwgdmFsdWVfaW4gKSB7XG4gICAgdmFyIG9wdDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcIm9wdGlvblwiICk7XG4gICAgb3B0MS52YWx1ZSA9IHZhbHVlX2luO1xuICAgIG9wdDEudGV4dCA9IHRleHRfaW47XG4gICAgZWxlX2luLmFkZCggb3B0MSwgbnVsbCApO1xufVxuXG5mdW5jdGlvbiBlbXB0eV9zZWxlY3RfbGlzdCggZWxlX2luICkge1xuICAgIGNvbnNvbGUubG9nKCAnY2FsbGluZyBlbXB0eSBsaXN0JyApO1xuICAgIHZhciBsZW5ndGggPSBnZXRfZWxlKCBlbGVfaW4gKS5vcHRpb25zLmxlbmd0aDtcbiAgICBmb3IgKCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrICkge1xuICAgICAgICBjb25zb2xlLmxvZyggXCJjYWxsaW5nIG9uIFwiICsgaSApO1xuICAgICAgICBnZXRfZWxlKCBlbGVfaW4gKS5yZW1vdmUoIDAgKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldF92YWx1ZSggc2VsZWN0b3JfaW4gKSB7XG4gICAgcmV0dXJuIGdldF9lbGUoIHNlbGVjdG9yX2luICkudmFsdWU7XG59XG5cbmZ1bmN0aW9uIGdldF9lbGUoIHNlbGVjdG9yICkge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBzZWxlY3RvciApO1xufVxuXG5mdW5jdGlvbiBmZXRjaF9nZXRfanNvbiggdXJpICkge1xuICAgIHJldHVybiBmZXRjaCggdXJpLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCJcbiAgICAgICAgfSApXG4gICAgICAgIC50aGVuKCByZXMgPT4gcmVzLmpzb24oKSApO1xuXG59XG5cbmZ1bmN0aW9uIGZldGNoX2dldF90ZXh0KCB1cmkgKSB7XG4gICAgZmV0Y2goIHVyaSwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiXG4gICAgICAgIH0gKVxuICAgICAgICAudGhlbiggcmVzID0+IHJlcy50ZXh0KCkgKVxuICAgICAgICAudGhlbiggdGV4dCA9PiBjb25zb2xlLmxvZyggdGV4dCApICk7XG5cbn1cblxuXG5mdW5jdGlvbiBmZXRjaF9oZWxsb3dvcmxkKCkge1xuICAgIGNvbnNvbGUubG9nKCAnZmV0Y2hpbmcnICk7XG4gICAgZmV0Y2goICcvaGVsbG93b3JsZCcgKVxuICAgICAgICAudGhlbiggcmVzID0+IGNvbnNvbGUubG9nKCByZXMudGV4dCgpICkgKTtcbn1cblxuZnVuY3Rpb24gZW1wdHlfaW5wdXRfdGV4dCAoIGVsZV9pbiApIHtcbiAgICBlbGVfaW4udmFsdWUgPSAnJztcbn1cbiIsIlxuZnVuY3Rpb24gZW1wdHlfdXNlcl91cGRhdGVfaW5wdXRfdGV4dCAoKSB7XG4gICAgZW1wdHlfaW5wdXRfdGV4dCggZ2V0X2VsZSggJyN1cGRhdGVfdXNlcm5hbWUnICkgKTtcbiAgICBlbXB0eV9pbnB1dF90ZXh0KCBnZXRfZWxlKCAnI3VwZGF0ZV9wYXNzd29yZCcgKSApO1xufVxuXG5mdW5jdGlvbiBjbGlja191cGRhdGVfdXNlciAoKSB7XG4gICAgY29uc29sZS5sb2coIFwiY2xpY2sgdXBkYXRlIHVzZXJcIiApO1xuICAgIGZldGNoKCAnL3VzZXIvJyArIGdldF92YWx1ZSggJyN1c2VyX2lkX2xpc3RfdXBkYXRlJyApLCB7XG4gICAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgICAgaGVhZGVyczogSlNPTl9IRUFERVIsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KCB7XG4gICAgICAgICAgICB1c2VybmFtZTogZ2V0X3ZhbHVlKCcjdXBkYXRlX3VzZXJuYW1lJyksXG4gICAgICAgICAgICBwYXNzd29yZDogZ2V0X3ZhbHVlKCcjdXBkYXRlX3Bhc3N3b3JkJylcbiAgICAgICAgfSApXG4gICAgfSApXG4gICAgICAgIC50aGVuKCByZXMgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coIHJlcyApO1xuICAgICAgICAgICAgcmVmcmVzaF9zY3JlZW5fZm9yX3VzZXIoKTtcbiAgICAgICAgICAgIGVtcHR5X3VzZXJfdXBkYXRlX2lucHV0X3RleHQoKTtcblxuICAgICAgICB9KTtcbn1cblxuZnVuY3Rpb24gY2xlYXJfY2VhdGVfdXNlcl9pbnB1dCAoKSB7XG4gICAgZ2V0X2VsZSggJyNjcmVhdGVfdXNlcm5hbWUnICkudmFsdWUgPSAnJztcbiAgICBnZXRfZWxlKCAnI2NyZWF0ZV9wYXNzd29yZCcgKS52YWx1ZSA9ICcnO1xufVxuXG5mdW5jdGlvbiBjbGlja19jcmVhdGVfdXNlciAoKSB7XG4gICAgY29uc29sZS5sb2coICdjbGljayBjcmVhdGUgdXNlcicgKTtcbiAgICBmZXRjaCggJy91c2VyJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczogSlNPTl9IRUFERVIsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KCB7XG4gICAgICAgICAgICB1c2VybmFtZTogZ2V0X3ZhbHVlKCAnI2NyZWF0ZV91c2VybmFtZScgKSxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBnZXRfdmFsdWUoICcjY3JlYXRlX3Bhc3N3b3JkJyApLFxuICAgICAgICAgICAgZW5hYmxlZDogZ2V0X3ZhbHVlKCcjY3JlYXRlX3VzZXJfZW5hYmxlZCcpXG4gICAgICAgIH0gKVxuICAgIH0gKVxuICAgICAgICAudGhlbiggcmVzdWx0ID0+IHtcbiAgICAgICAgICAgIHJlZnJlc2hfc2NyZWVuX2Zvcl91c2VyKCk7XG4gICAgICAgICAgICBjbGVhcl9jZWF0ZV91c2VyX2lucHV0KCk7XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gY2xpY2tfbGlzdF91c2VycygpIHtcbiAgICBjb25zb2xlLmxvZyggXCJjbGljayBsaXN0IHVzZXJcIiApO1xuICAgIGZldGNoKCAnL3VzZXInIClcbiAgICAgICAgLnRoZW4oIHJlcyA9PiByZXMuanNvbigpIClcbiAgICAgICAgLnRoZW4oIGpzb24gPT4ge1xuICAgICAgICAgICAgZ2V0X2VsZSggJy5saXN0X3VzZXJfcmVzdWx0JyApLmlubmVySFRNTCA9ICc8cHJlPicgKyBKU09OLnN0cmluZ2lmeSgganNvbiwgbnVsbCwgMiApICsgJzwvcHJlPic7XG4gICAgICAgIH0gKVxufVxuXG5mdW5jdGlvbiBnZXRfdXNlcl9saXN0X2Zyb21fc2VydmVyKCBlbGVfaW4gKSB7XG4gICAgZmV0Y2goICcvdXNlcl9saXN0JyApXG4gICAgICAgIC50aGVuKCByZXMgPT4gcmVzLmpzb24oKSApXG4gICAgICAgIC50aGVuKCBqc29ucyA9PiB7XG4gICAgICAgICAgICBqc29ucy5mb3JFYWNoKCBqc29uID0+IHtcbiAgICAgICAgICAgICAgICBpbnNlcnRfaW50b19zZWxlY3RfbGlzdChcbiAgICAgICAgICAgICAgICAgICAgZWxlX2luLFxuICAgICAgICAgICAgICAgICAgICBqc29uWyAndXNlcm5hbWUnIF0sXG4gICAgICAgICAgICAgICAgICAgIGpzb25bICdfaWQnIF1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9IClcbiAgICAgICAgfSApXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZV9kZWxldGVfdXNlcl9saXN0KCkge1xuICAgIGNvbnNvbGUubG9nKCAndXBkYXRlX2RlbGV0ZV91c2VyX2xpc3QnICk7XG4gICAgZ2V0X3VzZXJfbGlzdF9mcm9tX3NlcnZlciggZ2V0X2VsZSggJyN1c2VyX2lkX2xpc3RfZGVsZXRlJyApICk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZV91cGRhdGVfdXNlcl9saXN0KCkge1xuICAgIGNvbnNvbGUubG9nKCAndXBkYXRlX3VwZGF0ZV91c2VyX2xpc3QnICk7XG4gICAgZ2V0X3VzZXJfbGlzdF9mcm9tX3NlcnZlciggZ2V0X2VsZSggJyN1c2VyX2lkX2xpc3RfdXBkYXRlJyApICk7XG59XG5cbmZ1bmN0aW9uIGNsaWNrX2RlbGV0ZV91c2VyKCkge1xuICAgIGNvbnNvbGUubG9nKCAnY2xpY2tfZGVsZXRlX3VzZXInICk7XG5cbiAgICBmZXRjaCggJy91c2VyLycrZ2V0X3ZhbHVlKCcjdXNlcl9pZF9saXN0X2RlbGV0ZScpLCB7XG4gICAgICAgIG1ldGhvZDogJ0RFTEVURSdcbiAgICB9IClcbiAgICAgICAgLnRoZW4oIGRhdGEgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coICdkZWxldGUgZG9uZScgKVxuICAgICAgICAgICAgcmVmcmVzaF9zY3JlZW5fZm9yX3VzZXIoKTtcbiAgICB9KVxufVxuXG5mdW5jdGlvbiByZWZyZXNoX3NjcmVlbl9mb3JfdXNlciAoKSB7XG4gICAgZW1wdHlfc2VsZWN0X2xpc3QoICcjdXNlcl9pZF9saXN0X2RlbGV0ZScgKTtcbiAgICB1cGRhdGVfZGVsZXRlX3VzZXJfbGlzdCgpO1xuXG4gICAgZW1wdHlfc2VsZWN0X2xpc3QoIFwiI3VzZXJfaWRfbGlzdF91cGRhdGVcIiApO1xuICAgIHVwZGF0ZV91cGRhdGVfdXNlcl9saXN0KCk7XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIC8vIGhlbGxvd29ybGQoKTtcbiAgICBjb25zb2xlLmxvZyggXCJoZWxsbyB1c2VyLmpzXCIgKTtcbiAgICByZWZyZXNoX3NjcmVlbl9mb3JfdXNlcigpO1xufSApO1xuIiwiXG5mdW5jdGlvbiBjcmVhdGVfbm90ZUlkKCkge1xuICAgIGNvbnNvbGUubG9nKCAnY3JlYXRlX25vdGVJZCcgKTtcblxuICAgIGZldGNoKCAnaHR0cDovL2xvY2FsaG9zdDozMDAxL25vdGVzJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSgge1xuICAgICAgICAgICAgICAgIHRpdGxlX3RvX2NyZWF0ZTogZ2V0X2VsZSggJyN0aXRsZV90b19jcmVhdGUnICkudmFsdWUsXG4gICAgICAgICAgICAgICAgY29udGVudF90b19jcmVhdGU6IGdldF9lbGUoICcjY29udGVudF90b19jcmVhdGUnICkudmFsdWVcbiAgICAgICAgICAgIH0gKSxcbiAgICAgICAgfSApXG4gICAgICAgIC50aGVuKCAoIHJlcyApID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCByZXMgKTtcbiAgICAgICAgICAgIHJlZnJlc2hfaW5mbygpO1xuICAgICAgICB9IClcbn1cblxuZnVuY3Rpb24gY2xpY2tfdXBkYXRlKCkge1xuXG4gICAgaWYgKCBnZXRfdmFsdWUoICcjdXBkYXRlX25vdGVpZF9saXN0JyApICE9IE5PVF9TRUxFQ1RFRCApIHtcbiAgICAgICAgZmV0Y2goICdodHRwOi8vbG9jYWxob3N0OjMwMDEvbm90ZXMvJyArIGdldF9lbGUoICcjdXBkYXRlX25vdGVpZF9saXN0JyApLnZhbHVlLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSgge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZV90b191cGRhdGU6IGdldF92YWx1ZSggJyN1cGRhdGVfdGl0bGUnICksXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRfdG9fdXBkYXRlOiBnZXRfdmFsdWUoICcjdXBkYXRlX2NvbnRlbnQnIClcbiAgICAgICAgICAgICAgICB9IClcbiAgICAgICAgICAgIH0gKVxuICAgICAgICAgICAgLnRoZW4oIHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgY2xlYXJfdXBkYXRlX2JveCgpO1xuICAgICAgICAgICAgfSApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCAnbm90IHNlbGVjdGVkIGZvdW5kJyApO1xuXG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRfbm90ZWlkKCBub3RlX2lkICkge1xuICAgIHJldHVybiBmZXRjaCggJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9ub3Rlcy8nICsgbm90ZV9pZCApXG4gICAgICAgIC50aGVuKCByZXMgPT4gcmVzLmpzb24oKSApO1xufVxuXG5mdW5jdGlvbiByZWFkX3NpbmdsZV9ub3RlSWQoKSB7XG4gICAgZ2V0X25vdGVpZCggZ2V0X2VsZSggJyNub3RlSWRfdG9fcmVhZCcgKS52YWx1ZSApXG4gICAgICAgIC50aGVuKCBqc29uID0+IHtcbiAgICAgICAgICAgIGdldF9lbGUoICcucmVhZF9yZXN1bHQnICkuaW5uZXJIVE1MID0gSlNPTi5zdHJpbmdpZnkoIGpzb24gKVxuICAgICAgICB9ICk7XG59XG5cbmZ1bmN0aW9uIHJlZnJlc2hfdXBkYXRlX25vdGVfbGlzdCgpIHtcbiAgICBlbXB0eV9zZWxlY3RfbGlzdCggJyN1cGRhdGVfbm90ZWlkX2xpc3QnICk7XG4gICAgdXBkYXRlX3VwZGF0ZV9saXN0KCk7XG5cbn1cblxuZnVuY3Rpb24gcmVmcmVzaF9kZWxldGVfbm90ZV9saXN0KCkge1xuICAgIGVtcHR5X3NlbGVjdF9saXN0KCAnI2RlbGV0ZV9ub3RlaWRfbGlzdCcgKTtcbiAgICB1cGRhdGVfZGVsZXRlX2xpc3QoKTtcbn1cblxuZnVuY3Rpb24gZGVsZXRlX25vdGVpZCgpIHtcbiAgICBpZiAoIGdldF9lbGUoICcjZGVsZXRlX25vdGVpZF9saXN0JyApLnZhbHVlICE9IE5PVF9TRUxFQ1RFRCApIHtcbiAgICAgICAgZmV0Y2goICdodHRwOi8vbG9jYWxob3N0OjMwMDEvbm90ZXMvJyArIGdldF9lbGUoICcjZGVsZXRlX25vdGVpZF9saXN0JyApLnZhbHVlLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJ1xuICAgICAgICAgICAgfSApXG4gICAgICAgICAgICAudGhlbiggKCByZXMgKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVmcmVzaF9kZWxldGVfbm90ZV9saXN0KCk7XG4gICAgICAgICAgICB9ICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coICdub3Qgc2VsZWN0IGZvdW5kIG9uIGRlbGV0ZScgKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrX3ZhbHVlX3VwZGF0ZWQoKSB7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGZpbmRfbm90ZSgpIHtcbiAgICBmZXRjaCggJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9maW5kX25vdGUnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiBKU09OX0hFQURFUixcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoIHtcbiAgICAgICAgICAgIHRpdGxlOiBnZXRfdmFsdWUoICcjdGl0bGVfdG9fZmluZCcgKSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IGdldF92YWx1ZSggJyNjb250ZW50X3RvX2ZpbmQnIClcbiAgICAgICAgfSApXG4gICAgfSApXG59XG5cbmZ1bmN0aW9uIGNsaWNrX2xpc3Rfbm90ZXMoKSB7XG4gICAgY29uc29sZS5sb2coICdjbGlja19saXN0X25vdGVzJyApO1xuICAgIGZldGNoKCAnbm90ZXMnIClcbiAgICAgICAgLnRoZW4oICggcmVzLCByZWogKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgICAgfSApXG4gICAgICAgIC50aGVuKCBqc29ucyA9PiB7XG4gICAgICAgICAgICBnZXRfZWxlKCAnLmxpc3Rfbm90ZV9yZXN1bHQnICkuaW5uZXJIVE1MID0gJzxwcmU+JytKU09OLnN0cmluZ2lmeSgganNvbnMsIG51bGwsIDIgKSsnPC9wcmU+J1xuICAgICAgICB9ICk7XG5cbn1cblxuZnVuY3Rpb24gc2VhcmNoX25vdGVpZCgpIHtcbiAgICBjb25zb2xlLmxvZyggJ3NlYXJjaCBub3RlIGlkJyApO1xuICAgIGZldGNoKCBcIi9maW5kX25vdGVcIiwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IEpTT05fSEVBREVSLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoIHtcbiAgICAgICAgICAgICAgICB0aXRsZTogZ2V0X3ZhbHVlKCAnI3RpdGxlX3RvX3NlYXJjaCcgKSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBnZXRfdmFsdWUoICcjY29udGVudF90b19zZWFyY2gnIClcbiAgICAgICAgICAgIH0gKVxuICAgICAgICB9IClcbiAgICAgICAgLnRoZW4oIHJlcyA9PiByZXMuanNvbigpIClcbiAgICAgICAgLnRoZW4oIGpzb25zID0+IGdldF9lbGUoICcuc2VhcmNoX3Jlc3VsdCcgKS5pbm5lckhUTUwgPSBKU09OLnN0cmluZ2lmeSgganNvbnMgKSApO1xufVxuXG5mdW5jdGlvbiBnZXRfbm90ZUlkX2xpc3QoKSB7XG4gICAgcmV0dXJuIGZldGNoX2dldF9qc29uKCAnL2FsbF9ub3RlaWQnICk7XG59XG5cbmZ1bmN0aW9uIGFzc2VtYmxlX3VwZGF0ZV9ub3RlaWRfbGlzdCgganNvbl9ub3RlSWQgKSB7XG4gICAganNvbl9ub3RlSWQuZm9yRWFjaCggKCBqICkgPT4ge1xuICAgICAgICB2YXIgc2VsID0gZ2V0X2VsZSggJyN1cGRhdGVfbm90ZWlkX2xpc3QnICk7XG4gICAgICAgIHZhciBvcHQxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJvcHRpb25cIiApO1xuICAgICAgICBvcHQxLnZhbHVlID0gai5faWQ7XG4gICAgICAgIG9wdDEudGV4dCA9IGouX2lkO1xuICAgICAgICBzZWwuYWRkKCBvcHQxLCBudWxsICk7XG4gICAgfSApXG5cbn1cblxuZnVuY3Rpb24gYXNzZW1ibGVfZGVsZXRlX25vdGVpZF9saXN0KCBqc29uX25vdGVJZCApIHtcbiAgICBqc29uX25vdGVJZC5mb3JFYWNoKCAoIGogKSA9PiB7XG4gICAgICAgIHZhciBzZWwgPSBnZXRfZWxlKCAnI2RlbGV0ZV9ub3RlaWRfbGlzdCcgKTtcbiAgICAgICAgdmFyIG9wdDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcIm9wdGlvblwiICk7XG5cbiAgICAgICAgb3B0MS52YWx1ZSA9IGouX2lkO1xuICAgICAgICBvcHQxLnRleHQgPSBqLl9pZDtcblxuICAgICAgICBzZWwuYWRkKCBvcHQxLCBudWxsICk7XG5cbiAgICB9IClcbn1cblxuZnVuY3Rpb24gdXBkYXRlX2RlbGV0ZV9saXN0KCkge1xuICAgIGNvbnNvbGUubG9nKCAnY2FsbGluZyB1cGRhdGUgbGlzdCcgKTtcbiAgICBnZXRfbm90ZUlkX2xpc3QoKS50aGVuKCBqc29uID0+IHtcbiAgICAgICAgYXNzZW1ibGVfZGVsZXRlX25vdGVpZF9saXN0KCBqc29uICk7XG4gICAgICAgIGFkZF9ub3Rfc2VsZWN0ZWQoICcjZGVsZXRlX25vdGVpZF9saXN0JyApO1xuICAgICAgICBnZXRfZWxlKCAnI2RlbGV0ZV9ub3RlaWRfbGlzdCcgKS52YWx1ZSA9IE5PVF9TRUxFQ1RFRDtcbiAgICB9ICk7XG59XG5cbmZ1bmN0aW9uIHRyeV9sb2dpbigpIHtcbiAgICBmZXRjaCggJy90cnlfbG9naW4nLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSgge1xuICAgICAgICAgICAgdXNlcm5hbWU6IGdldF92YWx1ZSggJyN1c2VybmFtZScgKSxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBnZXRfdmFsdWUoICcjcGFzc3dvcmQnIClcbiAgICAgICAgfSApLFxuICAgICAgICBoZWFkZXJzOiBKU09OX0hFQURFUlxuICAgIH0gKVxufVxuXG5mdW5jdGlvbiBhZGRfbm90X3NlbGVjdGVkKCBlbGVfaW4gKSB7XG4gICAgdmFyIG9wdF9ub3Rfc2VsZWN0ZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnb3B0aW9uJyApO1xuICAgIG9wdF9ub3Rfc2VsZWN0ZWQudGV4dCA9IE5PVF9TRUxFQ1RFRDtcbiAgICBvcHRfbm90X3NlbGVjdGVkLnZhbHVlID0gTk9UX1NFTEVDVEVEO1xuXG4gICAgZ2V0X2VsZSggZWxlX2luICkuYWRkKCBvcHRfbm90X3NlbGVjdGVkLCBudWxsICk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZV91cGRhdGVfbGlzdCgpIHtcbiAgICBnZXRfbm90ZUlkX2xpc3QoKVxuICAgICAgICAudGhlbigganNvbiA9PiB7XG4gICAgICAgICAgICBhc3NlbWJsZV91cGRhdGVfbm90ZWlkX2xpc3QoIGpzb24gKTtcbiAgICAgICAgICAgIGFkZF9ub3Rfc2VsZWN0ZWQoICcjdXBkYXRlX25vdGVpZF9saXN0JyApO1xuICAgICAgICAgICAgZ2V0X2VsZSggJyN1cGRhdGVfbm90ZWlkX2xpc3QnICkudmFsdWUgPSBOT1RfU0VMRUNURUQ7XG4gICAgICAgIH0gKTtcbn1cblxuZnVuY3Rpb24gY2xlYXJfc2VhcmNoX2JveCgpIHtcbiAgICBjb25zb2xlLmxvZyggJ2NsZWFyX3NlYXJjaF9ib3gnICk7XG4gICAgY2xlYXJfaW5wdXRfYm94KCAnI25vdGVJZF90b19zZWFyY2gnICk7XG4gICAgY2xlYXJfaW5wdXRfYm94KCAnI3RpdGxlX3RvX3NlYXJjaCcgKTtcbiAgICBjbGVhcl9pbnB1dF9ib3goICcjY29udGVudF90b19zZWFyY2gnICk7XG59XG5cbmZ1bmN0aW9uIHVuc2VsZWN0X3VwZGF0ZV9saXN0KCkge1xuICAgIGdldF9lbGUoICcjdXBkYXRlX25vdGVpZF9saXN0JyApLnZhbHVlID0gTk9UX1NFTEVDVEVEO1xufVxuXG5mdW5jdGlvbiBjbGVhcl91cGRhdGVfYm94KCkge1xuICAgIGNvbnNvbGUubG9nKCAnY2xlYXJfdXBkYXRlX2JveCcgKTtcbiAgICAvLyBjbGVhcl9pbnB1dF9ib3goICcjdXBkYXRlX25vdGVpZF9saXN0JyApO1xuICAgIHVuc2VsZWN0X3VwZGF0ZV9saXN0KCk7XG5cbiAgICBjbGVhcl9pbnB1dF9ib3goICcjdXBkYXRlX3RpdGxlJyApO1xuICAgIGNsZWFyX2lucHV0X2JveCggJyN1cGRhdGVfY29udGVudCcgKTtcbn1cblxuZnVuY3Rpb24gY2xlYXJfaW5wdXRfYm94KCBlbGVfaW4gKSB7XG4gICAgZ2V0X2VsZSggZWxlX2luICkudmFsdWUgPSAnJztcbn1cblxuZnVuY3Rpb24gcmVmcmVzaF9pbmZvKCkge1xuICAgIHJlZnJlc2hfZGVsZXRlX25vdGVfbGlzdCgpO1xuICAgIHJlZnJlc2hfdXBkYXRlX25vdGVfbGlzdCgpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVfbm90ZWlkX2NoYW5nZSggZWxlX2luICkge1xuICAgIGNvbnNvbGUubG9nKCAndXBkYXRlX25vdGVpZF9jaGFuZ2UnICk7XG4gICAgY29uc29sZS5sb2coIGVsZV9pbi52YWx1ZSApO1xuICAgIGlmICggZWxlX2luLnZhbHVlICE9IE5PVF9TRUxFQ1RFRCApIHtcbiAgICAgICAgZ2V0X25vdGVpZCggZWxlX2luLnZhbHVlIClcbiAgICAgICAgICAgIC50aGVuKCAoIGpzb24gKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coIGpzb24gKTtcbiAgICAgICAgICAgICAgICBnZXRfZWxlKCAnI3VwZGF0ZV90aXRsZScgKS52YWx1ZSA9IGpzb24udGl0bGU7XG4gICAgICAgICAgICAgICAgZ2V0X2VsZSggJyN1cGRhdGVfY29udGVudCcgKS52YWx1ZSA9IGpzb24uY29udGVudDtcbiAgICAgICAgICAgIH0gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyggJ25vdCBzZWxlY3RlZCBmb3VuZCBvbiB1cGRhdGUnICk7XG4gICAgICAgIGdldF9lbGUoICcjdXBkYXRlX3RpdGxlJyApLnZhbHVlID0gJyc7XG4gICAgICAgIGdldF9lbGUoICcjdXBkYXRlX2NvbnRlbnQnICkudmFsdWUgPSAnJztcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGhlbGxvX3VzZXIoKSB7XG4gICAgY29uc29sZS5sb2coIFwiaGVsbG8gdXNlclwiICk7XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCAnaGVsbG8gYXBwLmpzJyApO1xuICAgIHJlZnJlc2hfaW5mbygpO1xufSApO1xuXG5mdW5jdGlvbiBoZWxsb3dvcmxkKCkge1xuICAgIGNvbnNvbGUubG9nKCBcImhlbGxvd29ybGRcIiApO1xufVxuIl19
