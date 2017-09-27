function addResizableEvent(control) {
		var resizable_class = "#" + control.getParentId();
	//var resizable_text = new Resizable(resizable_class);
	jQuery( resizable_class ).resizable({
		containment:"#" + Global_IdContenedor,
		grid:[canvas.gridsize,canvas.gridsize],
		autoHide: true,
		minWidth:canvas.gridsize,
		minHeight: canvas.gridsize,

		//maxHeight: Global_Number_Of_Grids * canvas.gridsize,
      	//maxWidth: Global_Number_Of_Grids * canvas.gridsize,
	});
	//jQuery(resizable_class).resizable("option","grid",canvas.gridsize);
	//jQuery(resizable_class).resizable("option","minWidth",canvas.gridsize);
	//jQuery(resizable_class).resizable("option","minHeight",canvas.gridsize);
	//jQuery(resizable_class).resizable("option","containment","#" + Global_IdContenedor)
	jQuery(resizable_class).width(control.getParentWidth());
	jQuery(resizable_class).height(control.getParentHeight());


	//Creamos un evente para cuando se detenga el cambio de tamaño para actualizar la gráfica!
	jQuery(resizable_class).on("resizestop", function( event, ui ) {

		if(ui.size.width <= 0){
			console.log("Resizestop: ui.size.width " + ui.size.width );
		}
		if (ui.size.height <= 0){
			console.log("Resizestop: ui.size.height " + ui.size.height);
		}

		var newSize = getChengeSize(ui);

		control.setParentSizeGridWidth(  newSize.width  );
		control.setParentSizeGridHeight( newSize.height   );

		//control.setParentSizeGridWidth(  Math.round(ui.size.width/canvas.gridsize)  );
		//console.log("x: Redondeo->"  +  Math.round(ui.size.width/canvas.gridsize)  + "; Sin Redondeo->" + ui.size.width/canvas.gridsize );
		//control.setParentSizeGridHeight(  Math.round(ui.size.height/canvas.gridsize)  );
		//console.log("y: Redondeo -> " + Math.round(ui.size.height/canvas.gridsize)  + "; Sin Redondeo -> " + ui.size.height/canvas.gridsize);
		jQuery(resizable_class).css("opacity",1);

		jQuery("#" + control.getParentId()).css("width",control.getParentWidth());
		jQuery("#" + control.getParentId()).css("height",control.getParentHeight());

	});


	jQuery(resizable_class).on("resize", function( event, ui ) {
		if(ui.size.width <= 0){
			console.log("Resize: ui.size.width " + ui.size.width );
		}
		if (ui.size.height <= 0){
			console.log("Resize: ui.size.height " + ui.size.height);
		}
		var newSize = getChengeSize(ui);

		control.setParentSizeGridWidth(  newSize.width  );
		control.setParentSizeGridHeight( newSize.height   );

		//control.setParentSizeGridWidth(  Math.round(ui.size.width/canvas.gridsize)  );
		//control.setParentSizeGridHeight(  Math.round(ui.size.height/canvas.gridsize)  );
		jQuery(resizable_class).css("opacity",0.70);

		jQuery("#" + control.getParentId()).css("width",control.getParentWidth());
		jQuery("#" + control.getParentId()).css("height",control.getParentHeight());
	});

}

function getChengeSize(ui){
	var newSize = {
		width:0,
		height:0
	};

	//if(ui.size.height < ui.originalSize.height){//Decremento
		if(ui.size.height <= 0){//Si es <= 0 es que hubo un erro
			newSize.height = Math.round(ui.originalSize.height/canvas.gridsize) - 1;
		}else{
			newSize.height = Math.round(ui.size.height/canvas.gridsize);			
		}
	//}else if(ui.size.height > ui.originalSize.height){//incremento
		//newSize.height = -1 * canvas.gridsize;
	//}

	//if(ui.size.width < ui.originalSize.width){//Decremento
		if( ui.size.width <= 0){//Si es <= 0 es que hubo un erro
			newSize.width = Math.round(ui.originalSize.width/canvas.gridsize) - 1;
		}else{
			newSize.width = Math.round(ui.size.width/canvas.gridsize);
		}
		
	//}else if(ui.size.width > ui.originalSize.width){//incremento
		//newSize.width = -1 * canvas.gridsize;
	//}

	return newSize;

}