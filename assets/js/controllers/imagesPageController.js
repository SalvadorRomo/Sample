angular.module('MainApp').controller('imagesPageController', ['$location', '$scope', '$http','$timeout', function($location, $scope, $http, $timeout) {

    $scope.me = window.SAILS_LOCALS.me;


$scope.showModal = function(soyChava){
   $timeout(function(){
                $('#detallePromocion').modal('show').modal('refresh');
            });

   			 $scope.name = soyChava.name;
            $scope.details = soyChava.description;
            $scope.image = soyChava.url_img_target;
            $scope.startDate = soyChava.start_date;
            $scope.endDate = soyChava.end_date;
		}

}]);