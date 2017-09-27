/**
 * VuforiaController
 *
 * @description :: Server-side logic for managing vuforias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 *dasdasdasd
 *dasdsda
 */
var jwt = require('jsonwebtoken');
var fs = require('fs'); 

module.exports = {

	userHistory : function (req,res) {
			
		 var idReq = req.param('id'); 
	     var header = req.headers['authorization'];	
	     var token = header.substring(4); 
	     var lon_ =  req.param('longitude');
	     var lat_ = req.param('latitude');
	     var device = req.param('device');
	     //var starthour = req.param('starthour');
	     console.log(header);
	     console.log(req.allParams())
		Promotion.findOne({ id : idReq }).exec(function(err, PromotionFounded){
						
			if(err) res.negotiate(err);
		
		     	var data = CipherService.decode(token);		     					
				var obj = {
					//starthour:starthour,
					device:device,					
					latitude  : lat_, 
					longitude : lon_,
					promo 	  :  PromotionFounded.id,
					usermob   :  data.user.id
				};
				var promoF = PromotionFounded;

		     History.create(obj).exec(function (err,historyCreate){

		     		if(err) return res.negotiate(err);

		     		//Added for Leonardo Oliva Monjarás
		     		//NotificationService.createNotificationFromGeoPoint(
		     		ChuyService.createNotificationFromGeoPoint(
						{
							lat: lat_,
							lon:lon_,
							usermobileID:data.user.id
						},
						function(data){
							console.log("Se ha creado la notificación con éxito!")
							console.log(data);
						},
						function(data){
							console.log("Error al generar la notificación");
							console.log(data);
						}

					);


		     		PromotionFounded.history = historyCreate;

		     		console.log(PromotionFounded);

			 		return res.json(PromotionFounded); 


		     		res.json(PromotionFounded);


		     });

		});
	}
	
};

