 function addDraggableEvent(contol) {
  		//Evento Draggable
  		jQuery("#" + contol.getParentId()).draggable({ 
	        containment: '#' + Global_IdContenedor,
	        grid: [canvas.gridsize,canvas.gridsize],
	        opacity:0.70,
	        scroll:true,
	        scrollSensitivity:canvas.gridsize * 4,
	        scrollSpeed:5

	    });

	    jQuery("#" + contol.getParentId()).on("dragstop", function(event, ui){
	    	contol.setParentSizeGridX(Math.round(ui.position.left/canvas.gridsize));
	    	console.log("Left: Redondeo->" + Math.round(ui.position.left/canvas.gridsize) + "; Sin redondeo: " + (ui.position.left/canvas.gridsize))
			contol.setParentSizeGridY( Math.round(ui.position.top/canvas.gridsize) );
			console.log("Top: Redondeo->" + Math.round(ui.position.top/canvas.gridsize) + "; Sin redondeo:" + (ui.position.top/canvas.gridsize) )

			//Ajuste, para evitar redibujar -> Mover a los get  set de los controles
			jQuery("#" + contol.getParentId()).css("top",contol.getParentY());
			jQuery("#" + contol.getParentId()).css("left",contol.getParentX());

	    });

	    jQuery("#" + contol.getParentId()).on("drag", function(event, ui){
	    	contol.setParentSizeGridX(Math.round(ui.position.left/canvas.gridsize));
			contol.setParentSizeGridY( Math.round(ui.position.top/canvas.gridsize) );

			//Ajuste, para evitar redibujar -> Mover a los get  set de los controles
			jQuery("#" + contol.getParentId()).css("top",contol.getParentY());
			jQuery("#" + contol.getParentId()).css("left",contol.getParentX());

	    });



 }