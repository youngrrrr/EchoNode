var express = require('express');
var router = express.Router();


/* POST methods */

/* POST for returning an echo. This is called when the client POSTs to return_echo/. */
router.post('return_echo/', function(req, res){
	//This request will only have the ID and the accept/reject tag. This way, they don't have to re-transfer the entire message which would be a waste of data.
});

/* POST for sending a new echo. This is called when the client POSTs to new_echo/. */
router.post('new_echo/', function(req, res){
	//This request will have both the image and the fields. Store stuff in the DB and upload the image to S3 or the filesystem.
});


/* GET methods */

/* GET that is called when the client requests an echo. */
router.get('get_echo/', function(req, res){
	//Use res.sendFile(`pathToFile`) for getting the file and build up the rest of the res with the data fields.
});

/* GET request that has the _metadata_ on the top 25 echoes currently in the DB. The echoes themselves are only loaded when people click on them, which is done through get_echo. */
router.get('get_leaderboard/', function(req, res){
	//Just get the metadata from the top 25 echoes (so text content if it has it, the count, and the distance).
}); 

module.exports = router;
