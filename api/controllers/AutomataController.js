/**
 * AutomataController
 *
 * @description :: Server-side logic for managing automata
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	consulta: function (req,res){



		var matrix = {
			"none":{
				"edad" : -1,
				"none" : -1
			},

			"age":{
				"age" : -1,
				"none" : 2
			},

			"gender":{
				"gender" : -1,
				"none" : 3
			},

			"time":{
				"time" : -1,
				"none" : 4
			},

			"duration":{
				"edad" : -1,
				"none" : 5
			},

			"device":{
				"device" : -1,
				"none" : 6 
			},

			"media":{
				"media" : -1,
				"none" : 7 
			},

			"clustering":{
				"clustering": -1,
				"none": 8
			},
			"total-clutering":{
				"total-clutering": -1,
				"none": 9
			},
			"age-avg-clustering":{
				"age-avg-clustering": -1,
				"none": 10
			},
			
			"age-min&max-clustering":{
				"age-min&max-clustering": -1,
				"none": 11
			},
			
			"gender-clustering":{
				"gender-clustering": -1,
				"none": 12
			},
			
			"device-clustering":{
				"device-clustering": -1,
				"none": 13
			},
			
			"media-clustering":{
				"media-clustering": -1,
				"none": 14
			},

			};


		if(matrix[req.param("xAxis")][req.param("yAxis")] == -1)
			return res.serverError('No se puede realizar la unión');

		//remplazar por findone  http://sailsjs.com/documentation/reference/waterline-orm/models/find-one
		Apis_graficas.find({id: matrix[req.param("xAxis")][req.param("yAxis")]}).exec(
			function(err,foundRecords){
				if(err)
					return res.serverError('Error en la consulta 2do paso');

				//console.log(req.query);

				if(foundRecords[0].url == "age")
				{
					console.log("Edad-Null");
					DataGraphicsService.Edad({owner: req.param("owner"), men: req.param("men"), women: req.param("women"), promo : req.param("promotionName")},
							function(err,data){
								console.log("callback");
								if(err)
									return res.serverError("No se pudo extraer datos");
								return res.ok({
									apis_graficas:{
										id:matrix[req.param("xAxis")][req.param("yAxis")],
										configuration: JSON.parse(foundRecords[0].configuration),
									},
									 xAxis: {categories: [foundRecords[0].url]},
									'data':data 
								});
							}
					);
				}


				else if(foundRecords[0].url == "gender")
				{
					console.log("Sexo-Null");
					DataGraphicsService.Sexo(
						{owner: req.param("owner"), men: req.param("men"), women: req.param("women"), promo : req.param("promotionName")},
						function(err,data){
							console.log("callback");
							if(err)
								return res.serverError("No se pudo extraer datos");
							return res.ok({
									apis_graficas:{
										id:matrix[req.param("xAxis")][req.param("yAxis")],
										configuration: JSON.parse(foundRecords[0].configuration)
									},
									'data':data 
							});
						}
					);
				}

				else if(foundRecords[0].url == "time")
				{
					console.log("Hora-Null");
					DataGraphicsService.Hora({owner: req.param("owner"), men: req.param("men"), women: req.param("women"), promo : req.param("promotionName")},
						function(err,data){
							console.log("callback");
							if(err)
								return res.serverError("No se pudo extraer datos");
							return res.ok({
									apis_graficas:{
										id:matrix[req.param("xAxis")][req.param("yAxis")],
										configuration: JSON.parse(foundRecords[0].configuration)
									},
									'data':data 
							});
						}
					);
				}

				else if(foundRecords[0].url == "duration")
				{
					console.log("tiempo-Null");
					DataGraphicsService2.Tiempo(
						{owner: req.param("owner"), men: req.param("men"), women: req.param("women"), promo : req.param("promotionName")},
						function(err,data){
							console.log("callback");
							if(err)
								return res.serverError("No se pudo extraer datos");
							return res.ok({
									apis_graficas:{
										id:matrix[req.param("xAxis")][req.param("yAxis")],
										configuration: JSON.parse(foundRecords[0].configuration)
									},
									'data':data 
							});
						}
					);
				}

				else if(foundRecords[0].url == "device")
				{
					console.log("dispositivo-Null");
					DataGraphicsService2.Dispositivo(
						{owner: req.param("owner"), men: req.param("men"), women: req.param("women"), promo : req.param("promotionName")},
						function(err,data){
							console.log("callback");
							if(err)
								return res.serverError("No se pudo extraer datos");
							return res.ok({
									apis_graficas:{
										id:matrix[req.param("xAxis")][req.param("yAxis")],
										configuration: JSON.parse(foundRecords[0].configuration)
									},
									'data':data 
							});
						}
					);
				}

				else if(foundRecords[0].url == "media")
				{
					console.log("media-Null");
					DataGraphicsService2.Media(
						{owner: req.param("owner"), men: req.param("men"), women: req.param("women"), promo : req.param("promotionName")},
						function(err,data){
							console.log("callback");
							if(err)
								return res.serverError("No se pudo extraer datos");
							return res.ok({
									apis_graficas:{
										id:matrix[req.param("xAxis")][req.param("yAxis")],
										configuration: JSON.parse(foundRecords[0].configuration)
									},
									'data':data 
							});
						}
					);
				}



				//Agregado por Leonardo Oliva Monjarás
				else if(
						foundRecords[0].url == "clustering" ||
						foundRecords[0].url == "total-clutering" ||
						foundRecords[0].url == "age-avg-clustering" ||
						foundRecords[0].url == "age-min&max-clustering" ||
						foundRecords[0].url == "gender-clustering" ||
						foundRecords[0].url == "device-clustering" ||
						foundRecords[0].url == "media-clustering"
					)
				{

					console.log("clasificacion-Null");
					console.log("owner:" + req.param("owner") );
					var modeInfo = "";
					if(req.param("men") == 1 && req.param("women") == 1)
						modeInfo = "mix";
					else if(req.param("men") == 1&& req.param("women") == 0)
						modeInfo = "men";
					else if(req.param("men") == 0 && req.param("women") == 1)
						modeInfo = "women";
					else // (!req.param("men") && !req.param("women"))
						modeInfo = "nothing";

					console.log("clustering");
					console.log(req.query);

					var query_ =	" SELECT output FROM prueba_usuarios.mlclusteringkmeansresponsetemp " +
									" where id = ? and updatedAt >= NOW() - INTERVAL 4 MINUTE " //
								;

					MLClusteringKMeansResponseTemp.query(query_,[req.param("idResponse",-1)],function(err,chartData){
						if(err|| chartData.length == 0 || req.param("forceUpdate",'true').localeCompare('true') == 0 ){ // Generar un nuevo registro; Agregar a la validación si se cambio el número de clusters, el tipo de grafica o promoción de datos!!!!!!
							console.log("EL CACHE -NO- SALVO!!");
							Promotion.findOne({select : ['id'], where : {owner : req.param("owner"), name : req.param("promotionName")}}).exec(function(err,promo){
								if(err){
									console.log(err);
									//return res.serverError("No se pudo extraer datos");
								}

								promoID = -1;
								if(!promo){
									console.log("No se encontro promoción!");
								}

								console.log("Se enontro promoción:");
								console.log(promo);
								if(promo){
									promoID = promo.id;
								}

								//Mejorar!
								aux2 = req.param("attributes",["age","city"]);
								attributes_aux = [];
								if(aux2.length == 0){
									//Error
									return res.serverError("No se pudo extraer datos; faltan atributos []");
								}else if(typeof aux2 == "string"){
									//Creamos la lista manual
									attributes_aux.push(aux2);
								}else{
									attributes_aux = req.param("attributes",["age","city"]);
								}

								attributes_aux.push("promoID");

								DataGraphicsService.kmeans(
									{
										owner: req.param("owner"), men: req.param("men"), women: req.param("women"),
										attributes: attributes_aux   ,
										numberOfClusters:parseInt(   req.param("numberOfClusters",2)   ),
										topic:"test",
										url:foundRecords[0].url,
										modeInfo:modeInfo,
										promo : promoID
									},
									function(err,data){
										console.log("callback");
										if(err){
											return res.serverError("No se pudo extraer datos");
										}else{
											return res.ok({
													apis_graficas:{
														id:matrix[req.param("xAxis")][req.param("yAxis")],
														configuration: JSON.parse(foundRecords[0].configuration),
														idResponse: data.idResponse
													},
													'data': data.data
											});
										}

									}
								);

							});

						}else{// Si se encontro un registro, mandarlo bajo las nuevas necesidades (combinación de sexo)
							console.log("EL CACHE NOS SALVO!!");
							console.log(chartData[0].output);
							return res.ok({
								apis_graficas:{
									id:matrix[req.param("xAxis")][req.param("yAxis")],
									configuration: JSON.parse(foundRecords[0].configuration),
									idResponse: req.param("idResponse",-1)
								},
								'data': JSON.parse(chartData[0].output)[foundRecords[0].url][modeInfo]
							});

						}


					});
					

					


				}//FIN CLUSTERING






/*
				else if(foundRecords[0].url == "vistas")
				{
				console.log("Vistas-Null");
				DataGraphicsService.Vistas({owner: req.param("owner"), men: req.param("men"), women: req.param("women")});
				}
*/
			});


//Se elimina esta linea, ya que son peticiones asincronas, siempre se ejecutaba primero y no se podria ver las demás respuestas
/*
		return res.ok({
			id: matrix[req.param("xAxis")][req.param("yAxis")]
		});

*/

	}
};

