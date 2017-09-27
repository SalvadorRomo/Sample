


module.exports = {

	/********************
	users:[] Lista en usuarios (empresas) de las cuales se mandarán las notificaciones
	usermobile Id de usuario móvil al que se le creará las notificaciones
	********************/
	createNotificationFromUsersId:function (args,done,fail) {

		console.log("createNotificationFromUsersId:");
		console.log(args);

		var query = 
			" SELECT promotion.id, count(*) as total " +
			" FROM prueba_usuarios.promotion " +

			" INNER JOIN prueba_usuarios.user " +
			" ON promotion.owner = user.id " +

			//" INNER JOIN prueba_usuarios.history " +
			//" ON promotion.id = history.promo " +

			" WHERE prueba_usuarios.user.id = ? " +
			" GROUP BY promotion.id " +
			//" ORDER BY history.createdAt, total DESC " 
			" ORDER BY total DESC " 
		;
	
		
		//Iteramos por cada user que tendamos como parametro
		for (var i = 0; i < args.users.length ;i++){
			console.log("------------------------------------")
			Promotion.query(query,[ args.users[i] ],function(errPromotion, rawPromotionResult){
				if (errPromotion) { 
					//return res.serverError(err);
					console.log("ERROR!!!");
					console.log(args.users[i]);
				}else{
					console.log("rawPromotionResult");
					console.log(rawPromotionResult);
					console.log(rawPromotionResult.length);
					rawPromotionResult.forEach(function(promoItem, index){


						Notification.find({usermob: args.usermobile,promo:promoItem.id}).exec(function(errNotification,foundNotificationRecords){
							if (errNotification) { 
								//return res.serverError(err); 
								console.log("ERROR!!!");
								console.log("USERMOB: " + args.usermobile );
								console.log("PROMO: " +  promoItem.id );
							}else{
								if(foundNotificationRecords.length == 0){//Si es cero se guarda la notificacion
									console.log("0; foundNotificationRecords: " + foundNotificationRecords + "; USERMOB: " + args.usermobile  + "; " + promoItem );

									Notification.create({usermob: args.usermobile,promo:promoItem.id}).exec(function(errNewPromotion,records){
										if (errNewPromotion) { 
											//return res.serverError(err); 
											console.log("ERROR!!! Al crear la Notificación");
										}else{
											console.log("Exito al insertar la notificación")
										}
									});

								}else{
									console.log("> 0;foundNotificationRecords: " + foundNotificationRecords + "; USERMOB: " + args.usermobile  + "; " + rawPromotionResult );
								}
							}
						});


					});


				}
			});
			console.log("------------------------------------")
		}
		//res.ok({"message":"El proceso de esta haciendo de fondo"});
		return done({"message":"El proceso de esta haciendo de fondo"});
	},


	/**************
	latitude
	longitude
	usermobile
	**************/
	createNotificationFromGeoPoint: function(args,done,fail){
		console.log("createNotificationFromGeoPoint");

		GeoCoderService.reverse(args,function(err,data){//Obtener el código postal de donde se suscitó la visualización
			if(err){
				console.log("An error has occurred createNotificationFromGeoPoint");
				console.log(err);
				return fail(err);
			}
			console.log("Exito!!");
			console.log(data);
			//return done(res);

			if(data[0].zipcode === undefined){//If the response doesn't contain zip code, We show the error
				return fail({error:"We cannot get postal code (zipcode) of the locations"});
			}

			User.find({postalCode:data[0].zipcode}).exec(function(errorFindUser,foundUsers){//We find for users with the same postal code
				if(errorFindUser){
					console.log("A error was generated when we tried to find users by postal code");
					console.log(errorFindUser);
					//return res.serverError({message:"A error was generated when we tried to find users by postal code",err:errorFindUser});
					return fail(errorFindUser);
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
						usermobile:args.usermobile
					},
					function(data){
						console.log("Se ha creado la notificación:");
						console.log(data);
						//return res.ok(data);
						return done(data);
					},
					function(data){
						console.log("Se ha generado un error al crear la notificación");
						console.log(data);
						//return res.serverError("The process cannot be completed");
						return fail(data);
					}
				);

			});
			//return res.ok(data);


		});


	},

};