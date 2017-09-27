var Texto = function(id,array,idContainer,permitirInteraccion){
	/*********************************
	INICIO VARIBLES PROPIAS DEL CONTOL
	*********************************/
	this.setControllerName('controlador_texto');//Que controlador angular utiliza


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

var NuevoTexto = function(id,idContainer,canvas,permitirInteraccion){
	//Todos los valores por defecto!!
	//Padre-contenedor->Hijo-ControlFinal
	json_construccion_text = {
		"type": "texto",
		'id':id,
		"tag": 'div',
		"location": {
			"x": "50",
			"y": "50"
		},
		"area":idContainer,
		"size": {
			"width": "100",
			"height":"100"
		},
		"class":{
		},
		"style": {
			"overflow":"hidden",
			"color": "#fff",
			"background-color": "#000",
			"font-family":"Georgia",
			"font-size":"large",
			"font-weight":"normal",
			"text-decoration":"none",
			"text-align":"left",
			"text-transform":"none",
			"line-height":"1",
			"letter-spacing":"0px",
			"word-spacing":"0px",
			"z-index":"0"
		},
		"enable": true,
		"children":[{
			"type": "texto",
			"tag": "span",
			"location": {
				"x": "10",
				"y": "10"
			},
			"size": {
				"width": "10",
				"height":"10"
			},
			"data": {
				"text": "Texto de prueba"
			},
			"data_source": {},
			"class":{
			},
			"style": {
				"font-size":"100%",
				"overflow": "auto",
				"color": "#fff",
				"background-color": "rgb(0,0,0,0)",//Alfa!
			},
		}], 
	};
	//Creamos un nuevo texto
	var texto = new Texto(id,json_construccion_text,idContainer,permitirInteraccion);
	//Dibujamos el nuevo texto
	texto.DibujarControl();
	//Agregamos el objeto a la lista global de controles para su referencia para la edicion
	lista_controles.push(texto);
}


Texto.prototype = {
	//Regresa el control final
	ObtenerControl:function(callback){	
		node_empaquetado = this.EmpaquetarControlHijo(this.array)[0];
		callback(node_empaquetado);//Manda el control al callback
	},
	//Actualiza los datos que toma la funcion desde el datasource
	RefrescarDatos:function(){
		if(typeof this.array.data.format == 'undefined'){
			//return this.array.data.text;
			return this.getChildText();
		}
		format_values = [];
		for(var i=0; i < this.array.data.format.length; i++){
			format_values.push(
					this.array.data_source[i]()//Utilizamos las funciones difinidas en el array de datos!
				);
		}
		this.setChildText(
			this.DarFormatoCadena(
				this.getChildText(),
				//this.array.data.format
				format_values
			)
		)
		;
	},
	//Funcion propia de texto, formatea la cadena
	DarFormatoCadena:function(cadena,args) {
	    return cadena.replace(/{(\d+)}/g, function(match, number) { 
	      return typeof args[number] != 'undefined'
	        ? args[number]
	        : match
	      ;
	    });
  	},
  	//Obtiene los hijos para agregar al contenedor principal
  	EmpaquetarControlHijo:function(array_){
  		var jTh = new JsonToHtml();
		var nodes = jTh.Convertir(array_);
		var node_text=this.AgregarTexto( nodes , array_.children[0].data.text);//Objeto que se eliminar
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
  	//Funcion propia de texto, agrega un textNode al spn
  	AgregarTexto:function(nodes,text){
  		text_node = document.createTextNode(text);
  		nodes[0].getElementsByTagName(this.getChildTag())[0].appendChild(text_node);
  		return nodes;
  	},
  	DibujarControl:function(array_){
	console.log("Texto numero: " + (numero_texto_contructor++) + "; ID " + this.getParentId());

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
  	ActualizarArray:function(){
  		//Redibujamos con nuevos valores (array_list contiene la lista con valores cambianetes)
  		this.DibujarControl(this.array_aux);
  	},
  	//Funcion para actualizar el contenido del span; llamada desde Angular
  	Actualizar:function(){//Redibujar control
  		//Si se va a guardar el cambio es necesario intercambiar los valores de las variables
  		//Entre el array_aux (Trae los ultimos cambios) y el array que es el que se redibuja
  		this.array = Object.clone(this.array_aux);
  		//Dibujamos el control
  		this.DibujarControl(this.array);
  		console.log("Actualizar()! ");

  	},
  	//Llamada desde Angular
  	CancelarActualizacion:function(){//Llamada similar al constructor
  		//Ya que se cancelo la actualización, igualamos nuestro array auxiliar a 
  		//nuestro array base
  		this.array_aux = Object.clone(this.array);
  		this.DibujarControl(this.array);
  	},
  	//Se agrega el evento click para hace el cambio de plantilla en la vista de detalle desde Angula y ui-rute
  	AgregarEventoCambioPlantilla:function(){
  		//la función addClicEventToChangeTemplate se encuentra en el archvo change_template_angular.js dentro de editor/common_events
  		if (typeof addClicEventToChangeTemplate !== "undefined") { // safe to use the function
		    addClicEventToChangeTemplate(this);
		}
  	},
  	//Esta función agrega el evento Drag al control así como todas las acciones sobre el evento
  	AgregarEventoDraggable:function(){
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
  	},
  	EliminarControl:function(){
  		//Eliminamos el control desde el control principal
  		document.getElementById(Global_IdContenedor).removeChild(document.getElementById(this.getParentId()));
  	}
}


/****************************
Propiedades Generales
*****************************/

Texto.prototype.getConfig = function(){
	return (this.array);
};

Texto.prototype.setConfig = function(config){
	this.array = (config);
};

Texto.prototype.getSecundaryConfig = function(){
	return this.array_aux;
};

Texto.prototype.setSecundaryConfig = function(config){
	this.array_aux = config;
};

Texto.prototype.setControllerName = function(controllerName){
	this.controller_name = controllerName;
};

Texto.prototype.getControllerName = function(){
	return this.controller_name;
};

Texto.prototype.getChildType = function(){
	return this.array_aux.children[0].type;
};

Texto.prototype.setChildType = function(type){
	this.array_aux.children[0].type = type;
	//this.ActualizarArray();
};

Texto.prototype.getParentId = function(){
	return this.array_aux.id;
};

Texto.prototype.setParentId = function(id){
	this.array_aux.id = id;
	//this.ActualizarArray();
};

Texto.prototype.getParentTag = function(){
	return this.array_aux.tag;
};

Texto.prototype.setParentTag = function(tag){
	this.array_aux.tag = tag;
	//this.ActualizarArray();
};

Texto.prototype.getChildTag = function(){
	return this.array_aux.children[0].tag;
};

Texto.prototype.setChildTag = function(tag){
	this.array_aux.children[0].tag = tag;
	//this.ActualizarArray();
};

Texto.prototype.getParentX = function(){
	return this.array_aux.location.x;
};

Texto.prototype.setParentX = function(x){
	this.array_aux.location.x = x;
	//this.ActualizarArray();
};

Texto.prototype.getChildX = function(){
	return this.array_aux.children[0].location.x;
};

Texto.prototype.setChildX = function(x){
	this.array_aux.children[0].location.x = x;
	//this.ActualizarArray();
};

Texto.prototype.getParentY = function(){
	return this.array_aux.location.y;
};

Texto.prototype.setParentY = function(y){
	this.array_aux.location.y = y;
	//this.ActualizarArray();
};
Texto.prototype.getChildY = function(){
	return this.array_aux.children[0].location.y;
};

Texto.prototype.setChildY = function(y){
	this.array_aux.children[0].location.y = y;
	//this.ActualizarArray();
};

Texto.prototype.getParentSizeGridX = function(){
	return this.array_aux.sizegridx;
};

Texto.prototype.setParentSizeGridX = function(sizegridx){
	this.array_aux.sizegridx = sizegridx;
	this.setParentX(sizegridx * canvas.gridsize);
	//this.ActualizarArray();
};

Texto.prototype.getParentSizeGridY = function(){
	return this.array_aux.sizegridy;
};

Texto.prototype.setParentSizeGridY = function(sizegridy){
	this.array_aux.sizegridy = sizegridy;
	this.setParentY(sizegridy * canvas.gridsize);
	//this.ActualizarArray();
};
//
Texto.prototype.getParentSizeGridWidth = function(){
	return this.array_aux.sizegridwidth;
};

Texto.prototype.setParentSizeGridWidth = function(sizegridwidth){
	this.array_aux.sizegridwidth = sizegridwidth;
	this.setParentWidth(sizegridwidth * canvas.gridsize);
	//this.ActualizarArray();
};

Texto.prototype.getParentSizeGridHeight = function(){
	return this.array_aux.sizegridheight;
};

Texto.prototype.setParentSizeGridHeight = function(sizegridheight){
	this.array_aux.sizegridheight = sizegridheight;
	this.setParentHeight(sizegridheight * canvas.gridsize);
	//this.ActualizarArray();
};
//

Texto.prototype.getParentArea = function(){
	return this.array_aux.area;
};

Texto.prototype.setParentArea = function(area){
	this.array_aux.area = area;
	//this.ActualizarArray();
};

Texto.prototype.getParentWidth = function(){
	return this.array_aux.size.width;
};

Texto.prototype.setParentWidth = function(width){
	this.array_aux.size.width = width;
	jQuery("#" + this.getParentId()).css("width",width);
	//this.ActualizarArray();
};

Texto.prototype.getChildWidth = function(){
	return this.array_aux.children[0].width;
};

Texto.prototype.setChildWidth = function(width){
	this.array_aux.children[0].children[0].width = width;
	//this.ActualizarArray();
};


Texto.prototype.getParentHeight = function(){
	return this.array_aux.size.height;
};

Texto.prototype.setParentHeight = function(height){
	this.array_aux.size.height = height;
	jQuery("#" + this.getParentId()).css("height",height);
	//this.ActualizarArray();
};

Texto.prototype.getChildHeight = function(){
	return this.array_aux.children[0].height;
};

Texto.prototype.setChildHeight = function(height){
	this.array_aux.children[0].height = height;
	//this.ActualizarArray();
};

Texto.prototype.getChildData = function(){
	return this.array_aux.children[0].data;
};

Texto.prototype.setChildData = function(data){
	this.array_aux.children[0].data = data;
	//this.ActualizarArray();
};

Texto.prototype.getChildDataSource = function(){
	return this.array_aux.children[0].data_source;
};

Texto.prototype.setChildDataSource = function(dataSource){
	this.array_aux.children[0].data_source = dataSource;
	//this.ActualizarArray();
};

//Class
//Style
Texto.prototype.getParentEnable = function(){
	return this.array_aux.enable;
};

Texto.prototype.setParentEnable = function(enable){
	this.array_aux.enable = enable;
	//this.ActualizarArray();
};





/******************************
Propiedades de Texto!
******************************/


Texto.prototype.getChildText = function(){
	return this.array_aux.children[0].data.text;
};

Texto.prototype.setChildText = function(text){
	this.array_aux.children[0].data.text = text;
	jQuery("#" + this.getParentId() + " " + this.getChildTag() ).html(text);///////////////////////////////////////////////////////
	//this.ActualizarArray();
};

Texto.prototype.setChildStyleColor = function(fontColor){
	this.array_aux.children[0].style.color = fontColor;
	jQuery("#" + this.getParentId() + " " + this.getChildTag() ).css("color",fontColor);////////////////////////////////////
	//this.ActualizarArray();
};

Texto.prototype.getChildStyleColor = function(){
	return this.array_aux.children[0].style.color;
};

Texto.prototype.setParentStyleBackgroundColor = function(backgroundColor){
	this.array_aux.style["background-color"] = backgroundColor;
	jQuery("#" + this.getParentId() ).css("background-color",backgroundColor);////////////////////////////////////////////
	//this.ActualizarArray();
};

Texto.prototype.getParentStyleBackgroundColor = function(){
	return this.array_aux.style["background-color"];
};

Texto.prototype.getParentStyleFontFamily = function(){
	return this.array_aux.style["font-family"];
};

Texto.prototype.setParentStyleFontFamily = function(fontFamily){
	this.array_aux.style["font-family"] = fontFamily;
	jQuery("#" + this.getParentId() ).css("font-family",fontFamily);/////////////////////////////////////////////
	//this.ActualizarArray();
};

Texto.prototype.getParentStyleFontSize = function(){
	return this.array_aux.style["font-size"];
};

Texto.prototype.setParentStyleFontSize = function(fontSize){
	this.array_aux.style["font-size"] = fontSize;
	jQuery("#" + this.getParentId() ).css("font-size",fontSize);/////////////////////////////////////////////////////
	//this.ActualizarArray();
};

Texto.prototype.getChildStyleFontSize = function(){
	return this.array_aux.children[0].style["font-size"];
};

Texto.prototype.setChildStyleFontSize = function(fontSize){
	this.array_aux.children[0].style["font-size"] = fontSize;
	jQuery("#" + this.getParentId() + " " + this.getChildTag() ).css("font-size",fontSize);/////////////////////////////////////////////////////
	//this.ActualizarArray();
};

////
Texto.prototype.setParentStyleFontWeight = function(fontWeight){
	this.array_aux.style["font-weight"] = fontWeight;
	jQuery("#" + this.getParentId() ).css("font-weight",fontWeight);////////////////////////////////////
	//this.ActualizarArray();
};

Texto.prototype.getParentStyleFontWeight = function(){
	return this.array_aux.style["font-weight"];
};

Texto.prototype.setParentStyleTextDecoration = function(textDecoration){
	this.array_aux.style["text-decoration"] = textDecoration;
	jQuery("#" + this.getParentId() ).css("text-decoration",textDecoration);////////////////////////////////////
	//this.ActualizarArray();
};

Texto.prototype.getParentStyleTextDecoration = function(){
	return this.array_aux.style["text-decoration"];
};

Texto.prototype.setParentStyleTextAlign = function(textAlign){
	this.array_aux.style["text-align"] = textAlign;
	jQuery("#" + this.getParentId() ).css("text-align",textAlign);////////////////////////////////////
	//this.ActualizarArray();
};

Texto.prototype.getParentStyleTextAlign = function(){
	return this.array_aux.style["text-align"];
};


Texto.prototype.setParentStyleTextTransform = function(textTransform){
	this.array_aux.style["text-transform"] = textTransform;
	jQuery("#" + this.getParentId()  ).css("text-transform",textTransform);////////////////////////////////////
	//this.ActualizarArray();
};

Texto.prototype.getParentStyleTextTransform = function(){
	return this.array_aux.style["text-transform"];
};

Texto.prototype.setParentStyleLineHeight= function(lineHeight){
	this.array_aux.style["line-height"] = lineHeight;
	jQuery("#" + this.getParentId()  ).css("line-height",lineHeight);////////////////////////////////////
	//this.ActualizarArray();
};

Texto.prototype.getParentStyleLineHeight = function(){
	return this.array_aux.style["line-height"];
};

Texto.prototype.setParentStyleLetterSpacing= function(letterSpacing){
	this.array_aux.style["letter-spacing"] = letterSpacing;
	jQuery("#" + this.getParentId()  ).css("letter-spacing",letterSpacing);////////////////////////////////////
	//this.ActualizarArray();
};

Texto.prototype.getParentStyleLetterSpacing = function(){
	return this.array_aux.style["letter-spacing"];
};


Texto.prototype.setParentStyleWordSpacing= function(wordSpacing){
	this.array_aux.style["word-spacing"] = wordSpacing;
	jQuery("#" + this.getParentId()  ).css("word-spacing",wordSpacing);////////////////////////////////////
	//this.ActualizarArray();
};

Texto.prototype.getParentStyleWordSpacing = function(){
	return this.array_aux.style["word-spacing"];
};

Texto.prototype.setParentStyleZIndex= function(zIndex){
	this.array_aux.style["z-index"] = zIndex;
	jQuery("#" + this.getParentId()  ).css("z-index",zIndex);////////////////////////////////////
	//this.ActualizarArray();
};

Texto.prototype.getParentStyleZIndex = function(){
	return this.array_aux.style["z-index"];
};






