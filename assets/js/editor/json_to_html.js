var JsonToHtml = function(){
	this.main_control = document.createElement( "div" );
	this.cc = new ConstruirControl();
	this.tiposControles = {
		"grafica":{
			type:"grafica",
			instanciar:function(id,array,idContainer,permitirInteraccion){
				return ( new Grafica(id,array,idContainer,permitirInteraccion) );
			}
		},
		"imagen":{
			type:"imagen",
			instanciar:function(id,array,idContainer,permitirInteraccion){
				return ( new Imagen(id,array,idContainer,permitirInteraccion) );
			}
		},
		"texto":{
			type:"texto",
			instanciar:function(id,array,idContainer,permitirInteraccion){
				return (new Texto(id,array,idContainer,permitirInteraccion));
			},

		}
	};

}

JsonToHtml.prototype = {

	Convertir: function(array){
		//console.log(array.length);
		this.main_control = this.ReadParent(array,this.main_control);
		return  this.main_control.children;
	},
	
	ConvertirDesdeArreglo: function(array){
		var main_control2 = document.createElement( "div" );
		for (var i = 0; i < array.length; i++) {
			main_control2.appendChild( this.Convertir(array[i])[0] );
		}
		return main_control2;
	},
	ReadChildren:function(array,controlPadre){
		
		
		//for (var i = 0; i < array.length; i++) {
		for (var i = 0; i < Object.size(array); i++) {
			var node = null;
			if(!(array[i].type === undefined)){

				if( array[i].children === undefined || Object.size(array[i].children) <= 0 ){
					node = this.cc.Construir( array[i] );
				}else{
					node = this.ReadChildren(
							array[i].children,//Array data
							this.cc.Construir( array[i] )// Nuevo padre,
						);
				}

				controlPadre.appendChild(
					node	
				);

			}

			
		}
		return controlPadre;
	},
	//A diferencia con ReadChildren, ReadChildren2 no trabaja con un conjunto de controles,
	//solo trbaja con uno, y para tratar sus hijos se utiliza la funcion ReadChildren
	ReadParent:function(array,controlPadre){
		var node = null;
		
		//for (var i = 0; i < array.length; i++) {

			if(!(array.type === undefined)){
				if(array.children === undefined || Object.size(array.children) <= 0){
					node = this.cc.Construir( array );
				}else{
					node = this.ReadChildren(
						array.children,//Array data
						this.cc.Construir( array )// Nuevo padre,
					);
				}

				controlPadre.appendChild(
					node	
				);
			}



		return controlPadre;
	},
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
	CrearControles:function(array,idContainer,permitirInteraccion){
		for(var i = 0; i < Object.size(array); i++){
			console.log("Control #" + i); 
			console.log(array[i]);
			array[i].id = lista_controles.getLength();
			array[i].area = idContainer
			this.AutomataCreacionControles(i,array[i],idContainer,permitirInteraccion);
		}
	},
	AutomataCreacionControles:function(id,array,idContainer,permitirInteraccion){
		console.log("ID: " + id);
		var control = this.tiposControles[array.type].instanciar(id,array,idContainer,permitirInteraccion);
		//Dibujamos el nuevo texto
		control.DibujarControl();
		//Agregamos el objeto a la lista global de controles para su referencia para la edicion
		lista_controles.push(control);
	}



}