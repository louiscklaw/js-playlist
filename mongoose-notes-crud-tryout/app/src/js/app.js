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
