angular.module('MainApp').controller('signupPageController', ['$scope', '$http', function($scope, $http) {
    // set-up loading state
    $scope.signupForm = {
        loading: false
    };

    $scope.submitSignupForm = function() {

        // Set the loading state (i.e. show loading spinner)
        $scope.signupForm.loading = true;

        // Submit a POST request to /user [This is using blueprints.]
        // $http.post('/user', {

        // Submit a POST request to Sails. [The signup action has been created.]
        $http.post('/user/signup', {
                email: $scope.signupForm.email,
                username: $scope.signupForm.username.replace(/\s+/g, '-'),
                name : $scope.signupForm.name,
                password: $scope.signupForm.password
            })
            .then(function onSuccess(sailsResponse) {

                // Redirect to the profile page [This is after we have a profile page built]
                // window.location = '#/profile/' + sailsResponse.data.id;
                window.location = '/';

                // Redirect to the user blueprint record [This is before we have the profile page built]
                // window.location = '/user/' + sailsResponse.data.id;
            })
            .catch(function onError(sailsResponse) {

                // Handle known error type(s).
                if (sailsResponse.status == 409) {
                    
                    toastr.error(sailsResponse.data);
                    $scope.signupForm.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);
                    return;
                }

                // Handle unknown error type(s).
                $scope.signupForm.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

            })
            .finally(function eitherWay() {
                $scope.signupForm.loading = false;
            });
    };


}]);