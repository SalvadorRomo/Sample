/**************************
Este controlador es para dos modos de apertura: Nuevo y Editar
**************************/
var timeoutStarts = false;
/*****************************
INICIO MODELO
*****************************/
angular.module('MainApp')

    /*****************************
    INICIO SERVICIO
    *****************************/

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

    .service('Servicio_Grafica',['$http',function($http){

        this.ObtenerDatosGrafica = function(data,successCallback,failureCallback){
            $http({
                url:'http://'  +  window.location.host + '/api/automata',
                method:'GET',
                params:data
            }).then(successCallback,failureCallback);
        };

        this.ObtenerListadoUrl = function(data,successCallback,failureCallback){
            $http({
                url:'http://'  +  window.location.host + '/api/listado/url',
                method:'GET',
                params:data
            }).then(successCallback,failureCallback);
        };

        this.ObtenerPromociones = function(data,successCallback,failureCallback){
            $http({
                url:'http://'  +  window.location.host + '/api/promotion/owner',
                method: "GET",
                params:data
            }).then(successCallback,failureCallback);
        };

        this.ObtenerConfigGrafica = function(data,successCallback,failureCallback){
            $http({
                url: 'http://'  +  window.location.host + "/api/listado/config/url",
                method:"GET",
                params:data
            }).then(successCallback,failureCallback);
        }

    }])

    /*****************************
    FIN SERVICIO
    *****************************/

    /*****************************
    INICIO CONTROLADORES
    *****************************/



    /*****************************
    INICIO CONTROLADORES GLOBAL
    *****************************/
    .controller('dashboardEditorPageController',['$scope','$state','Servicio_Dashboard',function($scope,$state,Servicio_Dashboard){


        $scope.empresa = window.SAILS_LOCALS.me;


    		/****************************
    		Propiedades globales <Evitar el uso de globales>
    		****************************/
    		lista_controles = new Lista();
    		controles = [
    		        {
    		            type:'test'
    		        },
    		        {
    		            type:"grafica"
    		        },
    		        {
    		            type:"imagen"
    		        },
    		        {
    		            type:"texto"
    		        },

    		        {
    		            type:"tabla"
    		        }
    		    ];

    		//var idControlSeleccionado = -1;

    		//Necesita el import  js/editor/controles/canvas/canvas.js
    		canvas = new Canvas(Global_Canvas_Class,Global_Number_Of_Grids);
    		//https://api.jquery.com/resize/
    		//jQuery( window ).resize(function(){canvas.dibujarGrid();});
            canvas.dibujarGrid();



    	var ModoApertura = "";
    	$scope.dashboard =  {//Estructura para almacenar todos los datos relacionados con el dashboard a trabajar
    		nombre:"",
    		descripcion:"",
    		hash:"",
            createdAt: "Without saving",
            updatedAt : "Without saving"
    	};
    	var permitirInteraccion = true;
        $scope.deshabilitarBotonGuardar = true;
        $scope.showPropertiesView = true;



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
    		if( ModoApertura_.localeCompare("new") == 0 ){
    			ConstructorModoNew();
    		}else if( ModoApertura_.localeCompare("edit") == 0 ){
    			ConstructorModoEdit();
    		}else{
    			//ALGÚN ERROR ACURRIO
    			window.location.href = './dashboard';//Sin probar su funcionalidad!
    		}




    	};

    	$scope.EventoClick_AgregarGrafica = function(){
            var graph = new NuevaGrafica(lista_controles.getLength(), Global_IdContenedor,canvas,permitirInteraccion); 
        };

        $scope.EventoClick_AgregarTexto = function(){
            var text = new NuevoTexto(lista_controles.getLength(), Global_IdContenedor,canvas,permitirInteraccion);
        };

        $scope.EventoClick_AgregarImagen = function(){
            var imagen = new NuevaImagen(lista_controles.getLength(),Global_IdContenedor,canvas,permitirInteraccion);
        };


        $scope.EventoClick_GuardarPanel = function(){
            if( ModoApertura.localeCompare("new") == 0 ){//Si esta en modo "NEW" se crea un nuevo registro
    	        //$scope.dashboard["id_usuario"] = 1;
                $scope.dashboard["id_usuario"] =  $scope.empresa.id;
    	        $scope.dashboard.cuerpo = lista_controles.getJSON();
            	Servicio_Dashboard.Guardar($scope.dashboard,peticionAJAXExito,peticionAJAXError);
    		}else if( ModoApertura.localeCompare("edit") == 0 ){//Si ya existe el registro o el modo de apertura es edición, a solo se actualiza
    			$scope.dashboard.cuerpo = lista_controles.getJSON();
            	Servicio_Dashboard.Actualizar($scope.dashboard.id,$scope.dashboard,peticionAJAXExito,peticionAJAXError);
    		}
        };

        $scope.EventoClick_AbirVistaPrevia = function(){
            if(ModoApertura.localeCompare("edit") == 0){
                if($scope.dashboard.hash.length <= 0){
                    alert("Imposible cargas la vista previa, favor de recargar la pagina o intentarlo más tarde");
                }else{
                    var popup = window.open(
                        'http://'  +  window.location.host + '/dashboard/view/' + $scope.dashboard.hash,
                        'Preview',
                        'directories=no,titlebar=yes,toolbar=no,location=no,status=no,menubar=no,width=800,height=600'
                    );
                    if (popup == null)
                       alert('No se puede mostar la vista previa, favor de activar las ventanas emergentes');
                    else  {
                      popup.moveTo(0, 0);
                      popup.resizeTo(screen.width, screen.height);
                    }
                }

            }else{
                alert("Favor de guardar el panel antes de mostar la vista previa");
            }


        };




        $scope.MostrarCaracteristicas = function(id){
            idControlSeleccionado = id;
            console.log("ID del control seleccionado!: " + idControlSeleccionado );
            $state.transitionTo(lista_controles.getItem(idControlSeleccionado).getChildType());
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

        

    	function ConstructorModoNew(){
    		AbrirDialogoSetup();
    	};

    	function ConstructorModoEdit(){
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


    	/**************************************
    	INICIO CALLBACk
    	***************************************/

    	function peticionAJAXExito(data){
    		console.log("Exito al guardar");
            console.log(data);
            console.log(data.data);
            $scope.dashboard = data.data;//Igualamos el dashboar al registro creado
            ModoApertura = "edit";//Se cambia el modo de apertura a "EDIT" a que a apartir de la inserción solo se actualiza
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
                            $scope.$apply();
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

    /*****************************
    FIN CONTROLADORES GLOBAL
    *****************************/




    /*****************************
    INICIO CONTROLADOR GRAFICA
    *****************************/
    .controller("controlador_grafica",['$scope','$state','$timeout','Servicio_Grafica',function($scope,$state,$timeout,Servicio_Grafica){




        $scope.config = {
            font_weight:['normal','bold'],
            text_decoration:['none','line-through','underline'],
            text_align:['left','center','right'],
            text_transform:['none','capitalize','lowercase','uppercase'],
            font_families:['Cursive', 'sans-serif', "serif",'monospace','Georgia','Open Sans','Roboto','Lato','Roboto Condensed','Open Sans Condensed','Titillium Web'],
            vertical_align:['top','middle','bottom'],
            layout:['vertical','horizontal'],
        };

        $scope.listadoApi = ['none','edad'];//Estos datos se sobrescriben
        $scope.listadoTipoGraficas = ['Column','Points','Line'];//Estos datos se sobrescriben
        $scope.listadoPromociones = ['All','afdf','afadsf'];//Estos datos se sobrescriben



        $scope.Constructor = function(){
            console.log("Constructor()");
            console.log("ID del control seleccionado! desde controlador imagen: " + idControlSeleccionado );

            //Traemos el listado de los distintos tipos de  datos a graficar (DATA SOURCE)
            Servicio_Grafica.ObtenerListadoUrl({},
                function(data){//Éxito
                    var aux = [];
                    for (var i = 0; i < data.data.length;i++){
                        //console.log(data.data[i].url);
                        aux.push(data.data[i].url);
                    }
                    $scope.listadoApi = aux;

                    //PONER LA GRAFICA EN ESTADO DE CONSTRUCCIÓN
                    ///lista_controles.getItem(idControlSeleccionado).setReady(false);
                    ///InicializarPropiedadesGrafica(idControlSeleccionado);
                    ///InicializarDatosGrafica(idControlSeleccionado);
                    ///InicializarDatosTemplateGDefault(idControlSeleccionado);
                    ///InicializarDatosTemplateGCluster(idControlSeleccionado);      
                    //QUITAR LA GRAFICAD EL ESTADO DE CONTRUCCIóN
                    ///lista_controles.getItem(idControlSeleccionado).setReady(true);
                },
                function(data){//Error
                    console.log("Error ObtenerListadoUrl");
                    console.log(data);
                }
            );

            Servicio_Grafica.ObtenerPromociones(
                {
                    owner:$scope.empresa.id,
                },
                function(data){//Éxito
                    var aux = ['All'];
                    for (var i = 0; i < data.data.length; i++){
                        //console.log(data.data[i].name);
                        aux.push(data.data[i].name);
                    }
                    $scope.listadoPromociones = aux;
                },
                function(data){//Error
                    console.log("Error al obtener promociones");
                    console.log(data);
                }
            );


            /////////////////
            lista_controles.getItem(idControlSeleccionado).setChildReady(false);



            idControl = idControlSeleccionado
            /**********************
            INICIO Propiedades de la Gráfica
            **********************/
            $scope.graphicTitleEnable = lista_controles.getItem(idControl).getTitleEnable();
            $scope.graphicTitle = lista_controles.getItem(idControl).getTitle();
            $scope.graphicTitleColor = lista_controles.getItem(idControl).getTitleColor();
            $scope.graphicTitleTextAlign = lista_controles.getItem(idControl).getTitleTextAlign();
            //$scope.graphicTitleVerticalAlign = lista_controles.getItem(idControl).getTitleVerticalAlign();
            $scope.graphicTitleFontWeight = lista_controles.getItem(idControl).getTitleFontWeight(); 
            $scope.graphicTitleFontSize = parseInt ( lista_controles.getItem(idControl).getTitleFontSize().split("%")[0] );
            $scope.graphicTitleFloating = lista_controles.getItem(idControl).getTitleFloating();
            $scope.graphicTitleTextDecoration = lista_controles.getItem(idControl).getTitleTextDecoration();
            $scope.graphicTitleTextTransform = lista_controles.getItem(idControl).getTitleTextTransform();
            $scope.graphicTitleLetterSpacing = parseInt ( lista_controles.getItem(idControl).getTitleLetterSpacing().split("px")[0] );
            $scope.graphicTitleWordSpacing = parseInt ( lista_controles.getItem(idControl).getTitleWordSpacing().split("px")[0] );


            $scope.graphicSubtitleEnable = lista_controles.getItem(idControl).getSubtitleEnable();
            $scope.graphicSubtitle = lista_controles.getItem(idControl).getSubtitle();
            $scope.graphicSubtitleColor = lista_controles.getItem(idControl).getSubtitleColor();
            $scope.graphicSubtitleTextAlign = lista_controles.getItem(idControl).getSubtitleTextAlign();
            //$scope.graphicSubtitleVerticalAlign = lista_controles.getItem(idControl).getSubtitleVerticalAlign();
            $scope.graphicSubtitleFontWeight = lista_controles.getItem(idControl).getSubtitleFontWeight(); 
            $scope.graphicSubtitleFontSize = parseInt ( lista_controles.getItem(idControl).getSubtitleFontSize().split("%")[0] );
            $scope.graphicSubtitleFloating = lista_controles.getItem(idControl).getSubtitleFloating();
            $scope.graphicSubtitleTextDecoration = lista_controles.getItem(idControl).getSubtitleTextDecoration();
            $scope.graphicSubtitleTextTransform = lista_controles.getItem(idControl).getSubtitleTextTransform();
            $scope.graphicSubtitleLetterSpacing = parseInt ( lista_controles.getItem(idControl).getSubtitleLetterSpacing().split("px")[0] );
            $scope.graphicSubtitleWordSpacing = parseInt ( lista_controles.getItem(idControl).getSubtitleWordSpacing().split("px")[0] );




            $scope.graphicLegendBackgroundColor = lista_controles.getItem(idControl).getLegendBackgroundColor();
            $scope.graphicLegendAlign = lista_controles.getItem(idControl).getLegendAlign();
            $scope.graphicLegendLayout = lista_controles.getItem(idControl).getLegendLayout();
            $scope.graphicLegendVerticalAlign = lista_controles.getItem(idControl).getLegendVerticalAlign();
            $scope.graphicLegendShadow = lista_controles.getItem(idControl).getLegendShadow();
            $scope.graphicLegendFloating = lista_controles.getItem(idControl).getLegendFloating();


            $scope.graphicBackgroundColor = lista_controles.getItem(idControl).getCharBackgroundColor();
            $scope.zIndex = parseInt( lista_controles.getItem(idControl).getParentStyleZIndex() );
            /**********************
            FIN Propiedades de la Gráfica
            **********************/


            /**********************
            INICIO DATOS GRÄFICA
            **********************/
            $scope.graphicDataSourcePromotion = lista_controles.getItem(idControl).getChildDataSourcePromotion();
            $scope.graphicXAxis = lista_controles.getItem(idControl).getChildDataSourceXAxis();
            
            $scope.graphicType = lista_controles.getItem(idControl).getChildDataSourceGraphicType();

            /**********************
            FIN DATOS GRÄFICA
            **********************/

            $scope.graphicYAxis = lista_controles.getItem(idControl).getChildDataSourceYAxis();
            $scope.graphicCheckMan = lista_controles.getItem(idControl).getChildDataSourceMen() == 1?true:false;
            $scope.graphicCheckWoman = lista_controles.getItem(idControl).getChildDataSourceWomen() == 1?true:false;
            $scope.graphicLabelX = lista_controles.getItem(idControl).getChildDataSourceXAxisName();
            $scope.graphicLabelY = lista_controles.getItem(idControl).getChildDataSourceYAxisName();

            /********************
            INICIO DATOS DEL TEMPLATE gCluster
            *********************/
            $scope.graphicClusterCheckAge = lista_controles.getItem(idControl).getChildClusteringTag('age');
            $scope.graphicClusterCheckCity = lista_controles.getItem(idControl).getChildClusteringTag('city');
            $scope.graphicClusterCheckCountry = lista_controles.getItem(idControl).getChildClusteringTag('country');
            $scope.graphicClusterCheckGender = lista_controles.getItem(idControl).getChildClusteringTag('gender');
            $scope.graphicClusterNumberOfClusters = parseInt( lista_controles.getItem(idControl).getChildClusteringNumberOfClusters() );
            $scope.graphicClusterCluterConfig = lista_controles.getItem(idControl).getChildClusteringClusterConfig();
            //$scope.graphicClusterCluterConfig = [{name:"c1",color:"red"},{name:"c2",color:"blue"}];
            //PENDIENTE LA INICIALIZACIÓN DE LA CONFIGURACIÓN DE CLUTERS
            /********************
            FIN DATOS DEL TEMPLATE gCluster
            *********************/

            //Mostramos la vista de  configuración del control seleccionado!
            $state.transitionTo('grafica.' + lista_controles.getItem(idControl).getChildViewConfig());//La vista de la configuración local de la gráfica (No hace peticiones)
            UpdateChartSecundaryInfoFromApi(idControlSeleccionado);//Traemos los datos de configuración para no depender de la llamada la la API de datos




            lista_controles.getItem(idControlSeleccionado).setChildReady(true);

            UpdateChartFromApi(idControlSeleccionado, true);


            $scope.showPropertiesView = true;           

            InicializarVentanasEmergentes();
/*
            if(!timeoutStarts){//Iniciar el timer solamente una vez
                console.log("Timeout");
                $timeout(UpdateChartTimeout, 1000 * 60 * 2);
                timeoutStarts = true;
            }
*/

        }




        /*********************************************
        INICIO WATCH
        **********************************************/

            /**********************
            INICIO Propiedades de la Gráfica
            **********************/

        $scope.$watch('graphicBackgroundColor',function(newValue,oldValue){//localCompere para evitar el error!!
            if (newValue && oldValue && newValue !== oldValue) {
                lista_controles.getItem(idControlSeleccionado).setCharBackgroundColor($scope.graphicBackgroundColor);
            }
        });

        ///////////////////////////////
        //////////////////////////////
        /////////////////////////////
        //Inicio propiedades del titulo
        $scope.$watch('graphicTitleEnable',function(newValue,oldValue){//localCompere para evitar el error!!
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setTitleEnable($scope.graphicTitleEnable);
        });  
        $scope.$watch('graphicTitle',function(newValue,oldValue){//localCompere para evitar el error!!
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setTitle($scope.graphicTitle);
        });
        $scope.$watch('graphicTitleColor',function(newValue,oldValue){//localCompere para evitar el error!!
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setTitleColor($scope.graphicTitleColor);
        });
        $scope.$watch('graphicTitleTextAlign',function(newValue,oldValue){
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setTitleTextAlign($scope.graphicTitleTextAlign);
        });
        /*
        $scope.$watch('graphicTitleVerticalAlign',function(newValue,oldValue){
            lista_controles.getItem(idControlSeleccionado).setTitleVerticalAlign($scope.graphicTitleVerticalAlign);
        });
        */
        $scope.$watch('graphicTitleFontWeight',function(newValue,oldValue){
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setTitleFontWeight($scope.graphicTitleFontWeight);
        });
        $scope.$watch('graphicTitleFontSize',function(newValue,oldValue){
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setTitleFontSize($scope.graphicTitleFontSize + "%");
        });
        $scope.$watch('graphicTitleFloating',function(newValue,oldValue){
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setTitleFloating($scope.graphicTitleFloating);
        });
        $scope.$watch('graphicTitleTextDecoration',function(newValue,oldValue){
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setTitleTextDecoration($scope.graphicTitleTextDecoration);
        });
        $scope.$watch('graphicTitleTextTransform',function(newValue,oldValue){
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setTitleTextTransform($scope.graphicTitleTextTransform);
        });
        $scope.$watch('graphicTitleLetterSpacing',function(newValue,oldValue){
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setTitleLetterSpacing($scope.graphicTitleLetterSpacing + "px");
        });
        $scope.$watch('graphicTitleWordSpacing',function(newValue,oldValue){
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setTitleWordSpacing($scope.graphicTitleWordSpacing + "px");
        });
        //Fin propiedades del titulo
        ///////////////////////////
        //////////////////////////
        /////////////////////////


 
        ///////////////////////////////
        //////////////////////////////
        /////////////////////////////
        //Inicio propiedades del subtitulo
        $scope.$watch('graphicSubtitleEnable',function(newValue,oldValue){//localCompere para evitar el error!!
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setSubtitleEnable($scope.graphicSubtitleEnable);
        });  
        $scope.$watch('graphicSubtitle',function(newValue,oldValue){//localCompere para evitar el error!!
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setSubtitle($scope.graphicSubtitle);
        });
        $scope.$watch('graphicSubtitleColor',function(newValue,oldValue){//localCompere para evitar el error!!
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setSubtitleColor($scope.graphicSubtitleColor);
        });
        $scope.$watch('graphicSubtitleTextAlign',function(newValue,oldValue){
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setSubtitleTextAlign($scope.graphicSubtitleTextAlign);
        });
        /*
        $scope.$watch('graphicSubtitleVerticalAlign',function(newValue,oldValue){
            lista_controles.getItem(idControlSeleccionado).setSubtitleVerticalAlign($scope.graphicSubtitleVerticalAlign);
        });
        */
        $scope.$watch('graphicSubtitleFontWeight',function(newValue,oldValue){
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setSubtitleFontWeight($scope.graphicSubtitleFontWeight);
        });
        $scope.$watch('graphicSubtitleFontSize',function(newValue,oldValue){
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setSubtitleFontSize($scope.graphicSubtitleFontSize + "%");
        });
        $scope.$watch('graphicSubtitleFloating',function(newValue,oldValue){
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setSubtitleFloating($scope.graphicSubtitleFloating);
        });
        $scope.$watch('graphicSubtitleTextDecoration',function(newValue,oldValue){
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setSubtitleTextDecoration($scope.graphicSubtitleTextDecoration);
        });
        $scope.$watch('graphicSubtitleTextTransform',function(newValue,oldValue){
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setSubtitleTextTransform($scope.graphicSubtitleTextTransform);
        });
        $scope.$watch('graphicSubtitleLetterSpacing',function(newValue,oldValue){
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setSubtitleLetterSpacing($scope.graphicSubtitleLetterSpacing + "px");
        });
        $scope.$watch('graphicSubtitleWordSpacing',function(newValue,oldValue){
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setSubtitleWordSpacing($scope.graphicSubtitleWordSpacing + "px");
        });
        //Fin propiedades del subtitulo
        ///////////////////////////
        //////////////////////////
        /////////////////////////







        //////////////////////////////
        //////////////////////////////
        //Inicio propiedades de Legend
        $scope.$watch('graphicLegendBackgroundColor',function(newValue,oldValue){//localCompere para evitar el error!!
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setLegendBackgroundColor($scope.graphicLegendBackgroundColor);
        });


        $scope.$watch('graphicLegendAlign',function(newValue,oldValue){
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setLegendAlign($scope.graphicLegendAlign);
        });
        $scope.$watch('graphicLegendLayout',function(newValue,oldValue){
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setLegendLayout($scope.graphicLegendLayout);
        });
        $scope.$watch('graphicLegendVerticalAlign',function(newValue,oldValue){
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setLegendVerticalAlign($scope.graphicLegendVerticalAlign);
        });
        $scope.$watch('graphicLegendShadow',function(newValue,oldValue){
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setLegendShadow($scope.graphicLegendShadow);
        });
        $scope.$watch('graphicLegendFloating',function(newValue,oldValue){
            if (newValue && oldValue && newValue !== oldValue)
                lista_controles.getItem(idControlSeleccionado).setLegendFloating($scope.graphicLegendFloating);
        });
        ////////////////////////////
        ///////////////////////////
        //Fin propiedades de Legend

            /**********************
            FIN Propiedades de la Gráfica
            **********************/


            /**********************
            INICIO DATOS GRÄFICA
            **********************/
            
        $scope.$watch('graphicDataSourcePromotion',function(newValue,oldValue){//localCompere para evitar el error!!
            if (newValue && oldValue && newValue !== oldValue){
                lista_controles.getItem(idControlSeleccionado).setChildDataSourcePromotion($scope.graphicDataSourcePromotion);
                UpdateChartFromApi(idControlSeleccionado,true);//Valida el arreglo y traer los datos
            }
        });    
        $scope.$watch('graphicXAxis',function(newValue,oldValue){//localCompere para evitar el error!!
            if (newValue && oldValue && newValue !== oldValue){
                lista_controles.getItem(idControlSeleccionado).setChildDataSourceXAxis($scope.graphicXAxis);
                $scope.graphicLabelX = newValue;
                UpdateChartFromApi(idControlSeleccionado,false);//Valida el arreglo y traer los datos; NO forzamos la actualización; ya que puede que haya  cache!!
                UpdateChartSecundaryInfoFromApi(idControlSeleccionado);//Traemos los datos de configuración para no depender de la llamada la la API de datos
            }
        });
        $scope.$watch('graphicCheckMan',function(newValue,oldValue){//localCompere para evitar el error!!
            if ( newValue !== oldValue){
                // console.log("graphicCheckMan" + newValue);
                lista_controles.getItem(idControlSeleccionado).setChildDataSourceMen($scope.graphicCheckMan?1:0);
                UpdateChartFromApi(idControlSeleccionado,false);//Valida el arreglo y traer los datos
            }
        });
        $scope.$watch('graphicCheckWoman',function(newValue,oldValue){//localCompare para evitar el error!!
            //console.log("graphicCheckWoman" + newValue);
            if (newValue !== oldValue){
                lista_controles.getItem(idControlSeleccionado).setChildDataSourceWomen($scope.graphicCheckWoman?1:0);
                UpdateChartFromApi(idControlSeleccionado, false);//Valida el arreglo y traer los datos
            }
        });
        $scope.$watch('graphicLabelX',function(newValue,oldValue){//localCompere para evitar el error!!
            if (newValue && oldValue && newValue !== oldValue){
                lista_controles.getItem(idControlSeleccionado).setChildDataSourceXAxisName($scope.graphicLabelX);
            }
        });
        $scope.$watch('graphicLabelY',function(newValue,oldValue){//localCompere para evitar el error!!
            if (newValue && oldValue && newValue !== oldValue){
                lista_controles.getItem(idControlSeleccionado).setChildDataSourceYAxisName($scope.graphicLabelY);
            }
        });
        $scope.$watch('graphicType',function(newValue,oldValue){//localCompere para evitar el error!!
            if (newValue && oldValue && newValue !== oldValue){
                lista_controles.getItem(idControlSeleccionado).setChildDataSourceGraphicType($scope.graphicType);
                lista_controles.getItem(idControlSeleccionado).DibujarControl(); //Redibujamos para no depender de la llamada API de datos
                //UpdateChartFromApi(idControlSeleccionado);//Valida el arreglo y traer los datos
            }
        });
        
            /**********************
            INICIO DATOS GRÄFICA
            **********************/

            /********************
            INICIO DATOS DEL TEMPLATE gCluster
            *********************/
        $scope.$watch('graphicClusterCheckAge',function(newValue,oldValue){
            if (newValue !== oldValue){
                lista_controles.getItem(idControlSeleccionado).addOrUpdateChildClusteringTag('age',$scope.graphicClusterCheckAge);
                UpdateChartFromApi(idControlSeleccionado,true);//Cambio forzado
            }
        });
        $scope.$watch('graphicClusterCheckCity',function(newValue,oldValue){
            if (newValue !== oldValue){
                lista_controles.getItem(idControlSeleccionado).addOrUpdateChildClusteringTag('city',$scope.graphicClusterCheckCity);
                UpdateChartFromApi(idControlSeleccionado,true);//Cambio forzado
            }
        });
        $scope.$watch('graphicClusterCheckCountry',function(newValue,oldValue){
            if (newValue !== oldValue){
                lista_controles.getItem(idControlSeleccionado).addOrUpdateChildClusteringTag('country',$scope.graphicClusterCheckCountry);
                UpdateChartFromApi(idControlSeleccionado,true);//Cambio forzado
            }
        });
        $scope.$watch('graphicClusterCheckGender',function(newValue,oldValue){
            if (newValue !== oldValue){
                lista_controles.getItem(idControlSeleccionado).addOrUpdateChildClusteringTag('gender',$scope.graphicClusterCheckGender);
                UpdateChartFromApi(idControlSeleccionado,true);//Cambio forzado
            }
        });
        $scope.$watch('graphicClusterNumberOfClusters',function(newValue,oldValue){
            if (newValue && oldValue && newValue !== oldValue){
                lista_controles.getItem(idControlSeleccionado).setChildClusteringNumberOfClusters($scope.graphicClusterNumberOfClusters);
                //console.log($scope.graphicClusterNumberOfClusters);
                UpdateChartFromApi(idControlSeleccionado,true);//Cambio forzado
            }
        });

            //PENDIENTE LA INICIALIZACIÓN DE LA CONFIGURACIÓN DE CLUTERS
            /********************
            FIN DATOS DEL TEMPLATE gCluster
            *********************/

        $scope.$watch('zIndex',function(newValue,oldValue){//localCompere para evitar el error!!
            if (newValue && oldValue && newValue !== oldValue){
                lista_controles.getItem(idControlSeleccionado).setParentStyleZIndex($scope.zIndex);
                //lista_controles.getItem(idControlSeleccionado).ActualizarArray();
            }
        });

        /*********************************************
        FIN WATCH
        **********************************************/

        $scope.EventoClick_CancelarCambio = function(){
            jQuery( "#grafica-dialogo-confirmacion-cancelar" ).dialog("open");
        }

        $scope.EventoClick_Guardar = function(){
            jQuery( "#grafica-dialogo-confirmacion-guardar" ).dialog('open');
        }

        $scope.EventoClick_Eliminar = function(){
            jQuery( "#grafica-dialogo-confirmacion-eliminar" ).dialog('open');       
        }

        $scope.EventoClick_AbirDialogoBancoMedios = function(){
            jQuery( "#grafica-dialog-selecionar-recurso" ).dialog("open");
        }

        //https://stackoverflow.com/questions/16824853/way-to-ng-repeat-defined-number-of-times-instead-of-repeating-over-array
        //$scope.number = 5;
        $scope.getNumber = function() {
            //return new Array(num);   
            return lista_controles.getItem(idControlSeleccionado).getChildData();
        }

        $scope.EventoChange_ConfiguracionGraficaGCluster = function(){
            lista_controles.getItem(idControlSeleccionado).setChildClusteringClusterConfig($scope.graphicClusterCluterConfig );
            //console.log("graphicClusterCluterConfig");
            //console.log($scope.graphicClusterCluterConfig );
             lista_controles.getItem(idControlSeleccionado).DibujarControl(); // Forzamos el redibujado para no tener que hacer peticiones al servidor!
            //UpdateChartFromApi(idControlSeleccionado);
        }


       
        //xAxis: 0,
        //yAxis: 0,
        //xAxisName : 'xAxisName',
        //yAxisName: 'yAxisName',
        //men: true,
        //women:true,
        //graphicType : 'Line',
        function UpdateChartFromApi(idChart, forceUpdate){//dataPackage
            try{
                if(!lista_controles.getItem(idChart).isChildReady() || lista_controles.getItem(idChart).isChildUpdating())
                    return 0;
                if((lista_controles.getItem(idChart).getChildDataSourceXAxis().localeCompare('none') == 0 || lista_controles.getItem(idChart).getChildDataSourceXAxis().localeCompare('') == 0) && 
                (lista_controles.getItem(idChart).getChildDataSourceYAxis().localeCompare('none')  == 0 || lista_controles.getItem(idChart).getChildDataSourceYAxis().localeCompare('')  == 0)) //Si ambos son none se ignora la petición
                    return  0;           

                console.log("UpdateChartFromApi");
                lista_controles.getItem(idChart).setChildUpdating(true);
                Servicio_Grafica.ObtenerDatosGrafica(
                {
                    owner: $scope.empresa.id,
                    xAxis: lista_controles.getItem(idChart).getChildDataSourceXAxis(),
                    yAxis: lista_controles.getItem(idChart).getChildDataSourceYAxis(),
                    men: lista_controles.getItem(idChart).getChildDataSourceMen(),
                    women: lista_controles.getItem(idChart).getChildDataSourceWomen(),
                    promotionName: lista_controles.getItem(idChart).getChildDataSourcePromotion(),
                    //graphicType:'',
                    //gCluster
                    attributes:lista_controles.getItem(idControlSeleccionado).getChildClusteringTags(),
                    numberOfClusters:lista_controles.getItem(idControlSeleccionado).getChildClusteringNumberOfClusters(),
                    idResponse:lista_controles.getItem(idChart).getChildDataSourceIdResponse(),
                    'forceUpdate':forceUpdate, //Si se realizo un cambio en data source, chart, numberofclusters es necesario forzar la actualización, ya que el cache no refleja los datos necesarios
                },
                function(data){

                    for (var i = 0; i < 1000 * 1;i++){}

                    console.log("EXITO en Servicio_Grafica");
                    $scope.listadoTipoGraficas = data.data.apis_graficas.configuration.type;
                    //Hay que actualizar el arreglo data de la gráfica
                    //Grafica.prototype.setChildData
                    lista_controles.getItem(idChart).setChildData(data.data.data); //Los datos  para la series
                    $scope.graphicClusterCluterConfig = lista_controles.getItem(idControl).getChildClusteringClusterConfig();// ???
                    lista_controles.getItem(idChart).setChildDataSourceIdResponse(data.data.apis_graficas.idResponse);

                    lista_controles.getItem(idChart).DibujarControl();
                    lista_controles.getItem(idChart).setChildUpdating(false);

                    //lista_controles.getItem(i).Actualizar();
                },
                function(data){
                    console.log("Error en Servicio_Grafica");
                    console.log(data);
                    lista_controles.getItem(idChart).setChildUpdating(false);
                });
            }
            catch(err){
                console.log("TRY: Error en Servicio_Grafica");
                console.log(err);
            }
        }

        //Solo obtien los distintos tipos de gráfica disponibles y las vistas auxiliares para la configuración de casos especificos; lectura de la configuración de la gráfica
        function UpdateChartSecundaryInfoFromApi (idChart){
            try{
                Servicio_Grafica.ObtenerConfigGrafica(
                    {
                        url:lista_controles.getItem(idChart).getChildDataSourceXAxis()
                    },
                    function (data){//éxito
                        console.log("Éxito al momento de obtener la configuración");
                        console.log(data.data);
                        $scope.listadoTipoGraficas = data.data.configuration.type;// [Column,bar,etc..]

                        //Si mi gráfica actual no esta en el listado de graficas disponibles, establesco la primera de las lista disponible a mi gráfica
                        if(
                            !containsObject(
                            lista_controles.getItem(idControlSeleccionado).getChildDataSourceGraphicType(),
                            data.data.configuration.type)
                        ){
                            $scope.graphicType = data.data.configuration.type[0];
                        }


                        $state.transitionTo('grafica.' + data.data.configuration.view); // esta linea da error ???
                        lista_controles.getItem(idChart).setChildViewConfig(data.data.configuration.view); // Establecemos los tipos de gráfica
                        
                        xAxis = lista_controles.getItem(idChart).getChildXAxis();//Obtenermos la configuración actual
                        xAxis.labels.enabled = data.data.configuration.chartConfig.xAxis.labels.enabled; //Cambiamos los parametros necesario
                        lista_controles.getItem(idChart).setChildXAxis(xAxis);//Actualizamos

                        yAxis = lista_controles.getItem(idChart).getChildYAxis();//Obtenemos la configuración actual
                        yAxis.labels.enabled = data.data.configuration.chartConfig.yAxis.labels.enabled;//Cambiamos los parametros necesarios
                        lista_controles.getItem(idChart).setChildYAxis(yAxis);//Actualizamos
                    },
                    function(data){//Error
                        console.log("Se ha generado un error al intentar obtener la configuración");
                        console.log(data);
                    }
                );
            }
            catch(err) {
                console.log("TRY: Se ha generado un error al intentar obtener la configuración ");
                console.log(err.message);
            }
        }

        function UpdateChartTimeout(){
            console.log('Update Chart');
            for(var idControl = 0; idControl < lista_controles.getLength(); idControl++){
                if(lista_controles.getItem(idControl).getChildType().localeCompare('grafica') == 0){//Si el control es una gráfica hay que llama el método actualiza
                   UpdateChartFromApi(idControl); //Actualizamos la gráfica desde la API
                }
            }
            $timeout(UpdateChartTimeout, 100 * 60 * 2);
        }


        //Busqueda local
       function containsObject(obj, list) {
            var i;
            for (i = 0; i < list.length; i++) {
                if (list[i] === obj) {
                    return true;
                }
            }

            return false;
        }



     function CancelarCambio (){
            lista_controles.getItem(idControlSeleccionado).CancelarActualizacion();//Linea para cancelar actualizaciones
            $scope.Constructor();
        }

        function Guardar(){
            lista_controles.getItem(idControlSeleccionado).Actualizar();//Linea para guardar cambios
            $scope.deshabilitarBotonGuardar = false;
        }

        function Eliminar(){
            //Lo eliminamos de la lista
            lista_controles.pop(idControlSeleccionado,function(control){
                if(control.getParentEnable() == false){//Si se elimino algo de la lista...
                    console.log(control);
                    //Eliminamos el control de la pantalla
                    control.EliminarControl();
                    //Cómo ya se elimino el control cargamos una vista "limpia", es decir, sin contenido
                    $state.transitionTo('limpiar');
                }else{
                    alert("Error al intentar eliminar el control");
                }
            });      
        }

        function InicializarVentanasEmergentes(){
           // jQuery( "#dialog-selecionar-recurso" ).dialog("open");
            //
            jQuery( "#grafica-dialogo-confirmacion-cancelar" ).dialog({
                autoOpen: false,
                resizable: false,
                height: "auto",
                width: 400,
                modal: true,
                buttons: {
                   Aceptar: function() {
                        CancelarCambio();//Llamos la función de cancelar cambios
                        $( this ).dialog( "close" );
                    },
                    Cancelar: function() {
                      $( this ).dialog( "close" );
                    }
                  }
                }
            );
            //
            jQuery( "#grafica-dialogo-confirmacion-guardar" ).dialog({
                autoOpen: false,
                resizable: false,
                height: "auto",
                width: 400,
                modal: true,
                buttons: {
                   Aceptar: function() {
                        Guardar();
                        $( this ).dialog( "close" );
                    },
                    Cancelar: function() {
                      $( this ).dialog( "close" );
                    }
                  }
                }
            );
            //
            jQuery( "#grafica-dialogo-confirmacion-eliminar" ).dialog({
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

        }


    }])
    /*****************************
    FIN CONTROLADOR GRAFICA
    *****************************/





    /*****************************
    INICIO CONTROLADOR IMAGEN
    *****************************/
    .controller("controlador_imagen",['$rootScope','$scope','$state',function($rootScope,$scope,$state){

        $scope.Constructor = function(){
            console.log("Constructor()");
            $scope.control = controles[0];
            console.log($scope.control);
            $scope.url = lista_controles.getItem(idControlSeleccionado).getChildSrc();
            $scope.zIndex = lista_controles.getItem(idControlSeleccionado).getParentStyleZIndex();


            console.log("ID del control seleccionado! desde controlador imagen: " + idControlSeleccionado );
            
            
            InicializarVentanasEmergentes();
        }

        $scope.$watch('url',function(newValue,oldValue){
            console.log($scope.url);
            lista_controles.getItem(idControlSeleccionado).setChildSrc($scope.url);
            //lista_controles.getItem(idControlSeleccionado).ActualizarArray();
        });
         $scope.$watch('zIndex',function(newValue,oldValue){//localCompere para evitar el error!!
            lista_controles.getItem(idControlSeleccionado).setParentStyleZIndex($scope.zIndex);
            //lista_controles.getItem(idControlSeleccionado).ActualizarArray();
        });

        $scope.EventoClick_CancelarCambio = function(){
            jQuery( "#imagen-dialogo-confirmacion-cancelar" ).dialog("open");
        }

        $scope.EventoClick_Guardar = function(){
            jQuery( "#imagen-dialogo-confirmacion-guardar" ).dialog('open');
        }

        $scope.EventoClick_Eliminar = function(){
            jQuery( "#imagen-dialogo-confirmacion-eliminar" ).dialog('open');       
        }

        $scope.EventoClick_AbirDialogoBancoMedios = function(){
            jQuery( "#imagen-dialog-selecionar-recurso" ).dialog("open");
        }

        function AbirDialogoBancoMedios(){

        }
       

        function CancelarCambio (){
            lista_controles.getItem(idControlSeleccionado).CancelarActualizacion();//Linea para cancelar actualizaciones
            $scope.Constructor();
        }

        function Guardar(){
            lista_controles.getItem(idControlSeleccionado).Actualizar();//Linea para guardar cambios
            $scope.deshabilitarBotonGuardar = false;
        }

        function Eliminar(){
            //Lo eliminamos de la lista
            lista_controles.pop(idControlSeleccionado,function(control){
                if(control.getParentEnable() == false){//Si se elimino algo de la lista...
                    console.log(control);
                    //Eliminamos el control de la pantalla
                    control.EliminarControl();
                    //Cómo ya se elimino el control cargamos una vista "limpia", es decir, sin contenido
                    $state.transitionTo('limpiar');
                }else{
                    alert("Error al intentar eliminar el control");
                }
            });      
        }

        function InicializarVentanasEmergentes(){
           // jQuery( "#dialog-selecionar-recurso" ).dialog("open");
            //
            jQuery( "#imagen-dialogo-confirmacion-cancelar" ).dialog({
                autoOpen: false,
                resizable: false,
                height: "auto",
                width: 400,
                modal: true,
                buttons: {
                   Aceptar: function() {
                        CancelarCambio();//Llamos la función de cancelar cambios
                        $( this ).dialog( "close" );
                    },
                    Cancelar: function() {
                      $( this ).dialog( "close" );
                    }
                  }
                }
            );
            //
            jQuery( "#imagen-dialogo-confirmacion-guardar" ).dialog({
                autoOpen: false,
                resizable: false,
                height: "auto",
                width: 400,
                modal: true,
                buttons: {
                   Aceptar: function() {
                        Guardar();
                        $( this ).dialog( "close" );
                    },
                    Cancelar: function() {
                      $( this ).dialog( "close" );
                    }
                  }
                }
            );
            //
            jQuery( "#imagen-dialogo-confirmacion-eliminar" ).dialog({
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

        }

    }])

    /*****************************
    FIN CONTROLADOR IMAGEN
    *****************************/






    /*****************************
    INICIO CONTROLADOR TEXTO
    *****************************/
    .controller("controlador_texto",['$scope','$state',function($scope,$state){
        
        $scope.config = {
            font_weights:['normal','bold'],
            text_decorations:['none','line-through','underline'],
            text_aligns:['left','center','right'],
            text_transforms:['none','capitalize','lowercase','uppercase'],
            font_families:['Cursive', 'sans-serif', "serif",'monospace','Georgia','Open Sans','Roboto','Lato','Roboto Condensed','Open Sans Condensed','Titillium Web']

        };

        

        $scope.Constructor = function(){
            console.log("Constructor()");
            $scope.control = controles[1];
            console.log($scope.control);

            

            //
            $scope.texto= lista_controles.getItem(idControlSeleccionado).getChildText();
            $scope.fontColor = lista_controles.getItem(idControlSeleccionado).getChildStyleColor();
            $scope.backgroundColor = lista_controles.getItem(idControlSeleccionado).getParentStyleBackgroundColor();
            $scope.fontWeight = lista_controles.getItem(idControlSeleccionado).getParentStyleFontWeight();
            $scope.textDecoration = lista_controles.getItem(idControlSeleccionado).getParentStyleTextDecoration();
            $scope.textAlign =  lista_controles.getItem(idControlSeleccionado).getParentStyleTextAlign();
            $scope.textTransform = lista_controles.getItem(idControlSeleccionado).getParentStyleTextTransform()
            $scope.lineHeight = lista_controles.getItem(idControlSeleccionado).getParentStyleLineHeight();
            $scope.fontFamily = lista_controles.getItem(idControlSeleccionado).getParentStyleFontFamily();
            $scope.fontSize = lista_controles.getItem(idControlSeleccionado).getChildStyleFontSize().split("%")[0];
            $scope.letterSpacing = lista_controles.getItem(idControlSeleccionado).getParentStyleLetterSpacing().split("px")[0];
            $scope.wordSpacing = lista_controles.getItem(idControlSeleccionado).getParentStyleWordSpacing().split("px")[0];
            $scope.zIndex = lista_controles.getItem(idControlSeleccionado).getParentStyleZIndex();
            console.log("ID del control seleccionado! desde contrlador: " + idControlSeleccionado );

            

            InicializarVentanasEmergentes();
        }

        //http://stackoverflow.com/questions/19007281/angular-trigger-changes-with-watch-vs-ng-change-ng-checked-etc
        $scope.$watch('texto',function(newValue,oldValue){
            lista_controles.getItem(idControlSeleccionado).setChildText($scope.texto);
            //lista_controles.getItem(idControlSeleccionado).ActualizarArray();
        });
        $scope.$watch('fontWeight',function(newValue,oldValue){
            lista_controles.getItem(idControlSeleccionado).setParentStyleFontWeight($scope.fontWeight);
        });
        $scope.$watch('textDecoration',function(newValue,oldValue){
            lista_controles.getItem(idControlSeleccionado).setParentStyleTextDecoration($scope.textDecoration);
        });
        $scope.$watch('textAlign',function(newValue,oldValue){
            lista_controles.getItem(idControlSeleccionado).setParentStyleTextAlign($scope.textAlign);
        });
        $scope.$watch('textTransform',function(newValue,oldValue){
            lista_controles.getItem(idControlSeleccionado).setParentStyleTextTransform($scope.textTransform);
        });
        $scope.$watch('lineHeight',function(newValue,oldValue){
            lista_controles.getItem(idControlSeleccionado).setParentStyleLineHeight($scope.lineHeight);
        });
        $scope.$watch('fontFamily',function(newValue,oldValue){
            lista_controles.getItem(idControlSeleccionado).setParentStyleFontFamily($scope.fontFamily);
            //lista_controles.getItem(idControlSeleccionado).ActualizarArray();
        });
        $scope.$watch('fontSize',function(newValue,oldValue){
            lista_controles.getItem(idControlSeleccionado).setChildStyleFontSize($scope.fontSize + "%");
            //lista_controles.getItem(idControlSeleccionado).ActualizarArray();
        });
        $scope.$watch('letterSpacing',function(newValue,oldValue){//localCompere para evitar el error!!
            lista_controles.getItem(idControlSeleccionado).setParentStyleLetterSpacing($scope.letterSpacing + "px");
            //lista_controles.getItem(idControlSeleccionado).ActualizarArray();
        });
        $scope.$watch('wordSpacing',function(newValue,oldValue){//localCompere para evitar el error!!
            lista_controles.getItem(idControlSeleccionado).setParentStyleWordSpacing($scope.wordSpacing + "px");
            //lista_controles.getItem(idControlSeleccionado).ActualizarArray();
        });
        $scope.$watch('zIndex',function(newValue,oldValue){//localCompere para evitar el error!!
            lista_controles.getItem(idControlSeleccionado).setParentStyleZIndex($scope.zIndex);
            //lista_controles.getItem(idControlSeleccionado).ActualizarArray();
        });
        $scope.$watch('fontColor',function(newValue,oldValue){
            lista_controles.getItem(idControlSeleccionado).setChildStyleColor($scope.fontColor);
            //lista_controles.getItem(idControlSeleccionado).ActualizarArray();
        });
        $scope.$watch('backgroundColor',function(newValue,oldValue){
           lista_controles.getItem(idControlSeleccionado).setParentStyleBackgroundColor($scope.backgroundColor); 
           //lista_controles.getItem(idControlSeleccionado).ActualizarArray();
        });



        $scope.EventoClick_CancelarCambio = function(){
            jQuery( "#texto-dialogo-confirmacion-cancelar" ).dialog("open");
        }

        $scope.EventoClick_Guardar = function(){
            jQuery( "#texto-dialogo-confirmacion-guardar" ).dialog('open');
            $scope.deshabilitarBotonGuardar = false;
        }

        $scope.EventoClick_Eliminar = function(){
            jQuery( "#texto-dialogo-confirmacion-eliminar" ).dialog('open');       
        }



        function CancelarCambio(){
            lista_controles.getItem(idControlSeleccionado).CancelarActualizacion();
            $scope.Constructor();
        }

        function Guardar(){
            lista_controles.getItem(idControlSeleccionado).Actualizar();
        }

        function Eliminar(){
            //Lo eliminamos de la lista
            lista_controles.pop(idControlSeleccionado,function(control){
                if(control.getParentEnable() == false){//Si se elimino algo de la lista...
                    console.log(control);
                    //Eliminamos el control de la pantalla
                    control.EliminarControl();
                    //Cómo ya se elimino el control cargamos una vista "limpia", es decir, sin contenido
                    $state.transitionTo('limpiar');
                }else{
                    alert("Error al intentar eliminar el control");
                }
            });
        }

        function InicializarVentanasEmergentes(){
           // jQuery( "#dialog-selecionar-recurso" ).dialog("open");
            //
            jQuery( "#texto-dialogo-confirmacion-cancelar" ).dialog({
                autoOpen: false,
                resizable: false,
                height: "auto",
                width: 400,
                modal: true,
                buttons: {
                   Aceptar: function() {
                        CancelarCambio();//Llamos la función de cancelar cambios
                        $( this ).dialog( "close" );
                    },
                    Cancelar: function() {
                      $( this ).dialog( "close" );
                    }
                  }
                }
            );
            //
            jQuery( "#texto-dialogo-confirmacion-guardar" ).dialog({
                autoOpen: false,
                resizable: false,
                height: "auto",
                width: 400,
                modal: true,
                buttons: {
                   Aceptar: function() {
                        Guardar();
                        $( this ).dialog( "close" );
                    },
                    Cancelar: function() {
                      $( this ).dialog( "close" );
                    }
                  }
                }
            );
            //
            jQuery( "#texto-dialogo-confirmacion-eliminar" ).dialog({
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

        }


    }])


    /*****************************
    FIN CONTROLADOR TEXTO
    *****************************/


    /*****************************
    FIN CONTROLADORES
    *****************************/


/*****************************
FIN MODELO
*****************************/
;