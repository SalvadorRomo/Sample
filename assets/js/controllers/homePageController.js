angular.module('MainApp').controller('homePageController', ['$location', '$scope', '$http', function($location, $scope, $http) {

    $scope.me = window.SAILS_LOCALS.me;

}]);