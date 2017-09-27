var Grafica = function (id,array,idContainer,permitirInteraccion) {

	/*********************************
	INICIO VARIBLES PROPIAS DEL CONTOL
	*********************************/

	this.setControllerName('controlador_grafica');//Que controlador angular utiliza

	/*********************************
	FIN VARIBLES PROPIAS DEL CONTOL
	*********************************/

	this.permitirInteraccion = permitirInteraccion;

	this.array = Object.clone(array);
	this.array_aux = Object.clone(array);

	//Preparación del control según las proporciones
	this.setParentX((this.getParentSizeGridX()==null?0:this.getParentSizeGridX()) * canvas.gridsize);
	this.setParentY((this.getParentSizeGridY()==null?0:this.getParentSizeGridY()) * canvas.gridsize);

	//Al establecer el SizeGrid Automaticamente se calcula el ancho  y alto
	this.setParentSizeGridWidth( this.getParentSizeGridWidth()==null?Global_Default_Size_Control.width:this.getParentSizeGridWidth() );
	this.setParentSizeGridHeight( this.getParentSizeGridHeight()==null?Global_Default_Size_Control.height:this.getParentSizeGridHeight() );

	//Cómo los GETTERS & SETTERS modifican arra_aux, es necesario igualarlo al arra original
	this.array = Object.clone(this.array_aux);

}

var NuevaGrafica = function(id,idContainer,canvas,permitirInteraccion){
	json_construccion_grafica = {
		"type":"grafica",
		'id':id,
		"tag": 'div',
		"location":{
			"x":"50",
			"y":"50"
		},
		"area":idContainer,
		"size":{
			"width":"100",
			"height":"100"
		},
		"class":{

		},
		"style":{
			"z-index":'0'
		},
		"enable":true,
		"children":[
			{
				"type":"grafica",
				"tag":'div',
				"location":{
					"x":"50",
					"y":"50"
				},
				"size":{
					"width":"200",
					"height":"200"
				},
				"class":{

				},
				"style":{


				},
				"style":{
					"z-index":'0'
				},

				"ready":false,
				"updating":false,
				"view":"gDefault",
				"chartConfig":{
					exporting: { enabled: false },
					"chart":{
						"type": 'column',
						"backgroundColor": "#ECF8FB",
						reflow: true
					},
					"title":{
						"text":"Title",
						'align':'center',
						//'verticalAlign':'top',
						'floating':false,
						"style":{
							"color": "black",
							"display":'block',
							"font-weight":"normal",
							'font-size':'100%',
							"text-decoration":"none",
							"text-transform":"none",
							"line-height":"1",
							"letter-spacing":"0px",
							"word-spacing":"0px",
						}
					},
					"subtitle":{
						"text": "Subtitle",
						'align':'center',
						//'verticalAlign':'top',
						'floating':false,
						"style":{
							"color": "black",
							"display":'block',
							"font-weight":"normal",
							'font-size':'100%',
							"text-decoration":"none",
							"text-transform":"none",
							"line-height":"1",
							"letter-spacing":"0px",
							"word-spacing":"0px",
						}
					},
					'legend':{
						'align':'center',
						'layout':'horizontal',
						'verticalAlign':'bottom',
						 shadow:true,
						 'backgroundColor':'#FDFFFC',
						 floating: false,
					},
					"xAxis":{

						"categories":['',''],

						"categories":['','','','','','',''],
					    "labels": {
				            "enabled": true
				        }
					},
					"yAxis":{
					    "labels": {
				            "enabled": true
				        }

					},
					"tooltip":{
						"pointFormat": "<b>{point.y}</b>"
					},
					"credits":{
						"enable":true
					},
				    "plotOptions": {
				    	
				    	"scatter": {
				        	"animation": false,
				            "dataLabels": {
				                "enabled": false
				            },
				            "enableMouseTracking": false
				        },
				        "line": {
				        	"animation": false,
				            "dataLabels": {
				                "enabled": true
				            },
				            "enableMouseTracking": true
				        },
				       	"column": {
				        	"animation": false,
				            "dataLabels": {
				                "enabled": true
				            },
				            "enableMouseTracking": true
				        },
				   		"bar": {
				        	"animation": false,
				            "dataLabels": {
				                "enabled": true
				            },
				            "enableMouseTracking": true
				        },

				    },
					"series":[{}]			
				},
				"data":[
				/*
					{
		            name: 'Hombres',
		            data: [1, 4]
		        	}, 
		        	{
		            name: 'Mujeres',
		            data: [5, 3]
		        	}
		        	*/
		        ],
				"data_source":{
					
					graphicId : 0,
					xAxis: 'age',
					yAxis: 'none',
					xAxisName : 'xAxisName',
					yAxisName: 'yAxisName',
					men: 1,
					women:1,
					//graphicType : 'Line',
					promotion:'All',
					/******************
					INICIAR gClustering
					******************/
					clusterTags:{'age':true, 'city':true,'country':false,'gender':false},
					numberOfClusters:2,
					clusterConfig:undefined	,
					idResponse:undefined,
					/******************
					FIN gClustering
					******************/
				}
			},
			{
				"type":"none",
				"tag":"div",
				"style":{
					"z-index":'20',
					"visibility":"hidden",
				},
				"class":{
					"loader":"loader"
				}

			},
		]

	};

	//Creamos una nueva gráfica utilizando el otro tipo de dato!
	var grafica = new Grafica(id,json_construccion_grafica,idContainer,permitirInteraccion);
	//Dibujamos el nuevo texto
	grafica.DibujarControl();
	//Agregamos el objeto a la lista global de controles para su referencia para la edicion
	lista_controles.push(grafica);

}


Grafica.prototype ={
	//Regresa el control final
	ObtenerControl:function(callback){	
		node_empaquetado = this.EmpaquetarControlHijo(this.array)[0];
		//Es  necesario agregar el data dentro se series
		this.array.chartConfig.series = this.array.data;
		//Creamos la gráfica sin que sea mostrada en pantalla
		this.chart = new Highcharts.chart(node_empaquetado,this.array.chartConfig);

		callback(node_empaquetado);//Manda el control al callback
		//this.Actualizar();//Pruebas!
	},
	//Actualiza los datos que toma la funcion desde el datasource
	RefrescarDatos:function(){
		
	},
	//Obtiene los hijos para agregar al contenedor principal
  	EmpaquetarControlHijo:function(array_){
  		//Creamos un nuevo objeto de la clase convertidora json a html
  		var jTh = new JsonToHtml();
		var nodes = jTh.Convertir(array_);
		return nodes;
  	},
  	//Definicion y empaquetamiento del contenedor principal
  	EmpaquetarControlPadre:function(nodes){//Ya no se utiliza
  		main_control = document.createElement( "div" );
		main_control.setAttribute("id",this.getId());
		main_control.setAttribute("style","width: 200px; height: 200px");
		if(nodes != null){
			while(nodes.length > 0){
				main_control.appendChild(nodes[0]);
			}
		}

		return main_control;
  	},
  	DibujarControl:function(array_){//Esta funcion difiera a los demas controles

  		if(array_ == null){
  			array_ = this.getChartConfig();
  		}else{
  			//Esta linea es identica a this.setChartSeries( this.getChildData() );
  			array_.children[0].chartConfig.series = array_.children[0].data; //Esto nos ayuda a ordenar los datos independiente del origin (array, array_aux)
  			array_ = array_.children[0].chartConfig;
  		}

  		 //Si el control NO se esta en el DOM
  		if(document.getElementById(this.getParentId()) == null){
  			node_empaquetado = this.EmpaquetarControlHijo(this.array)[0];
			//Es  necesario agregar el data dentro se series
			this.setChartSeries( this.getChildData() );
			//this.AplicarClusterConfig();//Colores y nombre a las series

			//Creamos la gráfica sin que sea mostrada en pantalla;//Hacemos la busqueda de otro div ya que estan anidados
			////this.chart = new Highcharts.chart(node_empaquetado.getElementsByTagName(this.getParentTag())[0],this.getChartConfig());//cambiamos el chart config
			this.chart = new Highcharts.chart(node_empaquetado.getElementsByTagName(this.getParentTag())[0],array_);
			this.chart.setSize(this.getParentWidth(),this.getParentHeight(),doAnimation=false);
			//Agregamos todo el control al nodo padre
  			document.getElementById(this.getParentArea()).appendChild(
  				node_empaquetado
  			);
  		}else{//El control YA esta en el DOM
  			//Obtenemos el nodo padres
			var padre = document.getElementById(this.getParentId()).parentNode;
  			//Eliminamos el control desde el padre
  			padre.removeChild(document.getElementById(this.getParentId()));

  		  			
  			
  			//Identico a la parte superior (IF)
  			//Agregamos el control desde el padres
  			node_empaquetado = this.EmpaquetarControlHijo(this.array)[0];


			//Es  necesario agregar el data dentro se series
			this.setChartSeries( this.getChildData() ); // ESTA LINEA PUEDE GENERAR BUGS!
			//this.AplicarClusterConfig();//Colores,nombres y visibilidad a las series


			//Creamos la gráfica sin que sea mostrada en pantalla;//Hacemos la busqueda de otro div ya que estan anidados
			/////this.chart = new Highcharts.chart(node_empaquetado.getElementsByTagName(this.getParentTag())[0],this.getChartConfig());//Cambiamos el chart config
			this.chart = new Highcharts.chart(node_empaquetado.getElementsByTagName(this.getParentTag())[0],array_);
			this.chart.setSize(this.getParentWidth(),this.getParentHeight(),doAnimation=false);
			//Agregamos todo el control al nodo padre
  			padre.appendChild(
  				node_empaquetado
  			);
  			


			//Ajuste, para evitar redibujar -> Mover a los get  set de los controles
			jQuery("#" + this.getParentId()).css("top",this.getParentY());
			jQuery("#" + this.getParentId()).css("left",this.getParentX());
/*
			//Ajustamos el loader
			jQuery("#" + this.getParentId()  + "  .loader " ).width(
				( jQuery("#" + this.getParentId()).width() / 2 )
			);
			jQuery("#" + this.getParentId()  + "  .loader " ).height(
				( jQuery("#" + this.getParentId()).width() / 2 )
			);
*/
  		}



  		if(this.permitirInteraccion){
  			 //Agregamos eventos!
	  		this.AgregarEventoCambioPlantilla();
	  		this.AgregarEventoDraggable();
	  		this.AgregarEventoResizable(); 
  		}
 
  	},
  	ActualizarArray: function(){
		this.DibujarControl(this.array_aux);
  	},
	//Funcion para actualizar el contenido del img
  	Actualizar:function(){
  		//Si se va a guardar el cambio es necesario intercambiar los valores de las variables
  		//Entre el array_aux (Trae los ultimos cambios) y el array que es el que se redibuja
  		this.array = Object.clone(this.array_aux);
  		//Dibujamos el control
  		this.DibujarControl(this.array);
  		console.log("Actualizar()! ");
  	},
  	CancelarActualizacion:function(){
  		//Si se va a guardar el cambio es necesario intercambiar los valores de las variables
  		//Entre el array_aux (Trae los ultimos cambios) y el array que es el que se redibuja
  		this.array_aux = Object.clone(this.array);
  		//Dibujamos el control
  		this.DibujarControl(this.array);
  	},


//Se agrega el evento click para hace el cambio de plantilla en la vista de detalle desde Angula y ui-rute
  	AgregarEventoCambioPlantilla:function(){
  		/*
  		var this_ = this;//Usamos esto para romper el scope, ya que no podemos utilizar this en callback (hace referencia a jquery!)
  		jQuery("#" + this.getParentId()).click(function(){
				//Obtenemos refencia del nodo que contiene el controlador general
				var node = document.getElementById(controlador_principal);
				//Llamamos un método del controlador general
				angular.element(node).scope().MostrarCaracteristicas(this_.getParentId());
				//Le decimoa a Angular que revise los cambios
				angular.element(node).scope().$apply();

				//Llamamos el constructor de Texto
				if(document.getElementById(this_.getControllerName()) != null){
									node = document.getElementById(this_.getControllerName());
					angular.element(node).scope().Constructor();
					angular.element(node).scope().$apply();					
				}

		});
		*/

		//la función addClicEventToChangeTemplate se encuentra en el archvo change_template_angular.js dentro de editor/common_events
  		if (typeof addClicEventToChangeTemplate !== "undefined") { // safe to use the function
		    addClicEventToChangeTemplate(this);
		}
  	},
  	//Esta función agrega el evento Drag al control así como todas las acciones sobre el evento
  	AgregarEventoDraggable:function(){
  		/*
  		var this_ = this;//Usamos esto para romper el scope, ya que no podemos utilizar this en callback (hace referencia a jquery!)
  		//Evento Draggable
  		jQuery("#" + this.getParentId()).draggable({ 
	        containment: '#' + this_.getParentArea(),
	        grid: [canvas.gridsize,canvas.gridsize],
	    });

  		//Evento Dragstop
	    jQuery("#" + this.getParentId()).on("dragstop", function(event, ui){
	    	//Es neceario rescribir estas función, me confundí :/
	    	//this_.setParentX(ui.position.left/canvas.gridsize);
	    	this_.setParentSizeGridX(ui.position.left/canvas.gridsize);
			//this_.setParentY(ui.position.top/canvas.gridsize);
			this_.setParentSizeGridY(ui.position.top/canvas.gridsize);
		    console.log( "SizeGrid: left: " + this_.getParentSizeGridX() + ", top: " + this_.getParentSizeGridY() );
		    console.log( "PX: left: " + this_.getParentX() + ", top: " + this_.getParentY() );
	    	//this_.ActualizarArray();
	    });
	    */

	    //la función addDraggableEvent se encuentra en el archvo draggable.js dentro de editor/common_events
  		if (typeof addDraggableEvent !== "undefined") { // safe to use the function
		    addDraggableEvent(this);
		}
  	},
  	//Esta función agrega el evento Resizable al control así como todas las acciones sobre el evento
  	AgregarEventoResizable:function(){
  		//la función addResizableEvent se encuentra en el archvo resizable.js dentro de editor/common_events
  		if (typeof addResizableEvent !== "undefined") { // safe to use the function
		    addResizableEvent(this);
		}


  		/*
  		var this_ = this;//Usamos esto para romper el scope, ya que no podemos utilizar this en callback (hace referencia a jquery!)
  		var resizable_class = "#" + this.getParentId();
		//var resizable_text = new Resizable(resizable_class);
		jQuery( resizable_class ).resizable();
		jQuery(resizable_class).resizable("option","grid",canvas.gridsize);
		jQuery(resizable_class).resizable("option","minWidth",canvas.gridsize);
		jQuery(resizable_class).resizable("option","minHeight",canvas.gridsize);
		jQuery(resizable_class).width(this_.getParentWidth());
		jQuery(resizable_class).height(this_.getParentHeight());

		//Creamos un evente para cuando se detenga el cambio de tamaño para actualizar la gráfica!
		jQuery(resizable_class).on("resizestop", function( event, ui ) {
			this_.setParentSizeGridWidth(ui.size.width/canvas.gridsize);
			console.log("x: " + ui.size.width/canvas.gridsize);
			this_.setParentSizeGridHeight(ui.size.height/canvas.gridsize);
			console.log("y: " + ui.size.height/canvas.gridsize);
			//this_.ActualizarArray();
		});

		//Creamos un evente para cuando se detenga el cambio de tamaño para actualizar la gráfica!
		jQuery(resizable_class).on("resize", function( event, ui ) {
			this_.setParentSizeGridWidth(ui.size.width/canvas.gridsize);
			console.log("x: " + ui.size.width/canvas.gridsize);
			this_.setParentSizeGridHeight(ui.size.height/canvas.gridsize);
			console.log("y: " + ui.size.height/canvas.gridsize);
			//this_.ActualizarArray();
		});
*/		

  	},
  	EliminarControl:function(){
  		//Eliminamos el control desde el control principal
  		document.getElementById(Global_IdContenedor).removeChild(document.getElementById(this.getParentId()));
  	},
  	AplicarClusterConfig:function(){
  		try{
  			var seriesAux = this.getChartSeries();
	  		for (var i = 0; i < this.getChildClusteringNumberOfClusters();i++){
	  			seriesAux[i].name = this.getChildClusteringClusterConfig()[i].name;
	  			seriesAux[i].color = this.getChildClusteringClusterConfig()[i].color;
	  			seriesAux[i].visible = this.getChildClusteringClusterConfig()[i].visible;
	  		}
	  		this.setChartSeries(seriesAux);
  		}
  		catch(err) {
    		console.log(err.message);
		}
  	},



}



/****************************
Propiedades Generales
*****************************/

Grafica.prototype.getConfig = function(){
	return (this.array);
};

Grafica.prototype.setConfig = function(config){
	this.array = (config);
};

Grafica.prototype.getSecundaryConfig = function(){
	return this.array_aux;
};

Grafica.prototype.setSecundaryConfig = function(config){
	this.array_aux = config;
};

Grafica.prototype.setControllerName = function(controllerName){
	this.controller_name = controllerName;
};

Grafica.prototype.getControllerName = function(){
	return this.controller_name;
};

Grafica.prototype.setChildReady = function(ready){
	this.array_aux.children[0].ready = ready;
};

Grafica.prototype.isChildReady = function(){
	return this.array_aux.children[0].ready;
};

Grafica.prototype.setChildUpdating = function(updating){

	console.log("Actualizando!!!!!!!")
	//console.log(this.array_aux.children[0].chartConfig.series);
	//console.log(this.array_aux.children[0].chartConfig.series.length);
	if(updating){ // Si no hay datos para graficar && se esta actualizando
	//#jQuery("#" + this.getParentId()  + "  .loader " ).css("z-index",20);
	jQuery("#" + this.getParentId()  + "  .loader " ).css("visibility","visible");
		console.log("2");
	}else if(!updating){
		jQuery("#" + this.getParentId()  + "  .loader " ).css("visibility","hidden");
		console.log("-1");
	}
	
	this.array_aux.children[0].updating = updating;
};

Grafica.prototype.isChildUpdating = function(){
	return this.array_aux.children[0].updating;
};

Grafica.prototype.setChildViewConfig = function(view){
	this.array_aux.children[0].view = view;
};

Grafica.prototype.getChildViewConfig = function(){
	return this.array_aux.children[0].view;
};

Grafica.prototype.getChildType = function(){
	return this.array_aux.children[0].type;
};

Grafica.prototype.setChildType = function(type){
	this.array_aux.children[0].type = type;
	//this.ActualizarArray();
};

Grafica.prototype.getParentId = function(){
	return this.array_aux.id;
};

Grafica.prototype.setParentId = function(id){
	this.array_aux.id = id;
	//this.ActualizarArray();
};

Grafica.prototype.getParentTag = function(){
	return this.array_aux.tag;
};

Grafica.prototype.setParentTag = function(tag){
	this.array_aux.tag = tag;
	//this.ActualizarArray();
};

Grafica.prototype.getChildTag = function(){
	return this.array_aux.children[0].tag;
};

Grafica.prototype.setChildTag = function(tag){
	this.array_aux.children[0].tag = tag;
	//this.ActualizarArray();
};

Grafica.prototype.getParentX = function(){
	return this.array_aux.location.x;
};

Grafica.prototype.setParentX = function(x){
	this.array_aux.location.x = x;
	//this.ActualizarArray();
};

Grafica.prototype.getChildX = function(){
	return this.array_aux.children[0].location.x;
};

Grafica.prototype.setChildX = function(x){
	this.array_aux.children[0].location.x = x;
	//this.ActualizarArray();
};

Grafica.prototype.getParentY = function(){
	return this.array_aux.location.y;
};

Grafica.prototype.setParentY = function(y){
	this.array_aux.location.y = y;
	//this.ActualizarArray();
};
Grafica.prototype.getChildY = function(){
	return this.array_aux.children[0].location.y;
};

Grafica.prototype.setChildY = function(y){
	this.array_aux.children[0].location.y = y;
	//this.ActualizarArray();
};

Grafica.prototype.getParentSizeGridX = function(){
	return this.array_aux.sizegridx;
};

Grafica.prototype.setParentSizeGridX = function(sizegridx){
	this.array_aux.sizegridx = sizegridx;
	this.setParentX(sizegridx * canvas.gridsize);
	//this.ActualizarArray();
};

Grafica.prototype.getParentSizeGridY = function(){
	return this.array_aux.sizegridy;
};

Grafica.prototype.setParentSizeGridY = function(sizegridy){
	this.array_aux.sizegridy = sizegridy;
	this.setParentY(sizegridy * canvas.gridsize);
	//this.ActualizarArray();
};
//

//
Grafica.prototype.getParentSizeGridWidth = function(){
	return this.array_aux.sizegridwidth;
};

Grafica.prototype.setParentSizeGridWidth = function(sizegridwidth){
	this.array_aux.sizegridwidth = sizegridwidth;
	this.setParentWidth(sizegridwidth * canvas.gridsize);
	//this.ActualizarArray();
};

Grafica.prototype.getParentSizeGridHeight = function(){
	return this.array_aux.sizegridheight;
};

Grafica.prototype.setParentSizeGridHeight = function(sizegridheight){
	this.array_aux.sizegridheight = sizegridheight;
	this.setParentHeight(sizegridheight * canvas.gridsize);
	//this.ActualizarArray();
};
//

//
Grafica.prototype.getParentArea = function(){
	return this.array_aux.area;
};

Grafica.prototype.setParentArea = function(area){
	this.array_aux.area = area;
	//this.ActualizarArray();
};

Grafica.prototype.getParentWidth = function(){
	return this.array_aux.size.width;
};

Grafica.prototype.setParentWidth = function(width){
	this.array_aux.size.width = width;
	if(this.chart != null || this.chart != undefined){
		this.chart.setSize(width,this.getParentHeight(),doAnimation=true);	
	}
	
	//this.ActualizarArray();
};

Grafica.prototype.getChildWidth = function(){
	return this.array_aux.children[0].width;
};

Grafica.prototype.setChildWidth = function(width){
	this.array_aux.children[0].children[0].width = width;
	//this.ActualizarArray();
};


Grafica.prototype.getParentHeight = function(){
	return this.array_aux.size.height;
};

Grafica.prototype.setParentHeight = function(height){
	this.array_aux.size.height = height;
	if(this.chart != null || this.chart != undefined){
		this.chart.setSize(this.getParentWidth(),height,doAnimation=true);	
	}
	
	//this.ActualizarArray();
};

Grafica.prototype.getChildHeight = function(){
	return this.array_aux.children[0].height;
};

Grafica.prototype.setChildHeight = function(height){
	this.array_aux.children[0].height = height;
	//this.ActualizarArray();
};

Grafica.prototype.getChildData = function(){
	return this.array_aux.children[0].data;
};

Grafica.prototype.setChildData = function(data){
	//this.array_aux.children[0].data = data;
	//data.forEach(function(item,index){
	//	this.array_aux.children[0].data[index].data = item.data;
	//	this.array_aux.children[0].data[index].name = item.name;
	//});
	var aux = [];
	for (var i = 0;  i < data.length;i++){
		if(i >= this.array_aux.children[0].data.length)
			break;
		if(this.array_aux.children[0].data[i].color !== undefined)
			data[i].color = this.array_aux.children[0].data[i].color;
		if(this.array_aux.children[0].data[i].visible !== undefined)
			data[i].visible = this.array_aux.children[0].data[i].visible
	}

	this.array_aux.children[0].data = data;
};

Grafica.prototype.getChildDataSource = function(){
	return this.array_aux.children[0].data_source;
};

Grafica.prototype.setChildDataSource = function(dataSource){
	this.array_aux.children[0].data_source = dataSource;
	//this.ActualizarArray();
};

//Class
//Style
Grafica.prototype.getParentEnable = function(){
	return this.array_aux.enable;
};

Grafica.prototype.setParentEnable = function(enable){
	this.array_aux.enable = enable;
	//this.ActualizarArray();
};






/******************************
Propiedades de Gráfica!
******************************/

//Inicio Propiedades chart
Grafica.prototype.getCharttype = function(){
	return this.array_aux.children[0].chartConfig.chart.type;
};

Grafica.prototype.setCharttype = function(charttype){
	this.array_aux.children[0].chartConfig.chart.type = charttype;
	//this.ActualizarArray();
};


Grafica.prototype.getChildXAxis = function(){
	//return this.array_aux.children[0].data_source.graphicType;
	return this.array_aux.children[0].chartConfig.xAxis;
};

Grafica.prototype.setChildXAxis = function(xAxis){
	//return this.array_aux.children[0].data_source.graphicType;
	this.array_aux.children[0].chartConfig.xAxis = xAxis;
};

Grafica.prototype.getChildYAxis = function(){
	//return this.array_aux.children[0].data_source.graphicType;
	return this.array_aux.children[0].chartConfig.yAxis;
};

Grafica.prototype.setChildYAxis = function(yAxis){
	//return this.array_aux.children[0].data_source.graphicType;
	this.array_aux.children[0].chartConfig.yAxis = yAxis;
};



Grafica.prototype.getCharBackgroundColor = function(){
	return this.array_aux.children[0].chartConfig.chart.backgroundColor;
};

Grafica.prototype.setCharBackgroundColor = function(backgroundColor){
	this.array_aux.children[0].chartConfig.chart.backgroundColor = backgroundColor;
	if(this.chart != null || this.chart != undefined){
		this.chart.update({ chart:{'backgroundColor':backgroundColor} })
	}
	
	//this.ActualizarArray();
};
//Fin Propiedades chart

Grafica.prototype.getChartConfig = function(){
	return this.array_aux.children[0].chartConfig;
}

Grafica.prototype.setChartConfig = function(chartConfig){
	this.array_aux.children[0].chartConfig = chartConfig;
	//this.ActualizarArray();
}

Grafica.prototype.getChartSeries = function(){
	return this.array_aux.children[0].chartConfig.series;
}

Grafica.prototype.setChartSeries = function(series){
	this.array_aux.children[0].chartConfig.series = series;
	//this.ActualizarArray();
}

Grafica.prototype.setParentStyleZIndex= function(zIndex){
	this.array_aux.style["z-index"] = zIndex;
	jQuery("#" + this.getParentId()  ).css("z-index",zIndex);////////////////////////////////////
	//this.ActualizarArray();
};

Grafica.prototype.getParentStyleZIndex = function(){
	return this.array_aux.style["z-index"];
};






//////////////////////////
//////////////////////////
/////////////////////////
//Inicio Propiedades title

Grafica.prototype.setTitleEnable = function(isEnable){
	this.array_aux.children[0].chartConfig.title.style.display = isEnable? 'block':'none';
	if(this.chart != null || this.chart != undefined){
		this.chart.setTitle({  style:{display:isEnable? 'block':'none' }  });	
	}
};

Grafica.prototype.getTitleEnable = function(){
	//Simplificar
	return ! (this.array_aux.children[0].chartConfig.title.style.display.localeCompare('none') == 0) ;
};

Grafica.prototype.getTitle = function(){
	return this.array_aux.children[0].chartConfig.title.text;
};

Grafica.prototype.setTitle = function(title){
	this.array_aux.children[0].chartConfig.title.text = title;
	if(this.chart != null || this.chart != undefined){
		this.chart.setTitle({text:title});	
	}
	//this.ActualizarArray();
};

Grafica.prototype.getTitleColor = function(){
	return this.array_aux.children[0].chartConfig.title.style.color;
};

Grafica.prototype.setTitleColor = function(colortitle){
	this.array_aux.children[0].chartConfig.title.style.color = colortitle;
	if(this.chart != null || this.chart != undefined){
		this.chart.setTitle({  style:{color:colortitle}  });	
	}
	//this.ActualizarArray();
};

Grafica.prototype.getTitleTextAlign = function(){
	return this.array_aux.children[0].chartConfig.title.align;
};

Grafica.prototype.setTitleTextAlign = function(textAlign){
	this.array_aux.children[0].chartConfig.title.align = textAlign;
	if(this.chart != null || this.chart != undefined){
		this.chart.setTitle({align:textAlign});	
	}
};


Grafica.prototype.setTitleVerticalAlign = function(verticalAlign){
	this.array_aux.children[0].chartConfig.title.verticalAlign = verticalAlign;
	if(this.chart != null || this.chart != undefined){
		this.chart.setTitle({verticalAlign:verticalAlign});	
	}
};

Grafica.prototype.getTitleVerticalAlign = function(){
	return this.array_aux.children[0].chartConfig.title.verticalAlign;
};

Grafica.prototype.getTitleFontWeight = function(){
	return this.array_aux.children[0].chartConfig.title.style['font-weight'];
};

Grafica.prototype.setTitleFontWeight = function(fontWeight){
	this.array_aux.children[0].chartConfig.title.style['font-weight'] = fontWeight;
	if(this.chart != null || this.chart != undefined){
		this.chart.setTitle( { style:{ 'font-weight': fontWeight } } );	
	}
};

Grafica.prototype.getTitleFontSize = function(){
	return this.array_aux.children[0].chartConfig.title.style['font-size'];
};

Grafica.prototype.setTitleFontSize = function(fontSize){
	this.array_aux.children[0].chartConfig.title.style['font-size'] = fontSize;
	if(this.chart != null || this.chart != undefined){
		this.chart.setTitle( { style:{ 'font-size': fontSize } } );	
	}
};

Grafica.prototype.getTitleFloating = function(){
	return this.array_aux.children[0].chartConfig.title.floating;
};

Grafica.prototype.setTitleFloating = function(titleFloating){
	this.array_aux.children[0].chartConfig.title.floating = titleFloating;
	if(this.chart != null || this.chart != undefined){
		this.chart.setTitle( { floating:titleFloating } );	
	}
};

Grafica.prototype.getTitleTextDecoration = function(){
	return this.array_aux.children[0].chartConfig.title.style['text-decoration'];
};

Grafica.prototype.setTitleTextDecoration = function(textDecoration){
	this.array_aux.children[0].chartConfig.title.style['text-decoration'] = textDecoration;
	if(this.chart != null || this.chart != undefined){
		this.chart.setTitle( { style:{ 'text-decoration':textDecoration } } );	
	}
};

Grafica.prototype.getTitleTextTransform = function(){
	return this.array_aux.children[0].chartConfig.title.style['text-transform'];
};

Grafica.prototype.setTitleTextTransform = function(textTransform){
	this.array_aux.children[0].chartConfig.title.style['text-transform'] = textTransform;
	if(this.chart != null || this.chart != undefined){
		this.chart.setTitle( { style:{ 'text-transform':textTransform } } );	
	}
};

Grafica.prototype.getTitleLetterSpacing = function(){
	return this.array_aux.children[0].chartConfig.title.style['letter-spacing'];
};

Grafica.prototype.setTitleLetterSpacing = function(letterSpacing){
	this.array_aux.children[0].chartConfig.title.style['letter-spacing'] = letterSpacing;
	if(this.chart != null || this.chart != undefined){
		this.chart.setTitle( { style:{ 'letter-spacing':letterSpacing } } );	
	}
};


Grafica.prototype.getTitleWordSpacing = function(){
	return this.array_aux.children[0].chartConfig.title.style['word-spacing'];
};

Grafica.prototype.setTitleWordSpacing = function(wordSpacing){
	this.array_aux.children[0].chartConfig.title.style['word-spacing'] = wordSpacing;
	if(this.chart != null || this.chart != undefined){
		this.chart.setTitle( { style:{ 'word-spacing':wordSpacing } } );	
	}
};
///////////////////////
///////////////////////
///////////////////////
//Fin Propiedades title




//////////////////////////
//////////////////////////
/////////////////////////
//Inicio Propiedades subtitle

Grafica.prototype.setSubtitleEnable = function(isEnable){
	this.array_aux.children[0].chartConfig.subtitle.style.display = isEnable? 'block':'none';
	if(this.chart != null || this.chart != undefined){
		this.chart.setTitle(null, {  style:{display:isEnable? 'block':'none' }  });	
	}
};

Grafica.prototype.getSubtitleEnable = function(){
	//Simplificar
	return ! (this.array_aux.children[0].chartConfig.subtitle.style.display.localeCompare('none') == 0) ;
};

Grafica.prototype.getSubtitle = function(){
	return this.array_aux.children[0].chartConfig.subtitle.text;
};

Grafica.prototype.setSubtitle = function(title){
	this.array_aux.children[0].chartConfig.subtitle.text = title;
	if(this.chart != null || this.chart != undefined){
		this.chart.setTitle(null, {text:title});	
	}
	//this.ActualizarArray();
};

Grafica.prototype.getSubtitleColor = function(){
	return this.array_aux.children[0].chartConfig.subtitle.style.color;
};

Grafica.prototype.setSubtitleColor = function(colortitle){
	this.array_aux.children[0].chartConfig.subtitle.style.color = colortitle;
	if(this.chart != null || this.chart != undefined){
		this.chart.setTitle(null, {  style:{color:colortitle}  });	
	}
	//this.ActualizarArray();
};

Grafica.prototype.getSubtitleTextAlign = function(){
	return this.array_aux.children[0].chartConfig.subtitle.align;
};

Grafica.prototype.setSubtitleTextAlign = function(textAlign){
	this.array_aux.children[0].chartConfig.subtitle.align = textAlign;
	if(this.chart != null || this.chart != undefined){
		this.chart.setTitle(null, {align:textAlign});	
	}
};

Grafica.prototype.setSubtitleVerticalAlign = function(verticalAlign){
	this.array_aux.children[0].chartConfig.subtitle.verticalAlign = verticalAlign;
	if(this.chart != null || this.chart != undefined){
		this.chart.setTitle(null,{verticalAlign:verticalAlign});	
	}
};

Grafica.prototype.getSubtitleVerticalAlign = function(){
	return this.array_aux.children[0].chartConfig.subtitle.verticalAlign;
};

Grafica.prototype.getSubtitleFontWeight = function(){
	return this.array_aux.children[0].chartConfig.subtitle.style['font-weight'];
};

Grafica.prototype.setSubtitleFontWeight = function(fontWeight){
	this.array_aux.children[0].chartConfig.subtitle.style['font-weight'] = fontWeight;
	if(this.chart != null || this.chart != undefined){
		this.chart.setTitle(null,  { style:{ 'font-weight': fontWeight } } );	
	}
};

Grafica.prototype.getSubtitleFontSize = function(){
	return this.array_aux.children[0].chartConfig.subtitle.style['font-size'];
};

Grafica.prototype.setSubtitleFontSize = function(fontSize){
	this.array_aux.children[0].chartConfig.subtitle.style['font-size'] = fontSize;
	if(this.chart != null || this.chart != undefined){
		this.chart.setTitle(null,  { style:{ 'font-size': fontSize } } );	
	}
};

Grafica.prototype.getSubtitleFloating = function(){
	return this.array_aux.children[0].chartConfig.subtitle.floating;
};

Grafica.prototype.setSubtitleFloating = function(titleFloating){
	this.array_aux.children[0].chartConfig.subtitle.floating = titleFloating;
	if(this.chart != null || this.chart != undefined){
		this.chart.setTitle(null,  { floating:titleFloating } );	
	}
};

Grafica.prototype.getSubtitleTextDecoration = function(){
	return this.array_aux.children[0].chartConfig.subtitle.style['text-decoration'];
};

Grafica.prototype.setSubtitleTextDecoration = function(textDecoration){
	this.array_aux.children[0].chartConfig.subtitle.style['text-decoration'] = textDecoration;
	if(this.chart != null || this.chart != undefined){
		this.chart.setTitle(null,  { style:{ 'text-decoration':textDecoration } } );	
	}
};

Grafica.prototype.getSubtitleTextTransform = function(){
	return this.array_aux.children[0].chartConfig.subtitle.style['text-transform'];
};

Grafica.prototype.setSubtitleTextTransform = function(textTransform){
	this.array_aux.children[0].chartConfig.subtitle.style['text-transform'] = textTransform;
	if(this.chart != null || this.chart != undefined){
		this.chart.setTitle(null,  { style:{ 'text-transform':textTransform } } );	
	}
};

Grafica.prototype.getSubtitleLetterSpacing = function(){
	return this.array_aux.children[0].chartConfig.subtitle.style['letter-spacing'];
};

Grafica.prototype.setSubtitleLetterSpacing = function(letterSpacing){
	this.array_aux.children[0].chartConfig.subtitle.style['letter-spacing'] = letterSpacing;
	if(this.chart != null || this.chart != undefined){
		this.chart.setTitle(null,  { style:{ 'letter-spacing':letterSpacing } } );	
	}
};

Grafica.prototype.getSubtitleWordSpacing = function(){
	return this.array_aux.children[0].chartConfig.subtitle.style['word-spacing'];
};

Grafica.prototype.setSubtitleWordSpacing = function(wordSpacing){
	this.array_aux.children[0].chartConfig.subtitle.style['word-spacing'] = wordSpacing;
	if(this.chart != null || this.chart != undefined){
		this.chart.setTitle(null,  { style:{ 'word-spacing':wordSpacing } } );	
	}
};
///////////////////////
///////////////////////
///////////////////////
//Fin Propiedades subtitle
















Grafica.prototype.getLegendBackgroundColor = function(){
	return this.array_aux.children[0].chartConfig.legend.backgroundColor;
};

Grafica.prototype.setLegendBackgroundColor = function(backgroundColor){
	this.array_aux.children[0].chartConfig.legend.backgroundColor = backgroundColor; 
	if(this.chart != null || this.chart != undefined){
		this.chart.legend.update( {'backgroundColor':backgroundColor} );
	}
};

Grafica.prototype.getLegendAlign = function(){
	return this.array_aux.children[0].chartConfig.legend.align;
};

Grafica.prototype.setLegendAlign = function(align){
	this.array_aux.children[0].chartConfig.legend.align = align;
	if(this.chart != null || this.chart != undefined){
		this.chart.legend.update({'align':align,});	
	}
};

Grafica.prototype.getLegendLayout = function(){
	return this.array_aux.children[0].chartConfig.legend.layout;
};

Grafica.prototype.setLegendLayout = function(layout){
	this.array_aux.children[0].chartConfig.legend.layout = layout;
	if(this.chart != null || this.chart != undefined){
		this.chart.legend.update({'layout': layout,});	
	}
};

Grafica.prototype.getLegendVerticalAlign = function(){
	return this.array_aux.children[0].chartConfig.legend.verticalAlign;
};

Grafica.prototype.setLegendVerticalAlign = function(verticalAlign){
	this.array_aux.children[0].chartConfig.legend.verticalAlign = verticalAlign;
	if(this.chart != null || this.chart != undefined){
		this.chart.legend.update({'verticalAlign': verticalAlign,});	
	}
};

Grafica.prototype.getLegendShadow = function(){
	return this.array_aux.children[0].chartConfig.legend.shadow;
};

Grafica.prototype.setLegendShadow = function(shadow){
	this.array_aux.children[0].chartConfig.legend.shadow = shadow;
	if(this.chart != null || this.chart != undefined){
		this.chart.legend.update({'shadow': shadow,});	
	}
};

Grafica.prototype.getLegendFloating = function(){
	return this.array_aux.children[0].chartConfig.legend.floating;
};

Grafica.prototype.setLegendFloating = function(floating){
	this.array_aux.children[0].chartConfig.legend.floating = floating;
	if(this.chart != null || this.chart != undefined){
		this.chart.legend.update({'floating': floating,});	
	}
};







//INICIO PROPIEDADES CONFIGURACIÓN DATOS GRAFICA

Grafica.prototype.setId = function(graficId){
	this.array_aux.children[0].data_source.graphicId = graphicId;
};

Grafica.prototype.getId = function(){
	return  this.array_aux.children[0].data_source.graphicId;
};



Grafica.prototype.getChildDataSourcePromotion = function(){
	return this.array_aux.children[0].data_source.promotion;
};

Grafica.prototype.setChildDataSourcePromotion = function(promotion){
	this.array_aux.children[0].data_source.promotion = promotion;
};

Grafica.prototype.getChildDataSourceXAxis = function(){
	return this.array_aux.children[0].data_source.xAxis;
};

Grafica.prototype.setChildDataSourceXAxis = function(xAxis){
	this.array_aux.children[0].data_source.xAxis = xAxis;
	//this.ActualizarArray();
};


Grafica.prototype.getChildDataSourceYAxis = function(){
	return this.array_aux.children[0].data_source.yAxis;
};

Grafica.prototype.setChildDataSourceYAxis = function(yAxis){
	this.array_aux.children[0].data_source.yAxis = yAxis;
	//this.ActualizarArray();
};


Grafica.prototype.getChildDataSourceXAxisName = function(){
	return this.array_aux.children[0].data_source.xAxisName;
};

Grafica.prototype.setChildDataSourceXAxisName = function(xAxisName){
	this.array_aux.children[0].data_source.xAxisName = xAxisName;
	//this.ActualizarArray();
};


Grafica.prototype.getChildDataSourceYAxisName = function(){
	return this.array_aux.children[0].data_source.yAxisName;
};

Grafica.prototype.setChildDataSourceYAxisName = function(yAxisName){
	this.array_aux.children[0].data_source.yAxisName = yAxisName;
	//this.ActualizarArray();
};


Grafica.prototype.getChildDataSourceMen = function(){
	return this.array_aux.children[0].data_source.men;
};

Grafica.prototype.setChildDataSourceMen = function(men){
	this.array_aux.children[0].data_source.men = men;
	//this.ActualizarArray();
};

Grafica.prototype.getChildDataSourceWomen = function(){
	return this.array_aux.children[0].data_source.women;
};

Grafica.prototype.setChildDataSourceWomen = function(women){
	this.array_aux.children[0].data_source.women = women;
	//this.ActualizarArray();
};


Grafica.prototype.setChildDataSourceGraphicType = function(graphicType){
	//this.array_aux.children[0].data_source.graphicType = graphicType; 
	this.array_aux.children[0].chartConfig.chart.type =  graphicType;
};

Grafica.prototype.getChildDataSourceGraphicType = function(){
	//return this.array_aux.children[0].data_source.graphicType;
	return this.array_aux.children[0].chartConfig.chart.type;
};

Grafica.prototype.setChildDataSourceIdResponse = function(idResponse){
	this.array_aux.children[0].data_source.idResponse = idResponse;
};

Grafica.prototype.getChildDataSourceIdResponse = function(){
	return this.array_aux.children[0].data_source.idResponse === undefined? -1:this.array_aux.children[0].data_source.idResponse;
};


//FIN PROPIEDADES CONFIGURACIÓN DATOS GRAFICA



//INICIO PROPIEDADES gCLUSTER

/****************
Convierte de una lista ['gender']
a un diccionario en alto
****************/
Grafica.prototype.setChildClusteringTags = function(arrayTags){
	var tags = {};
	for (var i in arrayTags){
		tags[i]=true;
	}
	this.array_aux.children[0].data_source.clusterTags = tags;
};

/***************
Convierte de un diccionario {'age':1,'gender':0}
a un lista de valores en alto ['age']
***************/
Grafica.prototype.getChildClusteringTags = function(){
	var ct = this.array_aux.children[0].data_source.clusterTags;
	var tags = [];
	for (var i in ct) {
		if(ct[i] == 1)//Si es true
			tags.push(i);//La pura clave
	}
	return tags;
};


Grafica.prototype.addOrUpdateChildClusteringTag = function(key,value){
	//if (this.array_aux.children[0].data_source.clusterTags[key] === undefined)
	//	this.array_aux.children[0].data_source.clusterTags[key] = {};
	this.array_aux.children[0].data_source.clusterTags[key] = value;
};

Grafica.prototype.getChildClusteringTag = function(key){

	return this.array_aux.children[0].data_source.clusterTags[key]===undefined?false:this.array_aux.children[0].data_source.clusterTags[key];
};




Grafica.prototype.setChildClusteringNumberOfClusters = function(numberOfClusters){
	console.log("Guardando el número de clusters: " + numberOfClusters);
	this.array_aux.children[0].data_source.numberOfClusters = numberOfClusters;
};

Grafica.prototype.getChildClusteringNumberOfClusters = function(){
	console.log("Retornando el número de clusters: " + this.array_aux.children[0].data_source.numberOfClusters);
	return this.array_aux.children[0].data_source.numberOfClusters;
};


Grafica.prototype.getChildClusteringClusterConfig = function(){
	///if (this.array_aux.children[0].data_source.clusterConfig === undefined || this.array_aux.children[0].data_source.clusterConfig.length == 0)
		//this.setChildClusteringClusterConfig( this.getChildData() );
		return this.getChildData();
	///return this.array_aux.children[0].data_source.clusterConfig;
	//return this.getChildData();
};

Grafica.prototype.setChildClusteringClusterConfig = function(clusterConfig){
	//this.array_aux.children[0].data_source.clusterConfig = clusterConfig;
	//this.setChildData(clusterConfig)

	///this.array_aux.children[0].data = data;
	/*
	clusterConfig.forEach(function(item,index){
		this.array_aux.children[0].data[index].data = item.data;
	});*/
	for (var i = 0; i < clusterConfig.length; i++){
		this.array_aux.children[0].data[i].name = clusterConfig[i].name;
		this.array_aux.children[0].data[i].color = clusterConfig[i].color;
		this.array_aux.children[0].data[i].visible = clusterConfig[i].visible;
	}
};

//FIN PROPIEDADES gCLUSTER





