

module.exports = { 

	//Definimos la función para mandar mensajes a Kafka


Tiempo : function(option, done)
		{

			if(option.promo == 'All')
	 		{
													Promotion.find({select : ['id'], where : {owner : option.owner}}).exec(function(err,foundRecords){
														if(err){
															console.log(err);
															return done(err);
														}

														console.log("Listado de ID");
														console.log(foundRecords);

														var lista = [];
														for(var i = 0; i < foundRecords.length; i++)
															lista.push(foundRecords[i].id);

														History.find({promo: lista}).exec(function(err,found_Records_1){
															if(err){
																console.log(err);
																return done(err);
															}

															//console.log(found_Records_1);

															var lista2 = [];
															for(var i = 0; i < found_Records_1.length; i++)
																lista2.push(found_Records_1[i].usermob);

													
															
															console.log(lista2);


															if(option.men == 0 && option.women == 0)
															{

																console.log("/*************** tiempo 0 0*****************************/")
																		
																var query = "SELECT TIMESTAMPDIFF(MINUTE , starthour, endhour ) AS diferencia,usermob FROM prueba_usuarios.history WHERE";
																for(var x = 0; x < lista2.length; x++)
																	query  = query + " usermob = " + lista2[x] + " or" ; 

																query = query.substring(0, query.length - 2);


																console.log(query);



																UserMobile.query(query,function(err, found_Records_2) {
										  							
										  							if (err) { 
										  								return res.serverError(err); 
										  							}
										  							
										  							var time0 = time10 = time20 = time30 = time40 = time50 = 0;
										  					
										  							for(var i = 0; i < found_Records_2.length; i++)
										  							{
										  								if(found_Records_2[i].diferencia > 0  &&  found_Records_2[i].diferencia <= 10)
										  									time0++;
																		else if(found_Records_2[i].diferencia > 10  &&  found_Records_2[i].diferencia <= 20)
																			time10++;
																		else if(found_Records_2[i].diferencia > 20  &&  found_Records_2[i].diferencia <= 30)
																			time20++;
																		else if(found_Records_2[i].diferencia > 30  &&  found_Records_2[i].diferencia <= 40)
																			 time30++;						
																		else if(found_Records_2[i].diferencia > 40  &&  found_Records_2[i].diferencia <= 50)
																			time40++;
																		else if((found_Records_2[i].diferencia > 50  &&  found_Records_2[i].diferencia <= 59)) 
																			time50++;				
										  							}


										  							var output = [{
																							name: 'Tiempo de visualizacion',
																							data: [{name:"0-10min",y:time0},
																									{name:"10-20min",y:time10},
																									{name:"20-30min",y:time20},
																									{name:"30-40min",y:time30},
																									{name:"40-50min",y:time40},
																									{name:">50",y:time50}]
																				  }];

																				  console.log(output);

																				console.log("/*****************************************************/");
																				return done(null,output);
										  							});
															}

															else if(option.men == 1 && option.women == 0)
															{
																console.log("/*************** tiempo 1 0*****************************/")
																UserMobile.find({id: lista2, gender: 1}).exec(function(err,found_Records){
																	console.log(found_Records);

																	var listamen = [];
																		for(var i = 0; i < found_Records.length; i++)
																		listamen.push(found_Records[i].id);

																	console.log(listamen);

																	if(listamen.length == 0)
																	{
																		var output = [{
																							name: 'Tiempo de visualizacion (hombres)',
																							data: [{name:"0-10min",y:0},
																									{name:"10-20min",y:0},
																									{name:"20-30min",y:0},
																									{name:"30-40min",y:0},
																									{name:"40-50min",y:0},
																									{name:">50",y:0}]
																				  }];

																				  console.log(output);

																				console.log("/*****************************************************/");
																				return done(null,output);

																	}
																	
																		
																var query = "SELECT TIMESTAMPDIFF(MINUTE , starthour, endhour ) AS diferencia,usermob FROM prueba_usuarios.history WHERE";
																for(var x = 0; x < listamen.length; x++)
																	query  = query + " usermob = " + listamen[x] + " or" ; 

																query = query.substring(0, query.length - 2);

																console.log(query);
																UserMobile.query(query,function(err, found_Records_2) {
										  							
										  							if (err) { 
										  								return res.serverError(err); 
										  							}
										  							
										  							var time0 = time10 = time20 = time30 = time40 = time50 = 0;
										  					
										  							for(var i = 0; i < found_Records_2.length; i++)
										  							{
										  								if(found_Records_2[i].diferencia > 0  &&  found_Records_2[i].diferencia <= 10)
										  									time0++;
																		else if(found_Records_2[i].diferencia > 10  &&  found_Records_2[i].diferencia <= 20)
																			time10++;
																		else if(found_Records_2[i].diferencia > 20  &&  found_Records_2[i].diferencia <= 30)
																			time20++;
																		else if(found_Records_2[i].diferencia > 30  &&  found_Records_2[i].diferencia <= 40)
																			 time30++;						
																		else if(found_Records_2[i].diferencia > 40  &&  found_Records_2[i].diferencia <= 50)
																			time40++;
																		else if((found_Records_2[i].diferencia > 50  &&  found_Records_2[i].diferencia <= 59))
																			time50++;				
										  							}


										  							var output = [{
																							name: 'Tiempo de visualizacion (hombres)',
																							data: [{name:"0-10min",y:time0},
																									{name:"10-20min",y:time10},
																									{name:"20-30min",y:time20},
																									{name:"30-40min",y:time30},
																									{name:"40-50min",y:time40},
																									{name:">50",y:time50}]
																				  }];

																				  console.log(output);

																				console.log("/*****************************************************/");
																				return done(null,output);
										  							});
																});
															}

															else if(option.men == 0 && option.women == 1)
															{
																console.log("/*************** tiempo 1 0*****************************/")

																UserMobile.find({id: lista2, gender: 2}).exec(function(err,found_Records){
																	//console.log(found_Records);

																	var listawomen = [];
																		for(var i = 0; i < found_Records.length; i++)
																		listawomen.push(found_Records[i].id);

																	console.log(listawomen);

																	if(listawomen.length == 0){
																		var output = [{
																							name: 'Tiempo de visualizacion (mujeres)',
																							data: [{name:"0-10min",y:0},
																									{name:"10-20min",y:0},
																									{name:"20-30min",y:0},
																									{name:"30-40min",y:0},
																									{name:"40-50min",y:0},
																									{name:">50",y:0}]
																				  }];

																				  console.log(output);

																				console.log("/*****************************************************/");
																				return done(null,output);


																	}
																		
																		
																var query = "SELECT TIMESTAMPDIFF(MINUTE , starthour, endhour ) AS diferencia,usermob FROM prueba_usuarios.history WHERE";
																for(var x = 0; x < listawomen.length; x++)
																	query  = query + " usermob = " + listawomen[x] + " or" ; 

																query = query.substring(0, query.length - 2);

																console.log(query);
																UserMobile.query(query,function(err, found_Records_2) {
										  							
										  							if (err) { 
										  								return res.serverError(err); 
										  							}
										  							
										  							var time0 = time10 = time20 = time30 = time40 = time50 = 0;
										  					
										  							for(var i = 0; i < found_Records_2.length; i++)
										  							{
										  								if(found_Records_2[i].diferencia > 0  &&  found_Records_2[i].diferencia <= 10)
										  									time0++;
																		else if(found_Records_2[i].diferencia > 10  &&  found_Records_2[i].diferencia <= 20)
																			time10++;
																		else if(found_Records_2[i].diferencia > 20  &&  found_Records_2[i].diferencia <= 30)
																			time20++;
																		else if(found_Records_2[i].diferencia > 30  &&  found_Records_2[i].diferencia <= 40)
																			 time30++;						
																		else if(found_Records_2[i].diferencia > 40  &&  found_Records_2[i].diferencia <= 50)
																			time40++;
																		else if((found_Records_2[i].diferencia > 50  &&  found_Records_2[i].diferencia <= 59)) 
																			time50++;				
										  							}


										  							var output = [{
																							name: 'Tiempo de visualizacion (mujeres)',
																							data: [{name:"0-10min",y:time0},
																									{name:"10-20min",y:time10},
																									{name:"20-30min",y:time20},
																									{name:"30-40min",y:time30},
																									{name:"40-50min",y:time40},
																									{name:">50",y:time50}]
																				  }];

																				  console.log(output);

																				console.log("/*****************************************************/");
																				return done(null,output);
										  							});
																});

															}

															else if(option.men == 1 && option.women == 1)
															{
																UserMobile.find({id: lista2, gender: 2}).exec(function(err,found_Records){
																	//console.log(found_Records);

																	var listawomen = [];
																		for(var i = 0; i < found_Records.length; i++)
																		listawomen.push(found_Records[i].id);

																	console.log(listawomen);



																		console.log("/*************** tiempo 1 0*****************************/")
																		
																var query = "SELECT TIMESTAMPDIFF(MINUTE , starthour, endhour ) AS diferencia,usermob FROM prueba_usuarios.history WHERE";
																for(var x = 0; x < listawomen.length; x++)
																	query  = query + " usermob = " + listawomen[x] + " or" ; 

																query = query.substring(0, query.length - 2);

																console.log(query);
																UserMobile.query(query,function(err, found_Records_2) {
										  							
										  							if (err) { 
										  								return res.serverError(err); 
										  							}
										  							
										  							var time0 = time10 = time20 = time30 = time40 = time50 = 0;
										  					
										  							for(var i = 0; i < found_Records_2.length; i++)
										  							{
										  								if(found_Records_2[i].diferencia > 0  &&  found_Records_2[i].diferencia <= 10)
										  									time0++;
																		else if(found_Records_2[i].diferencia > 10  &&  found_Records_2[i].diferencia <= 20)
																			time10++;
																		else if(found_Records_2[i].diferencia > 20  &&  found_Records_2[i].diferencia <= 30)
																			time20++;
																		else if(found_Records_2[i].diferencia > 30  &&  found_Records_2[i].diferencia <= 40)
																			 time30++;						
																		else if(found_Records_2[i].diferencia > 40  &&  found_Records_2[i].diferencia <= 50)
																			time40++;
																		else if((found_Records_2[i].diferencia > 50  &&  found_Records_2[i].diferencia <= 59)) 
																			time50++;				
										  							}

										  							if(listawomen.length == 0)
										  							{
										  								time0 = time10 = time20 = time30 = time40 = time50 = 0;
										  							}

										  							UserMobile.find({id: lista2, gender: 1}).exec(function(err,found_Records12){
																	//console.log(found_Records);

																	var listamen = [];
																		for(var i = 0; i < found_Records12.length; i++)
																		listamen.push(found_Records12[i].id);

																	console.log(listamen);

																	console.log("/*************** tiempo 1 0*****************************/")
																		
																var query = "SELECT TIMESTAMPDIFF(MINUTE , starthour, endhour ) AS diferencia,usermob FROM prueba_usuarios.history WHERE";
																for(var x = 0; x < listamen.length; x++)
																	query  = query + " usermob = " + listamen[x] + " or" ; 

																query = query.substring(0, query.length - 2);

																console.log(query);
																UserMobile.query(query,function(err, found_Records_2) {
										  							
										  							if (err) { 
										  								return res.serverError(err); 
										  							}
										  							
										  							var mtime0 = mtime10 = mtime20 = mtime30 = mtime40 = mtime50 = 0;
										  					
										  							for(var i = 0; i < found_Records_2.length; i++)
										  							{
										  								if(found_Records_2[i].diferencia > 0  &&  found_Records_2[i].diferencia <= 10)
										  									mtime0++;
																		else if(found_Records_2[i].diferencia > 10  &&  found_Records_2[i].diferencia <= 20)
																			mtime10++;
																		else if(found_Records_2[i].diferencia > 20  &&  found_Records_2[i].diferencia <= 30)
																			mtime20++;
																		else if(found_Records_2[i].diferencia > 30  &&  found_Records_2[i].diferencia <= 40)
																			 mtime30++;						
																		else if(found_Records_2[i].diferencia > 40  &&  found_Records_2[i].diferencia <= 50)
																			mtime40++;
																		else if((found_Records_2[i].diferencia > 50  &&  found_Records_2[i].diferencia <= 59)) 
																			mtime50++;				
										  							}

										  							if(listamen.length == 0)
										  							{
										  								mtime0 = mtime10 = mtime20 = mtime30 = mtime40 = mtime50 = 0;
										  							}

										  							var output = [{
																							name: 'Tiempo de visualizacion (hombres)',
																							data: [{name:"0-10min",y:mtime0},
																									{name:"10-20min",y:mtime10},
																									{name:"20-30min",y:mtime20},
																									{name:"30-40min",y:mtime30},
																									{name:"40-50min",y:mtime40},
																									{name:">50",y:mtime50}]

																				  }, {		name: 'Tiempo de visualizacion (mujeres)',
																							data: [{name:"0-10min",y:time0},
																									{name:"10-20min",y:time10},
																									{name:"20-30min",y:time20},
																									{name:"30-40min",y:time30},
																									{name:"40-50min",y:time40},
																									{name:">50",y:time50}] 

																					}];

																				  console.log(output);

																				console.log("/*****************************************************/");
																				return done(null,output);

										  			
										  							});
																});
										  							
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

														console.log("Listado de ID");
														console.log(foundRecords);

														var lista = [];
														for(var i = 0; i < foundRecords.length; i++)
															lista.push(foundRecords[i].id);

														History.find({promo: lista}).exec(function(err,found_Records_1){
															if(err){
																console.log(err);
																return done(err);
															}

															//console.log(found_Records_1);

															var lista2 = [];
															for(var i = 0; i < found_Records_1.length; i++)
																lista2.push(found_Records_1[i].usermob);

													
															
															console.log(lista2);


															if(option.men == 0 && option.women == 0)
															{

																console.log("/*************** tiempo 0 0*****************************/")
																		
																var query = "SELECT TIMESTAMPDIFF(MINUTE , starthour, endhour ) AS diferencia,usermob FROM prueba_usuarios.history WHERE";
																for(var x = 0; x < lista2.length; x++)
																	query  = query + " usermob = " + lista2[x] + " or" ; 

																query = query.substring(0, query.length - 2);


																console.log(query);



																UserMobile.query(query,function(err, found_Records_2) {
										  							
										  							if (err) { 
										  								return res.serverError(err); 
										  							}
										  							
										  							var time0 = time10 = time20 = time30 = time40 = time50 = 0;
										  					
										  							for(var i = 0; i < found_Records_2.length; i++)
										  							{
										  								if(found_Records_2[i].diferencia > 0  &&  found_Records_2[i].diferencia <= 10)
										  									time0++;
																		else if(found_Records_2[i].diferencia > 10  &&  found_Records_2[i].diferencia <= 20)
																			time10++;
																		else if(found_Records_2[i].diferencia > 20  &&  found_Records_2[i].diferencia <= 30)
																			time20++;
																		else if(found_Records_2[i].diferencia > 30  &&  found_Records_2[i].diferencia <= 40)
																			 time30++;						
																		else if(found_Records_2[i].diferencia > 40  &&  found_Records_2[i].diferencia <= 50)
																			time40++;
																		else if((found_Records_2[i].diferencia > 50  &&  found_Records_2[i].diferencia <= 59)) 
																			time50++;				
										  							}


										  							var output = [{
																							name: 'Tiempo de visualizacion',
																							data: [{name:"0-10min",y:time0},
																									{name:"10-20min",y:time10},
																									{name:"20-30min",y:time20},
																									{name:"30-40min",y:time30},
																									{name:"40-50min",y:time40},
																									{name:">50",y:time50}]
																				  }];

																				  console.log(output);

																				console.log("/*****************************************************/");
																				return done(null,output);
										  							});
															}

															else if(option.men == 1 && option.women == 0)
															{
																console.log("/*************** tiempo 1 0*****************************/")
																UserMobile.find({id: lista2, gender: 1}).exec(function(err,found_Records){
																	console.log(found_Records);

																	var listamen = [];
																		for(var i = 0; i < found_Records.length; i++)
																		listamen.push(found_Records[i].id);

																	console.log(listamen);

																	if(listamen.length == 0)
																	{
																		var output = [{
																							name: 'Tiempo de visualizacion (hombres)',
																							data: [{name:"0-10min",y:0},
																									{name:"10-20min",y:0},
																									{name:"20-30min",y:0},
																									{name:"30-40min",y:0},
																									{name:"40-50min",y:0},
																									{name:">50",y:0}]
																				  }];

																				  console.log(output);

																				console.log("/*****************************************************/");
																				return done(null,output);

																	}
																	
																		
																var query = "SELECT TIMESTAMPDIFF(MINUTE , starthour, endhour ) AS diferencia,usermob FROM prueba_usuarios.history WHERE";
																for(var x = 0; x < listamen.length; x++)
																	query  = query + " usermob = " + listamen[x] + " or" ; 

																query = query.substring(0, query.length - 2);

																console.log(query);
																UserMobile.query(query,function(err, found_Records_2) {
										  							
										  							if (err) { 
										  								return res.serverError(err); 
										  							}
										  							
										  							var time0 = time10 = time20 = time30 = time40 = time50 = 0;
										  					
										  							for(var i = 0; i < found_Records_2.length; i++)
										  							{
										  								if(found_Records_2[i].diferencia > 0  &&  found_Records_2[i].diferencia <= 10)
										  									time0++;
																		else if(found_Records_2[i].diferencia > 10  &&  found_Records_2[i].diferencia <= 20)
																			time10++;
																		else if(found_Records_2[i].diferencia > 20  &&  found_Records_2[i].diferencia <= 30)
																			time20++;
																		else if(found_Records_2[i].diferencia > 30  &&  found_Records_2[i].diferencia <= 40)
																			 time30++;						
																		else if(found_Records_2[i].diferencia > 40  &&  found_Records_2[i].diferencia <= 50)
																			time40++;
																		else if((found_Records_2[i].diferencia > 50  &&  found_Records_2[i].diferencia <= 59))
																			time50++;				
										  							}


										  							var output = [{
																							name: 'Tiempo de visualizacion (hombres)',
																							data: [{name:"0-10min",y:time0},
																									{name:"10-20min",y:time10},
																									{name:"20-30min",y:time20},
																									{name:"30-40min",y:time30},
																									{name:"40-50min",y:time40},
																									{name:">50",y:time50}]
																				  }];

																				  console.log(output);

																				console.log("/*****************************************************/");
																				return done(null,output);
										  							});
																});
															}

															else if(option.men == 0 && option.women == 1)
															{
																console.log("/*************** tiempo 1 0*****************************/")

																UserMobile.find({id: lista2, gender: 2}).exec(function(err,found_Records){
																	//console.log(found_Records);

																	var listawomen = [];
																		for(var i = 0; i < found_Records.length; i++)
																		listawomen.push(found_Records[i].id);

																	console.log(listawomen);

																	if(listawomen.length == 0){
																		var output = [{
																							name: 'Tiempo de visualizacion (mujeres)',
																							data: [{name:"0-10min",y:0},
																									{name:"10-20min",y:0},
																									{name:"20-30min",y:0},
																									{name:"30-40min",y:0},
																									{name:"40-50min",y:0},
																									{name:">50",y:0}]
																				  }];

																				  console.log(output);

																				console.log("/*****************************************************/");
																				return done(null,output);


																	}
																		
																		
																var query = "SELECT TIMESTAMPDIFF(MINUTE , starthour, endhour ) AS diferencia,usermob FROM prueba_usuarios.history WHERE";
																for(var x = 0; x < listawomen.length; x++)
																	query  = query + " usermob = " + listawomen[x] + " or" ; 

																query = query.substring(0, query.length - 2);

																console.log(query);
																UserMobile.query(query,function(err, found_Records_2) {
										  							
										  							if (err) { 
										  								return res.serverError(err); 
										  							}
										  							
										  							var time0 = time10 = time20 = time30 = time40 = time50 = 0;
										  					
										  							for(var i = 0; i < found_Records_2.length; i++)
										  							{
										  								if(found_Records_2[i].diferencia > 0  &&  found_Records_2[i].diferencia <= 10)
										  									time0++;
																		else if(found_Records_2[i].diferencia > 10  &&  found_Records_2[i].diferencia <= 20)
																			time10++;
																		else if(found_Records_2[i].diferencia > 20  &&  found_Records_2[i].diferencia <= 30)
																			time20++;
																		else if(found_Records_2[i].diferencia > 30  &&  found_Records_2[i].diferencia <= 40)
																			 time30++;						
																		else if(found_Records_2[i].diferencia > 40  &&  found_Records_2[i].diferencia <= 50)
																			time40++;
																		else if((found_Records_2[i].diferencia > 50  &&  found_Records_2[i].diferencia <= 59)) 
																			time50++;				
										  							}


										  							var output = [{
																							name: 'Tiempo de visualizacion (mujeres)',
																							data: [{name:"0-10min",y:time0},
																									{name:"10-20min",y:time10},
																									{name:"20-30min",y:time20},
																									{name:"30-40min",y:time30},
																									{name:"40-50min",y:time40},
																									{name:">50",y:time50}]
																				  }];

																				  console.log(output);

																				console.log("/*****************************************************/");
																				return done(null,output);
										  							});
																});

															}

															else if(option.men == 1 && option.women == 1)
															{
																UserMobile.find({id: lista2, gender: 2}).exec(function(err,found_Records){
																	//console.log(found_Records);

																	var listawomen = [];
																		for(var i = 0; i < found_Records.length; i++)
																		listawomen.push(found_Records[i].id);

																	console.log(listawomen);



																		console.log("/*************** tiempo 1 0*****************************/")
																		
																var query = "SELECT TIMESTAMPDIFF(MINUTE , starthour, endhour ) AS diferencia,usermob FROM prueba_usuarios.history WHERE";
																for(var x = 0; x < listawomen.length; x++)
																	query  = query + " usermob = " + listawomen[x] + " or" ; 

																query = query.substring(0, query.length - 2);

																console.log(query);
																UserMobile.query(query,function(err, found_Records_2) {
										  							
										  							if (err) { 
										  								return res.serverError(err); 
										  							}
										  							
										  							var time0 = time10 = time20 = time30 = time40 = time50 = 0;
										  					
										  							for(var i = 0; i < found_Records_2.length; i++)
										  							{
										  								if(found_Records_2[i].diferencia > 0  &&  found_Records_2[i].diferencia <= 10)
										  									time0++;
																		else if(found_Records_2[i].diferencia > 10  &&  found_Records_2[i].diferencia <= 20)
																			time10++;
																		else if(found_Records_2[i].diferencia > 20  &&  found_Records_2[i].diferencia <= 30)
																			time20++;
																		else if(found_Records_2[i].diferencia > 30  &&  found_Records_2[i].diferencia <= 40)
																			 time30++;						
																		else if(found_Records_2[i].diferencia > 40  &&  found_Records_2[i].diferencia <= 50)
																			time40++;
																		else if((found_Records_2[i].diferencia > 50  &&  found_Records_2[i].diferencia <= 59)) 
																			time50++;				
										  							}

										  							if(listawomen.length == 0)
										  							{
										  								time0 = time10 = time20 = time30 = time40 = time50 = 0;
										  							}

										  							UserMobile.find({id: lista2, gender: 1}).exec(function(err,found_Records12){
																	//console.log(found_Records);

																	var listamen = [];
																		for(var i = 0; i < found_Records12.length; i++)
																		listamen.push(found_Records12[i].id);

																	console.log(listamen);

																	console.log("/*************** tiempo 1 0*****************************/")
																		
																var query = "SELECT TIMESTAMPDIFF(MINUTE , starthour, endhour ) AS diferencia,usermob FROM prueba_usuarios.history WHERE";
																for(var x = 0; x < listamen.length; x++)
																	query  = query + " usermob = " + listamen[x] + " or" ; 

																query = query.substring(0, query.length - 2);

																console.log(query);
																UserMobile.query(query,function(err, found_Records_2) {
										  							
										  							if (err) { 
										  								return res.serverError(err); 
										  							}
										  							
										  							var mtime0 = mtime10 = mtime20 = mtime30 = mtime40 = mtime50 = 0;
										  					
										  							for(var i = 0; i < found_Records_2.length; i++)
										  							{
										  								if(found_Records_2[i].diferencia > 0  &&  found_Records_2[i].diferencia <= 10)
										  									mtime0++;
																		else if(found_Records_2[i].diferencia > 10  &&  found_Records_2[i].diferencia <= 20)
																			mtime10++;
																		else if(found_Records_2[i].diferencia > 20  &&  found_Records_2[i].diferencia <= 30)
																			mtime20++;
																		else if(found_Records_2[i].diferencia > 30  &&  found_Records_2[i].diferencia <= 40)
																			 mtime30++;						
																		else if(found_Records_2[i].diferencia > 40  &&  found_Records_2[i].diferencia <= 50)
																			mtime40++;
																		else if((found_Records_2[i].diferencia > 50  &&  found_Records_2[i].diferencia <= 59)) 
																			mtime50++;				
										  							}

										  							if(listamen.length == 0)
										  							{
										  								mtime0 = mtime10 = mtime20 = mtime30 = mtime40 = mtime50 = 0;
										  							}

										  							var output = [{
																							name: 'Tiempo de visualizacion (hombres)',
																							data: [{name:"0-10min",y:mtime0},
																									{name:"10-20min",y:mtime10},
																									{name:"20-30min",y:mtime20},
																									{name:"30-40min",y:mtime30},
																									{name:"40-50min",y:mtime40},
																									{name:">50",y:mtime50}]

																				  }, {		name: 'Tiempo de visualizacion (mujeres)',
																							data: [{name:"0-10min",y:time0},
																									{name:"10-20min",y:time10},
																									{name:"20-30min",y:time20},
																									{name:"30-40min",y:time30},
																									{name:"40-50min",y:time40},
																									{name:">50",y:time50}] 

																					}];

																				  console.log(output);

																				console.log("/*****************************************************/");
																				return done(null,output);

										  			
										  							});
																});
										  							
										  							});
																});

															}
															
												});
											});
				}

				
				


},




/**********************************************************************************************************************************************/

Dispositivo: function (option,done){
		//console.log(option.promotion_userm);

	 	//return done(null,{1: parseInt(Math.random() * 30 + 1),2: parseInt(Math.random() * 30 + 1)});
	 	
					if(option.promo == 'All')
						 		{
							Promotion.find({select : ['id'], where : {owner : option.owner}}).exec(function(err,foundRecords){
									if(err){
										console.log(err);
										return done(err);
									}

									console.log("Listado de ID");
									console.log(foundRecords);

									var lista = [];
									for(var i = 0; i < foundRecords.length; i++)
										lista.push(foundRecords[i].id);

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
											console.log("*******************  Dispositivo 0 0 *****************");

											History.count({usermob: lista2, device : 'ios', promo : lista}).exec(function(err,foundRecords){
												console.log(foundRecords);

												History.count({usermob: lista2, device : 'android', promo : lista}).exec(function(err,found_Records){
												console.log(found_Records);

													History.count({usermob: lista2, device : 'windows', promo : lista}).exec(function(err,found__Records){
													console.log(found__Records);

														var output = [{
																		name: 'Dispositivos (combinado)',
																		data: [{name:"Android",y:found_Records},
																				{name:"Ios",y:foundRecords},
																				{name:"Windows",y:found__Records},
																				]
															  }];

															  console.log(output);
															return done(null,output);

													});
												});
											});
										}

										else if(option.men == 1 && option.women == 0)
										{
											console.log("*******************  Dispositivo 1 0 *****************");

											UserMobile.find({id: lista2, gender: 1}).exec(function(err,found_Records){

												var listamen = [];
													for(var i = 0; i < found_Records.length; i++)
													listamen.push(found_Records[i].id);

												console.log(listamen);

												History.count({usermob: listamen, device : 'ios', promo : lista}).exec(function(err,foundRecords){
												console.log(foundRecords);

												History.count({usermob: listamen, device : 'android', promo : lista}).exec(function(err,found_Records){
												console.log(foundRecords);

													History.count({usermob: listamen, device : 'windows', promo : lista}).exec(function(err,found__Records){
													console.log(foundRecords);

														var output = [{
																		name: 'Dispositivos (Hombres)',
																		data: [{name:"Android",y:foundRecords},
																				{name:"Ios",y:found_Records},
																				{name:"Windows",y:found__Records},
																				]
															  }];

															  console.log(output);
															return done(null,output);

													});
												});
											});



											});
										}



										else if(option.men == 0 && option.women == 1)
										{
											console.log("*******************  Dispositivo 0 1 *****************");

											UserMobile.find({id: lista2, gender: 2}).exec(function(err,found_Records){

												var listamen = [];
													for(var i = 0; i < found_Records.length; i++)
													listamen.push(found_Records[i].id);

												console.log(listamen);

												History.count({usermob: listamen, device : 'ios', promo : lista}).exec(function(err,foundRecords){
												console.log(foundRecords);

												History.count({usermob: listamen, device : 'android', promo : lista}).exec(function(err,found_Records){
												console.log(foundRecords);

													History.count({usermob: listamen, device : 'windows', promo : lista}).exec(function(err,found__Records){
													console.log(foundRecords);

														var output = [{
																		name: 'Dispositivos (mujeres)',
																		data: [{name:"Android",y:foundRecords},
																				{name:"Ios",y:found_Records},
																				{name:"Windows",y:found__Records},
																				]
															  }];

															  console.log(output);
															return done(null,output);

													});
												});
											});



											});
										}



										else if(option.men == 1 && option.women == 1)
										{
												console.log("*******************  Dispositivo 1 1 *****************");

												
												UserMobile.find({id: lista2, gender: 1}).exec(function(err,found_Records){

												var listamen = [];
													for(var i = 0; i < found_Records.length; i++)
													listamen.push(found_Records[i].id);

												console.log(listamen);

												History.count({usermob: listamen, device : 'ios', promo : lista}).exec(function(err,foundRecords){
												console.log(foundRecords);

												History.count({usermob: listamen, device : 'android', promo : lista}).exec(function(err,found_Records){
												console.log(found_Records);

													History.count({usermob: listamen, device : 'windows', promo : lista}).exec(function(err,found__Records){
													console.log(found__Records);


																			UserMobile.find({id: lista2, gender: 2}).exec(function(err,found_Recordsx){

																			var listawomen = [];
																				for(var i = 0; i < found_Recordsx.length; i++)
																				listawomen.push(found_Recordsx[i].id);

																			console.log(listawomen);

																			History.count({usermob: listawomen, device : 'ios', promo : lista}).exec(function(err,foundRecords1){
																			console.log(foundRecords);

																			History.count({usermob: listawomen, device : 'android', promo : lista}).exec(function(err,found_Records2){
																			console.log(found_Records2);

																				History.count({usermob: listawomen, device : 'windows', promo : lista}).exec(function(err,found__Records3){
																				console.log(found__Records3);

																					var output = [{
																									name: 'Dispositivos (Hombres)',
																									data: [{name:"Android",y:foundRecords},
																											{name:"Ios",y:found_Records},
																											{name:"Windows",y:found__Records},
																											]
																						  			},{
																									name: 'Dispositivos (mujeres)',
																									data: [{name:"Android",y:foundRecords1},
																											{name:"Ios",y:found_Records2},
																											{name:"Windows",y:found__Records3},
																											]
																						  			}];

																						  			console.log("///////////////////////////////////////////////")
																									 console.log(output);
																									return done(null,output);

																				});
																			});
																		});
																		});
																							

																});
															});
														});
														});
										}
									});
							});

							}

			else
	 		{
									Promotion.find({select : ['id'], where : {owner : option.owner, name : option.promo }}).exec(function(err,foundRecords){
											if(err){
												console.log(err);
												return done(err);
											}

											console.log("Listado de ID");
											console.log(foundRecords);

											var lista = [];
											for(var i = 0; i < foundRecords.length; i++)
												lista.push(foundRecords[i].id);

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
													console.log("*******************  Dispositivo 0 0 *****************");

													History.count({usermob: lista2, device : 'ios', promo : lista}).exec(function(err,foundRecords){
														console.log(foundRecords);

														History.count({usermob: lista2, device : 'android', promo : lista}).exec(function(err,found_Records){
														console.log(foundRecords);

															History.count({usermob: lista2, device : 'windows', promo : lista}).exec(function(err,found__Records){
															console.log(foundRecords);

																var output = [{
																				name: 'Dispositivos (combinado)',
																				data: [{name:"Android",y:foundRecords},
																						{name:"Ios",y:found_Records},
																						{name:"Windows",y:found__Records},
																						]
																	  }];

																	  console.log(output);
																	return done(null,output);

															});
														});
													});
												}

												else if(option.men == 1 && option.women == 0)
												{
													console.log("*******************  Dispositivo 1 0 *****************");

													UserMobile.find({id: lista2, gender: 1}).exec(function(err,found_Records){

														var listamen = [];
															for(var i = 0; i < found_Records.length; i++)
															listamen.push(found_Records[i].id);

														console.log(listamen);

														History.count({usermob: listamen, device : 'ios', promo : lista}).exec(function(err,foundRecords){
														console.log(foundRecords);

														History.count({usermob: listamen, device : 'android', promo : lista}).exec(function(err,found_Records){
														console.log(foundRecords);

															History.count({usermob: listamen, device : 'windows', promo : lista}).exec(function(err,found__Records){
															console.log(foundRecords);

																var output = [{
																				name: 'Dispositivos (Hombres)',
																				data: [{name:"Android",y:foundRecords},
																						{name:"Ios",y:found_Records},
																						{name:"Windows",y:found__Records},
																						]
																	  }];

																	  console.log(output);
																	return done(null,output);

															});
														});
													});



													});
												}



												else if(option.men == 0 && option.women == 1)
												{
													console.log("*******************  Dispositivo 0 1 *****************");

													UserMobile.find({id: lista2, gender: 2}).exec(function(err,found_Records){

														var listamen = [];
															for(var i = 0; i < found_Records.length; i++)
															listamen.push(found_Records[i].id);

														console.log(listamen);

														History.count({usermob: listamen, device : 'ios', promo : lista}).exec(function(err,foundRecords){
														console.log(foundRecords);

														History.count({usermob: listamen, device : 'android', promo : lista}).exec(function(err,found_Records){
														console.log(foundRecords);

															History.count({usermob: listamen, device : 'windows', promo : lista}).exec(function(err,found__Records){
															console.log(foundRecords);

																var output = [{
																				name: 'Dispositivos (mujeres)',
																				data: [{name:"Android",y:foundRecords},
																						{name:"Ios",y:found_Records},
																						{name:"Windows",y:found__Records},
																						]
																	  }];

																	  console.log(output);
																	return done(null,output);

															});
														});
													});



													});
												}



												else if(option.men == 1 && option.women == 1)
												{
														console.log("*******************  Dispositivo 1 1 *****************");

														
														UserMobile.find({id: lista2, gender: 1}).exec(function(err,found_Records){

														var listamen = [];
															for(var i = 0; i < found_Records.length; i++)
															listamen.push(found_Records[i].id);

														console.log(listamen);

														History.count({usermob: listamen, device : 'ios', promo : lista}).exec(function(err,foundRecords){
														console.log(foundRecords);

														History.count({usermob: listamen, device : 'android', promo : lista}).exec(function(err,found_Records){
														console.log(found_Records);

															History.count({usermob: listamen, device : 'windows', promo : lista}).exec(function(err,found__Records){
															console.log(found__Records);


																					UserMobile.find({id: lista2, gender: 2}).exec(function(err,found_Recordsx){

																					var listawomen = [];
																						for(var i = 0; i < found_Recordsx.length; i++)
																						listawomen.push(found_Recordsx[i].id);

																					console.log(listawomen);

																					History.count({usermob: listawomen, device : 'ios', promo : lista}).exec(function(err,foundRecords1){
																					console.log(foundRecords);

																					History.count({usermob: listawomen, device : 'android', promo : lista}).exec(function(err,found_Records2){
																					console.log(found_Records2);

																						History.count({usermob: listawomen, device : 'windows', promo : lista}).exec(function(err,found__Records3){
																						console.log(found__Records3);

																							var output = [{
																											name: 'Dispositivos (Hombres)',
																											data: [{name:"Android",y:foundRecords},
																													{name:"Ios",y:found_Records},
																													{name:"Windows",y:found__Records},
																													]
																								  			},{
																											name: 'Dispositivos (mujeres)',
																											data: [{name:"Android",y:foundRecords1},
																													{name:"Ios",y:found_Records2},
																													{name:"Windows",y:found__Records3},
																													]
																								  			}];

																								  			console.log("///////////////////////////////////////////////")
																											 console.log(output);
																											return done(null,output);

																						});
																					});
																				});
																				});
																									

																		});
																	});
																});
																});
												}
											});
									});

			}
	},

/***************************************************************************************************************************************/

Media: function (option,done){
		//console.log(option.promotion_userm);

	 	//return done(null,{1: parseInt(Math.random() * 30 + 1),2: parseInt(Math.random() * 30 + 1)});
	 			Promotion.find({select : ['id'], where :{owner : option.owner, media : 'tarjeta'}}).exec(function(err,foundRecords){
	 			if(err){
					console.log(err);
					return done(err);
				}

				console.log(foundRecords);

					var listatarjeta = [];
					for(var i = 0; i < foundRecords.length; i++)
						listatarjeta.push(foundRecords[i].id);


						Promotion.find({select : ['id'], where :{owner : option.owner, media : 'volante'}}).exec(function(err,foundRecords1){
			 			if(err){
							console.log(err);
							return done(err);
						}

						console.log(foundRecords1);

							var listavolante = [];
							for(var i = 0; i < foundRecords1.length; i++)
								listavolante.push(foundRecords1[i].id);

								Promotion.find({select : ['id'], where :{owner : option.owner, media : 'triptico'}}).exec(function(err,foundRecords2){
					 			if(err){
									console.log(err);
									return done(err);
								}

								console.log(foundRecords2);

									var listatriptico = [];
									for(var i = 0; i < foundRecords2.length; i++)
										listatriptico.push(foundRecords2[i].id);

										Promotion.find({select : ['id'], where :{owner : option.owner, media : 'pancarta'}}).exec(function(err,foundRecords3){
							 			if(err){
											console.log(err);
											return done(err);
										}

										console.log(foundRecords3);

											var listapancarta = [];
											for(var i = 0; i < foundRecords3.length; i++)
												listapancarta.push(foundRecords3[i].id);



														History.find({promo: listatarjeta}).exec(function(err,foundRecordsHistory){
														if(err){
															console.log(err);
															return done(err);
														}

														//console.log(foundRecordsHistory);
														var tarjeta = [];
														for(var i = 0; i < foundRecordsHistory.length; i++)
															tarjeta.push(foundRecordsHistory[i].usermob);

																History.find({promo: listavolante}).exec(function(err,foundRecordsHistory1){
																if(err){
																	console.log(err);
																	return done(err);
																}

																//console.log(foundRecordsHistory1);
																var volante = [];
																for(var i = 0; i < foundRecordsHistory1.length; i++)
																	volante.push(foundRecordsHistory1[i].usermob);

																		History.find({promo: listatriptico}).exec(function(err,foundRecordsHistory2){
																		if(err){
																			console.log(err);
																			return done(err);
																		}

																		//console.log(foundRecordsHistory2);
																		var triptico = [];
																		for(var i = 0; i < foundRecordsHistory2.length; i++)
																			triptico.push(foundRecordsHistory2[i].usermob);

																				History.find({promo: listapancarta}).exec(function(err,foundRecordsHistory3){
																				if(err){
																					console.log(err);
																					return done(err);
																				}

																				//console.log(foundRecordsHistory3);
																				var pancarta = [];
																				for(var i = 0; i < foundRecordsHistory3.length; i++)
																					pancarta.push(foundRecordsHistory3[i].usermob);



																					if(option.men == 0 && option.women == 0)
																					{
																						

																						console.log("*******************  Dispositivo 0 0 *****************");

																						UserMobile.find({id: tarjeta}).exec(function(err,found_Records){
																							UserMobile.find({id: volante}).exec(function(err,found_Records1){
																								UserMobile.find({id: triptico}).exec(function(err,found_Records2){
																									UserMobile.find({id: pancarta}).exec(function(err,found_Records3){

																										var output = [{
																											name: 'Medios (hombres)',
																											data: [{name:"Tarjeta",y:found_Records.length},
																												   {name:"Volante",y:found_Records1.length},
																												   {name:"Triptico",y:found_Records2.length},
																												   {name:"Pancarta",y:found_Records3.length}]
															 													 }];

																											console.log(output);
																											return done(null,output);
																									});
																								});
																							});																								
																						});
																					}

																					else if(option.men == 1 && option.women == 0)
																					{
																						console.log("*******************  Dispositivo 1 0 *****************");

																						UserMobile.find({id: tarjeta, gender: 1}).exec(function(err,found_Records){
																							UserMobile.find({id: volante, gender: 1}).exec(function(err,found_Records1){
																								UserMobile.find({id: triptico, gender: 1}).exec(function(err,found_Records2){
																									UserMobile.find({id: pancarta, gender: 1}).exec(function(err,found_Records3){

																										var output = [{
																											name: 'Medios (hombres)',
																											data: [{name:"Tarjeta",y:found_Records.length},
																												   {name:"Volante",y:found_Records1.length},
																												   {name:"Triptico",y:found_Records2.length},
																												   {name:"Pancarta",y:found_Records3.length}]
															 													 }];

																											console.log(output);
																											return done(null,output);
																									});
																								});
																							});																								
																						});
																						
																					}



																					else if(option.men == 0 && option.women == 1)
																					{
																						console.log("*******************  Dispositivo 0 1 *****************");
																						UserMobile.find({id: tarjeta, gender: 2}).exec(function(err,found_Records){
																							UserMobile.find({id: volante, gender: 2}).exec(function(err,found_Records1){
																								UserMobile.find({id: triptico, gender: 2}).exec(function(err,found_Records2){
																									UserMobile.find({id: pancarta, gender: 2}).exec(function(err,found_Records3){

																										var output = [{
																											name: 'Medios (mujeres)',
																											data: [{name:"Tarjeta",y:found_Records.length},
																												   {name:"Volante",y:found_Records1.length},
																												   {name:"Triptico",y:found_Records2.length},
																												   {name:"Pancarta",y:found_Records3.length}]
															 													 }];

																											console.log(output);
																											return done(null,output);
																									});
																								});
																							});																								
																						});
																					}



																					else if(option.men == 1 && option.women == 1)
																					{
																						console.log("*******************  Dispositivo 1 1 *****************");
																						UserMobile.find({id: tarjeta, gender: 1}).exec(function(err,found_Records){
																							UserMobile.find({id: volante, gender: 1}).exec(function(err,found_Records1){
																								UserMobile.find({id: triptico, gender: 1}).exec(function(err,found_Records2){
																									UserMobile.find({id: pancarta, gender: 1}).exec(function(err,found_Records3){
																										UserMobile.find({id: tarjeta, gender: 2}).exec(function(err,found_Records4){
																											UserMobile.find({id: volante, gender: 2}).exec(function(err,found_Records5){
																												UserMobile.find({id: triptico, gender: 2}).exec(function(err,found_Records6){
																													UserMobile.find({id: pancarta, gender: 2}).exec(function(err,found_Records7){

																														var output = [{
																															name: 'Medios (Hombres)',
																															data: [	   {name:"Tarjeta",y:found_Records.length},
																																	   {name:"Volante",y:found_Records1.length},
																																	   {name:"Triptico",y:found_Records2.length},
																																	   {name:"Pancarta",y:found_Records3.length},
																																	]},
																																	{			
																												  		
																															name: 'Medios (mujeres)',
																															data: [	   {name:"Tarjeta",y:found_Records4.length},
																																	   {name:"Volante",y:found_Records5.length},
																																	   {name:"Triptico",y:found_Records6.length},
																																	   {name:"Pancarta",y:found_Records7.length},]}
																																	
																												  			];
																											console.log(output);
																											return done(null,output);
																									});
																								});
																							});																								
																						});
																									});
																								});
																							});																								
																						});

																					}



																				});
																		});
																});
														});



	 									});
	 							});
	 					});
	 			});

	},

/***************************************************************************************************************************************/


	      
};