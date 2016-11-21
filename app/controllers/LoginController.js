'use strict';

module.exports = function($scope, $rootScope, $window, $location, $cookies, AuthService) {
    window.scrollTo(0, 0);
    $scope.auth = {
        rememberMe: false,
    };
    if (AuthService.isHaveAuthToken()) {
        $location.path('/');
    }
    $scope.login = function() {
        AuthService.login($scope.auth.username, $scope.auth.password).then(function(data) {
            if (data.success) {
                if ($scope.auth.rememberMe) {
                    $cookies.put("jwtToken", data.token);
                    $cookies.put("loggedUsername", $scope.auth.username);
                } else {
                    sessionStorage.setItem("jwtToken", data.token);
                    sessionStorage.setItem("loggedUsername", $scope.auth.username);
                }
                $location.path('/');
            }
        }, function(data) {
            alert(data.data.message);
        });
    }
}