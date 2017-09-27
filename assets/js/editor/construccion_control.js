var ConstruirControl = function(){
	this.rules = 
		{
			style: function(array,arrayKeys,control){
				var styleString = control.getAttribute('style')==null?"":control.getAttribute('style');
				for(var i = 0; i < arrayKeys.length; i++){
					styleString += arrayKeys[i] + ":" + array[  arrayKeys[i]  ] + ";";
				}
				control.setAttribute('style',styleString);
				return control;
			},
			size:function(array,arrayKeys,control){
				for(var i = 0; i < arrayKeys.length; i++){
					control.setAttribute(arrayKeys[i], array[ arrayKeys[i] ] + "px" );
					//control.setAttribute(arrayKeys[i], array[ arrayKeys[i] ] );
				}
				return control;
			},
			class:function(array,arrayKeys,control){
				console.log(array);
				var classString = "";
				for(var i = 0; i < arrayKeys.length; i++){
					classString += (array[  arrayKeys[i]  ] + " ");
				}
				control.setAttribute('class',classString);
				return control;
			},
			location:function(array,arrayKeys,control){
				console.log("Location!!");
				//console.log(array);
				return this.style({'top':array.y + "px",'left':array.x + "px"},['top','left'],control);
				///return this.style({'top':array.y,'left':array.x },['top','left'],control);
			},


			///////////////////
			// Inicio - funciones sin cuerpo html
			// Estan funciones son para no nostrar su contenido 
			//en html, ya que si no se describen, llamaría al default!
			type:function(array,arrayKeys,control) {
				//No es necesario tratar esta llave
				return control;
			},
			data:function(array,arrayKeys,control){
				//Esta funcion es tratada de maneara especial dependiendo el control!!
				return control;
			},
			children:function(array,arrayKeys,control){
				//Esta funcion NO debe ser tratada!!
				return control;
			},
			data_source:function(array,arrayKeys,control){
				//Esta funcion NO debe ser tratada!!
				return control;
			},
			// Fin - funciones sin cuerpo html
			/////////////////////////////////////////
			/////////////////////////////////////////


			default:function(clave,valor,control){
					control.setAttribute(clave, valor );
				return control;
			}
		}
	;
	this.ruleKeys = Object.keys(this.rules);
}

ConstruirControl.prototype = {
	Construir: function(controlData){
//		control = document.createElement( controlData.type );
		control = document.createElement( controlData.tag );
		var controlDataKeys = Object.keys(controlData);
		//for(var i = 0; i < controlDataKeys.length; i++){
		for(var i = 0; i < Object.size(controlDataKeys); i++){
			if(  !( this.rules[ controlDataKeys[i] ] === undefined ) ){
				control = this.rules[ controlDataKeys[i] ](
					 controlData[ controlDataKeys[i] ], //array
					 Object.keys(controlData[ controlDataKeys[i] ]),//Array keys
					 control//control
					);
			}else{
				//Si no encuentra una regla, llama a la regla por defecto
				control = this.rules[ "default" ](
					 controlDataKeys[i], //clave
					 controlData[ controlDataKeys[i] ],//valor
					 control//control
					);
			}
					
		}
		return control;
	},
	size:function(obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
	    return size;
	}
	
}

/*
//http://stackoverflow.com/questions/5223/length-of-a-javascript-object

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


*/