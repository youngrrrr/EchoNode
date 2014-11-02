var express = require('express');
var router = express.Router();
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('echo.db');

/* GET methods: get from DB, send out a response */

/* GET is called when the client requests an echo. Does NOT include the image. */
router.get('/get_echo', function(req, res){
	var response = {};
	response.lats = [];
	response.lons = [];

	db.get("SELECT eid FROM echo WHERE checked_out == 0 AND deleted == 0 ORDER BY RANDOM() LIMIT 1", function(err_pick_rando, row) {
		db.get("SELECT eid, econtent, econtent_type, echoes FROM echo WHERE eid = $eid", {$eid: row.eid}, function(err_get_echo, row_2) {
			response.eid = row_2.eid;
			response.econtent = row_2.econtent;
			response.econtent_type = row_2.econtent_type;
			response.echoes = row_2.echoes;
			db.each("SELECT lat, lon FROM echo_history WHERE eid = $eid ORDER BY datetime ASC", {$eid: row_2.eid}, function(err_locations, row_3) {
				response.lats.push(row_3.lat);
				response.lons.push(row_3.lon);
				db.run("UPDATE echo SET checked_out = 1 WHERE eid = $eid", {$eid: row.rand}, function() {
					res.json(response);
				});
			});
		});
	});
});

 /*GET request that has the _metadata_ on the top 25 echoes currently in the DB. The echoes themselves are only loaded when people click on them, which is done through get_echo. */
router.get('/get_echoboard', function(req, res){
	//Just get the metadata from the top 25 echoes (so text content if it has it, the count, and the distance).
	var response = {};
	response.echoboard = [];

	db.all("SELECT * FROM echo WHERE deleted == 0 ORDER BY echoes DESC LIMIT (?)", 25, function(err, rows) {
		rows.forEach(function(row) {
			response.echoboard.push(row);
		});

		res.json(response);
	});
}); 

/* GET request for the image. */
router.get('uploads/', function(req, res){
	var filePath = req.body.path;
	res.sendfile(filePath);
})

module.exports = router;

