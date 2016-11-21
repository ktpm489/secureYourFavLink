'use strict';
module.exports = function($scope, $rootScope, $window, $location, AuthService) {
    window.scrollTo(0, 0);
    if (!AuthService.isHaveAuthToken()) {
        $location.path('login');
    }
    sessionStorage.removeItem("currentStep");
    sessionStorage.removeItem("submissionModel");
    $scope.auth = AuthService.globalData.auth;
    $scope.showNavBar = function() {
        var modal = document.getElementById('navigationBarModal');
        modal.style.display = 'block';
    }
    $scope.goToGauges = function() {
        $location.path('gauges');
    }
    $scope.goToProfile = function() {
        $location.path('profile');
    }
    $scope.startReport = function() {
        $location.path('report/confirmProfile')
    }
}