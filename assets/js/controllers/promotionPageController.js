angular
    .module('MainApp').controller('promotionController', 
        ['$location', '$scope', '$timeout', '$http', 'Upload', '$window', 
        function($location, $scope, $timeout, $http, Upload, $window) {


        $scope.empresa = window.SAILS_LOCALS.me;
        $scope.submited = false;

        $scope.config = {
            mediaArray:[],
            categories:[]
        }

        $scope.constructor = function(){
            //Obtenemos los medios [libros, revistas,poster,tarjeta,volante,etc..]
               $http({
                //url: 'http://node.lom.dynu.com/dashboard', 
                url: '/api/media', 
                method: "GET",
                //params: data
               }).then(function(data){
                    $scope.config.mediaArray = data.data;
               },function(data){
                    console.log("Error al obtener los tipos de medios")
               });        
            //Obtenemos el listado de categorias
            
                $http({
                //url: 'http://node.lom.dynu.com/dashboard', 
                url: '/api/categories', 
                method: "GET",
                //params: data
               }).then(function(data){
                    $scope.config.categories = data.data;
               },function(data){
                    console.log("Error al obtener el listado de categorias")
               });      

        };


        
        $scope.agregar = function() {

           $timeout(function() {
                $('.united.modal').modal("show").modal("refresh");

                //$('.united.modal').modal("refresh");
                  //  $('.united.modal').modal("refresh");
        
             }, 100);
        };

        $scope.insertImage = function(files1) {
            var name = $scope.data.id;
            console.log(name);
            Upload.upload({
                url: '/promotion/createImage',
                data: { id: name },
                file: files1
            }).then(function(resp) {

                console.log(resp);
                     

            }, function(resp) {
                console.log('Error status: ' + resp.status);
            }, function(evt) {

                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });

        };


        $scope.insertAsset = function(file1) {

            var name = $scope.data.id;
            Upload.upload({
                url: '/promotion/createAsset',
                data: { id: name },
                file: file1
            }).then(function(resp) {
                console.log(resp);
            }, function(resp) {
                console.log('Error status: ' + resp.status);
            }, function(evt) {

                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };


        $scope.send = function(obj) {

            if(obj.facebook != null)
                var faceSplit  =  obj.facebook.split("//"); 
            else 
                 var faceSplit = "none";

            if(obj.twitter != null)
                var twitSplit =  obj.twitter.split("//"); 
            else
                var twitSplit = "none"; 

            if(obj.instagram != null)    
                var instSplit =  obj.instagram.split("//");
            else
                var instSplit = "none"; 

            if(obj.youtube != null)
                var youtSplit =  obj.youtube.split("//"); 
            else 
                var youtSplit = "none";


                if ( faceSplit[0] == "https:" ) 
                    var face =  obj.facebook.substr(24);
                else
                    var face = obj.facebook;

                if(twitSplit[0] =="https:"  )
                    var twiit = obj.twitter.substr(19);
                else
                    var twiit = obj.twitter;

                if(instSplit[0] == "https:" && obj.instagram != null)
                    var inst = obj.instagram.substr(25);
                else
                    var inst = obj.instagram; 

                if(youtSplit[0] == "https:" && obj.youtube != null )
                    var yout =obj.youtube.substr(31);
                else
                    var yout =obj.youtube;

                    $scope.submited = true;
                    data  = { 
                            name : obj.name, 
                            description : obj.description,
                            start_date : obj.start_date, 
                            end_date : obj.end_date,
                            media: obj.media.name,
                            latitude: $scope.marker.coords.latitude,
                            longitude: $scope.marker.coords.longitude,
                            facebook: face,
                            twitter: twiit,
                            instagram: inst,
                            youtube: yout,
                            browser:obj.browser,
                            categories:JSON.stringify(obj.categories),
                            //video:obj.video -> SUBIR!
                        }; 
                        console.log(data);

                    Upload.upload({
                        url: '/promotion/createPromotion',
                        data: data,
                        file: obj.image
                    })
                    .then(function(resp) {                       
                      
                        Upload.upload({
                                url: '/promotion/createAsset',
                                data: { id: resp.data[0].id , file2 : obj.asset },                              
                            })
                            .then(function(resp) {
                                 $window.location.reload();
                                console.log(resp);
                                $scope.submited = true;
                            }, function(resp) {
                                console.log('Error status: ' + resp.status);
                            }, function(evt) {

                                var progressPercentage2 = parseInt(100.0 * evt.loaded / evt.total);                                                      
                            });

                    }, function(resp) {
                        console.log('Error status: ' + resp.status);
                    }, function(evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                    });
                };

        $scope.show = function(soyChava) { 

               $('#detallePromocion').modal('show').modal('refresh');                                            
                $scope.name = soyChava.name;
                $scope.details = soyChava.description;
                $scope.image = soyChava.url_img_target;
                $scope.startDate = soyChava.start_date;
                $scope.endDate = soyChava.end_date;
        };
        menu = {};

        // ready event
        menu.ready = function() {

          // selector cache
          var
            $menuItem = $('.menu a.item, .menu .link.item'),
            // alias
            handler = {
              activate: function() {
                $(this)
                .addClass('active')
                .closest('.ui.menu')
                .find('.item')
                .not($(this))
                .removeClass('active');
              }
            }
          ;

          $menuItem
            .on('click', handler.activate)
          ;

        };
        // attach ready event
        $(document).ready(menu.ready);

        //////////////////////////////////////////
        //INICIO MAPA
        /////////////////////////////////////////


        $scope.map = {
            center: {
                latitude: 20.6301,
                longitude: -103.252
            }, 
            zoom: 15,
            draggable: false,
            options : {
                scrollwheel: false,
            },
            control: {},
            events: {
                dragend: function (marker, eventName, args) {
                      $log.log('marker dragend');
                      var lat = marker.getPosition().lat();
                      var lon = marker.getPosition().lng();
                      $log.log(lat);
                      $log.log(lon);

                      $scope.marker.options = {
                        draggable: true,
                        labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                        labelAnchor: "100 0",
                        labelClass: "marker-labels"
                      };
                }
            }

        };
        
        $scope.marker = {
            id: 0,
          coords: {
                latitude: 20.6301,
                longitude: -103.252
          },
          options: { draggable: true },

        };



        $scope.$watchCollection("marker.coords", function (newVal, oldVal) {
          if (_.isEqual(newVal, oldVal))
            return;
            console.log("$scope.$watchCollection");
            console.log(newVal);
            console.log($scope.marker.coords);
        });



        /////////////////////////////////////////
        //FIN MAPA
        /////////////////////////////////////////

        $scope.now = function() {
            return new Date();
        };

        
    }]);