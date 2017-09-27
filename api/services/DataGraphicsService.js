

module.exports = { 

	//Definimos la función para mandar mensajes a Kafka
Edad: function (option,done){
		//console.log(option.promotion_userm);
		
	 	//return done(null,{1: parseInt(Math.random() * 30 + 1),2: parseInt(Math.random() * 30 + 1)});
	 	if(option.promo == 'All')
	 	{
	 		

		Promotion.find({select : ['id'], where : {owner : option.owner}}).exec(function(err,foundRecords){
				if(err){
					console.log(err);
					return done(err);
				}

			
				console.log(foundRecords);
				
				var lista = [];


					for(var i = 0; i < foundRecords.length; i++)
						lista.push(foundRecords[i].id);

					console.log("Listado de ID");
					console.log(lista);

				History.find({promo: lista}).exec(function(err,found_Records){
					if(err){
						console.log(err);
						return done(err);
					}

					console.log(found_Records);

					var lista2 = [];
					for(var i = 0; i < found_Records.length; i++)
						lista2.push(found_Records[i].usermob);

					
					console.log(lista2);

					if(option.men == 0 && option.women == 0)
					{
						var output = [											    
												{
													name: 'Edad promedio combinada',
													data: []
												 }
											]
											;
						
								UserMobile.find({id : lista2}).average('age').exec(function(err,found__Records){
									if(err)
										console.log(err)

									console.log('found__Records');
									console.log(found__Records);
									
										for(var hombreIndice = 0; hombreIndice < found__Records.length; hombreIndice++){
									output[0].data.push(
										{
											name:"Ambos sexos",
											y:found__Records[hombreIndice].age
										}
									);




								}				 
									return done(null,output);

								});
					}



					else if(option.men == 1 && option.women == 0)
					{
						var output = [											    
												{
													name: 'Edad promedio de hombres',
													data: []
												 }
											]
											;
						
								UserMobile.find({gender : 1, id : lista2}).average('age').exec(function(err,found__Records){
									if(err)
										console.log(err)

									console.log('found__Records');
									console.log(found__Records);
									
										for(var hombreIndice = 0; hombreIndice < found__Records.length; hombreIndice++){
									output[0].data.push(
										{
											name:"Hombre",
											y:found__Records[hombreIndice].age
										}
									);
								}				 
									return done(null,output);

								});
					}



					else if(option.men == 0 && option.women == 1)
					{
						var output = [											    
												{
													name: 'Edad promedio de mujeres',
													data: []
												 }
											]
											;
						
								UserMobile.find({gender : 2, id : lista2}).average('age').exec(function(err,found__Records){
									if(err)
										console.log(err)
									console.log('found__Records');
									console.log(found__Records);
									
									for(var MujerIndice = 0; MujerIndice < found__Records.length; MujerIndice++){
										output[0].data.push(
											{
												name:"Mujer",
												y:found__Records[MujerIndice].age
											}
										);
									}
										 
									return done(null,output);

								});
					}



					else if(option.men == 1 && option.women == 1)
						{
							UserMobile.find({gender : 1, id : lista2}).average('age').exec(function(err,found__Records_1){
								if(err)
									console.log(err);
								console.log('found__Records_1');
								console.log(found__Records_1);

								var output = [
												{
												    name: 'Edad promedio de hombres',
												    data: []
												}, 
													    
												{
													name: 'Edad promedio de mujeres',
													data: []
												 }
											]
											;

								for(var hombreIndice = 0; hombreIndice < found__Records_1.length; hombreIndice++){
									output[0].data.push(
										{
											name:"Hombre",
											y:found__Records_1[hombreIndice].age
										}
									);
								}

								UserMobile.find({gender : 2, id : lista2}).average('age').exec(function(err,found__Records_2){
									if(err)
										console.log(err)
									console.log('found__Records_2');
									console.log(found__Records_2);
									
									for(var MujerIndice = 0; MujerIndice < found__Records_2.length; MujerIndice++){
										output[1].data.push(
											{
												name:"Mujer",
												y:found__Records_2[MujerIndice].age
											}
										);
									}
										 
									return done(null,output);

								});
							});
					}
				});
			});
		}
		else
		{

		Promotion.find({select : ['id'], where : {owner : option.owner, name : option.promo}}).exec(function(err,foundRecords){
				if(err){
					console.log(err);
					return done(err);
				}

			
				console.log(foundRecords);
				
				var lista = [];


					for(var i = 0; i < foundRecords.length; i++)
						lista.push(foundRecords[i].id);
					
					console.log("Listado de ID");
					console.log(lista);

				History.find({promo: lista}).exec(function(err,found_Records){
					if(err){
						console.log(err);
						return done(err);
					}

					console.log(found_Records);

					var lista2 = [];
					for(var i = 0; i < found_Records.length; i++)
						lista2.push(found_Records[i].usermob);

					
					console.log(lista2);

					if(option.men == 0 && option.women == 0)
					{
						var output = [											    
												{
													name: 'Edad promedio combinada',
													data: []
												 }
											]
											;
						
								UserMobile.find({id : lista2}).average('age').exec(function(err,found__Records){
									if(err)
										console.log(err)

									console.log('found__Records');
									console.log(found__Records);
									
										for(var hombreIndice = 0; hombreIndice < found__Records.length; hombreIndice++){
									output[0].data.push(
										{
											name:"Ambos sexos",
											y:found__Records[hombreIndice].age
										}
									);




								}				 
									return done(null,output);

								});
					}



					else if(option.men == 1 && option.women == 0)
					{
						var output = [											    
												{
													name: 'Edad promedio de hombres',
													data: []
												 }
											]
											;
						
								UserMobile.find({gender : 1, id : lista2}).average('age').exec(function(err,found__Records){
									if(err)
										console.log(err)

									console.log('found__Records');
									console.log(found__Records);
									
										for(var hombreIndice = 0; hombreIndice < found__Records.length; hombreIndice++){
									output[0].data.push(
										{
											name:"Hombre",
											y:found__Records[hombreIndice].age
										}
									);
								}				 
									return done(null,output);

								});
					}



					else if(option.men == 0 && option.women == 1)
					{
						var output = [											    
												{
													name: 'Edad promedio de mujeres',
													data: []
												 }
											]
											;
						
								UserMobile.find({gender : 2, id : lista2}).average('age').exec(function(err,found__Records){
									if(err)
										console.log(err)
									console.log('found__Records');
									console.log(found__Records);
									
									for(var MujerIndice = 0; MujerIndice < found__Records.length; MujerIndice++){
										output[0].data.push(
											{
												name:"Mujer",
												y:found__Records[MujerIndice].age
											}
										);
									}
										 
									return done(null,output);

								});
					}



					else if(option.men == 1 && option.women == 1)
						{
							UserMobile.find({gender : 1, id : lista2}).average('age').exec(function(err,found__Records_1){
								if(err)
									console.log(err);
								console.log('found__Records_1');
								console.log(found__Records_1);

								var output = [
												{
												    name: 'Edad promedio de hombres',
												    data: []
												}, 
													    
												{
													name: 'Edad promedio de mujeres',
													data: []
												 }
											]
											;

								for(var hombreIndice = 0; hombreIndice < found__Records_1.length; hombreIndice++){
									output[0].data.push(
										{
											name:"Hombre",
											y:found__Records_1[hombreIndice].age
										}
									);
								}

								UserMobile.find({gender : 2, id : lista2}).average('age').exec(function(err,found__Records_2){
									if(err)
										console.log(err)
									console.log('found__Records_2');
									console.log(found__Records_2);
									
									for(var MujerIndice = 0; MujerIndice < found__Records_2.length; MujerIndice++){
										output[1].data.push(
											{
												name:"Mujer",
												y:found__Records_2[MujerIndice].age
											}
										);
									}
										 
									return done(null,output);

								});
							});
					}
				});
			});
		}
	},

/***************************************************************************************************************************************/

Sexo: function (option,done){
		//console.log(option.promotion_userm);
		if(option.promo == 'All')
	 	{
	 	
		Promotion.find({select : ['id'], where : {owner : option.owner}}).exec(function(err,foundRecords){
				if(err){
					console.log(err);
					return done(err);
				}
				
				//console.log(foundRecords);

				var lista = [];
				for(var i = 0; i < foundRecords.length; i++)
					lista.push(foundRecords[i].id);

				console.log("Listado de ID");
				console.log(lista);

				History.find({promo: lista}).exec(function(err,found_Records){
					if(err){
						console.log(err);
						return done(err);
					}

					//console.log(found_Records);

					var lista2 = [];
					for(var i = 0; i < found_Records.length; i++)
						lista2.push(found_Records[i].usermob);

					
					console.log(lista2)

					if(option.men == 0 && option.women == 0)
					{
						UserMobile.count({id: lista2}).exec(function(err,found__Records){
							if(err){
								console.log(err);
								return done(err);
							}

							console.log("Contador combinado hombre mujeres");
							console.log(found__Records);


									var output = [											    
												{
													name: 'Conteo combinado',
													data: [{
														name:"Conteo Combinado",
														y:found__Records			 /**//*/*//*/*//*/*//*/*//*/*//*/**/
													}]
												 }
											];

									return done(null,output);				
						});
					}


					else if(option.men == 1 && option.women == 0)
						{

							
					UserMobile.count({gender : 1, id: lista2}).exec(function(err,found__Records){
							if(err){
								console.log(err);
								return done(err);
							}
							console.log("Contador Hombres");
							console.log(found__Records);
								var output = [											    
												{
													name: 'Conteo de hombres',
													data: [{
														name:"hombres",
														y:found__Records				 /**//*/*//*/*//*/*//*/*//*/*//*/**/
										}]
												 }
											];

									return done(null,output);	
						});
					}


					else if(option.men == 0 && option.women == 1)
					{
						

						UserMobile.count({gender : 2, id: lista2}).exec(function(err,found__Records){
							if(err){
								console.log(err);
								return done(err);
							}
							console.log("Contador mujeres");
							console.log(found__Records);

							var output = [											    
												{
													name: 'Conteo de mujeres',
													data: [{
														name:"Conteo de mujeres",
														y:found__Records            /**//*/*//*/*//*/*//*/*//*/*//*/**/
													}]
												 }
											];	

									return done(null,output);	
						});
					}


					else if(option.men == 1 && option.women == 1)
					{
							//UserMobile.count({gender : 1, id: lista2}).exec(function(err,found__Records){

									

							UserMobile.count({gender : 1, id: lista2}).exec(function(err,found__Records_1){
								if(err){
									console.log(err);
									return done(err);
								}

								console.log("Ambas edades");
								console.log(found__Records_1);

									 


								UserMobile.count({gender : 2, id: lista2}).exec(function(err,found__Records_2){
									if(err){
										console.log(err);
										return done(err);
									}
									//both.push(found__Records);
									console.log("Ambas edades");
									console.log(found__Records_2);
									
									var output = [
												{
												    name: 'Conteo de hombres',
												    data: [{
															name:"Conteo de hombres",
															y:found__Records_1							 /**//*/*//*/*//*/*//*/*//*/*//*/**/
														}]
												}, 
													    
												{
													name: 'Conteo de mujeres',
													data: [{
															name:"Conteo de mujeres",
															y:found__Records_2          /**//*/*//*/*//*/*//*/*//*/*//*/**/
														  }]
												 }
											]
											;


									return done(null,output);	

								});
						

							});



					}



		});
		
				});

			}


		else
	 	{
	 	
		Promotion.find({select : ['id'], where : {owner : option.owner, name : option.promo}}).exec(function(err,foundRecords){
				if(err){
					console.log(err);
					return done(err);
				}
				
				//console.log(foundRecords);

				var lista = [];
				for(var i = 0; i < foundRecords.length; i++)
					lista.push(foundRecords[i].id);

				console.log("Listado de ID");
				console.log(lista);

				History.find({promo: lista}).exec(function(err,found_Records){
					if(err){
						console.log(err);
						return done(err);
					}

					//console.log(found_Records);

					var lista2 = [];
					for(var i = 0; i < found_Records.length; i++)
						lista2.push(found_Records[i].usermob);

					
					console.log(lista2)

					if(option.men == 0 && option.women == 0)
					{
						UserMobile.count({id: lista2}).exec(function(err,found__Records){
							if(err){
								console.log(err);
								return done(err);
							}

							console.log("Contador combinado hombre mujeres");
							console.log(found__Records);


									var output = [											    
												{
													name: 'Conteo combinado',
													data: [{
														name:"Conteo Combinado",
														y:found__Records			 /**//*/*//*/*//*/*//*/*//*/*//*/**/
													}]
												 }
											];

									return done(null,output);				
						});
					}


					else if(option.men == 1 && option.women == 0)
						{

							
					UserMobile.count({gender : 1, id: lista2}).exec(function(err,found__Records){
							if(err){
								console.log(err);
								return done(err);
							}
							console.log("Contador Hombres");
							console.log(found__Records);
								var output = [											    
												{
													name: 'Conteo de hombres',
													data: [{
														name:"hombres",
														y:found__Records				 /**//*/*//*/*//*/*//*/*//*/*//*/**/
										}]
												 }
											];

									return done(null,output);	
						});
					}


					else if(option.men == 0 && option.women == 1)
					{
						

						UserMobile.count({gender : 2, id: lista2}).exec(function(err,found__Records){
							if(err){
								console.log(err);
								return done(err);
							}
							console.log("Contador mujeres");
							console.log(found__Records);

							var output = [											    
												{
													name: 'Conteo de mujeres',
													data: [{
														name:"Conteo de mujeres",
														y:found__Records            /**//*/*//*/*//*/*//*/*//*/*//*/**/
													}]
												 }
											];	

									return done(null,output);	
						});
					}


					else if(option.men == 1 && option.women == 1)
					{
							//UserMobile.count({gender : 1, id: lista2}).exec(function(err,found__Records){

									

							UserMobile.count({gender : 1, id: lista2}).exec(function(err,found__Records_1){
								if(err){
									console.log(err);
									return done(err);
								}

								console.log("Ambas edades");
								console.log(found__Records_1);

									 


								UserMobile.count({gender : 2, id: lista2}).exec(function(err,found__Records_2){
									if(err){
										console.log(err);
										return done(err);
									}
									//both.push(found__Records);
									console.log("Ambas edades");
									console.log(found__Records_2);
									
									var output = [
												{
												    name: 'Conteo de hombres',
												    data: [{
															name:"Conteo de hombres",
															y:found__Records_1							 /**//*/*//*/*//*/*//*/*//*/*//*/**/
														}]
												}, 
													    
												{
													name: 'Conteo de mujeres',
													data: [{
															name:"Conteo de mujeres",
															y:found__Records_2          /**//*/*//*/*//*/*//*/*//*/*//*/**/
														  }]
												 }
											]
											;


									return done(null,output);	

								});
						

							});



					}



		});
		
				});

			}

	},


	/**********************************************************************************************************************************************/

Hora : function(option, done){
console.log("**********************");
			console.log(option.men);
			console.log("**********************");
			console.log(option.women);
			
	if(option.promo == 'All')
	{
	/**/	Promotion.find({select : ['id'], where : {owner : option.owner}}).exec(function(err,foundRecords){
				if(err){
					console.log(err);
					return done(err);
				}
				//console.log("Listado de ID");
				console.log(foundRecords);

				var lista = [];
				for(var i = 0; i < foundRecords.length; i++)
					lista.push(foundRecords[i].id);

					console.log("Listado ID");
					console.log(lista);

		/****/		History.find({promo: lista}).exec(function(err,found_Records_1){
					if(err){
						console.log(err);
						return done(err);
					}

					//console.log(found_Records_1);

					var lista2 = [];
					for(var i = 0; i < found_Records_1.length; i++)
						lista2.push(found_Records_1[i].usermob);

					
					console.log(lista2);

						var output = [
												{
												    name: 'Conteo de hombres',
												    data: []
												}, 
													    
												{
													name: 'Conteo de mujeres',
													data: []
												 },
											]
											;


				if(option.men == 0 && option.women == 0 )
					{
						console.log("****  0  0 ****");
						var cont2 = cont3 = cont4 = cont5 = cont6 = cont7 = cont8 = cont9 = cont10 = cont11 = cont12 = cont13 = cont14 = cont15 = cont16 = cont17 = cont18 = cont19 = cont20 = cont21 = cont22 = cont23 = 0;

					var query0 = "select * FROM prueba_usuarios.history where starthour >= '00:00:00' and endhour <= '02:00:00' AND (";
					for(var x = 0; x < lista2.length; x++)
							query0  = query0 + " usermob = " + lista2[x] + " or" ; 
					query0 = query0.substring(0, query0.length - 2);
					query0 = query0 + ")";
					console.log(query0);

					UserMobile.query(query0, function(err,foundRecords_0){

					if(err){
						console.log(err);
						return done(err);
					}
					var cont0 = foundRecords_0.length;


						var query1 = "select * FROM prueba_usuarios.history where starthour >= '02:00:00' and endhour <= '04:00:00' AND (";
						for(var x = 0; x < lista2.length; x++)
							query1  = query1 + " usermob = " + lista2[x] + " or" ; 
						query1 = query1.substring(0, query1.length - 2);
						query1 = query1 + ")";
						UserMobile.query(query1, function(err,foundRecords_1){

							if(err){
							console.log(err);
							return done(err);
							}
						var cont1 = foundRecords_1.length;



							var query2 = "select * FROM prueba_usuarios.history where starthour >= '04:00:00' and endhour <='06:00:00' AND (";
							for(var x = 0; x < lista2.length; x++)
								query2  = query2 + " usermob = " + lista2[x] + " or" ; 
							query2 = query2.substring(0, query2.length - 2);
							query2 = query2 + ")";
							UserMobile.query(query2, function(err,foundRecords_2){

								if(err){
								console.log(err);
								return done(err);
								}
							var cont2 = foundRecords_2.length;

								var query3 = "select * FROM prueba_usuarios.history where starthour >= '06:00:00' and endhour <= '08:00:00' AND (";
								for(var x = 0; x < lista2.length; x++)
									query3  = query3 + " usermob = " + lista2[x] + " or" ; 
								query3 = query3.substring(0, query3.length - 2);
								query3 = query3 + ")";
								UserMobile.query(query3, function(err,foundRecords_3){

								if(err){
								console.log(err);
								return done(err);
								}
								var cont3 = foundRecords_3.length;


									var query4 = "select * FROM prueba_usuarios.history where starthour >= '08:00:00' and endhour <= '10:00:00' AND (";
									for(var x = 0; x < lista2.length; x++)
										query4  = query4 + " usermob = " + lista2[x] + " or" ; 
									query4 = query4.substring(0, query4.length - 2);
									query4 = query4 + ")";
									UserMobile.query(query4, function(err,foundRecords_4){

									if(err){
									console.log(err);
									return done(err);
									}
									var cont4 = foundRecords_4.length;


										var query5 = "select * FROM prueba_usuarios.history where starthour >= '10:00:00' and endhour <= '12:00:00' AND (";
										for(var x = 0; x < lista2.length; x++)
											query5  = query5 + " usermob = " + lista2[x] + " or" ; 
										query5 = query5.substring(0, query5.length - 2);
										query5 = query5 + ")";
										UserMobile.query(query5, function(err,foundRecords_5){

										if(err){
										console.log(err);
										return done(err);
										}
										var cont5 = foundRecords_5.length;


											var query6 = "select * FROM prueba_usuarios.history where starthour >= '12:00:00' and endhour <= '14:00:00' AND (";
											for(var x = 0; x < lista2.length; x++)
												query6  = query6 + " usermob = " + lista2[x] + " or" ; 
											query6 = query6.substring(0, query6.length - 2);
											query6 = query6 + ")";
											UserMobile.query(query6, function(err,foundRecords_6){

											if(err){
											console.log(err);
											return done(err);
											}
											var cont6 = foundRecords_6.length;


												var query7 = "select * FROM prueba_usuarios.history where starthour >= '14:00:00' and endhour <= '16:00:00' AND (";
												for(var x = 0; x < lista2.length; x++)
													query7  = query7 + " usermob = " + lista2[x] + " or" ; 
												query7 = query7.substring(0, query7.length - 2);
												query7 = query7 + ")";
												UserMobile.query(query7, function(err,foundRecords_7){

												if(err){
												console.log(err);
												return done(err);
												}
												var cont7 = foundRecords_7.length;


													var query8 = "select * FROM prueba_usuarios.history where starthour >= '16:00:00' and endhour <= '18:00:00' AND (";
													for(var x = 0; x < lista2.length; x++)
														query8  = query8 + " usermob = " + lista2[x] + " or" ; 
													query8 = query8.substring(0, query8.length - 2);
													query8 = query8 + ")";
													UserMobile.query(query8, function(err,foundRecords_8){

													if(err){
													console.log(err);
													return done(err);
													}
													var cont8 = foundRecords_8.length;


														var query9 = "select * FROM prueba_usuarios.history where starthour >= '18:00:00' and endhour <= '20:00:00' AND (";
														for(var x = 0; x < lista2.length; x++)
															query9  = query9 + " usermob = " + lista2[x] + " or" ; 
														query9 = query9.substring(0, query9.length - 2);
														query9 = query9 + ")";
														UserMobile.query(query9, function(err,foundRecords_9){

														if(err){
														console.log(err);
														return done(err);
														}
														var cont9 = foundRecords_9.length;


															var query10 = "select * FROM prueba_usuarios.history where starthour >= '20:00:00' and endhour <= '22:00:00' AND (";
															for(var x = 0; x < lista2.length; x++)
																query10  = query10 + " usermob = " + lista2[x] + " or" ; 
															query10 = query10.substring(0, query10.length - 2);
															query10 = query10 + ")";
															UserMobile.query(query10, function(err,foundRecords_10){

															if(err){
															console.log(err);
															return done(err);
															}
															var cont10 = foundRecords_10.length;


																var query11 = "select * FROM prueba_usuarios.history where starthour >= '22:00:00' and endhour <= '00:00:00' AND (";
																for(var x = 0; x < lista2.length; x++)
																	query11  = query11 + " usermob = " + lista2[x] + " or" ; 
																query11 = query11.substring(0, query11.length - 2);
																query11 = query11 + ")";
																UserMobile.query(query11, function(err,foundRecords_11){

																if(err){
																console.log(err);
																return done(err);
																}
																var cont11 = foundRecords_11.length;
																			

							var output = [{
													name: 'Hora de visualizacion',
													data: [ {name:"00:00:00 a 02:00:00",y:cont0},
															{name:"02:00:00 a 04:00:00",y:cont1},
															{name:"04:00:00 a 06:00:00",y:cont2},
															{name:"06:00:00 a 08:00:00",y:cont3},
															{name:"08:00:00 a 10:00:00",y:cont4},
															{name:"10:00:00 a 12:00:00",y:cont5},
															{name:"12:00:00 a 14:00:00",y:cont6},
															{name:"14:00:00 a 16:00:00",y:cont7},
															{name:"16:00:00 a 18:00:00",y:cont8},
															{name:"18:00:00 a 20:00:00",y:cont9},
															{name:"20:00:00 a 22:00:00",y:cont10},
															{name:"22:00:00 a 00:00:00",y:cont11},
													
															]
										  }];
										  						console.log(cont0, cont1, cont2, cont3, cont4, cont5, cont6, cont7, cont8, cont9, cont10, cont11, cont12,output);
															  return done(null,output);


					}); //11

					}); //10
					}); // 9
					}); //8
					}); //7
					}); // 6



					}); //5
					}); //4
					}); // 3
											}); // 2

										}); // 1
							}); // 0


						

					}
					
				else if(option.men == 1 && option.women == 0 && lista2.length > 0)
					{ console.log("****  1  0 ****");

													UserMobile.find({id: lista2, gender: 1}).exec(function(err,found_Records){
														//console.log(found_Records);

														var listamen = [];
															for(var i = 0; i < found_Records.length; i++)
															listamen.push(found_Records[i].id);

														console.log(listamen);

													var mcont0 = mcont1 = mcont2 = mcont3 = mcont4 = mcont5 = mcont6 = mcont7 = mcont8 = mcont9 = mcont10 = mcont11 = mcont12 = mcont13 = mcont14 = mcont15 = mcont16 = mcont17 = mcont18 = mcont19 = mcont20 = mcont21 = mcont22 = mcont23 = 0;
												
												var query0 = "select * FROM prueba_usuarios.history where starthour >= '00:00:00' and endhour <= '02:00:00' AND (";
												for(var x = 0; x < listamen.length; x++)
														query0  = query0 + " usermob = " + listamen[x] + " or" ; 
												query0 = query0.substring(0, query0.length - 2);
												query0 = query0 + ")";
												console.log(query0);

												if(listamen.length == 0){


																			var output = [{
																											name: 'Hora de visualizacion (hombres)',
																											data: [ {name:"00:00:00 a 02:00:00",y:mcont0},
																													{name:"02:00:00 a 04:00:00",y:mcont1},
																													{name:"04:00:00 a 06:00:00",y:mcont2},
																													{name:"06:00:00 a 08:00:00",y:mcont3},
																													{name:"08:00:00 a 10:00:00",y:mcont4},
																													{name:"10:00:00 a 12:00:00",y:mcont5},
																													{name:"12:00:00 a 14:00:00",y:mcont6},
																													{name:"14:00:00 a 16:00:00",y:mcont7},
																													{name:"16:00:00 a 18:00:00",y:mcont8},
																													{name:"18:00:00 a 20:00:00",y:mcont9},
																													{name:"20:00:00 a 22:00:00",y:mcont10},
																													{name:"22:00:00 a 00:00:00",y:mcont11},
																											
																													]
																								  }];

																								  return done(null,output); }



												UserMobile.query(query0, function(err,foundRecords_0){

												if(err){
													console.log(err);
													return done(err);
												}
												var mcont0 = foundRecords_0.length;


													var query1 = "select * FROM prueba_usuarios.history where starthour >= '02:00:00' and endhour <= '04:00:00' AND (";
													for(var x = 0; x < listamen.length; x++)
														query1  = query1 + " usermob = " + listamen[x] + " or" ; 
													query1 = query1.substring(0, query1.length - 2);
													query1 = query1 + ")";
													UserMobile.query(query1, function(err,foundRecords_1){

														if(err){
														console.log(err);
														return done(err);
														}
													var mcont1 = foundRecords_1.length;



														var query2 = "select * FROM prueba_usuarios.history where starthour >= '04:00:00' and endhour <='06:00:00' AND (";
														for(var x = 0; x < listamen.length; x++)
															query2  = query2 + " usermob = " + listamen[x] + " or" ; 
														query2 = query2.substring(0, query2.length - 2);
														query2 = query2 + ")";
														UserMobile.query(query2, function(err,foundRecords_2){

															if(err){
															console.log(err);
															return done(err);
															}
														var mcont2 = foundRecords_2.length;

															var query3 = "select * FROM prueba_usuarios.history where starthour >= '06:00:00' and endhour <= '08:00:00' AND (";
															for(var x = 0; x < listamen.length; x++)
																query3  = query3 + " usermob = " + listamen[x] + " or" ; 
															query3 = query3.substring(0, query3.length - 2);
															query3 = query3 + ")";
															UserMobile.query(query3, function(err,foundRecords_3){

															if(err){
															console.log(err);
															return done(err);
															}
															var mcont3 = foundRecords_3.length;


																var query4 = "select * FROM prueba_usuarios.history where starthour >= '08:00:00' and endhour <= '10:00:00' AND (";
																for(var x = 0; x < listamen.length; x++)
																	query4  = query4 + " usermob = " + listamen[x] + " or" ; 
																query4 = query4.substring(0, query4.length - 2);
																query4 = query4 + ")";
																UserMobile.query(query4, function(err,foundRecords_4){

																if(err){
																console.log(err);
																return done(err);
																}
																var mcont4 = foundRecords_4.length;


																	var query5 = "select * FROM prueba_usuarios.history where starthour >= '10:00:00' and endhour <= '12:00:00' AND (";
																	for(var x = 0; x < listamen.length; x++)
																		query5  = query5 + " usermob = " + listamen[x] + " or" ; 
																	query5 = query5.substring(0, query5.length - 2);
																	query5 = query5 + ")";
																	UserMobile.query(query5, function(err,foundRecords_5){

																	if(err){
																	console.log(err);
																	return done(err);
																	}
																	var mcont5 = foundRecords_5.length;


																		var query6 = "select * FROM prueba_usuarios.history where starthour >= '12:00:00' and endhour <= '14:00:00' AND (";
																		for(var x = 0; x < listamen.length; x++)
																			query6  = query6 + " usermob = " + listamen[x] + " or" ; 
																		query6 = query6.substring(0, query6.length - 2);
																		query6 = query6 + ")";
																		UserMobile.query(query6, function(err,foundRecords_6){

																		if(err){
																		console.log(err);
																		return done(err);
																		}
																		var mcont6 = foundRecords_6.length;


																			var query7 = "select * FROM prueba_usuarios.history where starthour >= '14:00:00' and endhour <= '16:00:00' AND (";
																			for(var x = 0; x < listamen.length; x++)
																				query7  = query7 + " usermob = " + listamen[x] + " or" ; 
																			query7 = query7.substring(0, query7.length - 2);
																			query7 = query7 + ")";
																			UserMobile.query(query7, function(err,foundRecords_7){

																			if(err){
																			console.log(err);
																			return done(err);
																			}
																			var mcont7 = foundRecords_7.length;


																				var query8 = "select * FROM prueba_usuarios.history where starthour >= '16:00:00' and endhour <= '18:00:00' AND (";
																				for(var x = 0; x < listamen.length; x++)
																					query8  = query8 + " usermob = " + listamen[x] + " or" ; 
																				query8 = query8.substring(0, query8.length - 2);
																				query8 = query8 + ")";
																				UserMobile.query(query8, function(err,foundRecords_8){

																				if(err){
																				console.log(err);
																				return done(err);
																				}
																				var mcont8 = foundRecords_8.length;


																					var query9 = "select * FROM prueba_usuarios.history where starthour >= '18:00:00' and endhour <= '20:00:00' AND (";
																					for(var x = 0; x < listamen.length; x++)
																						query9  = query9 + " usermob = " + listamen[x] + " or" ; 
																					query9 = query9.substring(0, query9.length - 2);
																					query9 = query9 + ")";
																					UserMobile.query(query9, function(err,foundRecords_9){

																					if(err){
																					console.log(err);
																					return done(err);
																					}
																					var mcont9 = foundRecords_9.length;


																						var query10 = "select * FROM prueba_usuarios.history where starthour >= '20:00:00' and endhour <= '22:00:00' AND (";
																						for(var x = 0; x < listamen.length; x++)
																							query10  = query10 + " usermob = " + listamen[x] + " or" ; 
																						query10 = query10.substring(0, query10.length - 2);
																						query10 = query10 + ")";
																						UserMobile.query(query10, function(err,foundRecords_10){

																						if(err){
																						console.log(err);
																						return done(err);
																						}
																						var mcont10 = foundRecords_10.length;


																							var query11 = "select * FROM prueba_usuarios.history where starthour >= '22:00:00' and endhour <= '00:00:00' AND (";
																							for(var x = 0; x < listamen.length; x++)
																								query11  = query11 + " usermob = " + listamen[x] + " or" ; 
																							query11 = query11.substring(0, query11.length - 2);
																							query11 = query11 + ")";
																							UserMobile.query(query11, function(err,foundRecords_11){

																							if(err){
																							console.log(err);
																							return done(err);
																							}
																							var mcont11 = foundRecords_11.length;
																										

														var output = [{
																				name: 'Hora de visualizacion (hombres)',
																				data: [ {name:"00:00:00 a 02:00:00",y:mcont0},
																						{name:"02:00:00 a 04:00:00",y:mcont1},
																						{name:"04:00:00 a 06:00:00",y:mcont2},
																						{name:"06:00:00 a 08:00:00",y:mcont3},
																						{name:"08:00:00 a 10:00:00",y:mcont4},
																						{name:"10:00:00 a 12:00:00",y:mcont5},
																						{name:"12:00:00 a 14:00:00",y:mcont6},
																						{name:"14:00:00 a 16:00:00",y:mcont7},
																						{name:"16:00:00 a 18:00:00",y:mcont8},
																						{name:"18:00:00 a 20:00:00",y:mcont9},
																						{name:"20:00:00 a 22:00:00",y:mcont10},
																						{name:"22:00:00 a 00:00:00",y:mcont11},
																				
																						]
																	  }];

																						  return done(null,output);


												}); //11

												}); //10
												}); // 9
												}); //8
												}); //7
												}); // 6



												}); //5
												}); //4
												}); // 3
																		}); // 2

																	}); // 1
														}); // 0

												});

																		


					}

				else if(option.men == 0 && option.women == 1 && lista2.length > 0)
					{console.log("****  0  1 ****");

																				UserMobile.find({id: lista2, gender: 2}).exec(function(err,found_Records){
																					//console.log(found_Records);

																					var listamen = [];
																						for(var i = 0; i < found_Records.length; i++)
																						listamen.push(found_Records[i].id);

																					console.log(listamen);

																				var cont0 = cont1 = cont2 = cont3 = cont4 = cont5 = cont6 = cont7 = cont8 = cont9 = cont10 = cont11 = cont12 = cont13 = cont14 = cont15 = cont16 = cont17 = cont18 = cont19 = cont20 = cont21 = cont22 = cont23 = 0;
																			
																			var query0 = "select * FROM prueba_usuarios.history where starthour >= '00:00:00' and endhour <= '02:00:00' AND (";
																			for(var x = 0; x < listamen.length; x++)
																					query0  = query0 + " usermob = " + listamen[x] + " or" ; 
																			query0 = query0.substring(0, query0.length - 2);
																			query0 = query0 + ")";
																			console.log(query0);

																		if(listamen.length == 0){
																			var output = [{
																											name: 'Hora de visualizacion (mujeres)',
																											data: [ {name:"00:00:00 a 02:00:00",y:cont0},
																													{name:"02:00:00 a 04:00:00",y:cont1},
																													{name:"04:00:00 a 06:00:00",y:cont2},
																													{name:"06:00:00 a 08:00:00",y:cont3},
																													{name:"08:00:00 a 10:00:00",y:cont4},
																													{name:"10:00:00 a 12:00:00",y:cont5},
																													{name:"12:00:00 a 14:00:00",y:cont6},
																													{name:"14:00:00 a 16:00:00",y:cont7},
																													{name:"16:00:00 a 18:00:00",y:cont8},
																													{name:"18:00:00 a 20:00:00",y:cont9},
																													{name:"20:00:00 a 22:00:00",y:cont10},
																													{name:"22:00:00 a 00:00:00",y:cont11},
																											
																													]
																								  }];

																								  return done(null,output); }


																			UserMobile.query(query0, function(err,foundRecords_0){

																			if(err){
																				console.log(err);
																				return done(err);
																			}
																			var cont0 = foundRecords_0.length;


																				var query1 = "select * FROM prueba_usuarios.history where starthour >= '02:00:00' and endhour <= '04:00:00' AND (";
																				for(var x = 0; x < listamen.length; x++)
																					query1  = query1 + " usermob = " + listamen[x] + " or" ; 
																				query1 = query1.substring(0, query1.length - 2);
																				query1 = query1 + ")";
																				UserMobile.query(query1, function(err,foundRecords_1){

																					if(err){
																					console.log(err);
																					return done(err);
																					}
																				var cont1 = foundRecords_1.length;



																					var query2 = "select * FROM prueba_usuarios.history where starthour >= '04:00:00' and endhour <='06:00:00' AND (";
																					for(var x = 0; x < listamen.length; x++)
																						query2  = query2 + " usermob = " + listamen[x] + " or" ; 
																					query2 = query2.substring(0, query2.length - 2);
																					query2 = query2 + ")";
																					UserMobile.query(query2, function(err,foundRecords_2){

																						if(err){
																						console.log(err);
																						return done(err);
																						}
																					var cont2 = foundRecords_2.length;

																						var query3 = "select * FROM prueba_usuarios.history where starthour >= '06:00:00' and endhour <= '08:00:00' AND (";
																						for(var x = 0; x < listamen.length; x++)
																							query3  = query3 + " usermob = " + listamen[x] + " or" ; 
																						query3 = query3.substring(0, query3.length - 2);
																						query3 = query3 + ")";
																						UserMobile.query(query3, function(err,foundRecords_3){

																						if(err){
																						console.log(err);
																						return done(err);
																						}
																						var cont3 = foundRecords_3.length;


																							var query4 = "select * FROM prueba_usuarios.history where starthour >= '08:00:00' and endhour <= '10:00:00' AND (";
																							for(var x = 0; x < listamen.length; x++)
																								query4  = query4 + " usermob = " + listamen[x] + " or" ; 
																							query4 = query4.substring(0, query4.length - 2);
																							query4 = query4 + ")";
																							UserMobile.query(query4, function(err,foundRecords_4){

																							if(err){
																							console.log(err);
																							return done(err);
																							}
																							var cont4 = foundRecords_4.length;


																								var query5 = "select * FROM prueba_usuarios.history where starthour >= '10:00:00' and endhour <= '12:00:00' AND (";
																								for(var x = 0; x < listamen.length; x++)
																									query5  = query5 + " usermob = " + listamen[x] + " or" ; 
																								query5 = query5.substring(0, query5.length - 2);
																								query5 = query5 + ")";
																								UserMobile.query(query5, function(err,foundRecords_5){

																								if(err){
																								console.log(err);
																								return done(err);
																								}
																								var cont5 = foundRecords_5.length;


																									var query6 = "select * FROM prueba_usuarios.history where starthour >= '12:00:00' and endhour <= '14:00:00' AND (";
																									for(var x = 0; x < listamen.length; x++)
																										query6  = query6 + " usermob = " + listamen[x] + " or" ; 
																									query6 = query6.substring(0, query6.length - 2);
																									query6 = query6 + ")";
																									UserMobile.query(query6, function(err,foundRecords_6){

																									if(err){
																									console.log(err);
																									return done(err);
																									}
																									var cont6 = foundRecords_6.length;


																										var query7 = "select * FROM prueba_usuarios.history where starthour >= '14:00:00' and endhour <= '16:00:00' AND (";
																										for(var x = 0; x < listamen.length; x++)
																											query7  = query7 + " usermob = " + listamen[x] + " or" ; 
																										query7 = query7.substring(0, query7.length - 2);
																										query7 = query7 + ")";
																										UserMobile.query(query7, function(err,foundRecords_7){

																										if(err){
																										console.log(err);
																										return done(err);
																										}
																										var cont7 = foundRecords_7.length;


																											var query8 = "select * FROM prueba_usuarios.history where starthour >= '16:00:00' and endhour <= '18:00:00' AND (";
																											for(var x = 0; x < listamen.length; x++)
																												query8  = query8 + " usermob = " + listamen[x] + " or" ; 
																											query8 = query8.substring(0, query8.length - 2);
																											query8 = query8 + ")";
																											UserMobile.query(query8, function(err,foundRecords_8){

																											if(err){
																											console.log(err);
																											return done(err);
																											}
																											var cont8 = foundRecords_8.length;


																												var query9 = "select * FROM prueba_usuarios.history where starthour >= '18:00:00' and endhour <= '20:00:00' AND (";
																												for(var x = 0; x < listamen.length; x++)
																													query9  = query9 + " usermob = " + listamen[x] + " or" ; 
																												query9 = query9.substring(0, query9.length - 2);
																												query9 = query9 + ")";
																												UserMobile.query(query9, function(err,foundRecords_9){

																												if(err){
																												console.log(err);
																												return done(err);
																												}
																												var cont9 = foundRecords_9.length;


																													var query10 = "select * FROM prueba_usuarios.history where starthour >= '20:00:00' and endhour <= '22:00:00' AND (";
																													for(var x = 0; x < listamen.length; x++)
																														query10  = query10 + " usermob = " + listamen[x] + " or" ; 
																													query10 = query10.substring(0, query10.length - 2);
																													query10 = query10 + ")";
																													UserMobile.query(query10, function(err,foundRecords_10){

																													if(err){
																													console.log(err);
																													return done(err);
																													}
																													var cont10 = foundRecords_10.length;


																														var query11 = "select * FROM prueba_usuarios.history where starthour >= '22:00:00' and endhour <= '00:00:00' AND (";
																														for(var x = 0; x < listamen.length; x++)
																															query11  = query11 + " usermob = " + listamen[x] + " or" ; 
																														query11 = query11.substring(0, query11.length - 2);
																														query11 = query11 + ")";
																														UserMobile.query(query11, function(err,foundRecords_11){

																														if(err){
																														console.log(err);
																														return done(err);
																														}
																														var cont11 = foundRecords_11.length;
																																	

																					var output = [{
																											name: 'Hora de visualizacion (mujeres)',
																											data: [ {name:"00:00:00 a 02:00:00",y:cont0},
																													{name:"02:00:00 a 04:00:00",y:cont1},
																													{name:"04:00:00 a 06:00:00",y:cont2},
																													{name:"06:00:00 a 08:00:00",y:cont3},
																													{name:"08:00:00 a 10:00:00",y:cont4},
																													{name:"10:00:00 a 12:00:00",y:cont5},
																													{name:"12:00:00 a 14:00:00",y:cont6},
																													{name:"14:00:00 a 16:00:00",y:cont7},
																													{name:"16:00:00 a 18:00:00",y:cont8},
																													{name:"18:00:00 a 20:00:00",y:cont9},
																													{name:"20:00:00 a 22:00:00",y:cont10},
																													{name:"22:00:00 a 00:00:00",y:cont11},
																											
																													]
																								  }];

																								  return done(null,output);


																			}); //11

																			}); //10
																			}); // 9
																			}); //8
																			}); //7
																			}); // 6



																			}); //5
																			}); //4
																			}); // 3
																									}); // 2

																								}); // 1
																					}); // 0

																			});

																									


					}


				else if(option.men == 1 && option.women == 1 && lista2.length > 0)
					{console.log("****  1  1 ****");

																							var output = [];

																							UserMobile.find({id: lista2, gender: 1}).exec(function(err,found_Records){
																								//console.log(found_Records);

																								var listamen = [];
																									for(var i = 0; i < found_Records.length; i++)
																									listamen.push(found_Records[i].id);

																								console.log(listamen);


																			if(listamen.length != 0){

																							var mcont0 = mcont1 =mcont2 = mcont3 = mcont4 = mcont5 = mcont6 = mcont7 = mcont8 = mcont9 = mcont10 = mcont11 = mcont12 = mcont13 = mcont14 = mcont15 = mcont16 = mcont17 = mcont18 = mcont19 = mcont20 = mcont21 = mcont22 = mcont23 = 0;
																						
																						var query0 = "select * FROM prueba_usuarios.history where starthour >= '00:00:00' and endhour <= '02:00:00' AND (";
																						for(var x = 0; x < listamen.length; x++)
																								query0  = query0 + " usermob = " + listamen[x] + " or" ; 
																						query0 = query0.substring(0, query0.length - 2);
																						query0 = query0 + ")";
																						//console.log(query0);

										

																						UserMobile.query(query0, function(err,foundRecords_0){

																						if(err){
																							console.log(err);
																							return done(err);
																						}
																						var mcont0 = foundRecords_0.length;


																							var query1 = "select * FROM prueba_usuarios.history where starthour >= '02:00:00' and endhour <= '04:00:00' AND (";
																							for(var x = 0; x < listamen.length; x++)
																								query1  = query1 + " usermob = " + listamen[x] + " or" ; 
																							query1 = query1.substring(0, query1.length - 2);
																							query1 = query1 + ")";
																							UserMobile.query(query1, function(err,foundRecords_1){

																								if(err){
																								console.log(err);
																								return done(err);
																								}
																							var mcont1 = foundRecords_1.length;



																								var query2 = "select * FROM prueba_usuarios.history where starthour >= '04:00:00' and endhour <='06:00:00' AND (";
																								for(var x = 0; x < listamen.length; x++)
																									query2  = query2 + " usermob = " + listamen[x] + " or" ; 
																								query2 = query2.substring(0, query2.length - 2);
																								query2 = query2 + ")";
																								UserMobile.query(query2, function(err,foundRecords_2){

																									if(err){
																									console.log(err);
																									return done(err);
																									}
																								var mcont2 = foundRecords_2.length;

																									var query3 = "select * FROM prueba_usuarios.history where starthour >= '06:00:00' and endhour <= '08:00:00' AND (";
																									for(var x = 0; x < listamen.length; x++)
																										query3  = query3 + " usermob = " + listamen[x] + " or" ; 
																									query3 = query3.substring(0, query3.length - 2);
																									query3 = query3 + ")";
																									UserMobile.query(query3, function(err,foundRecords_3){

																									if(err){
																									console.log(err);
																									return done(err);
																									}
																									var mcont3 = foundRecords_3.length;


																										var query4 = "select * FROM prueba_usuarios.history where starthour >= '08:00:00' and endhour <= '10:00:00' AND (";
																										for(var x = 0; x < listamen.length; x++)
																											query4  = query4 + " usermob = " + listamen[x] + " or" ; 
																										query4 = query4.substring(0, query4.length - 2);
																										query4 = query4 + ")";
																										UserMobile.query(query4, function(err,foundRecords_4){

																										if(err){
																										console.log(err);
																										return done(err);
																										}
																										var mcont4 = foundRecords_4.length;


																											var query5 = "select * FROM prueba_usuarios.history where starthour >= '10:00:00' and endhour <= '12:00:00' AND (";
																											for(var x = 0; x < listamen.length; x++)
																												query5  = query5 + " usermob = " + listamen[x] + " or" ; 
																											query5 = query5.substring(0, query5.length - 2);
																											query5 = query5 + ")";
																											UserMobile.query(query5, function(err,foundRecords_5){

																											if(err){
																											console.log(err);
																											return done(err);
																											}
																											var mcont5 = foundRecords_5.length;


																												var query6 = "select * FROM prueba_usuarios.history where starthour >= '12:00:00' and endhour <= '14:00:00' AND (";
																												for(var x = 0; x < listamen.length; x++)
																													query6  = query6 + " usermob = " + listamen[x] + " or" ; 
																												query6 = query6.substring(0, query6.length - 2);
																												query6 = query6 + ")";
																												UserMobile.query(query6, function(err,foundRecords_6){

																												if(err){
																												console.log(err);
																												return done(err);
																												}
																												var mcont6 = foundRecords_6.length;


																													var query7 = "select * FROM prueba_usuarios.history where starthour >= '14:00:00' and endhour <= '16:00:00' AND (";
																													for(var x = 0; x < listamen.length; x++)
																														query7  = query7 + " usermob = " + listamen[x] + " or" ; 
																													query7 = query7.substring(0, query7.length - 2);
																													query7 = query7 + ")";
																													UserMobile.query(query7, function(err,foundRecords_7){

																													if(err){
																													console.log(err);
																													return done(err);
																													}
																													var mcont7 = foundRecords_7.length;


																														var query8 = "select * FROM prueba_usuarios.history where starthour >= '16:00:00' and endhour <= '18:00:00' AND (";
																														for(var x = 0; x < listamen.length; x++)
																															query8  = query8 + " usermob = " + listamen[x] + " or" ; 
																														query8 = query8.substring(0, query8.length - 2);
																														query8 = query8 + ")";
																														UserMobile.query(query8, function(err,foundRecords_8){

																														if(err){
																														console.log(err);
																														return done(err);
																														}
																														var mcont8 = foundRecords_8.length;


																															var query9 = "select * FROM prueba_usuarios.history where starthour >= '18:00:00' and endhour <= '20:00:00' AND (";
																															for(var x = 0; x < listamen.length; x++)
																																query9  = query9 + " usermob = " + listamen[x] + " or" ; 
																															query9 = query9.substring(0, query9.length - 2);
																															query9 = query9 + ")";
																															UserMobile.query(query9, function(err,foundRecords_9){

																															if(err){
																															console.log(err);
																															return done(err);
																															}
																															var mcont9 = foundRecords_9.length;


																																var query10 = "select * FROM prueba_usuarios.history where starthour >= '20:00:00' and endhour <= '22:00:00' AND (";
																																for(var x = 0; x < listamen.length; x++)
																																	query10  = query10 + " usermob = " + listamen[x] + " or" ; 
																																query10 = query10.substring(0, query10.length - 2);
																																query10 = query10 + ")";
																																UserMobile.query(query10, function(err,foundRecords_10){

																																if(err){
																																console.log(err);
																																return done(err);
																																}
																																var mcont10 = foundRecords_10.length;


																																	var query11 = "select * FROM prueba_usuarios.history where starthour >= '22:00:00' and endhour <= '00:00:00' AND (";
																																	for(var x = 0; x < listamen.length; x++)
																																		query11  = query11 + " usermob = " + listamen[x] + " or" ; 
																																	query11 = query11.substring(0, query11.length - 2);
																																	query11 = query11 + ")";
																																	UserMobile.query(query11, function(err,foundRecords_11){

																																	if(err){
																																	console.log(err);
																																	return done(err);
																																	}
																																	var mcont11 = foundRecords_11.length;
																																				

																								var output1 = {
																														name: 'Hora de visualizacion (hombres)',
																														data: [ {name:"00:00:00 a 02:00:00",y:mcont0},
																																{name:"02:00:00 a 04:00:00",y:mcont1},
																																{name:"04:00:00 a 06:00:00",y:mcont2},
																																{name:"06:00:00 a 08:00:00",y:mcont3},
																																{name:"08:00:00 a 10:00:00",y:mcont4},
																																{name:"10:00:00 a 12:00:00",y:mcont5},
																																{name:"12:00:00 a 14:00:00",y:mcont6},
																																{name:"14:00:00 a 16:00:00",y:mcont7},
																																{name:"16:00:00 a 18:00:00",y:mcont8},
																																{name:"18:00:00 a 20:00:00",y:mcont9},
																																{name:"20:00:00 a 22:00:00",y:mcont10},
																																{name:"22:00:00 a 00:00:00",y:mcont11},
																														
																																]
																											  };

																											output.push(output1);


																							}); //11

																							}); //10
																							}); // 9
																							}); //8
																							}); //7
																							}); // 6



																							}); //5
																							}); //4
																							}); // 3
																													}); // 2

																												}); // 1
																									}); // 0


																									} /// if

																									else
																									{
																										var output1 = {
																														name: 'Hora de visualizacion (hombres)',
																														data: [ {name:"00:00:00 a 02:00:00",y:0},
																																{name:"02:00:00 a 04:00:00",y:0},
																																{name:"04:00:00 a 06:00:00",y:0},
																																{name:"06:00:00 a 08:00:00",y:0},
																																{name:"08:00:00 a 10:00:00",y:0},
																																{name:"10:00:00 a 12:00:00",y:0},
																																{name:"12:00:00 a 14:00:00",y:0},
																																{name:"14:00:00 a 16:00:00",y:0},
																																{name:"16:00:00 a 18:00:00",y:0},
																																{name:"18:00:00 a 20:00:00",y:0},
																																{name:"20:00:00 a 22:00:00",y:0},
																																{name:"22:00:00 a 00:00:00",y:0},
																														
																																]
																											  };

																											output.push(output1);


																									}
	
																							});
				

																																

																										
																				/***********************************/


																				UserMobile.find({id: lista2, gender: 2}).exec(function(err,found_Records){
																											//console.log(found_Records);

																											var listawomen = [];
																									for(var i = 0; i < found_Records.length; i++)
																									listawomen.push(found_Records[i].id);

																								console.log(listawomen);

																								if(listawomen.length != 0)
																					{
																							var cont2 = cont3 = cont4 = cont5 = cont6 = cont7 = cont8 = cont9 = cont10 = cont11 = cont12 = cont13 = cont14 = cont15 = cont16 = cont17 = cont18 = cont19 = cont20 = cont21 = cont22 = cont23 = 0;
																						
																						var query0 = "select * FROM prueba_usuarios.history where starthour >= '00:00:00' and endhour <= '02:00:00' AND (";
																						for(var x = 0; x < listawomen.length; x++)
																								query0  = query0 + " usermob = " + listawomen[x] + " or" ; 
																						query0 = query0.substring(0, query0.length - 2);
																						query0 = query0 + ")";
																						//console.log(query0);

																						UserMobile.query(query0, function(err,foundRecords_0){

																						if(err){
																							console.log(err);
																							return done(err);
																						}
																						var cont0 = foundRecords_0.length;


																							var query1 = "select * FROM prueba_usuarios.history where starthour >= '02:00:00' and endhour <= '04:00:00' AND (";
																							for(var x = 0; x < listawomen.length; x++)
																								query1  = query1 + " usermob = " + listawomen[x] + " or" ; 
																							query1 = query1.substring(0, query1.length - 2);
																							query1 = query1 + ")";
																							UserMobile.query(query1, function(err,foundRecords_1){

																								if(err){
																								console.log(err);
																								return done(err);
																								}
																							var cont1 = foundRecords_1.length;



																								var query2 = "select * FROM prueba_usuarios.history where starthour >= '04:00:00' and endhour <='06:00:00' AND (";
																								for(var x = 0; x < listawomen.length; x++)
																									query2  = query2 + " usermob = " + listawomen[x] + " or" ; 
																								query2 = query2.substring(0, query2.length - 2);
																								query2 = query2 + ")";
																								UserMobile.query(query2, function(err,foundRecords_2){

																									if(err){
																									console.log(err);
																									return done(err);
																									}
																								var cont2 = foundRecords_2.length;

																									var query3 = "select * FROM prueba_usuarios.history where starthour >= '06:00:00' and endhour <= '08:00:00' AND (";
																									for(var x = 0; x < listawomen.length; x++)
																										query3  = query3 + " usermob = " + listawomen[x] + " or" ; 
																									query3 = query3.substring(0, query3.length - 2);
																									query3 = query3 + ")";
																									UserMobile.query(query3, function(err,foundRecords_3){

																									if(err){
																									console.log(err);
																									return done(err);
																									}
																									var cont3 = foundRecords_3.length;


																										var query4 = "select * FROM prueba_usuarios.history where starthour >= '08:00:00' and endhour <= '10:00:00' AND (";
																										for(var x = 0; x < listawomen.length; x++)
																											query4  = query4 + " usermob = " + listawomen[x] + " or" ; 
																										query4 = query4.substring(0, query4.length - 2);
																										query4 = query4 + ")";
																										UserMobile.query(query4, function(err,foundRecords_4){

																										if(err){
																										console.log(err);
																										return done(err);
																										}
																										var cont4 = foundRecords_4.length;


																											var query5 = "select * FROM prueba_usuarios.history where starthour >= '10:00:00' and endhour <= '12:00:00' AND (";
																											for(var x = 0; x < listawomen.length; x++)
																												query5  = query5 + " usermob = " + listawomen[x] + " or" ; 
																											query5 = query5.substring(0, query5.length - 2);
																											query5 = query5 + ")";
																											UserMobile.query(query5, function(err,foundRecords_5){

																											if(err){
																											console.log(err);
																											return done(err);
																											}
																											var cont5 = foundRecords_5.length;


																												var query6 = "select * FROM prueba_usuarios.history where starthour >= '12:00:00' and endhour <= '14:00:00' AND (";
																												for(var x = 0; x < listawomen.length; x++)
																													query6  = query6 + " usermob = " + listawomen[x] + " or" ; 
																												query6 = query6.substring(0, query6.length - 2);
																												query6 = query6 + ")";
																												UserMobile.query(query6, function(err,foundRecords_6){

																												if(err){
																												console.log(err);
																												return done(err);
																												}
																												var cont6 = foundRecords_6.length;


																													var query7 = "select * FROM prueba_usuarios.history where starthour >= '14:00:00' and endhour <= '16:00:00' AND (";
																													for(var x = 0; x < listawomen.length; x++)
																														query7  = query7 + " usermob = " + listawomen[x] + " or" ; 
																													query7 = query7.substring(0, query7.length - 2);
																													query7 = query7 + ")";
																													UserMobile.query(query7, function(err,foundRecords_7){

																													if(err){
																													console.log(err);
																													return done(err);
																													}
																													var cont7 = foundRecords_7.length;


																														var query8 = "select * FROM prueba_usuarios.history where starthour >= '16:00:00' and endhour <= '18:00:00' AND (";
																														for(var x = 0; x < listawomen.length; x++)
																															query8  = query8 + " usermob = " + listawomen[x] + " or" ; 
																														query8 = query8.substring(0, query8.length - 2);
																														query8 = query8 + ")";
																														UserMobile.query(query8, function(err,foundRecords_8){

																														if(err){
																														console.log(err);
																														return done(err);
																														}
																														var cont8 = foundRecords_8.length;


																															var query9 = "select * FROM prueba_usuarios.history where starthour >= '18:00:00' and endhour <= '20:00:00' AND (";
																															for(var x = 0; x < listawomen.length; x++)
																																query9  = query9 + " usermob = " + listawomen[x] + " or" ; 
																															query9 = query9.substring(0, query9.length - 2);
																															query9 = query9 + ")";
																															UserMobile.query(query9, function(err,foundRecords_9){

																															if(err){
																															console.log(err);
																															return done(err);
																															}
																															var cont9 = foundRecords_9.length;


																																var query10 = "select * FROM prueba_usuarios.history where starthour >= '20:00:00' and endhour <= '22:00:00' AND (";
																																for(var x = 0; x < listawomen.length; x++)
																																	query10  = query10 + " usermob = " + listawomen[x] + " or" ; 
																																query10 = query10.substring(0, query10.length - 2);
																																query10 = query10 + ")";
																																UserMobile.query(query10, function(err,foundRecords_10){

																																if(err){
																																console.log(err);
																																return done(err);
																																}
																																var cont10 = foundRecords_10.length;


																																	var query11 = "select * FROM prueba_usuarios.history where starthour >= '22:00:00' and endhour <= '00:00:00' AND (";
																																	for(var x = 0; x < listawomen.length; x++)
																																		query11  = query11 + " usermob = " + listawomen[x] + " or" ; 
																																	query11 = query11.substring(0, query11.length - 2);
																																	query11 = query11 + ")";
																																	UserMobile.query(query11, function(err,foundRecords_11){

																																	if(err){
																																	console.log(err);
																																	return done(err);
																																	}
																																	var cont11 = foundRecords_11.length;
																																				

																								var output2 = {
																														name: 'Hora de visualizacion (mujeres)',
																														data: [ {name:"00:00:00 a 02:00:00",y:cont0},
																																{name:"02:00:00 a 04:00:00",y:cont1},
																																{name:"04:00:00 a 06:00:00",y:cont2},
																																{name:"06:00:00 a 08:00:00",y:cont3},
																																{name:"08:00:00 a 10:00:00",y:cont4},
																																{name:"10:00:00 a 12:00:00",y:cont5},
																																{name:"12:00:00 a 14:00:00",y:cont6},
																																{name:"14:00:00 a 16:00:00",y:cont7},
																																{name:"16:00:00 a 18:00:00",y:cont8},
																																{name:"18:00:00 a 20:00:00",y:cont9},
																																{name:"20:00:00 a 22:00:00",y:cont10},
																																{name:"22:00:00 a 00:00:00",y:cont11},
																														
																																]
																											  };

																											  output.push(output2);

																															  return done(null,output);


																					}); //11

																					}); //10
																					}); // 9
																					}); //8
																					}); //7
																					}); // 6



																					}); //5
																					}); //4
																					}); // 3
																											}); // 2

																										}); // 1
																							}); // 0
																							}
																							else
																							{
																								var output2 = {
																														name: 'Hora de visualizacion (mujeres)',
																														data: [ {name:"00:00:00 a 02:00:00",y:0},
																																{name:"02:00:00 a 04:00:00",y:0},
																																{name:"04:00:00 a 06:00:00",y:0},
																																{name:"06:00:00 a 08:00:00",y:0},
																																{name:"08:00:00 a 10:00:00",y:0},
																																{name:"10:00:00 a 12:00:00",y:0},
																																{name:"12:00:00 a 14:00:00",y:0},
																																{name:"14:00:00 a 16:00:00",y:0},
																																{name:"16:00:00 a 18:00:00",y:0},
																																{name:"18:00:00 a 20:00:00",y:0},
																																{name:"20:00:00 a 22:00:00",y:0},
																																{name:"22:00:00 a 00:00:00",y:0},
																														
																																]
																											  };

																											  output.push(output2);

																															  return done(null,output);

																							}


																					});






					


					} //    if men = 1 women = 1

				});   /****/

			}); /**/

	}

		
		else{
							/**/	Promotion.find({select : ['id'], where : {owner : option.owner, name : option.promo}}).exec(function(err,foundRecords){
										if(err){
											console.log(err);
											return done(err);
										}
										//console.log("Listado de ID");
										console.log(foundRecords);

										var lista = [];
										for(var i = 0; i < foundRecords.length; i++)
											lista.push(foundRecords[i].id);

											console.log("Listado ID");
											console.log(lista);

								/****/		History.find({promo: lista}).exec(function(err,found_Records_1){
											if(err){
												console.log(err);
												return done(err);
											}

											//console.log(found_Records_1);

											var lista2 = [];
											for(var i = 0; i < found_Records_1.length; i++)
												lista2.push(found_Records_1[i].usermob);

											
											console.log(lista2);

												var output = [
																		{
																		    name: 'Conteo de hombres',
																		    data: []
																		}, 
																			    
																		{
																			name: 'Conteo de mujeres',
																			data: []
																		 },
																	]
																	;


										if(option.men == 0 && option.women == 0 )
											{
												console.log("****  0  0 ****");
												var cont2 = cont3 = cont4 = cont5 = cont6 = cont7 = cont8 = cont9 = cont10 = cont11 = cont12 = cont13 = cont14 = cont15 = cont16 = cont17 = cont18 = cont19 = cont20 = cont21 = cont22 = cont23 = 0;

											var query0 = "select * FROM prueba_usuarios.history where starthour >= '00:00:00' and endhour <= '02:00:00' AND (";
											for(var x = 0; x < lista2.length; x++)
													query0  = query0 + " usermob = " + lista2[x] + " or" ; 
											query0 = query0.substring(0, query0.length - 2);
											query0 = query0 + ")";
											console.log(query0);

											UserMobile.query(query0, function(err,foundRecords_0){

											if(err){
												console.log(err);
												return done(err);
											}
											var cont0 = foundRecords_0.length;


												var query1 = "select * FROM prueba_usuarios.history where starthour >= '02:00:00' and endhour <= '04:00:00' AND (";
												for(var x = 0; x < lista2.length; x++)
													query1  = query1 + " usermob = " + lista2[x] + " or" ; 
												query1 = query1.substring(0, query1.length - 2);
												query1 = query1 + ")";
												UserMobile.query(query1, function(err,foundRecords_1){

													if(err){
													console.log(err);
													return done(err);
													}
												var cont1 = foundRecords_1.length;



													var query2 = "select * FROM prueba_usuarios.history where starthour >= '04:00:00' and endhour <='06:00:00' AND (";
													for(var x = 0; x < lista2.length; x++)
														query2  = query2 + " usermob = " + lista2[x] + " or" ; 
													query2 = query2.substring(0, query2.length - 2);
													query2 = query2 + ")";
													UserMobile.query(query2, function(err,foundRecords_2){

														if(err){
														console.log(err);
														return done(err);
														}
													var cont2 = foundRecords_2.length;

														var query3 = "select * FROM prueba_usuarios.history where starthour >= '06:00:00' and endhour <= '08:00:00' AND (";
														for(var x = 0; x < lista2.length; x++)
															query3  = query3 + " usermob = " + lista2[x] + " or" ; 
														query3 = query3.substring(0, query3.length - 2);
														query3 = query3 + ")";
														UserMobile.query(query3, function(err,foundRecords_3){

														if(err){
														console.log(err);
														return done(err);
														}
														var cont3 = foundRecords_3.length;


															var query4 = "select * FROM prueba_usuarios.history where starthour >= '08:00:00' and endhour <= '10:00:00' AND (";
															for(var x = 0; x < lista2.length; x++)
																query4  = query4 + " usermob = " + lista2[x] + " or" ; 
															query4 = query4.substring(0, query4.length - 2);
															query4 = query4 + ")";
															UserMobile.query(query4, function(err,foundRecords_4){

															if(err){
															console.log(err);
															return done(err);
															}
															var cont4 = foundRecords_4.length;


																var query5 = "select * FROM prueba_usuarios.history where starthour >= '10:00:00' and endhour <= '12:00:00' AND (";
																for(var x = 0; x < lista2.length; x++)
																	query5  = query5 + " usermob = " + lista2[x] + " or" ; 
																query5 = query5.substring(0, query5.length - 2);
																query5 = query5 + ")";
																UserMobile.query(query5, function(err,foundRecords_5){

																if(err){
																console.log(err);
																return done(err);
																}
																var cont5 = foundRecords_5.length;


																	var query6 = "select * FROM prueba_usuarios.history where starthour >= '12:00:00' and endhour <= '14:00:00' AND (";
																	for(var x = 0; x < lista2.length; x++)
																		query6  = query6 + " usermob = " + lista2[x] + " or" ; 
																	query6 = query6.substring(0, query6.length - 2);
																	query6 = query6 + ")";
																	UserMobile.query(query6, function(err,foundRecords_6){

																	if(err){
																	console.log(err);
																	return done(err);
																	}
																	var cont6 = foundRecords_6.length;


																		var query7 = "select * FROM prueba_usuarios.history where starthour >= '14:00:00' and endhour <= '16:00:00' AND (";
																		for(var x = 0; x < lista2.length; x++)
																			query7  = query7 + " usermob = " + lista2[x] + " or" ; 
																		query7 = query7.substring(0, query7.length - 2);
																		query7 = query7 + ")";
																		UserMobile.query(query7, function(err,foundRecords_7){

																		if(err){
																		console.log(err);
																		return done(err);
																		}
																		var cont7 = foundRecords_7.length;


																			var query8 = "select * FROM prueba_usuarios.history where starthour >= '16:00:00' and endhour <= '18:00:00' AND (";
																			for(var x = 0; x < lista2.length; x++)
																				query8  = query8 + " usermob = " + lista2[x] + " or" ; 
																			query8 = query8.substring(0, query8.length - 2);
																			query8 = query8 + ")";
																			UserMobile.query(query8, function(err,foundRecords_8){

																			if(err){
																			console.log(err);
																			return done(err);
																			}
																			var cont8 = foundRecords_8.length;


																				var query9 = "select * FROM prueba_usuarios.history where starthour >= '18:00:00' and endhour <= '20:00:00' AND (";
																				for(var x = 0; x < lista2.length; x++)
																					query9  = query9 + " usermob = " + lista2[x] + " or" ; 
																				query9 = query9.substring(0, query9.length - 2);
																				query9 = query9 + ")";
																				UserMobile.query(query9, function(err,foundRecords_9){

																				if(err){
																				console.log(err);
																				return done(err);
																				}
																				var cont9 = foundRecords_9.length;


																					var query10 = "select * FROM prueba_usuarios.history where starthour >= '20:00:00' and endhour <= '22:00:00' AND (";
																					for(var x = 0; x < lista2.length; x++)
																						query10  = query10 + " usermob = " + lista2[x] + " or" ; 
																					query10 = query10.substring(0, query10.length - 2);
																					query10 = query10 + ")";
																					UserMobile.query(query10, function(err,foundRecords_10){

																					if(err){
																					console.log(err);
																					return done(err);
																					}
																					var cont10 = foundRecords_10.length;


																						var query11 = "select * FROM prueba_usuarios.history where starthour >= '22:00:00' and endhour <= '00:00:00' AND (";
																						for(var x = 0; x < lista2.length; x++)
																							query11  = query11 + " usermob = " + lista2[x] + " or" ; 
																						query11 = query11.substring(0, query11.length - 2);
																						query11 = query11 + ")";
																						UserMobile.query(query11, function(err,foundRecords_11){

																						if(err){
																						console.log(err);
																						return done(err);
																						}
																						var cont11 = foundRecords_11.length;
																									

													var output = [{
																			name: 'Hora de visualizacion',
																			data: [ {name:"00:00:00 a 02:00:00",y:cont0},
																					{name:"02:00:00 a 04:00:00",y:cont1},
																					{name:"04:00:00 a 06:00:00",y:cont2},
																					{name:"06:00:00 a 08:00:00",y:cont3},
																					{name:"08:00:00 a 10:00:00",y:cont4},
																					{name:"10:00:00 a 12:00:00",y:cont5},
																					{name:"12:00:00 a 14:00:00",y:cont6},
																					{name:"14:00:00 a 16:00:00",y:cont7},
																					{name:"16:00:00 a 18:00:00",y:cont8},
																					{name:"18:00:00 a 20:00:00",y:cont9},
																					{name:"20:00:00 a 22:00:00",y:cont10},
																					{name:"22:00:00 a 00:00:00",y:cont11},
																			
																					]
																  }];
																  						console.log(cont0, cont1, cont2, cont3, cont4, cont5, cont6, cont7, cont8, cont9, cont10, cont11, cont12,output);
																					  return done(null,output);


											}); //11

											}); //10
											}); // 9
											}); //8
											}); //7
											}); // 6



											}); //5
											}); //4
											}); // 3
																	}); // 2

																}); // 1
													}); // 0


												

											}
											
										else if(option.men == 1 && option.women == 0 && lista2.length > 0)
											{ console.log("****  1  0 ****");

																			UserMobile.find({id: lista2, gender: 1}).exec(function(err,found_Records){
																				//console.log(found_Records);

																				var listamen = [];
																					for(var i = 0; i < found_Records.length; i++)
																					listamen.push(found_Records[i].id);

																				console.log(listamen);

																			var mcont0 = mcont1 = mcont2 = mcont3 = mcont4 = mcont5 = mcont6 = mcont7 = mcont8 = mcont9 = mcont10 = mcont11 = mcont12 = mcont13 = mcont14 = mcont15 = mcont16 = mcont17 = mcont18 = mcont19 = mcont20 = mcont21 = mcont22 = mcont23 = 0;
																		
																		var query0 = "select * FROM prueba_usuarios.history where starthour >= '00:00:00' and endhour <= '02:00:00' AND (";
																		for(var x = 0; x < listamen.length; x++)
																				query0  = query0 + " usermob = " + listamen[x] + " or" ; 
																		query0 = query0.substring(0, query0.length - 2);
																		query0 = query0 + ")";
																		console.log(query0);

																		if(listamen.length == 0){


																									var output = [{
																																	name: 'Hora de visualizacion (hombres)',
																																	data: [ {name:"00:00:00 a 02:00:00",y:mcont0},
																																			{name:"02:00:00 a 04:00:00",y:mcont1},
																																			{name:"04:00:00 a 06:00:00",y:mcont2},
																																			{name:"06:00:00 a 08:00:00",y:mcont3},
																																			{name:"08:00:00 a 10:00:00",y:mcont4},
																																			{name:"10:00:00 a 12:00:00",y:mcont5},
																																			{name:"12:00:00 a 14:00:00",y:mcont6},
																																			{name:"14:00:00 a 16:00:00",y:mcont7},
																																			{name:"16:00:00 a 18:00:00",y:mcont8},
																																			{name:"18:00:00 a 20:00:00",y:mcont9},
																																			{name:"20:00:00 a 22:00:00",y:mcont10},
																																			{name:"22:00:00 a 00:00:00",y:mcont11},
																																	
																																			]
																														  }];

																														  return done(null,output); }



																		UserMobile.query(query0, function(err,foundRecords_0){

																		if(err){
																			console.log(err);
																			return done(err);
																		}
																		var mcont0 = foundRecords_0.length;


																			var query1 = "select * FROM prueba_usuarios.history where starthour >= '02:00:00' and endhour <= '04:00:00' AND (";
																			for(var x = 0; x < listamen.length; x++)
																				query1  = query1 + " usermob = " + listamen[x] + " or" ; 
																			query1 = query1.substring(0, query1.length - 2);
																			query1 = query1 + ")";
																			UserMobile.query(query1, function(err,foundRecords_1){

																				if(err){
																				console.log(err);
																				return done(err);
																				}
																			var mcont1 = foundRecords_1.length;



																				var query2 = "select * FROM prueba_usuarios.history where starthour >= '04:00:00' and endhour <='06:00:00' AND (";
																				for(var x = 0; x < listamen.length; x++)
																					query2  = query2 + " usermob = " + listamen[x] + " or" ; 
																				query2 = query2.substring(0, query2.length - 2);
																				query2 = query2 + ")";
																				UserMobile.query(query2, function(err,foundRecords_2){

																					if(err){
																					console.log(err);
																					return done(err);
																					}
																				var mcont2 = foundRecords_2.length;

																					var query3 = "select * FROM prueba_usuarios.history where starthour >= '06:00:00' and endhour <= '08:00:00' AND (";
																					for(var x = 0; x < listamen.length; x++)
																						query3  = query3 + " usermob = " + listamen[x] + " or" ; 
																					query3 = query3.substring(0, query3.length - 2);
																					query3 = query3 + ")";
																					UserMobile.query(query3, function(err,foundRecords_3){

																					if(err){
																					console.log(err);
																					return done(err);
																					}
																					var mcont3 = foundRecords_3.length;


																						var query4 = "select * FROM prueba_usuarios.history where starthour >= '08:00:00' and endhour <= '10:00:00' AND (";
																						for(var x = 0; x < listamen.length; x++)
																							query4  = query4 + " usermob = " + listamen[x] + " or" ; 
																						query4 = query4.substring(0, query4.length - 2);
																						query4 = query4 + ")";
																						UserMobile.query(query4, function(err,foundRecords_4){

																						if(err){
																						console.log(err);
																						return done(err);
																						}
																						var mcont4 = foundRecords_4.length;


																							var query5 = "select * FROM prueba_usuarios.history where starthour >= '10:00:00' and endhour <= '12:00:00' AND (";
																							for(var x = 0; x < listamen.length; x++)
																								query5  = query5 + " usermob = " + listamen[x] + " or" ; 
																							query5 = query5.substring(0, query5.length - 2);
																							query5 = query5 + ")";
																							UserMobile.query(query5, function(err,foundRecords_5){

																							if(err){
																							console.log(err);
																							return done(err);
																							}
																							var mcont5 = foundRecords_5.length;


																								var query6 = "select * FROM prueba_usuarios.history where starthour >= '12:00:00' and endhour <= '14:00:00' AND (";
																								for(var x = 0; x < listamen.length; x++)
																									query6  = query6 + " usermob = " + listamen[x] + " or" ; 
																								query6 = query6.substring(0, query6.length - 2);
																								query6 = query6 + ")";
																								UserMobile.query(query6, function(err,foundRecords_6){

																								if(err){
																								console.log(err);
																								return done(err);
																								}
																								var mcont6 = foundRecords_6.length;


																									var query7 = "select * FROM prueba_usuarios.history where starthour >= '14:00:00' and endhour <= '16:00:00' AND (";
																									for(var x = 0; x < listamen.length; x++)
																										query7  = query7 + " usermob = " + listamen[x] + " or" ; 
																									query7 = query7.substring(0, query7.length - 2);
																									query7 = query7 + ")";
																									UserMobile.query(query7, function(err,foundRecords_7){

																									if(err){
																									console.log(err);
																									return done(err);
																									}
																									var mcont7 = foundRecords_7.length;


																										var query8 = "select * FROM prueba_usuarios.history where starthour >= '16:00:00' and endhour <= '18:00:00' AND (";
																										for(var x = 0; x < listamen.length; x++)
																											query8  = query8 + " usermob = " + listamen[x] + " or" ; 
																										query8 = query8.substring(0, query8.length - 2);
																										query8 = query8 + ")";
																										UserMobile.query(query8, function(err,foundRecords_8){

																										if(err){
																										console.log(err);
																										return done(err);
																										}
																										var mcont8 = foundRecords_8.length;


																											var query9 = "select * FROM prueba_usuarios.history where starthour >= '18:00:00' and endhour <= '20:00:00' AND (";
																											for(var x = 0; x < listamen.length; x++)
																												query9  = query9 + " usermob = " + listamen[x] + " or" ; 
																											query9 = query9.substring(0, query9.length - 2);
																											query9 = query9 + ")";
																											UserMobile.query(query9, function(err,foundRecords_9){

																											if(err){
																											console.log(err);
																											return done(err);
																											}
																											var mcont9 = foundRecords_9.length;


																												var query10 = "select * FROM prueba_usuarios.history where starthour >= '20:00:00' and endhour <= '22:00:00' AND (";
																												for(var x = 0; x < listamen.length; x++)
																													query10  = query10 + " usermob = " + listamen[x] + " or" ; 
																												query10 = query10.substring(0, query10.length - 2);
																												query10 = query10 + ")";
																												UserMobile.query(query10, function(err,foundRecords_10){

																												if(err){
																												console.log(err);
																												return done(err);
																												}
																												var mcont10 = foundRecords_10.length;


																													var query11 = "select * FROM prueba_usuarios.history where starthour >= '22:00:00' and endhour <= '00:00:00' AND (";
																													for(var x = 0; x < listamen.length; x++)
																														query11  = query11 + " usermob = " + listamen[x] + " or" ; 
																													query11 = query11.substring(0, query11.length - 2);
																													query11 = query11 + ")";
																													UserMobile.query(query11, function(err,foundRecords_11){

																													if(err){
																													console.log(err);
																													return done(err);
																													}
																													var mcont11 = foundRecords_11.length;
																																

																				var output = [{
																										name: 'Hora de visualizacion (hombres)',
																										data: [ {name:"00:00:00 a 02:00:00",y:mcont0},
																												{name:"02:00:00 a 04:00:00",y:mcont1},
																												{name:"04:00:00 a 06:00:00",y:mcont2},
																												{name:"06:00:00 a 08:00:00",y:mcont3},
																												{name:"08:00:00 a 10:00:00",y:mcont4},
																												{name:"10:00:00 a 12:00:00",y:mcont5},
																												{name:"12:00:00 a 14:00:00",y:mcont6},
																												{name:"14:00:00 a 16:00:00",y:mcont7},
																												{name:"16:00:00 a 18:00:00",y:mcont8},
																												{name:"18:00:00 a 20:00:00",y:mcont9},
																												{name:"20:00:00 a 22:00:00",y:mcont10},
																												{name:"22:00:00 a 00:00:00",y:mcont11},
																										
																												]
																							  }];

																												  return done(null,output);


																		}); //11

																		}); //10
																		}); // 9
																		}); //8
																		}); //7
																		}); // 6



																		}); //5
																		}); //4
																		}); // 3
																								}); // 2

																							}); // 1
																				}); // 0

																		});

																								


											}

										else if(option.men == 0 && option.women == 1 && lista2.length > 0)
											{console.log("****  0  1 ****");

																										UserMobile.find({id: lista2, gender: 2}).exec(function(err,found_Records){
																											//console.log(found_Records);

																											var listamen = [];
																												for(var i = 0; i < found_Records.length; i++)
																												listamen.push(found_Records[i].id);

																											console.log(listamen);

																										var cont0 = cont1 = cont2 = cont3 = cont4 = cont5 = cont6 = cont7 = cont8 = cont9 = cont10 = cont11 = cont12 = cont13 = cont14 = cont15 = cont16 = cont17 = cont18 = cont19 = cont20 = cont21 = cont22 = cont23 = 0;
																									
																									var query0 = "select * FROM prueba_usuarios.history where starthour >= '00:00:00' and endhour <= '02:00:00' AND (";
																									for(var x = 0; x < listamen.length; x++)
																											query0  = query0 + " usermob = " + listamen[x] + " or" ; 
																									query0 = query0.substring(0, query0.length - 2);
																									query0 = query0 + ")";
																									console.log(query0);

																								if(listamen.length == 0){
																									var output = [{
																																	name: 'Hora de visualizacion (mujeres)',
																																	data: [ {name:"00:00:00 a 02:00:00",y:cont0},
																																			{name:"02:00:00 a 04:00:00",y:cont1},
																																			{name:"04:00:00 a 06:00:00",y:cont2},
																																			{name:"06:00:00 a 08:00:00",y:cont3},
																																			{name:"08:00:00 a 10:00:00",y:cont4},
																																			{name:"10:00:00 a 12:00:00",y:cont5},
																																			{name:"12:00:00 a 14:00:00",y:cont6},
																																			{name:"14:00:00 a 16:00:00",y:cont7},
																																			{name:"16:00:00 a 18:00:00",y:cont8},
																																			{name:"18:00:00 a 20:00:00",y:cont9},
																																			{name:"20:00:00 a 22:00:00",y:cont10},
																																			{name:"22:00:00 a 00:00:00",y:cont11},
																																	
																																			]
																														  }];

																														  return done(null,output); }


																									UserMobile.query(query0, function(err,foundRecords_0){

																									if(err){
																										console.log(err);
																										return done(err);
																									}
																									var cont0 = foundRecords_0.length;


																										var query1 = "select * FROM prueba_usuarios.history where starthour >= '02:00:00' and endhour <= '04:00:00' AND (";
																										for(var x = 0; x < listamen.length; x++)
																											query1  = query1 + " usermob = " + listamen[x] + " or" ; 
																										query1 = query1.substring(0, query1.length - 2);
																										query1 = query1 + ")";
																										UserMobile.query(query1, function(err,foundRecords_1){

																											if(err){
																											console.log(err);
																											return done(err);
																											}
																										var cont1 = foundRecords_1.length;



																											var query2 = "select * FROM prueba_usuarios.history where starthour >= '04:00:00' and endhour <='06:00:00' AND (";
																											for(var x = 0; x < listamen.length; x++)
																												query2  = query2 + " usermob = " + listamen[x] + " or" ; 
																											query2 = query2.substring(0, query2.length - 2);
																											query2 = query2 + ")";
																											UserMobile.query(query2, function(err,foundRecords_2){

																												if(err){
																												console.log(err);
																												return done(err);
																												}
																											var cont2 = foundRecords_2.length;

																												var query3 = "select * FROM prueba_usuarios.history where starthour >= '06:00:00' and endhour <= '08:00:00' AND (";
																												for(var x = 0; x < listamen.length; x++)
																													query3  = query3 + " usermob = " + listamen[x] + " or" ; 
																												query3 = query3.substring(0, query3.length - 2);
																												query3 = query3 + ")";
																												UserMobile.query(query3, function(err,foundRecords_3){

																												if(err){
																												console.log(err);
																												return done(err);
																												}
																												var cont3 = foundRecords_3.length;


																													var query4 = "select * FROM prueba_usuarios.history where starthour >= '08:00:00' and endhour <= '10:00:00' AND (";
																													for(var x = 0; x < listamen.length; x++)
																														query4  = query4 + " usermob = " + listamen[x] + " or" ; 
																													query4 = query4.substring(0, query4.length - 2);
																													query4 = query4 + ")";
																													UserMobile.query(query4, function(err,foundRecords_4){

																													if(err){
																													console.log(err);
																													return done(err);
																													}
																													var cont4 = foundRecords_4.length;


																														var query5 = "select * FROM prueba_usuarios.history where starthour >= '10:00:00' and endhour <= '12:00:00' AND (";
																														for(var x = 0; x < listamen.length; x++)
																															query5  = query5 + " usermob = " + listamen[x] + " or" ; 
																														query5 = query5.substring(0, query5.length - 2);
																														query5 = query5 + ")";
																														UserMobile.query(query5, function(err,foundRecords_5){

																														if(err){
																														console.log(err);
																														return done(err);
																														}
																														var cont5 = foundRecords_5.length;


																															var query6 = "select * FROM prueba_usuarios.history where starthour >= '12:00:00' and endhour <= '14:00:00' AND (";
																															for(var x = 0; x < listamen.length; x++)
																																query6  = query6 + " usermob = " + listamen[x] + " or" ; 
																															query6 = query6.substring(0, query6.length - 2);
																															query6 = query6 + ")";
																															UserMobile.query(query6, function(err,foundRecords_6){

																															if(err){
																															console.log(err);
																															return done(err);
																															}
																															var cont6 = foundRecords_6.length;


																																var query7 = "select * FROM prueba_usuarios.history where starthour >= '14:00:00' and endhour <= '16:00:00' AND (";
																																for(var x = 0; x < listamen.length; x++)
																																	query7  = query7 + " usermob = " + listamen[x] + " or" ; 
																																query7 = query7.substring(0, query7.length - 2);
																																query7 = query7 + ")";
																																UserMobile.query(query7, function(err,foundRecords_7){

																																if(err){
																																console.log(err);
																																return done(err);
																																}
																																var cont7 = foundRecords_7.length;


																																	var query8 = "select * FROM prueba_usuarios.history where starthour >= '16:00:00' and endhour <= '18:00:00' AND (";
																																	for(var x = 0; x < listamen.length; x++)
																																		query8  = query8 + " usermob = " + listamen[x] + " or" ; 
																																	query8 = query8.substring(0, query8.length - 2);
																																	query8 = query8 + ")";
																																	UserMobile.query(query8, function(err,foundRecords_8){

																																	if(err){
																																	console.log(err);
																																	return done(err);
																																	}
																																	var cont8 = foundRecords_8.length;


																																		var query9 = "select * FROM prueba_usuarios.history where starthour >= '18:00:00' and endhour <= '20:00:00' AND (";
																																		for(var x = 0; x < listamen.length; x++)
																																			query9  = query9 + " usermob = " + listamen[x] + " or" ; 
																																		query9 = query9.substring(0, query9.length - 2);
																																		query9 = query9 + ")";
																																		UserMobile.query(query9, function(err,foundRecords_9){

																																		if(err){
																																		console.log(err);
																																		return done(err);
																																		}
																																		var cont9 = foundRecords_9.length;


																																			var query10 = "select * FROM prueba_usuarios.history where starthour >= '20:00:00' and endhour <= '22:00:00' AND (";
																																			for(var x = 0; x < listamen.length; x++)
																																				query10  = query10 + " usermob = " + listamen[x] + " or" ; 
																																			query10 = query10.substring(0, query10.length - 2);
																																			query10 = query10 + ")";
																																			UserMobile.query(query10, function(err,foundRecords_10){

																																			if(err){
																																			console.log(err);
																																			return done(err);
																																			}
																																			var cont10 = foundRecords_10.length;


																																				var query11 = "select * FROM prueba_usuarios.history where starthour >= '22:00:00' and endhour <= '00:00:00' AND (";
																																				for(var x = 0; x < listamen.length; x++)
																																					query11  = query11 + " usermob = " + listamen[x] + " or" ; 
																																				query11 = query11.substring(0, query11.length - 2);
																																				query11 = query11 + ")";
																																				UserMobile.query(query11, function(err,foundRecords_11){

																																				if(err){
																																				console.log(err);
																																				return done(err);
																																				}
																																				var cont11 = foundRecords_11.length;
																																							

																											var output = [{
																																	name: 'Hora de visualizacion (mujeres)',
																																	data: [ {name:"00:00:00 a 02:00:00",y:cont0},
																																			{name:"02:00:00 a 04:00:00",y:cont1},
																																			{name:"04:00:00 a 06:00:00",y:cont2},
																																			{name:"06:00:00 a 08:00:00",y:cont3},
																																			{name:"08:00:00 a 10:00:00",y:cont4},
																																			{name:"10:00:00 a 12:00:00",y:cont5},
																																			{name:"12:00:00 a 14:00:00",y:cont6},
																																			{name:"14:00:00 a 16:00:00",y:cont7},
																																			{name:"16:00:00 a 18:00:00",y:cont8},
																																			{name:"18:00:00 a 20:00:00",y:cont9},
																																			{name:"20:00:00 a 22:00:00",y:cont10},
																																			{name:"22:00:00 a 00:00:00",y:cont11},
																																	
																																			]
																														  }];

																														  return done(null,output);


																									}); //11

																									}); //10
																									}); // 9
																									}); //8
																									}); //7
																									}); // 6



																									}); //5
																									}); //4
																									}); // 3
																															}); // 2

																														}); // 1
																											}); // 0

																									});

																															


											}


										else if(option.men == 1 && option.women == 1 && lista2.length > 0)
											{console.log("****  1  1 ****");

																													var output = [];

																													UserMobile.find({id: lista2, gender: 1}).exec(function(err,found_Records){
																														//console.log(found_Records);

																														var listamen = [];
																															for(var i = 0; i < found_Records.length; i++)
																															listamen.push(found_Records[i].id);

																														console.log(listamen);


																									if(listamen.length != 0){

																													var mcont0 = mcont1 =mcont2 = mcont3 = mcont4 = mcont5 = mcont6 = mcont7 = mcont8 = mcont9 = mcont10 = mcont11 = mcont12 = mcont13 = mcont14 = mcont15 = mcont16 = mcont17 = mcont18 = mcont19 = mcont20 = mcont21 = mcont22 = mcont23 = 0;
																												
																												var query0 = "select * FROM prueba_usuarios.history where starthour >= '00:00:00' and endhour <= '02:00:00' AND (";
																												for(var x = 0; x < listamen.length; x++)
																														query0  = query0 + " usermob = " + listamen[x] + " or" ; 
																												query0 = query0.substring(0, query0.length - 2);
																												query0 = query0 + ")";
																												//console.log(query0);

																

																												UserMobile.query(query0, function(err,foundRecords_0){

																												if(err){
																													console.log(err);
																													return done(err);
																												}
																												var mcont0 = foundRecords_0.length;


																													var query1 = "select * FROM prueba_usuarios.history where starthour >= '02:00:00' and endhour <= '04:00:00' AND (";
																													for(var x = 0; x < listamen.length; x++)
																														query1  = query1 + " usermob = " + listamen[x] + " or" ; 
																													query1 = query1.substring(0, query1.length - 2);
																													query1 = query1 + ")";
																													UserMobile.query(query1, function(err,foundRecords_1){

																														if(err){
																														console.log(err);
																														return done(err);
																														}
																													var mcont1 = foundRecords_1.length;



																														var query2 = "select * FROM prueba_usuarios.history where starthour >= '04:00:00' and endhour <='06:00:00' AND (";
																														for(var x = 0; x < listamen.length; x++)
																															query2  = query2 + " usermob = " + listamen[x] + " or" ; 
																														query2 = query2.substring(0, query2.length - 2);
																														query2 = query2 + ")";
																														UserMobile.query(query2, function(err,foundRecords_2){

																															if(err){
																															console.log(err);
																															return done(err);
																															}
																														var mcont2 = foundRecords_2.length;

																															var query3 = "select * FROM prueba_usuarios.history where starthour >= '06:00:00' and endhour <= '08:00:00' AND (";
																															for(var x = 0; x < listamen.length; x++)
																																query3  = query3 + " usermob = " + listamen[x] + " or" ; 
																															query3 = query3.substring(0, query3.length - 2);
																															query3 = query3 + ")";
																															UserMobile.query(query3, function(err,foundRecords_3){

																															if(err){
																															console.log(err);
																															return done(err);
																															}
																															var mcont3 = foundRecords_3.length;


																																var query4 = "select * FROM prueba_usuarios.history where starthour >= '08:00:00' and endhour <= '10:00:00' AND (";
																																for(var x = 0; x < listamen.length; x++)
																																	query4  = query4 + " usermob = " + listamen[x] + " or" ; 
																																query4 = query4.substring(0, query4.length - 2);
																																query4 = query4 + ")";
																																UserMobile.query(query4, function(err,foundRecords_4){

																																if(err){
																																console.log(err);
																																return done(err);
																																}
																																var mcont4 = foundRecords_4.length;


																																	var query5 = "select * FROM prueba_usuarios.history where starthour >= '10:00:00' and endhour <= '12:00:00' AND (";
																																	for(var x = 0; x < listamen.length; x++)
																																		query5  = query5 + " usermob = " + listamen[x] + " or" ; 
																																	query5 = query5.substring(0, query5.length - 2);
																																	query5 = query5 + ")";
																																	UserMobile.query(query5, function(err,foundRecords_5){

																																	if(err){
																																	console.log(err);
																																	return done(err);
																																	}
																																	var mcont5 = foundRecords_5.length;


																																		var query6 = "select * FROM prueba_usuarios.history where starthour >= '12:00:00' and endhour <= '14:00:00' AND (";
																																		for(var x = 0; x < listamen.length; x++)
																																			query6  = query6 + " usermob = " + listamen[x] + " or" ; 
																																		query6 = query6.substring(0, query6.length - 2);
																																		query6 = query6 + ")";
																																		UserMobile.query(query6, function(err,foundRecords_6){

																																		if(err){
																																		console.log(err);
																																		return done(err);
																																		}
																																		var mcont6 = foundRecords_6.length;


																																			var query7 = "select * FROM prueba_usuarios.history where starthour >= '14:00:00' and endhour <= '16:00:00' AND (";
																																			for(var x = 0; x < listamen.length; x++)
																																				query7  = query7 + " usermob = " + listamen[x] + " or" ; 
																																			query7 = query7.substring(0, query7.length - 2);
																																			query7 = query7 + ")";
																																			UserMobile.query(query7, function(err,foundRecords_7){

																																			if(err){
																																			console.log(err);
																																			return done(err);
																																			}
																																			var mcont7 = foundRecords_7.length;


																																				var query8 = "select * FROM prueba_usuarios.history where starthour >= '16:00:00' and endhour <= '18:00:00' AND (";
																																				for(var x = 0; x < listamen.length; x++)
																																					query8  = query8 + " usermob = " + listamen[x] + " or" ; 
																																				query8 = query8.substring(0, query8.length - 2);
																																				query8 = query8 + ")";
																																				UserMobile.query(query8, function(err,foundRecords_8){

																																				if(err){
																																				console.log(err);
																																				return done(err);
																																				}
																																				var mcont8 = foundRecords_8.length;


																																					var query9 = "select * FROM prueba_usuarios.history where starthour >= '18:00:00' and endhour <= '20:00:00' AND (";
																																					for(var x = 0; x < listamen.length; x++)
																																						query9  = query9 + " usermob = " + listamen[x] + " or" ; 
																																					query9 = query9.substring(0, query9.length - 2);
																																					query9 = query9 + ")";
																																					UserMobile.query(query9, function(err,foundRecords_9){

																																					if(err){
																																					console.log(err);
																																					return done(err);
																																					}
																																					var mcont9 = foundRecords_9.length;


																																						var query10 = "select * FROM prueba_usuarios.history where starthour >= '20:00:00' and endhour <= '22:00:00' AND (";
																																						for(var x = 0; x < listamen.length; x++)
																																							query10  = query10 + " usermob = " + listamen[x] + " or" ; 
																																						query10 = query10.substring(0, query10.length - 2);
																																						query10 = query10 + ")";
																																						UserMobile.query(query10, function(err,foundRecords_10){

																																						if(err){
																																						console.log(err);
																																						return done(err);
																																						}
																																						var mcont10 = foundRecords_10.length;


																																							var query11 = "select * FROM prueba_usuarios.history where starthour >= '22:00:00' and endhour <= '00:00:00' AND (";
																																							for(var x = 0; x < listamen.length; x++)
																																								query11  = query11 + " usermob = " + listamen[x] + " or" ; 
																																							query11 = query11.substring(0, query11.length - 2);
																																							query11 = query11 + ")";
																																							UserMobile.query(query11, function(err,foundRecords_11){

																																							if(err){
																																							console.log(err);
																																							return done(err);
																																							}
																																							var mcont11 = foundRecords_11.length;
																																										

																														var output1 = {
																																				name: 'Hora de visualizacion (hombres)',
																																				data: [ {name:"00:00:00 a 02:00:00",y:mcont0},
																																						{name:"02:00:00 a 04:00:00",y:mcont1},
																																						{name:"04:00:00 a 06:00:00",y:mcont2},
																																						{name:"06:00:00 a 08:00:00",y:mcont3},
																																						{name:"08:00:00 a 10:00:00",y:mcont4},
																																						{name:"10:00:00 a 12:00:00",y:mcont5},
																																						{name:"12:00:00 a 14:00:00",y:mcont6},
																																						{name:"14:00:00 a 16:00:00",y:mcont7},
																																						{name:"16:00:00 a 18:00:00",y:mcont8},
																																						{name:"18:00:00 a 20:00:00",y:mcont9},
																																						{name:"20:00:00 a 22:00:00",y:mcont10},
																																						{name:"22:00:00 a 00:00:00",y:mcont11},
																																				
																																						]
																																	  };

																																	output.push(output1);


																													}); //11

																													}); //10
																													}); // 9
																													}); //8
																													}); //7
																													}); // 6



																													}); //5
																													}); //4
																													}); // 3
																																			}); // 2

																																		}); // 1
																															}); // 0


																															} /// if

																															else
																															{
																																var output1 = {
																																				name: 'Hora de visualizacion (hombres)',
																																				data: [ {name:"00:00:00 a 02:00:00",y:0},
																																						{name:"02:00:00 a 04:00:00",y:0},
																																						{name:"04:00:00 a 06:00:00",y:0},
																																						{name:"06:00:00 a 08:00:00",y:0},
																																						{name:"08:00:00 a 10:00:00",y:0},
																																						{name:"10:00:00 a 12:00:00",y:0},
																																						{name:"12:00:00 a 14:00:00",y:0},
																																						{name:"14:00:00 a 16:00:00",y:0},
																																						{name:"16:00:00 a 18:00:00",y:0},
																																						{name:"18:00:00 a 20:00:00",y:0},
																																						{name:"20:00:00 a 22:00:00",y:0},
																																						{name:"22:00:00 a 00:00:00",y:0},
																																				
																																						]
																																	  };

																																	output.push(output1);


																															}
							
																													});
										

																																						

																																
																										/***********************************/


																										UserMobile.find({id: lista2, gender: 2}).exec(function(err,found_Records){
																																	//console.log(found_Records);

																																	var listawomen = [];
																															for(var i = 0; i < found_Records.length; i++)
																															listawomen.push(found_Records[i].id);

																														console.log(listawomen);

																														if(listawomen.length != 0)
																											{
																													var cont2 = cont3 = cont4 = cont5 = cont6 = cont7 = cont8 = cont9 = cont10 = cont11 = cont12 = cont13 = cont14 = cont15 = cont16 = cont17 = cont18 = cont19 = cont20 = cont21 = cont22 = cont23 = 0;
																												
																												var query0 = "select * FROM prueba_usuarios.history where starthour >= '00:00:00' and endhour <= '02:00:00' AND (";
																												for(var x = 0; x < listawomen.length; x++)
																														query0  = query0 + " usermob = " + listawomen[x] + " or" ; 
																												query0 = query0.substring(0, query0.length - 2);
																												query0 = query0 + ")";
																												//console.log(query0);

																												UserMobile.query(query0, function(err,foundRecords_0){

																												if(err){
																													console.log(err);
																													return done(err);
																												}
																												var cont0 = foundRecords_0.length;


																													var query1 = "select * FROM prueba_usuarios.history where starthour >= '02:00:00' and endhour <= '04:00:00' AND (";
																													for(var x = 0; x < listawomen.length; x++)
																														query1  = query1 + " usermob = " + listawomen[x] + " or" ; 
																													query1 = query1.substring(0, query1.length - 2);
																													query1 = query1 + ")";
																													UserMobile.query(query1, function(err,foundRecords_1){

																														if(err){
																														console.log(err);
																														return done(err);
																														}
																													var cont1 = foundRecords_1.length;



																														var query2 = "select * FROM prueba_usuarios.history where starthour >= '04:00:00' and endhour <='06:00:00' AND (";
																														for(var x = 0; x < listawomen.length; x++)
																															query2  = query2 + " usermob = " + listawomen[x] + " or" ; 
																														query2 = query2.substring(0, query2.length - 2);
																														query2 = query2 + ")";
																														UserMobile.query(query2, function(err,foundRecords_2){

																															if(err){
																															console.log(err);
																															return done(err);
																															}
																														var cont2 = foundRecords_2.length;

																															var query3 = "select * FROM prueba_usuarios.history where starthour >= '06:00:00' and endhour <= '08:00:00' AND (";
																															for(var x = 0; x < listawomen.length; x++)
																																query3  = query3 + " usermob = " + listawomen[x] + " or" ; 
																															query3 = query3.substring(0, query3.length - 2);
																															query3 = query3 + ")";
																															UserMobile.query(query3, function(err,foundRecords_3){

																															if(err){
																															console.log(err);
																															return done(err);
																															}
																															var cont3 = foundRecords_3.length;


																																var query4 = "select * FROM prueba_usuarios.history where starthour >= '08:00:00' and endhour <= '10:00:00' AND (";
																																for(var x = 0; x < listawomen.length; x++)
																																	query4  = query4 + " usermob = " + listawomen[x] + " or" ; 
																																query4 = query4.substring(0, query4.length - 2);
																																query4 = query4 + ")";
																																UserMobile.query(query4, function(err,foundRecords_4){

																																if(err){
																																console.log(err);
																																return done(err);
																																}
																																var cont4 = foundRecords_4.length;


																																	var query5 = "select * FROM prueba_usuarios.history where starthour >= '10:00:00' and endhour <= '12:00:00' AND (";
																																	for(var x = 0; x < listawomen.length; x++)
																																		query5  = query5 + " usermob = " + listawomen[x] + " or" ; 
																																	query5 = query5.substring(0, query5.length - 2);
																																	query5 = query5 + ")";
																																	UserMobile.query(query5, function(err,foundRecords_5){

																																	if(err){
																																	console.log(err);
																																	return done(err);
																																	}
																																	var cont5 = foundRecords_5.length;


																																		var query6 = "select * FROM prueba_usuarios.history where starthour >= '12:00:00' and endhour <= '14:00:00' AND (";
																																		for(var x = 0; x < listawomen.length; x++)
																																			query6  = query6 + " usermob = " + listawomen[x] + " or" ; 
																																		query6 = query6.substring(0, query6.length - 2);
																																		query6 = query6 + ")";
																																		UserMobile.query(query6, function(err,foundRecords_6){

																																		if(err){
																																		console.log(err);
																																		return done(err);
																																		}
																																		var cont6 = foundRecords_6.length;


																																			var query7 = "select * FROM prueba_usuarios.history where starthour >= '14:00:00' and endhour <= '16:00:00' AND (";
																																			for(var x = 0; x < listawomen.length; x++)
																																				query7  = query7 + " usermob = " + listawomen[x] + " or" ; 
																																			query7 = query7.substring(0, query7.length - 2);
																																			query7 = query7 + ")";
																																			UserMobile.query(query7, function(err,foundRecords_7){

																																			if(err){
																																			console.log(err);
																																			return done(err);
																																			}
																																			var cont7 = foundRecords_7.length;


																																				var query8 = "select * FROM prueba_usuarios.history where starthour >= '16:00:00' and endhour <= '18:00:00' AND (";
																																				for(var x = 0; x < listawomen.length; x++)
																																					query8  = query8 + " usermob = " + listawomen[x] + " or" ; 
																																				query8 = query8.substring(0, query8.length - 2);
																																				query8 = query8 + ")";
																																				UserMobile.query(query8, function(err,foundRecords_8){

																																				if(err){
																																				console.log(err);
																																				return done(err);
																																				}
																																				var cont8 = foundRecords_8.length;


																																					var query9 = "select * FROM prueba_usuarios.history where starthour >= '18:00:00' and endhour <= '20:00:00' AND (";
																																					for(var x = 0; x < listawomen.length; x++)
																																						query9  = query9 + " usermob = " + listawomen[x] + " or" ; 
																																					query9 = query9.substring(0, query9.length - 2);
																																					query9 = query9 + ")";
																																					UserMobile.query(query9, function(err,foundRecords_9){

																																					if(err){
																																					console.log(err);
																																					return done(err);
																																					}
																																					var cont9 = foundRecords_9.length;


																																						var query10 = "select * FROM prueba_usuarios.history where starthour >= '20:00:00' and endhour <= '22:00:00' AND (";
																																						for(var x = 0; x < listawomen.length; x++)
																																							query10  = query10 + " usermob = " + listawomen[x] + " or" ; 
																																						query10 = query10.substring(0, query10.length - 2);
																																						query10 = query10 + ")";
																																						UserMobile.query(query10, function(err,foundRecords_10){

																																						if(err){
																																						console.log(err);
																																						return done(err);
																																						}
																																						var cont10 = foundRecords_10.length;


																																							var query11 = "select * FROM prueba_usuarios.history where starthour >= '22:00:00' and endhour <= '00:00:00' AND (";
																																							for(var x = 0; x < listawomen.length; x++)
																																								query11  = query11 + " usermob = " + listawomen[x] + " or" ; 
																																							query11 = query11.substring(0, query11.length - 2);
																																							query11 = query11 + ")";
																																							UserMobile.query(query11, function(err,foundRecords_11){

																																							if(err){
																																							console.log(err);
																																							return done(err);
																																							}
																																							var cont11 = foundRecords_11.length;
																																										

																														var output2 = {
																																				name: 'Hora de visualizacion (mujeres)',
																																				data: [ {name:"00:00:00 a 02:00:00",y:cont0},
																																						{name:"02:00:00 a 04:00:00",y:cont1},
																																						{name:"04:00:00 a 06:00:00",y:cont2},
																																						{name:"06:00:00 a 08:00:00",y:cont3},
																																						{name:"08:00:00 a 10:00:00",y:cont4},
																																						{name:"10:00:00 a 12:00:00",y:cont5},
																																						{name:"12:00:00 a 14:00:00",y:cont6},
																																						{name:"14:00:00 a 16:00:00",y:cont7},
																																						{name:"16:00:00 a 18:00:00",y:cont8},
																																						{name:"18:00:00 a 20:00:00",y:cont9},
																																						{name:"20:00:00 a 22:00:00",y:cont10},
																																						{name:"22:00:00 a 00:00:00",y:cont11},
																																				
																																						]
																																	  };

																																	  output.push(output2);

																																					  return done(null,output);


																											}); //11

																											}); //10
																											}); // 9
																											}); //8
																											}); //7
																											}); // 6



																											}); //5
																											}); //4
																											}); // 3
																																	}); // 2

																																}); // 1
																													}); // 0
																													}
																													else
																													{
																														var output2 = {
																																				name: 'Hora de visualizacion (mujeres)',
																																				data: [ {name:"00:00:00 a 02:00:00",y:0},
																																						{name:"02:00:00 a 04:00:00",y:0},
																																						{name:"04:00:00 a 06:00:00",y:0},
																																						{name:"06:00:00 a 08:00:00",y:0},
																																						{name:"08:00:00 a 10:00:00",y:0},
																																						{name:"10:00:00 a 12:00:00",y:0},
																																						{name:"12:00:00 a 14:00:00",y:0},
																																						{name:"14:00:00 a 16:00:00",y:0},
																																						{name:"16:00:00 a 18:00:00",y:0},
																																						{name:"18:00:00 a 20:00:00",y:0},
																																						{name:"20:00:00 a 22:00:00",y:0},
																																						{name:"22:00:00 a 00:00:00",y:0},
																																				
																																						]
																																	  };

																																	  output.push(output2);

																																					  return done(null,output);

																													}


																											});






											


											} //    if men = 1 women = 1

										});   /****/

									}); /**/

			}

	


	},





/****
* Función de clustering
*id_empresa  de que empresa se optendrán los datos
*atributos  Los atributos que se esperan agupar, tiene que estar dentro de una listas, por ejemplo: ["gender","age"]
*number_of_clusters  El número de clusters que se crearán
*topic  A que topic de Apache Kafka mandará el mensaje
****/
kmeans:function(option, done){//Función generada por Leonard Oliva Monjarás
	console.log("KMEANS");
	console.log(option);
	var partition = 0;
		//var auxTopic = SHA256(req.param('id_empresa',new Date().getTime()) + req.param('atributos') + new Date().getTime());
		//var auxTopic = option.id_empresa;
		//sails.log(req.query);
		//console.log("Nombre del topic auxiliar: " + auxTopic);

		var query_ = "SELECT usermobile.age/10 as age, usermobile.country,usermobile.city,usermobile.gender,  promotion.media, history.device"+ ",usermobile.id as usermobileID, promotion.id as promoID" +
					" FROM prueba_usuarios.history " + 
					
					" INNER JOIN prueba_usuarios.promotion " +
					" ON promotion.id = history.promo " +
					
					" INNER JOIN prueba_usuarios.user " +
					" ON prueba_usuarios.user.id = promotion.owner " +
					
					" INNER JOIN prueba_usuarios.usermobile " +
					" ON usermobile.id = history.usermob " 		
				;
		if(option.promo == -1){ //ALL
			query_ += " WHERE prueba_usuarios.user.id = ? and promotion.id > ?";
		}else{
			query_ += " WHERE prueba_usuarios.user.id = ? and promotion.id = ?";
		}

		query_ +=  	" GROUP BY usermobile.username, promotion.id,history.device " + //Incrementamos los criterios de agrupamiento
					" ORDER BY usermobile.username ASC " 
				;
		History.query(query_, [option.owner,option.promo] ,function(err, rawResult) {
		 	if (err  ) {return done(err); }
		 	if (rawResult.length == 0 ) {return done("No hay elementos para calcular"); }

		 	MLClusteringKMeansResponseTemp.create({output:''}).exec(function (err, newRecordMLClustering) {//Creamos un registro en la BD, solo para apartar el I, el cual luego se buscará
		 		if (err) { return done(err); }


				var pakage = [{
					header:[{
						idResponse:newRecordMLClustering.id,
						//attributes:['gender','age','country','city'],
						//attributes:JSON.parse(option.attributes),
						attributes:option.attributes,
						numberOfClusters:option.numberOfClusters,
						url:option.url,
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
						topic:option.topic, //Topic al cual se mandará el mensaje; 
						message:(JSON.stringify(pakage)),//El mensaje que se mandará
						partition:partition,//La partición
					},
					function(err,message){
						if(err){return done(err);}

						console.log("Se ha colocado el mensaje");

						var numberOfRequests = 60 * 2;//Número de segundos a esperar por una respuesta
						var intervar = setInterval(function(){f();}, 1000);
						var f = function(){
								MLClusteringKMeansResponseTemp.findOne({id:newRecordMLClustering.id,output:{'!':''}}).exec(function(err,updatedRecordMLClustering){//Buscamos por ID donde el input es distinto a vacío
									if(err || !updatedRecordMLClustering){
										numberOfRequests--;
										console.log("No se encontro el registo: " + numberOfRequests);
										if(numberOfRequests<0){
											clearInterval(intervar);//Detenemos el interval!
											//return res.serverError("No hay respuesta del servidor de ML")
											return done("No hay respuesta del servidor de ML");
										}
									}else{
										console.log("Se encontro el registo: " + numberOfRequests);
										clearInterval(intervar);//Detenemos el interval!
										//res.ok
										/*
										return done(null,{//Reconstruimos el paquete solo con el output en formato JSON
											id:updatedRecordMLClustering.id,
											output:JSON.parse(updatedRecordMLClustering.output),
											attributes: JSON.parse(option.atributos),
											numberOfClusters:option.number_of_clusters,
											createdAt:updatedRecordMLClustering.createdAt,
											updatedAt:updatedRecordMLClustering.updatedAt,
										});
										*/
										console.log("updatedRecordMLClustering.output");
										console.log(updatedRecordMLClustering.output);
										console.log("updatedRecordMLClustering.output  PARSE");
										console.log(JSON.parse( updatedRecordMLClustering.output ));
										return done(
											null,
											{
												'data':JSON.parse( updatedRecordMLClustering.output )[option.url][option.modeInfo],//RESPUESTA DE PYTHON
												'idResponse':newRecordMLClustering.id,//ID DEL REGISTRO EN DB
											}
										);
									}
								});
							}
						;						
						
					}
				);


			});
		});


},




/*************************************************************************************************************************************/

	      
};