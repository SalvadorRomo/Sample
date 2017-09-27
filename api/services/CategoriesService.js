module.exports = {

	/********************
	Retorna el listado (IDs) de las categorias más vistas por el usuario móvil determinado
	
	INPUT:
	args.usermobileID ID del usuario a obtener categories más vistas

	OUTPUT:
	{ 'usermobileID':X, 'categoriesID':[1,2,3,4...] } Diccionario de IDs de categorias
	********************/
	getMostImportantCategoriesOfUsermobileByID:function (args,done,fail) {
		//EVITA código bloqueante
		// ver https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/forEach

	},

	/*********************
	Retorna listado de categories (ID) establecidas a la promociones dentro de una zona geografica
	CONSIDERACIONES: Promociones que el usuario no haya visto antes

	INPUT
	args.radius Radio (en kilometros) donde se deberán buscar las promociones; el radio proviene de un view del usuario
	args.lat Latitud de la visualización 
	args.lon Longitud de la visualización

	OUTPUT
	[ { promoID:X,categoriesID:[1,2,3..] }, { promoID:X, categoriesID:[1,2,3,..] } , ... ] Listado de diccionarios que contendra el promoID y su listado de categorias

	*********************/
	getCategoriesOfPromotionsIntoGeoZone:function(args,done,fail){
				//EVITA código bloqueante
		// ver https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/forEach
		var queryloc = "SELECT id, ( 6371 * acos( cos( RADIANS( " + args.lat + "  ) ) * cos( RADIANS( latitude ) ) * cos( radians( longitude )- RADIANS( " + args.lon + " ) )"; 
		queryloc = queryloc + "+ sin( RADIANS( " + args.lat + " ) ) * sin( RADIANS( latitude ) ) ) ) AS distance FROM prueba_usuarios.promotion HAVING distance < " + args.radius + " ORDER BY distance LIMIT 0 , 20";

		Promotion.query(queryloc, function(err,foundRecordsLoc){
				console.log("*****");
				console.log(foundRecordsLoc);

				var lista = [];
				for(var i = 0 ; i < foundRecordsLoc.length; i++)
					lista.push(foundRecordsLoc[i].id);
					
					PromotionCategory.find({select : ['promoId','category'], where : {promoId : lista}}).exec(function(err,foundRecords){
						console.log("**********************************************************************");
						console.log("Promociones Cercanas")
						console.log(foundRecords);
						console.log("**********************************************************************");


							var querypromofavoritas = "SELECT DISTINCT categories.id, categories.name, count(*) as total FROM prueba_usuarios.history INNER JOIN prueba_usuarios.promotion ON history.promo = promotion.id " + 
							"INNER JOIN prueba_usuarios.promotioncategory ON promotion.id = promotioncategory.promoID INNER JOIN prueba_usuarios.categories ON promotioncategory.category = categories.id WHERE history.usermob = " +
							 args.idusr + " GROUP BY categories.id ORDER BY total DESC";

							 console.log(querypromofavoritas);

							 Categories.query(querypromofavoritas,function(err,foundRecordsFav){
							 	console.log("**********************************************************************");
								console.log("Promociones Favoritas")
								console.log(foundRecordsFav);
								console.log("**********************************************************************");


								var listado = [];
								var listaID = [];

								for(var x = 0; x < foundRecords.length; x++)
									for(var y = 0; y < foundRecordsFav.length; y++)
									{
										if(foundRecords[x].category == foundRecordsFav[y].id)
										{
											var z = {promo: foundRecords[x].promoId, id: foundRecordsFav[y].id, name: foundRecordsFav[y].name, total: foundRecordsFav[y].total}
											listado.push(z);
											listaID.push(foundRecords[x].promoId)
											
										}
									}

									console.log("**********************************************************************");
									console.log("Promociones interesantes")
									console.log(listado);
									console.log("**********************************************************************");

									var SinDuplicados = [];
									var SinDuplicados = listaID.filter(function(elem, pos) {
									   return listaID.indexOf(elem) == pos;
									});			

									console.log("**********************************************************************");
									console.log("Promos sin repetir")
									console.log(SinDuplicados);
									console.log("**********************************************************************");

									console.log("SinDuplicados.length: " + SinDuplicados.length);

									SinDuplicados.forEach(function(element, index, array){
										console.log(args.idusr);
										var x = [{usermob : args.idusr, promo : element}];
										console.log("x");
										console.log(x);
							 			Notification.create(x).exec(function(err, oka){
												if(err){
													console.log("err");
													console.log(err);
												}
													console.log("oka");
													console.log(oka)												
							 			});
									},args);
/*
									for(var x = 0; x < SinDuplicados.length; x++)
									{
										var x = [{usermob : args.idusr, promo : SinDuplicados[x]}];
										console.log("x");
										console.log(x);
							 			Notification.create(x).exec(function(err, oka){
												if(err){
													console.log("err");
													console.log(err);
												}
													console.log("oka");
													console.log(oka)												
							 			});
									}

*/


/*

									var contadorcategorias = [];

									for(var x = 0; x < SinDuplicados.length &&  x < 10; x++)
									{
										var cont = 0;
										for(var y = 0; y < listaID.length; y++)
										{
											if(SinDuplicados[x] == listaID[y])
												cont++;
										}
										contadorcategorias.push({promo: SinDuplicados[x], conts: cont});
									}
									console.log(contadorcategorias);


									for(var x = 0; x < contadorcategorias.length; x++)
									{
										var x = [{usermob : args.idusr, promo : contadorcategorias[x].promo}];
							 				Notification.create(x).exec(function(err, oka){
												
							 					///if (err) { 
							 					//	return res.serverError(err); 
							 					//	}
							 					//return res.ok;
												
							 				});
									}
*/


							 });	 


						});

				});


	},




};