/**************************
Este controlador es para visualizar el contenido (view)
Se basa en el dashboardEditorPageController, omitiendo toda la interacción con el usuario, es decir,
se remueven los eventos
**************************/

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
    	$http.put('http://'  +  window.location.host + '/api/dashboard/'+id,data).then(successCallback,failureCallback);        
    };

    this.Guardar = function(data,successCallback,failureCallback){
        $http.post('http://'  +  window.location.host + '/api/dashboard/',data).then(successCallback,failureCallback);
    }
}])


.controller('dashboardVisorPageController',['$scope','Servicio_Dashboard',function($scope,Servicio_Dashboard){
	

	$scope.empresa = window.SAILS_LOCALS.me;


	
	lista_controles = new Lista();//Para compatibilidad con los scripts

	canvas = new Canvas(Global_Canvas_Class,Global_Number_Of_Grids);
	//https://api.jquery.com/resize/
	//jQuery( window ).resize(function(){canvas.dibujarGrid();});
	canvas.dibujarGrid();


	var ModoApertura = "";
	$scope.dashboard =  {//Estructura para almacenar todos los datos relacionados con el dashboard a trabajar
		nombre:"",
		descripcion:"",
		hash:""
	};
	var permitirInteraccion = true;


/*****************************************
INICIO FUNCIONES DENTRO DEL SCOPE
*****************************************/

	$scope.Constructor = function(ModoApertura_,Hash_){
		console.log("Modo de apertura:"+ModoApertura_);
		console.log("Hash: " + Hash_);
		ModoApertura = ModoApertura_;
		$scope.dashboard.hash = Hash_;

		//Iniciamos las ventanas emergentes
		InicializarVentanasEmergentes();

		//Precargado según el modo de apertura!
		if( ModoApertura_.localeCompare("view") == 0 ){
			ConstructorModoView();
		}else{
			//ALGÚN ERROR ACURRIO
			window.location.href = './dashboard';//Sin probar su funcionalidad!
		}
	};

/*****************************************
FIN FUNCIONES DENTRO DEL SCOPE
*****************************************/

/*****************************************
INICIO FUNCIONES FUERA DEL SCOPE
*****************************************/
	/***************************************
	INICIO CONSTRUCTORES DE FORMAS
	***************************************/
	function ConstructorModoView(){//Identico ConstructorModoEdit del controlador dashboardEditorPagControlles
		Servicio_Dashboard.Obtener(
/////////////////////////////
/////////////////////////////
/////////////////////////////
			{id_usuario:$scope.empresa.id,hash:$scope.dashboard.hash},//Simular que funciona con el ID del usuario logeado!; Obtener registros según la hash!!
/////////////////////////////
/////////////////////////////
/////////////////////////////
			function(data){//Éxito!
				console.log("Consulta éxitosa");
				$scope.dashboard = data.data;
				console.log(data);
				if(data.data.length <= 0){
					//No hubo elementos que traer
					console.log("La petición no trajo datos!");
				}else{
					console.log("La petición si trajo datos!");
					//Empezar a generar los controles según el JSON del cuerpo de la petición
					$scope.dashboard = data.data[0];
					console.log($scope.dashboard);
					var jTh = new JsonToHtml();
					var nodes = jTh.CrearControles(JSON.parse( $scope.dashboard.cuerpo ), Global_IdContenedor,permitirInteraccion);
					console.log(nodes); 
				}
			},
			function(data){//Fracaso
				console.log("Se ha generado un error al intentar obtener los datos del servidor");
				$scope.dashboard = [];
				console.log(data);
			}
		);

	};

	/***************************************
	FIN CONSTRUCTORES DE FORMAS
	***************************************/


	$scope.EventoClick_SalvarImagen = function(){
		console.log('EventoClick_SalvarImagen');
		var docDefinition = {
			  content: [
			    {
			      table: {
			        // headers are automatically repeated if the table spans over multiple pages
			        // you can declare how many rows should be treated as headers
			        headerRows: 1,
			        widths: [ '*', 'auto', 100, '*' ],

			        body: [
			          [ 'First', 'Second', 'Third', 'The last one' ],
			          [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
			          [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
			        ]
			      }
			    }
			  ]
			};
		
		// open the PDF in a new window
		 pdfMake.createPdf(docDefinition).open();

		 // print the PDF
		 //pdfMake.createPdf(docDefinition).print();

		 // download the PDF
		 //pdfMake.createPdf(docDefinition).download('optionalName.pdf');

	};


	/**************************************
	INICIO CALLBACk
	***************************************/
	function peticionAJAXExito(data){
		console.log("Exito al guardar");
        console.log(data);
        console.log(data.data);
        $scope.dashboard = data.data;//Igualamos el dashboar al registro creado
        //ModoApertura = "edit";//Se cambia el modo de apertura a "EDIT" a que a apartir de la inserción solo se actualiza
	};

	function peticionAJAXError(data){
		console.log("Error al guardar!");
        console.log(data);
	};

	/**************************************
	FIN CALLBACk
	***************************************/

	/*****************************************
	INICIO VENTANAS EMERGENTES Y DIALOGOS
	*****************************************/

	function AbrirDialogoSetup(){
		jQuery( "#DashboardEditorView_Dialog_Setup" ).dialog('open');
	};

	function InicializarVentanasEmergentes(){
		jQuery( "#DashboardEditorView_Dialog_Setup" ).dialog({
            autoOpen: false,
            resizable: false,
            height: "auto",
            width: "300",
            modal: true,
            buttons: {
	               Aceptar: function() {
	               		$scope.dashboard.nombre = jQuery("#DashboardEditorView_Dialog_Setup_Name").val();
	               		$scope.dashboard.descripcion = jQuery("#DashboardEditorView_Dialog_Setup_Description").val();
	               		console.log($scope.dashboard);
	                    jQuery( this ).dialog( "close" );
	                },
	                "No por el momento": function() {
	                  	jQuery( this ).dialog( "close" );
	                }
			    }
            }
        );
	};

	/*****************************************
	FIN VENTANAS EMERGENTES Y DIALOGOS
	*****************************************/


/*****************************************
FIN FUNCIONES FUERA DEL SCOPE
*****************************************/




}])

;

