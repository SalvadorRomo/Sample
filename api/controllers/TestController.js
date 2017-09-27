/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


	createH:function(req,res){

		UserMobile.find().exec(function(err,Usuarios){

			Usuarios.forEach(function(usuario, index, array){

						Promotion.find().exec(function(err,promos){
							promos.forEach(function(promo, index, array){

								var obj = {
									//starthour:starthour,
									device:'android',					
									//latitude  : lat_, 
									//longitude : lon_,
									promo 	  :  promo.id,
									usermob   :  usuario.id
								};

								History.create(obj).exec(function (err,historyCreate){

								});
							},usuario);
						});

			});

			return res.ok(Usuarios);
		});


		//return res.ok();

	},

	userHistory : function (req,res) {
			

		try {
		    		 var idReq = req.param('id'); 
	     ///var header = req.headers['authorization'];	
	     /////var token = header.substring(4); 
	     var lon_ =  req.param('longitude');
	     var lat_ = req.param('latitude');
	     var device = req.param('device');
	     //var starthour = req.param('starthour');
	     ///console.log(header);
	    //console.log(req.allParams())
		Promotion.findOne({ id : idReq }).exec(function(err, PromotionFounded){
						
			if(err) res.negotiate(err);
				
		     	///var data = CipherService.decode(token);		     					
				var obj = {
					//starthour:starthour,
					device:device,					
					latitude  : lat_, 
					longitude : lon_,
					promo 	  :  PromotionFounded.id,
					///usermob   :  data.user.id
					usermob:req.param("usermob")
				};
				var promoF = PromotionFounded;

				console.log("Promotion.findOne");
				console.log("obj:");
				console.log(obj);

		     History.create(obj).exec(function (err,historyCreate){

		     		if(err) return res.negotiate(err);

		     		console.log("History.create(obj):");
		     		console.log(historyCreate);

		     		//Added for Leonardo Oliva Monjarás
		     		NotificationService.createNotificationFromGeoPoint(
						{
							latitude: lat_,
							longitude:lon_,
							/////usermobile:data.user.id
							usermob:req.param("usermob")
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
		catch(err) {
		    return res.serverError("ERROR");
		}














	},




























	geocode: function (req,res) {

		NotificationService.createNotificationFromGeoPoint(
			{
				latitude:req.param("latitude"),
				longitude:req.param("longitude"),
				usermobile:req.param('usermobile')
			},
			function(data){
				return res.ok(data);
			},
			function(data){
				res.serverError({err:data});
			}

		);


/*

		NotificationService.createNotificationFromGeoPoint(
			{
				latitude:req.param("latitude"),
				longitude:req.param("longitude")
			},
			function(data){//Éxito
				if(data[0].zipcode === undefined){//If the response doesn't contain zip code, We show the error
					return res.serverError({error:"We cannot get postal code (zipcode) of the locations"});
				}

				User.find({postalCode:data[0].zipcode}).exec(function(errorFindUser,foundUsers){//We find for users with the same postal code
					if(errorFindUser){
						console.log("A error was generated when we tried to find users by postal code");
						console.log(errorFindUser);
						return res.serverError({message:"A error was generated when we tried to find users by postal code",err:errorFindUser});
					}
					console.log("Usuarios encontrados: ");
					console.log(foundUsers);
					var users = []; //List to store users´id
					for(var i = 0; i < foundUsers.length;i++){
						users.push(foundUsers[i].id);//Pushing the Ids into a list
					}

					NotificationService.createNotificationFromUsersId(//Creating the notification
						{
							users:users,
							usermobile:req.param('usermobile',1)
						},
						function(data){
							console.log("Se ha creado la notificación:");
							console.log(data);
							return res.ok(data);
						},
						function(data){
							console.log("Se ha generado un error al crear la notificación");
							console.log(data);
							return res.serverError("The process cannot be completed");
						}
					);

				});
				//return res.ok(data);
			},
			function(data){//fail
				return res.serverError({error:data});
			}
		);
*/



	}
	
};

