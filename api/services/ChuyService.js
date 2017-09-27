module.exports = {

	createNotificationFromGeoPoint: function (args,done,fail) {

		/*
		if (req.param('usermobileID') === undefined) {
            return res.badRequest('An usermobileID is required');
        }
        if(req.param('lat') == undefined){
        	return res.badRequest('A latitude (lat) is required');
        }
        if(req.param('lon') == undefined){
        	return res.badRequest('A longitude (lon) is required');
        }
       */

        CategoriesService.getCategoriesOfPromotionsIntoGeoZone(
        	{
        			//INPUT
					//args.radius Radio (en kilometros) donde se deberán buscar las promociones; el radio proviene de un view del usuario
					'radius':100, // 10 km por defecto
					//args.lat Latitud de la visualización 
					'lat':args.lat,
					//args.lon Longitud de la visualización
					'lon':args.lon,
					//args.id Id de usuario
					'idusr':args.usermobileID
        	},
        	function(promosData){//Éxito
        		done();	
	        },
        	function(data){//Error
        		fail();
        	}
       	);//CategoriesService.getCategoriesOfPromotionsIntoGeoZone

		console.log("The job is running");


	},

};