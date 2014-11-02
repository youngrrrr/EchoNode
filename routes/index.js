var express = require('express');
var router = express.Router();
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('echo.db');

/* GET home page. */
router.get('/', function(req, res) {
		//Just get the metadata from the top 25 echoes (so text content if it has it, the count, and the distance).
	var response = {};
	response.echoboard = [];

	db.all("SELECT * FROM echo WHERE deleted == 0 ORDER BY echoes DESC LIMIT (?)", 25, function(err, rows) {
		rows.forEach(function(row) {
			response.echoboard.push(row);
		});
  res.render('index', response);
});
});

module.exports = router;