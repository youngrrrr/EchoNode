// var express = require('express');
// var router = express.Router();
// var fs = require('fs');

// /* GET methods: get from DB, send out a response */

// /* GET is called when the client requests an echo. Does NOT include the image. */
// router.get('get_echo/', function(req, res){
// 	response = {}
// 	response.id = 
// 	//response.content = 
// 	...
// 	response.echo_count = 
// 	res.json(response);
// 	//Use res.sendFile(`pathToFile`) for getting the file and build up the rest of the res with the data fields.
// });

//  /*GET request that has the _metadata_ on the top 25 echoes currently in the DB. The echoes themselves are only loaded when people click on them, which is done through get_echo. */
// router.get('get_echoboard/', function(req, res){
// 	//Just get the metadata from the top 25 echoes (so text content if it has it, the count, and the distance).
// 	response = {}
// 	response.echoboard = []
// 	for (i = 0; i < 25; i++){
// 		//add to leaderboard, from rank 1 to 25
// 		//e.g. leaderboard.push(rank1) then leaderboard.push(rank2) and so on
// 	}
// 	res.json(response);
// }); 

// /* GET request for the image. */
// router.get('uploads/', function(req, res){
// 	var fileId = req.params.content;
// 	//fileID guaranteed to be in DB
// 	var filePath = "DO DAVID not sexually"
// 	res.sendfile(filePath);
// })

// module.exports = router;