//Tener cuidado en no hacer asignaciones!
function addClicEventToChangeTemplate(control) {
	jQuery("#" + control.getParentId()).click(function(){
			//Obtenemos refencia del nodo que contiene el controlador general
			var node = document.getElementById(controlador_principal);
			//Llamamos un método del controlador general
			angular.element(node).scope().MostrarCaracteristicas(control.getParentId());
			//Le decimoa a Angular que revise los cambios
			angular.element(node).scope().$apply();

			//Llamamos el constructor de Texto
			node = document.getElementById(control.getControllerName());
			angular.element(node).scope().Constructor();
			angular.element(node).scope().$apply();
	});
}