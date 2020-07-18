
function insert_into_select_list (ele_in, text_in, value_in ) {
    var opt1 = document.createElement( "option" );
    opt1.value = value_in;
    opt1.text = text_in;
    ele_in.add( opt1, null );
}

function empty_select_list( ele_in ) {
    console.log( 'calling empty list' );
    var length = get_ele( ele_in ).options.length;
    for ( i = 0; i < length; i++ ) {
        console.log( "calling on " + i );
        get_ele( ele_in ).remove( 0 );
    }
}

function get_value( selector_in ) {
    return get_ele( selector_in ).value;
}

function get_ele( selector ) {
    return document.querySelector( selector );
}

function fetch_get_json( uri ) {
    return fetch( uri, {
            method: "GET"
        } )
        .then( res => res.json() );

}

function fetch_get_text( uri ) {
    fetch( uri, {
            method: "GET"
        } )
        .then( res => res.text() )
        .then( text => console.log( text ) );

}


function fetch_helloworld() {
    console.log( 'fetching' );
    fetch( '/helloworld' )
        .then( res => console.log( res.text() ) );
}

function empty_input_text ( ele_in ) {
    ele_in.value = '';
}
