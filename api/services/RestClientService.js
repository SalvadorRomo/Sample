var Client = require('node-rest-client').Client;
module.exports = { 

	get:function(args,successCallback,failureCallback) {
		//"http://remote.site/rest/xml/${id}/method"
		var req = client.post(args.url, args, function (data, response) {
			// parsed response body as js object
			console.log(data);
			// raw response
			console.log(response);
			successCallback(data,response);
			return true;
		});

		req.on('requestTimeout', function (req) {
			console.log('request has expired');
			req.abort();
			failureCallback();
			return false;
		});

		req.on('responseTimeout', function (res) {
			console.log('response has expired');
			failureCallback();
			return false;
		});

		//it's usefull to handle request errors to avoid, for example, socket hang up errors on request timeouts
		req.on('error', function (err) {
			console.log('request error', err);
			failureCallback();
			return false;
		});



	},

};