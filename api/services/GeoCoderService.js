/**********
* Inico modulo de node-geocoder
* https://www.npmjs.com/package/node-geocoder
**********/
var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
  // Optional depending on the providers 
  httpAdapter: 'https', // Default 
  apiKey: 'AIzaSyCkWe907Jw0JSUjVDWnY-jqeUVyKdBu4_Y', // for Mapquest, OpenCage, Google Premier 
  formatter: null         // 'gpx', 'string', ... 
};

var geocoder = NodeGeocoder(options);

/*************
* Fin modulo de node-geocoder
*************/

/************
* INICIO geocoder
* https://www.npmjs.com/package/geocoder
************/
//var geocoder = require('geocoder');
/***********
* FIN geocoder
***********/

module.exports = {

	reverse: function(args, callback){
		//Getting geo info from coordinate
		geocoder.reverse({lat:args.latitude, lon:args.longitude}, callback);
		//geocoder.reverseGeocode( args.latitude, args.longitude, callback);
	},

};