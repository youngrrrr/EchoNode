var express = require('express');
var router = express.Router();
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('echo.db');

/* GET methods: get from DB, send out a response */

/* GET is called when the client requests an echo. Does NOT include the image. */
router.get('/get_echo', function(req, res){
	var response = {};

	var eid = -1;
	var econtent = "";
	var econtent_type = -1;
	var echoes = -1;
	var lats = [];
	var lons = [];

	db.get("SELECT eid AS rand FROM echo WHERE checked_out == 0 AND deleted == 0 ORDER BY RANDOM() LIMIT 1", function(err_pick_rando, row) {
		
		db.get("SELECT eid, econtent, econtent_type, echoes FROM echo WHERE eid = $eid", {$eid: row.rand}, function(err_get_echo, row_2) {
			eid = row_2.eid;
			econtent = row_2.econtent;
			econtent_type = row_2.econtent_type;
			echoes = row_2.echoes;
			
			console.log("INSIDE: " + row_2.eid + ", " + row_2.econtent + ", " + row_2.econtent_type + ", " + row_2.echoes);
			console.log("OUTSIDE: " + eid + ", " + econtent + ", " + econtent_type + ", " + echoes);
		});

		var eachCount = 0;
		db.each("SELECT lat, lon FROM echo_history WHERE eid = $eid ORDER BY datetime ASC", {$eid: row.rand}, function(err_locations, row_2) {
			lats[eachCount] = row_2.lat;
			lons[eachCount] = row_2.lon;
			eachCount++;
			console.log("OUTSIDE: " + eachCount + ", " + lats[eachCount] + ", " + lons[eachCount]);
			console.log("INSIDE: " + eachCount + ", " + row_2.lat + ", " + row_2.lon);
		});

		db.run("UPDATE echo SET checked_out = 1 WHERE eid = $eid", {$eid: row.rand});
		// console.log(err_pick_rando);
	});

	response.eid = eid;
	response.econtent = econtent;
	response.econtent_type = econtent_type;
	response.echoes = echoes;
	response.lat_list = lats;
	response.lon_list = lons;

	console.log("final");

	res.json(response);
	//Use res.sendFile(`pathToFile`) for getting the file and build up the rest of the res with the data fields.
});

 /*GET request that has the _metadata_ on the top 25 echoes currently in the DB. The echoes themselves are only loaded when people click on them, which is done through get_echo. */
router.get('/get_echoboard', function(req, res){
	//Just get the metadata from the top 25 echoes (so text content if it has it, the count, and the distance).
	response = {}
	response.echoboard = []
	for (i = 0; i < 25; i++){
		//add to leaderboard, from rank 1 to 25
		//e.g. leaderboard.push(rank1) then leaderboard.push(rank2) and so on
	}
	res.json(response);
}); 

/* GET request for the image. */
router.get('uploads/', function(req, res){
	var fileId = req.params.content;
	//fileID guaranteed to be in DB
	var filePath = "DO DAVID not sexually"
	res.sendfile(filePath);
})

module.exports = router;

