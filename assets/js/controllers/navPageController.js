angular.module('MainApp').controller('navPageController', ['$location', '$scope', '$http', function($location, $scope, $http) {

    $scope.loginForm = {};

    $scope.me = window.SAILS_LOCALS.me;



}]);