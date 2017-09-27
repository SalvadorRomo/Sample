
angular.module('MainApp')
.service('Servicio_Dashboard',['$http',function($http){

    this.Obtener = function(data,successCallback,failureCallback){
       // $http.get('http://node.lom.dynu.com/dashboard',data).then(successCallback,failureCallback);        
       $http({
       	//url: 'http://node.lom.dynu.com/dashboard', 
       	url: 'http://'  +  window.location.host + '/api/dashboard', 
    	method: "GET",
    	params: data
       }).then(successCallback,failureCallback);        
    };

    this.Actualizar = function(id,data,successCallback,failureCallback){
    	//$http.post('http://node.lom.dynu.com/dashboard/'+id,data).then(successCallback,failureCallback);        
    	$http.post('http://'  +  window.location.host + '/api/dashboard/'+id,data).then(successCallback,failureCallback);        
    };

}])


.controller('controlador_lista_dashboards',['$scope','Servicio_Dashboard','$window',function($scope,Servicio_Dashboard,$window){
	
	$scope.empresa = window.SAILS_LOCALS.me;

	var dashboard =  {//Estructura para almacenar todos los datos relacionados con el dashboard a trabajar
		nombre:"",
		descripcion:"",
		hash:""
	};

	$scope.Constructor = function () {

		console.log("Constructor");
		console.log($scope.empresa);
		
		var Id_Dashboard = -1;//Dashboard seleccionado de la tablar
		var Hash_Dashboard = "";
		$scope.registro_seleccionado = true; //Booleado para desactivar y  activar lo botones de modificar y abrir
		$scope.dashboards = [];
		Servicio_Dashboard.Obtener(
/////////////////////////////
/////////////////////////////
/////////////////////////////
			{id_usuario:$scope.empresa.id,activo:1},//Simular que funciona con el ID del usuario logeado!; Obtener registros activos!!
/////////////////////////////
/////////////////////////////
/////////////////////////////
			function(data){//Éxito!
				console.log("Se han obtenido los datos de forma éxitosa");
				$scope.dashboards = data.data;
				console.log(data);
			},
			function(data){//Fracaso
				console.log("Se ha generado un error al intentar obtener los datos del servidor");
				$scope.dashboards = [];
				console.log(data);
			}
		);

		InicializarVentanasEmergentes();

	};



	angular.element(window.document.body).ready(function () {
		//Ha que mejorar la implementación de esta función, ya que se ejecuta dos veces la primera
		//vez que se carga la página
		$scope.Constructor();
    });

	/*************
	Inicio Eventos
	*************/
	$scope.EventoClick_Agregar = function(){
		window.location.href = './dashboard/new';
		//$window.open('./dashboard/new', '_blank');
	};

	$scope.EventoClick_Eliminar = function(){
		jQuery( "#dashboard_dialogo_confirmacion_eliminar" ).dialog('open');
	};

	$scope.EventoClick_Editar = function(){
		window.location.href = './dashboard/edit/' + dashboard.hash;
		//$window.open( './dashboard/edit/' + dashboard.hash, '_blank');
	};

	$scope.EventoClick_Abrir = function(){
		if( dashboard.cuerpo.length >= 3){//Si el dashboard tiene contenido que mostrar se permite cargarlo para su visualización
			window.location.href = './dashboard/view/' + dashboard.hash;
		}else{//Si no tiene cuerpo se muestra una advertencia  y no se permite su apertura
			jQuery( "#dashboard_dialogo_confirmacion_imposible_visualizar" ).dialog('open');
		}
		
	}

	$scope.EventoClick_SeleccionDashboard = function(dashboard_){
		dashboard = dashboard_;
		$scope.registro_seleccionado = false;
	};

	$scope.EventoClick_SalvarPDF = function(){
		var downloadLink = angular.element('<a></a>');
        downloadLink.attr('href','http://'  +  window.location.host + "/robots.txt");
        console.log('http://'  +  window.location.host + "/robots.txt");
        downloadLink.attr('download', 'robots.txt');
		downloadLink[0].click();
	};
	/*************
	Fin Eventos
	*************/

	/*************
	Inicio Funciones fuera de $scope
	*************/
	function Eliminar(){
        console.log("Se va eliminar el dashboard seleccionado");
		Servicio_Dashboard.Actualizar(
			dashboard.id,//ID del dashboard
			{activo:'false'},//El valor a cambiar es la columna activo a false
			function(data){//Éxito!
				console.log("Se han eliminadi los datos de forma éxitosa");
				$scope.Constructor();//Recargamos el array
			},
			function(data){//Fracaso
				console.log("Se ha generado un error al intentar eliminar los datos del servidor");
				console.log(data);
			}
		);  
    };

	function InicializarVentanasEmergentes(){


		jQuery( "#dashboard_dialogo_confirmacion_eliminar" ).dialog({
            autoOpen: false,
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
               Aceptar: function() {
                    Eliminar();
                    $( this ).dialog( "close" );
                },
                Cancelar: function() {
                  $( this ).dialog( "close" );
                }
              }
            }
        );


        jQuery( "#dashboard_dialogo_confirmacion_imposible_visualizar" ).dialog({
            autoOpen: false,
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
               Aceptar: function() {
                    $( this ).dialog( "close" );
                },
              }
            }
        );




	};


	/*************
	Fin Funciones fuera de $scope
	*************/

}])


;