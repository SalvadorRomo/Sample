/**
 * MlClusteringKMeansController
 *
 * @description :: Server-side logic for managing Mlclusteringkmeans
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var SHA256 = require("sha256");

module.exports = {
	



getClusters:function (req,res) {
		var partition = 0;
		//var auxTopic = SHA256(req.param('id_empresa',new Date().getTime()) + req.param('atributos') + new Date().getTime());
		var auxTopic = req.param('id_empresa');
		sails.log(req.query);
		console.log("Nombre del topic auxiliar: " + auxTopic);
		var query_ = "SELECT usermobile.age/10 as age, usermobile.country,usermobile.city,usermobile.gender,usermobile.id as usermobileID, promotion.id as promoID"+ 
					" FROM prueba_usuarios.history " + 
					" INNER JOIN prueba_usuarios.promotion " +
					" ON promotion.id = history.promo " +
					" INNER JOIN prueba_usuarios.user " +
					" ON prueba_usuarios.user.id = promotion.owner " +
					" INNER JOIN prueba_usuarios.usermobile " +
					" ON usermobile.id = history.usermob " +
					" WHERE prueba_usuarios.user.id = ? " +
					" GROUP BY usermobile.username " +
					" ORDER BY usermobile.username ASC " 
					//+" limit 2 "
				;
		History.query(query_, [req.param('id_empresa')] ,function(err, rawResult) {
		 	if (err) { return res.serverError(err); }

		 	MLClusteringKMeansResponseTemp.create({output:''}).exec(function (err, newRecordMLClustering) {//Creamos un registro en la BD, solo para apartar el I, el cual luego se buscará
		 		if (err) { return res.serverError(err); }


				var pakage = [{
					header:[{
						idResponse:newRecordMLClustering.id,
						//attributes:['gender','age','country','city'],
						attributes:JSON.parse(req.param('atributos')),
						numberOfClusters:req.param('number_of_clusters',2)
					}],
					data:rawResult,
					//data:[
					//	{"age":5,"country":"0","city":"4","gender":"1"},
					//	{"age":3.6,"country":"0","city":"4","gender":"1"},
					//	{"age":3,"country":"0","city":"1","gender":"1"}
					//	]
				}];
				//sails.log(rawResult);// (result format depends on the SQL query that was passed in, and the adapter you're using)
				//return res.ok(rawResult[0]);
				KafkaService.putMessage(//Mandamos el menaje a KAFKA para que SPARK STREAMING lo procese y no lo regrese al topic especificado
					{
						topic:req.param("topic","test"), //Topic al cual se mandará el mensaje; 
						message:(JSON.stringify(pakage)),//El mensaje que se mandará
						partition:partition,//La partición
					},
					function(err,message){
						if(err){return res.serverError(err);}

						console.log("Se ha colocado el mensaje");

						var numberOfRequests = 120;//Número de segundos a esperar por una respuesta
						var intervar = setInterval(function(){f();}, 1000);
						var f = function(){
								MLClusteringKMeansResponseTemp.findOne({id:newRecordMLClustering.id,output:{'!':''}}).exec(function(err,updatedRecordMLClustering){//Buscamos por ID donde el input es distinto a vacío
									if(err || !updatedRecordMLClustering){
										numberOfRequests--;
										console.log("No se encontro el registo: " + numberOfRequests);
										if(numberOfRequests<0){
											clearInterval(intervar);//Detenemos el interval!
											return res.serverError("No hay respuesta del servidor de ML")
										}
									}else{
										console.log("Se encontro el registo: " + numberOfRequests);
										clearInterval(intervar);//Detenemos el interval!
										return res.ok({//Reconstruimos el paquete solo con el output en formato JSON
											id:updatedRecordMLClustering.id,
											output:JSON.parse(updatedRecordMLClustering.output),
											attributes: JSON.parse(req.param('atributos')),
											numberOfClusters:req.param('number_of_clusters',2),
											createdAt:updatedRecordMLClustering.createdAt,
											updatedAt:updatedRecordMLClustering.updatedAt,
										});
									}
								});
							}
						;						
						
					}
				);


			});




		});


		

//return res.ok({});
	
	},









	/*
	getClusters:function (req,res) {
		var partition = 0;
		var auxTopic = SHA256(req.param('id_empresa',Date().getTime()) + req.param('atributos') + new Date().getTime());
		sails.log(req.query);
		sails.log("Llamando la función getClusters");
		console.log("Nombre del topic auxiliar: " + auxTopic);

		KafkaService.putMessage(
			{
				topic:req.param("topic","test"), 
				message:req.param("atributos","HOLIST_POR_DEFECTO"),
				partition:partition,
			},
			function(err,message){
				if(err){
					return res.serverError(err);
				}

				console.log("Se ha colocado el mensaje");

				KafkaService.getNextOffset(
					{
						topic:req.param("topic","test"), 
					},
					function(err,nextOffset){
						KafkaService.getMessage(
							{
								topic:req.param("topic","test"),
								//topic:"test2",
								offset:parseInt(nextOffset[req.param("topic","test")][partition]) - 1,//Trae los menajes del 67 en adelante!!!
								//offset:data[0][req.param("topic","test")][0][0],
								time:-1,
								partition:partition,
							},
							function(err,message){
								if(err){
									return res.serverError(err);
								}
								console.log("Se obtenidl el mensje");
								KafkaService.removeTopic(
									{
										topic:req.param("topic","test"),
										//topic:"test2",
										message:req.param("atributos","HOLIST_POR_DEFECTO")
									},
									function(err){
									if(err){
										return res.serverError(err);
									}
									console.log("Se ha eliminado el topic!");
									return res.ok();
								});
						});

					}

				);
			}
		);

//return res.ok({});
	
	},
	*/

};

