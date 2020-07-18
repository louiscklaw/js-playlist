module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create a new Note
    app.post( '/notes', ( req, res ) => {
        console.log( 'create note' );
        notes.create( req, res );
    });

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Retrieve all Notes
    app.get( '/notes', notes.findAll);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete( '/notes/:noteId', notes.delete );

    app.post( '/find_note', ( req, res ) => {
        notes.find_note( req, res );
    } )

    app.get( '/all_noteid', ( req, res ) => {
        notes.all_noteid()
            .then(note => res.send(note));
    } )

    app.get( '/helloworld', ( req, res ) => {
        res.send( 'helloworld echo' );
    } )

}
