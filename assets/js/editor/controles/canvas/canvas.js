//http://stackoverflow.com/questions/5030739/javascript-how-to-define-a-constructor
//https://www.phpied.com/3-ways-to-define-a-javascript-class/

/*

DEFINIR CLASE!!


*/

/*
Codigo temporal!! mover a  clase

*/

var Canvas = function(containerClass,numberOfGrids){

	this.containerClass = containerClass;
	this.numberOfGrids = numberOfGrids;

	//jQuery( this.containerClass ).click(this.canvas_click);
	

	//this.dibujarGrid();

}

Canvas.prototype = {

		dibujarGrid: function(){
			console.log("--------------------------------");
			//http://api.jquery.com/css/
			jQuery(this.containerClass).css("background","url(" + 'http://'  +  window.location.host +"/images/dashboard/cuadricula.png)");
			jQuery(this.containerClass).css("background-attachment","local");
			
			//var size = Math.ceil(jQuery(".canvas").width() / 12);
			console.log("TAMAÑO TOTAL: " + jQuery(".canvas").width() );
			var padding = (jQuery(this.containerClass).width() % this.numberOfGrids);
			console.log("PADDING:" + padding);

			//console.log("Se establecerá padding");
			//jQuery(this.containerClass).css("padding",padding/2 + "px");


			var size = ((jQuery(this.containerClass).width() - jQuery(".canvas").width() % this.numberOfGrids) / this.numberOfGrids);
			console.log("SIZE CUBE: " + size);
			this.gridsize = size;
			console.log("Tamaño: " + size);
			jQuery(this.containerClass).css("background-size", size + "px");
			console.log("Total:" + (padding * 2 + size * this.numberOfGrids));
		}



}