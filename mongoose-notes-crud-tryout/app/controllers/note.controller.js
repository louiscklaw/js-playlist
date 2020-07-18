const Note = require( '../models/note.model.js' );


function create_search_criteria ( req_in ) {
    let d = {};
    Object.keys( req_in ).map( k => {
        if ( req_in[k] != '' ) {
            d[k] = req_in[k];
        }
    })
    return d;
}



function get_all_noteid () {
    return Note.find( {}, 'id' );
}
exports.all_noteid = get_all_noteid;


// Create and Save a new Note
exports.create = ( req, res ) => {
    // Validate request
    console.log( 'create note in controller' );

    console.log( req.body.title_to_create );

    if ( !req.body.content_to_create ) {
        return res.status( 400 ).send( {
            message: "Note content can not be empty"
        } );
    }

    // Create a Note
    const note = new Note( {
        title: req.body.title_to_create || "Untitled Note",
        content: req.body.content_to_create
    } );

    // Save Note in the database
    note.save()
        .then( data => {
            res.send( data );
            console.log( 'note save' );
        } ).catch( err => {
            res.status( 500 ).send( {
                message: err.message || "Some error occurred while creating the Note."
            } );
        } );
};

// Retrieve and return all notes from the database.
exports.findAll = ( req, res ) => {
    Note.find()
        .then( notes => {
            res.send( notes );
        } ).catch( err => {
            res.status( 500 ).send( {
                message: err.message || "Some error occurred while retrieving notes."
            } );
        } );
};

// Find a single note with a noteId
exports.findOne = ( req, res ) => {
    Note.findById( req.params.noteId )
        .then( note => {
            if ( !note ) {
                return res.status( 404 ).send( {
                    message: "Note not found with id " + req.params.noteId
                } );
            }
            res.send( note );
        } ).catch( err => {
            if ( err.kind === 'ObjectId' ) {
                return res.status( 404 ).send( {
                    message: "Note not found with id " + req.params.noteId
                } );
            }
            return res.status( 500 ).send( {
                message: "Error retrieving note with id " + req.params.noteId
            } );
        } );
};

// Update a note identified by the noteId in the request
exports.update = ( req, res ) => {
    // Validate Request
    console.log( req.body );

    if ( !req.body.content_to_update ) {
        return res.status( 400 ).send( {
            message: "Note content can not be empty"
        } );
    }

    // Find note and update it with the request body
    Note.findByIdAndUpdate( req.params.noteId, {
            title: req.body.title_to_update || "Untitled Note",
            content: req.body.content_to_update
        }, {
            new: true
        } )
        .then( note => {
            if ( !note ) {
                return res.status( 404 ).send( {
                    message: "Note not found with id " + req.params.noteId
                } );
            }
            res.send( note );
        } ).catch( err => {
            if ( err.kind === 'ObjectId' ) {
                return res.status( 404 ).send( {
                    message: "Note not found with id " + req.params.noteId
                } );
            }
            return res.status( 500 ).send( {
                message: "Error updating note with id " + req.params.noteId
            } );
        } );
};

// Delete a note with the specified noteId in the request
exports.delete = ( req, res ) => {
    Note.findByIdAndRemove( req.params.noteId )
        .then( note => {
            if ( !note ) {
                return res.status( 404 ).send( {
                    message: "Note not found with id " + req.params.noteId
                } );
            }
            res.send( {
                message: "Note deleted successfully!"
            } );
        } ).catch( err => {
            if ( err.kind === 'ObjectId' || err.name === 'NotFound' ) {
                return res.status( 404 ).send( {
                    message: "Note not found with id " + req.params.noteId
                } );
            }
            return res.status( 500 ).send( {
                message: "Could not delete note with id " + req.params.noteId
            } );
        } );
};


exports.find_note = ( req, res ) => {
    console.log( create_search_criteria( req.body ) );

    Note.findOne( create_search_criteria( req.body ) )
        .then( note => {
            if ( !note ) {
                return res.status( 404 ).send( {
                    message: "Note not found with id " + req.params.noteId
                } );
            }
            res.send( note );
        } ).catch( err => {
            if ( err.kind === 'ObjectId' ) {
                return res.status( 404 ).send( {
                    message: "Note not found with id " + req.params.noteId
                } );
            }
            return res.status( 500 ).send( {
                message: "Error retrieving note with id " + req.params.noteId
            } );
        } );
}
