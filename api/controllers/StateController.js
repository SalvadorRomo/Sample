/**
 * StateController
 *
 * @description :: Server-side logic for managing states
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	  stateExtractor : function(req, res ){

	  	var newObj = {};

	  	State.find({}).exec(function (err,items){
				
				items.forEach(function(elem, index) {

					newObj[index] = elem;
				});
	  			res.json(newObj);
	  	});

	},

	cityExtractor : function(req ,res ){

		var newObj = {};

		var idP = req.param("id");

		State.findOne({ id : idP })
		.populate('citys')
		.exec(function(err,statess){


			statess.citys.forEach(function(elem, index) {


					newObj[index] = elem;
				});
				
				console.log(statess.citys);
	  			res.json(newObj);			

		});

	}

};

