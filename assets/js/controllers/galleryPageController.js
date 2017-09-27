angular.module('MainApp').controller('galleryPageController', ['$location', '$scope', '$http','$window', function($location, $scope, $http,$window) {

    $scope.empresa = window.SAILS_LOCALS.me;
   
    $scope.deletePromo= function(obj){

    	$http.post('/promotion/delete', {
                id: obj.id
            })
            .then(function onSuccess(sailsResponse) {
            	$window.location.reload();
            })
            .catch(function onError(sailsResponse) {
             
            })
            .finally(function eitherWay() {
            });

    };


}]);