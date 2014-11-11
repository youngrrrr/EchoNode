/* POST methods: add to DB, respond with success if success.*/

var express = require('express');
var router = express.Router();
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('echo.db');

/* POST for sending a new echo. This is called when the client POSTs to new_echo/. */
/* Expecting to receive:
	echo:
		- econtent
		- econtent_type
	echo_history:
		- lat
		- lon
		- datetime
*/
router.post('/new_echo', function(req, res) {
	//This request will have the intersection of the echo and echo_history fields.
	console.log(req);

	db.get("SELECT COUNT(eid) AS count FROM echo", function(err, row) {
		db.run("INSERT INTO echo VALUES ($eid, $econtent, $econtent_type, 0, 0, 0)", {
			$eid: row.count,
			$econtent: req.body.econtent,
			$econtent_type: req.body.econtent_type
		});

		db.run("INSERT INTO echo_history VALUES ($eid, $lat, $lon, $datetime)", {
			$eid: row.count,
			$lat: req.body.lat,
			$lon: req.body.lon,
			$datetime: req.body.datetime
		});

		//http://freshbrewedcode.com/jimcowart/2013/01/29/what-you-might-not-know-about-json-stringify/
		if(err) {
			res.send(404);
		} else {
			var body = JSON.stringify({
				toJSON: function() {
					return {
						eid : row.count
					}
				}
			});
			res.end(body);
		}
	});

	//Response saying we're done
	// res.end("success");
});

/* POST for returning an echo. This is called when the client POSTs to return_echo/. */
/* NOTE: Expecting to receive the following fields (as their names, unless otherwise specified) for the following tables:
	echo_history:
		- eid
		- lat
		- lon
		- datetime
	+ whether or not the echo got rejected/deleted (as do_delete)
*/
router.post('/return_echo', function(req, res) {
	//This request will only have the echo_history fields.
	console.log(req);

	db.run("INSERT INTO echo_history VALUES ($eid, $lat, $lon, $datetime)", {
		$eid: req.body.eid,
		$lat: req.body.lat,
		$lon: req.body.lon,
		$datetime: req.body.datetime
	});

	//Process to see if echo should be deleted.
	var sqldelete = "";
	if(req.body.do_delete) {
		sqldelete = "deleted = 1, ";
	}

	//Update echo_count
	db.run("UPDATE echo SET " + sqldelete + "echoes = echoes + 1, checked_out = 0 WHERE eid = $eid", {$eid: req.body.eid});
	//Response saying we're done
	res.end("success");
});

/* POST for uploading an image file. This returns the image id. */
router.post('/uploads', function(req, res) {
	// var fileName = req.files.SUMTHING
	console.log(req.files);
	// filePath = __dirname + '/uploads/' + fileName;
	var writable = fs.createWriteStream(filePath);
	req.pipe(writable);
	req.on('end', function() {
		res.send(201, {'content': filePath});
	});
	writable.on('error', function(err) {
		res.send(500, err);
	});
});

module.exports = router;