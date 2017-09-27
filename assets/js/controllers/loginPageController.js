angular.module('MainApp').controller('loginPageController', ['$location', '$scope', '$http','toaster', function($location, $scope, $http,toaster) {




    $scope.me = window.SAILS_LOCALS.me;

    $scope.submitLoginFormL = function() {

     
        // Submit request to Sails.
        $http.put('/login', {
                email: $scope.loginForm.login,
                username: $scope.loginForm.login,
                password: $scope.loginForm.password
            })
            .then(function onSuccess() {
                // Redierct the page now that we've been logged in.
                // window.location = '/videos';
                window.location = '/';
                /*toaster.success('We have a match!', 'Success', { closeButton: true });*/
            })
            .catch(function onError(sailsResponse) {

                // Handle known error type(s).        
                // Deleted account
                console.log(sailsResponse);
                if (sailsResponse.status == 403) {
                    toaster.error(sailsResponse.data, 'Error');
                    
                }


                // Invalid username / password combination.
                if (sailsResponse.status === 400 || 404) {
                    $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
                    
                   toaster.error('Error','Invalid email or username/password combination.');
                   
                }

                toaster.error('An unexpected error occurred, please try again.', 'Error');
            

            })
            .finally(function eitherWay() {
                $scope.loginForm.loading = false;
            });
    };


}]);