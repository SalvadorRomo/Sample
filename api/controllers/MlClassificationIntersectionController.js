/**
 * MlClassificationNaiveBayesController
 *
 * @description :: Server-side logic for managing Mlclassificationnaivebayes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/***************************
	Inicia el la clasificación de las categorias más vistas del usuario movil en las categorias de las promociones; ESTE SCRIPT SE LLAMARA CUANDO EL USAURIO HACE UN MATCH CON LA REALIDAD AUMENTADA

	URL DE PRUEBA: /api/test/intersection/withgeopoint

	INPUT
	req.param('usermobID') ID del usuario movil que genero la visualización
	req.param('lat')  Latitud de la visualización 
	req.param('lon') Longitud de la visualización
	req.param('radius') Radio geografico, valor opcional

	OUTPUT
	ok  Simpre hay que regresar el OK ya que el servidor no dará respuesta al cliente que lo solicito

	STEPS
	1.- Obtener todas (posible limite a un número definido) promociones dentro del rango del radio (manualemente establecido) y el punto de visualización; ORDENARLAS POR LAS MÁS CERCANAS A LAS MÁS LEJANAS; Si no hay promociones hay que cancelar el proceso
	2.- Obtener las categorias más vistas por el usuario móvil; ORDENARLAS POR NÚMERO DE VISTAS; EN CASO DE NO TENER NOTIFICACIÓNES VISTA CANCELAR EL PROCESO (SIMPLEMENTE FUERA DE LÓGICA ESTE ESCENARIO, YA QUE ESTA FUNCIÓN SE LLAMA AL INSERTAR UN RECORD EN HISTORY)
	3.- Si el punto 1 y 2 son exitosos, se procede a iniciar la clasificación, la misma
	****************************/
	calculateClassificationWithGeoPoint: function(req,res){
		if (req.param('usermobileID') === undefined) {
            return res.badRequest('An usermobileID is required');
        }
        if(req.param('lat') == undefined){
        	return res.badRequest('A latitude (lat) is required');
        }
        if(req.param('lon') == undefined){
        	return res.badRequest('A longitude (lon) is required');
        }
       

        CategoriesService.getCategoriesOfPromotionsIntoGeoZone(
        	{
        			//INPUT
					//args.radius Radio (en kilometros) donde se deberán buscar las promociones; el radio proviene de un view del usuario
					'radius':req.param('radius',10), // 10 km por defecto
					//args.lat Latitud de la visualización 
					'lat':req.param('lat'),
					//args.lon Longitud de la visualización
					'lon':req.param('lon'),
					//args.id Id de usuario
					'idusr':req.param('usermobileID')
        	},
        	function(promosData){//Éxito
        		//OUTPUT
				//[ { promoID:X,categoriesID:[1,2,3..] }, { promoID:X, categoriesID:[1,2,3,..] } , ... ] Listado de diccionarios que contendra el promoID y su listado de categorias

        		//1.-Validad que si contenga datos, al menos una promoción!!
        		//Si hay promoción (es) procedemos a obtener las categorias del usuario móvil
        		//if(hay promocion)  //No utilizar llaves!
        		CategoriesService.getMostImportantCategoriesOfUsermobileByID(
	        		{
	        				//INPUT:
							//args.usermobileID ID del usuario a obtener categories más vistas
							'usermobileID':req.param('usermobileID')
	        		},
	        		function(userMobileData){//Éxito
	        				//OUTPUT:
							//{ 'usermobileID':X, 'categoriesID':[1,2,3,4...] } Diccionario de IDs de categorias

							//Validar que tenga categorias (Al menos tendra las de la promoción que desato el evento)

							//if(hay categorias)  //No utilizar llaves!
							ClassificationIntersectionService.start(
								{
										//INPUT
										//args.usermobile 
										'usermobile':userMobileData,
										//args.promos
										'promos':promosData
								},
								function (intersectionData){//Éxito

								},
								function(data){//Error

								}

							);

	        		},
	        		function(data){//Error

	        		}

        		);//CategoriesService.getMostImportantCategoriesOfUsermobileByID

        	},
        	function(data){//Error

        	}
       	);//CategoriesService.getCategoriesOfPromotionsIntoGeoZone



		res.ok({'message':'The job is running'});
	},







	/**********************
	INICIA LA CLASIFICCIÓN DEL USUARIO MOVIL, ESTA FUNCIÓN SE LLAMARÁ DESDE PYTHON CON UNA TRAREA PROGRAMADA

	URL DE PRUEBA:
	'GET /api/test/intersection/withoutgeopoint'

	INPUT
	req.param('usermobID') ID del usuario movil que se desea clasificar


	OUTPUT
	ok  Simpre hay que regresar el OK ya que el servidor no dará respuesta al cliente que lo solicitó

	STEPS
	1.- 

	**********************/

	calculateClassificationWithoutGeoPoint:function(req,res){
		


		res.ok({'message':'The job is running'});
	}


};

