var express = require("express");
var router = express.Router();
var request = require("request");
var async = require("async");



router.get("/", function(req, res, next) {

	async.parallel([
		function(callback){
			var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
			request(url, function(err, response, body){
			  	console.log("processing");
			  	obj = JSON.parse(body);
			  	callback(false,obj);
			});
		}
	],

	function(err, results){
		for (var i = 0; i < results.length; i++) {
			res.render("index", {weather:results[i].query});
		};
		
	}
	);
  
});

module.exports = router;