/**
 * Apis_graficasController
 *
 * @description :: Server-side logic for managing apis_graficas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	findUrl: function(req, res){

		Apis_graficas.find({ select:['url'],where: {active:1} }).exec(function(error,foundRecords){
			if(error)
				return res.serverError('Error');
			return res.ok(foundRecords);
		});
	},

	getConfigUrl: function(req, res){
		console.log("getConfigUrl");
		if(req.param('url') === undefined)
			return res.badRequest('An url is required!');
		console.log(req.param('url','none'));
		Apis_graficas.findOne({ url:req.param('url','none') }).exec(function(error,foundRecords){
			if(error)
				return res.serverError('Error has occurred in getConfigUrl');
			if (!foundRecords) {
			    return res.notFound('Could not find config');
			}
			foundRecords.configuration = JSON.parse(foundRecords.configuration);
			return res.ok(foundRecords);
		});
	},

};

