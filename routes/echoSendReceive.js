var express = require('express');
var router = express.Router();
var fs = require('fs');


/* POST methods: add to DB, respond with success if success. /

/* POST for returning an echo. This is called when the client POSTs to return_echo/. */
router.post('return_echo/', function(req, res){
	//This request will only have the echo_history fields.
	/*** OR YOU CAN ACCESS FIELDS LIKE id = req.body.id ***/
	var params = req.params //An array of the parameters
	//Process to see if it needs to be deleted.
	//Update timestamp if it was accepted.

	res.end("success");
});

/* POST for sending a new echo. This is called when the client POSTs to new_echo/. */
router.post('new_echo/', function(req, res){
	//This request will have the intersection of the echo and echo_history fields.
	var params = req.params //An array of the parameters
	params.forEach(ADD_TO_SQL_DB);

	//Response saying we're done
	res.end("success");
});

/* POST for uploading an image file. This returns the image id. */
router.post('uploads/', function(req, res){
	var fileName = req.files.SUMTHING
	filePath = __dirname + '/uploads/' + fileName;

	var writable = fs.createWriteStream(filePath);
	req.pipe(writable);
	req.on('end', function(){
		res.send(201, {'content': filePath});
	});
	writable.on('error', function(err){
		res.send(500, err);
	});
});

/* GET methods: get from DB, send out a response */

/* GET that is called when the client requests an echo. Does NOT include the image. */
router.get('get_echo/', function(req, res){
	response = {}
	response.id = 
	//response.content = 
	...
	response.echo_count = 
	res.json(response);
});

/* GET request that has the _metadata_ on the top 25 echoes currently in the DB. The echoes themselves are only loaded when people click on them, which is done through get_echo. */
router.get('get_leaderboard/', function(req, res){
	//Just get the metadata from the top 25 echoes (so text content if it has it, the count, and the distance).
	response = {}
	response.leaderboard = []
	for (i = 0; i < 25; i++){
		//add to leaderboard, from rank 1 to 25
		//e.g. leaderboard.push(rank1) then leaderboard.push(rank2) and so on
	}
	res.json(response);
}); 

/* GET request for the image. */
router.post('uploads/', function(req, res){
	var fileId = req.params.content;
	//fileID guaranteed to be in DB
	var filePath = "PATH_TO_FILE_FROM_SQL_QUERY"
	res.sendfile(filePath);
})

module.exports = router;
