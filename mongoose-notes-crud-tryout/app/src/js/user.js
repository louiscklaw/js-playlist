
function empty_user_update_input_text () {
    empty_input_text( get_ele( '#update_username' ) );
    empty_input_text( get_ele( '#update_password' ) );
}

function click_update_user () {
    console.log( "click update user" );
    fetch( '/user/' + get_value( '#user_id_list_update' ), {
        method: "PUT",
        headers: JSON_HEADER,
        body: JSON.stringify( {
            username: get_value('#update_username'),
            password: get_value('#update_password')
        } )
    } )
        .then( res => {
            console.log( res );
            refresh_screen_for_user();
            empty_user_update_input_text();

        });
}

function clear_ceate_user_input () {
    get_ele( '#create_username' ).value = '';
    get_ele( '#create_password' ).value = '';
}

function click_create_user () {
    console.log( 'click create user' );
    fetch( '/user', {
        method: 'POST',
        headers: JSON_HEADER,
        body: JSON.stringify( {
            username: get_value( '#create_username' ),
            password: get_value( '#create_password' ),
            enabled: get_value('#create_user_enabled')
        } )
    } )
        .then( result => {
            refresh_screen_for_user();
            clear_ceate_user_input();
    })
}

function click_list_users() {
    console.log( "click list user" );
    fetch( '/user' )
        .then( res => res.json() )
        .then( json => {
            get_ele( '.list_user_result' ).innerHTML = '<pre>' + JSON.stringify( json, null, 2 ) + '</pre>';
        } )
}

function get_user_list_from_server( ele_in ) {
    fetch( '/user_list' )
        .then( res => res.json() )
        .then( jsons => {
            jsons.forEach( json => {
                insert_into_select_list(
                    ele_in,
                    json[ 'username' ],
                    json[ '_id' ]
                )
            } )
        } )
}

function update_delete_user_list() {
    console.log( 'update_delete_user_list' );
    get_user_list_from_server( get_ele( '#user_id_list_delete' ) );
}

function update_update_user_list() {
    console.log( 'update_update_user_list' );
    get_user_list_from_server( get_ele( '#user_id_list_update' ) );
}

function click_delete_user() {
    console.log( 'click_delete_user' );

    fetch( '/user/'+get_value('#user_id_list_delete'), {
        method: 'DELETE'
    } )
        .then( data => {
            console.log( 'delete done' )
            refresh_screen_for_user();
    })
}

function refresh_screen_for_user () {
    empty_select_list( '#user_id_list_delete' );
    update_delete_user_list();

    empty_select_list( "#user_id_list_update" );
    update_update_user_list();
}

document.addEventListener( 'DOMContentLoaded', () => {
    // helloworld();
    console.log( "hello user.js" );
    refresh_screen_for_user();
} );
