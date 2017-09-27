var Imagen = function(id,array,idContainer,permitirInteraccion){


	/*********************************
	INICIO VARIBLES PROPIAS DEL CONTOL
	*********************************/
	this.setControllerName('controlador_imagen');//Que controlador angular utiliza


	/*********************************
	FIN VARIBLES PROPIAS DEL CONTOL
	*********************************/

	this.permitirInteraccion = permitirInteraccion;

	this.array = Object.clone(array);
	this.array_aux = Object.clone(array);

	//Preparación del control según las proporciones
	this.setParentX(this.getParentSizeGridX() * canvas.gridsize);
	this.setParentY(this.getParentSizeGridY() * canvas.gridsize);

	//this.setParentWidth(this.getParentSizeGridWidth() * canvas.gridsize);
	//this.setParentHeight(this.getParentSizeGridHeight() * canvas.gridsize);

	//Al establecer el SizeGrid Automaticamente se calcula el ancho  y alto
	this.setParentSizeGridWidth( this.getParentSizeGridWidth()==null?Global_Default_Size_Control.width:this.getParentSizeGridWidth() );
	this.setParentSizeGridHeight( this.getParentSizeGridHeight()==null?Global_Default_Size_Control.height:this.getParentSizeGridHeight() );


	//Cómo los GETTERS & SETTERS modifican arra_aux, es necesario igualarlo al arra original
	this.array = Object.clone(this.array_aux);
}

var NuevaImagen = function(id,idContainer,canvas,permitirInteraccion){
	json_construccion_img = {
		"type": "imagen",
		'id':id,
		'tag':'div',
		"location": {
			"x": "200px",
			"y": "200px"
		},
		"area":idContainer,
		"size": {
			"width": "200px",
			"height": "200px"
		},
		"class":{
		},
		"style": {
		},
		"enable":true,
		"children":[{
			"type": "imagen",
			"tag":"img",
			"location": {
				"x": "200px",
				"y": "200px"
			},
			"size": {
				"width": "200px",
				"height": "200px",
				"z-index":"0"
			},

			"class":{
			},
			"style": {
			},
			"enable":true,
			"src": "http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png",
		}]
	};
	//Creamos una nueva imagen
	var imagen = new Imagen(id,json_construccion_img,idContainer,permitirInteraccion);
	//Dibujamos la imagen
	imagen.DibujarControl();
	//Agregamos el objeto a la lista global de controles para su referencia para la edicion
	lista_controles.push(imagen);
}


Imagen.prototype = {
	//Regresa el control final
	ObtenerControl:function(callback){	
		node_empaquetado = this.EmpaquetarControlHijo(this.array)[0];
		callback(node_empaquetado);//Manda el control al callback
		//this.Actualizar();//Pruebas!
	},
	//Actualiza los datos que toma la funcion desde el datasource
	RefrescarDatos:function(){
		
	},
  	//Obtiene los hijos para agregar al contenedor principal
  	EmpaquetarControlHijo:function(array_){
  		var jTh = new JsonToHtml();
		var nodes = jTh.Convertir(array_);
		//var node_text=this.AgregarTexto( nodes );//Objeto que se eliminar
		return nodes;
  	},
  	//Definicion y empaquetamiento del contenedor principal
  	EmpaquetarControlPadre:function(nodes){//Ya  no se utiliza! ?
  		main_control = document.createElement( "div" );
		main_control.setAttribute("id",this.getParentId());
		while(nodes.length > 0){
			main_control.appendChild(nodes[0]);
		}
		return main_control;
  	},
  	DibujarControl:function(array_){
  		console.log("Texto numero: " + (numero_imagen_contructor++) + "; ID " + this.getParentId());
		//Si el control NO se esta en el DOM
  		if(document.getElementById(this.getParentId()) == null){
  			//Agregamos todo el control al nodo padre
  			document.getElementById(this.getParentArea()).appendChild(
  				this.EmpaquetarControlHijo(
  					//array_ == null?this.getConfig():array_
  					array_ == null?this.getSecundaryConfig():array_
  				)[0]
  			);
  		}else{//El control YA esta en el DOM
  			//Obtenemos el nodo padres
			var padre = document.getElementById(this.getParentId()).parentNode;
  			//Eliminamos el control desde el padre
  			padre.removeChild(document.getElementById(this.getParentId()));
  			//Agregamos el control desde el padres
  			padre.appendChild(
  				this.EmpaquetarControlHijo(
  					//array_ == null?this.getConfig():array_
  					array_ == null?this.getSecundaryConfig():array_
  				)[0]
  			);
  		}

  		if(this.permitirInteraccion){
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
  		//Ya que se cancelo la actualización, igualamos nuestro array auxiliar a 
  		//nuestro array base
  		this.array_aux = Object.clone(this.array);
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
				node = document.getElementById(this_.getControllerName());
				angular.element(node).scope().Constructor();
				angular.element(node).scope().$apply();
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
  		/*
  		var this_ = this;//Usamos esto para romper el scope, ya que no podemos utilizar this en callback (hace referencia a jquery!)
  		var resizable_class = "#" + this.getParentId();
		//var resizable_text = new Resizable(resizable_class);
		jQuery( resizable_class ).resizable();//Ordenar propiedaes  meternlas en un solo array!
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
		*/

		if (typeof addResizableEvent !== "undefined") { // safe to use the function
		    addResizableEvent(this);
		}



		////BUG!
		//Dado que en el arreglo de definición por defecto de los controles se manejan solo pixeles,
		// es imposible por el momento manejar otra unidad de medida, por eso hay harcodear el 100% del ancho  y alto
		jQuery("#" + this.getParentId() + " " + this.getChildTag() ).attr({
			"width":"100%",
			"height":"100%"
		});

  	},
  	EliminarControl:function(){
  		//Eliminamos el control desde el control principal
  		document.getElementById(Global_IdContenedor).removeChild(document.getElementById(this.getParentId()));
  	}


}



/****************************
Propiedades Generales
*****************************/

Imagen.prototype.getConfig = function(){
	return (this.array);
};

Imagen.prototype.setConfig = function(config){
	this.array = (config);
};

Imagen.prototype.getSecundaryConfig = function(){
	return this.array_aux;
};

Imagen.prototype.setSecundaryConfig = function(config){
	this.array_aux = config;
};

Imagen.prototype.setControllerName= function(controllerName){
	this.controller_name = controllerName;
};

Imagen.prototype.getControllerName= function(){
	return this.controller_name;
};

Imagen.prototype.getChildType = function(){
	return this.array_aux.children[0].type;
};

Imagen.prototype.setChildType = function(type){
	this.array_aux.children[0].type = type;
	//this.ActualizarArray();
};

Imagen.prototype.getParentId = function(){
	return this.array_aux.id;
};

Imagen.prototype.setParentId = function(id){
	this.array_aux.id = id;
	//this.ActualizarArray();
};

Imagen.prototype.getParentTag = function(){
	return this.array_aux.tag;
};

Imagen.prototype.setParentTag = function(tag){
	this.array_aux.tag = tag;
	//this.ActualizarArray();
};

Imagen.prototype.getChildTag = function(){
	return this.array_aux.children[0].tag;
};

Imagen.prototype.setChildTag = function(tag){
	this.array_aux.children[0].tag = tag;
	//this.ActualizarArray();
};

Imagen.prototype.getParentX = function(){
	return this.array_aux.location.x;
};

Imagen.prototype.setParentX = function(x){
	this.array_aux.location.x = x;
	//this.ActualizarArray();
};

Imagen.prototype.getChildX = function(){
	return this.array_aux.children[0].location.x;
};

Imagen.prototype.setChildX = function(x){
	this.array_aux.children[0].location.x = x;
	//this.ActualizarArray();
};

Imagen.prototype.getParentY = function(){
	return this.array_aux.location.y;
};

Imagen.prototype.setParentY = function(y){
	this.array_aux.location.y = y;
	//this.ActualizarArray();
};
Imagen.prototype.getChildY = function(){
	return this.array_aux.children[0].location.y;
};

Imagen.prototype.setChildY = function(y){
	this.array_aux.children[0].location.y = y;
	//this.ActualizarArray();
};

Imagen.prototype.getParentSizeGridX = function(){
	return this.array_aux.sizegridx;
};

Imagen.prototype.setParentSizeGridX = function(sizegridx){
	this.array_aux.sizegridx = sizegridx;
	this.setParentX(sizegridx * canvas.gridsize);
	//this.ActualizarArray();
};

Imagen.prototype.getParentSizeGridY = function(){
	return this.array_aux.sizegridy;
};

Imagen.prototype.setParentSizeGridY = function(sizegridy){
	this.array_aux.sizegridy = sizegridy;
	this.setParentY(sizegridy * canvas.gridsize);
	//this.ActualizarArray();
};

//
Imagen.prototype.getParentSizeGridWidth = function(){
	return this.array_aux.sizegridwidth;
};

Imagen.prototype.setParentSizeGridWidth = function(sizegridwidth){
	this.array_aux.sizegridwidth = sizegridwidth;
	this.setParentWidth(sizegridwidth * canvas.gridsize);
	//this.ActualizarArray();
};

Imagen.prototype.getParentSizeGridHeight = function(){
	return this.array_aux.sizegridheight;
};

Imagen.prototype.setParentSizeGridHeight = function(sizegridheight){
	this.array_aux.sizegridheight = sizegridheight;
	this.setParentHeight(sizegridheight * canvas.gridsize);
	//this.ActualizarArray();
};
//

Imagen.prototype.getParentArea = function(){
	return this.array_aux.area;
};

Imagen.prototype.setParentArea = function(area){
	this.array_aux.area = area;
	//this.ActualizarArray();
};

Imagen.prototype.getParentWidth = function(){
	return this.array_aux.size.width;
};

Imagen.prototype.setParentWidth = function(width){
	this.array_aux.size.width = width;
	jQuery("#" + this.getParentId()).css("width",width);
	//this.ActualizarArray();
};

Imagen.prototype.getChildWidth = function(){
	return this.array_aux.children[0].width;
};

Imagen.prototype.setChildWidth = function(width){
	this.array_aux.children[0].children[0].width = width;
	//this.ActualizarArray();
};


Imagen.prototype.getParentHeight = function(){
	return this.array_aux.size.height;
};

Imagen.prototype.setParentHeight = function(height){
	this.array_aux.size.height = height;
	jQuery("#" + this.getParentId()).css("height",height);
	//this.ActualizarArray();
};

Imagen.prototype.getChildHeight = function(){
	return this.array_aux.children[0].height;
};

Imagen.prototype.setChildHeight = function(height){
	this.array_aux.children[0].height = height;
	//this.ActualizarArray();
};

Imagen.prototype.getChildData = function(){
	return this.array_aux.children[0].data;
};

Imagen.prototype.setChildData = function(data){
	this.array_aux.children[0].data = data;
	//this.ActualizarArray();
};

Imagen.prototype.getChildDataSource = function(){
	return this.array_aux.children[0].data_source;
};

Imagen.prototype.setChildDataSource = function(dataSource){
	this.array_aux.children[0].data_source = dataSource;
	//this.ActualizarArray();
};

//Class
//Style
Imagen.prototype.getParentEnable = function(){
	return this.array_aux.enable;
};

Imagen.prototype.setParentEnable = function(enable){
	this.array_aux.enable = enable;
	//this.ActualizarArray();
};





/******************************
Propiedades de Imagen!
******************************/

Imagen.prototype.setChildSrc = function(src){
	this.array_aux.children[0].src = src;
	jQuery("#" + this.getParentId() + " " + this.getChildTag() ).attr("src",src);
	//this.ActualizarArray();
};

Imagen.prototype.getChildSrc = function(){
	return this.array_aux.children[0].src;
};

Imagen.prototype.setParentStyleZIndex= function(zIndex){
	this.array_aux.style["z-index"] = zIndex;
	jQuery("#" + this.getParentId()  ).css("z-index",zIndex);////////////////////////////////////
	//this.ActualizarArray();
};

Imagen.prototype.getParentStyleZIndex = function(){
	return this.array_aux.style["z-index"];
};






