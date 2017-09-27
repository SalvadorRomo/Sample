
//Número de veces que se mando a llamar el contructor del texto!
var numero_texto_contructor = 0;
var numero_imagen_contructor = 0;
///
//var myApp = angular.module('MainApp', ['ui.router'])
/*
>>>>>>> remotes/origin/master
myApp.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/templates/welcome.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: '/templates/login.html'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: '/templates/signup.html'
        })
        ;


    $urlRouterProvider.otherwise('/');

});
*/

var myApp = angular.module('MainApp', ['ui.router', 'ngFileUpload','colorpicker.module', 'toaster','ngAnimate','uiGmapgoogle-maps'])
.config(function($stateProvider, $urlRouterProvider) {

        //$urlRouterProvider.otherwise("/estado1");
 
        $stateProvider
             .state('limpiar', {
                url: "#",
                views:{
                    'caracteristicas':{
                        templateUrl:"/templates/dashboard/limpiar_detalle.html"
                    },
                }
            })
            .state('grafica', {
                url: "#",
                views:{
                    'caracteristicas':{
                        templateUrl:"/templates/dashboard/grafica.html"
                    },
                }
            })
            .state('tabla', {
                url: "#",
                views:{
                    'caracteristicas':{
                        templateUrl:"/templates/dashboard/tabla.html"
                    }
                }
            })
            .state("imagen",{
                url: "#",
                views:{
                    'caracteristicas':{
                        templateUrl:'/templates/dashboard/imagen.html'
                    }
                }
            })
            .state("texto",{
                url:"#",
                views:{
                    'caracteristicas':{
                        templateUrl:'/templates/dashboard/texto.html'
                    }
                }
            })

            /*******
            Graficas
            ********/
            .state("grafica.gLimpia",{
                url:"#",
                views:{
                    'configuracion_grafica':{
                        templateUrl:'/templates/dashboard/grafica/gLimpia.html'
                    }
                }
            })

            .state("grafica.gDefault",{
                controller: 'controlador_grafica',
                url:"#",
                views:{
                    'configuracion_grafica':{
                        templateUrl:'/templates/dashboard/grafica/gDefault.html'
                    }
                }
            })

            .state("grafica.gCluster",{
                url:"#",
                views:{
                    'configuracion_grafica':{
                        templateUrl:'/templates/dashboard/grafica/gCluster.html'
                    }
                }
            })
            

    })

.filter('FileNameWhitoutExtension',function(){
        return function(input) {
            if(input != null || input != undefined){
                var inputDivided = input.split('/');
                var output = inputDivided[inputDivided.lenght - 2].split('.')[0];
                console.log(input);
                console.log(inputDivided);
                console.log(output);
                return output + " LEO";
            }
            return "NULL";
        }
})



;





/***************************************************************
****************************************************************
****************************************************************
***************************************************************/



//Funciones necesarias para el panel

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

Object.clone = function(obj){
    return JSON.parse(JSON.stringify(obj));
};



/****************************
Propiedades globales <Evitar el uso de globales>
****************************/
var lista_controles;
var controles;
var Global_Number_Of_Grids = 32; 
var Global_Canvas_Class = ".canvas";
var canvas;
var idControlSeleccionado = -1;
var controlador_principal = 'dashboardEditorPageController';
var Global_IdContenedor = 'container';
var Global_Default_Size_Control = {width:15,height:15};
var Global_IdCaracteristicas = 'caracteristicas';
