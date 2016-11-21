'use strict';
module.exports = function($scope, $rootScope, $window, $location, AuthService, LinkService) {
    window.scrollTo(0, 0);
    if (!AuthService.isHaveAuthToken()) {
        $location.path('login');
    }
    $scope.url = {
        link: "",
        title: ""
    };
    $scope.links = [];
    var getLinks = function() {
        LinkService.getLinks().then(function(res) {
            console.log(res);
            if (res.links) {
                $scope.links = res.links;
            }
        }, function(err) {
            console.log(err);
            if (err.status == 403) {
                AuthService.removeCookie();
                $location.path('login');
            }
        });
    };
    getLinks();

    $scope.save = function() {
        LinkService.createLink($scope.url).then(function(res) {
            if (res.success) {
                getLinks();
            }
        }, function(err) {
            console.log(err);
            if (err.status == 403) {
                AuthService.removeCookie();
                $location.path('login');
            }
        });
    };

    $scope.remove = function(link) {
        LinkService.deleteLink(link).then(function(res) {
            if (res.success) {
                getLinks();
            }
        }, function(err) {
            console.log(err);
            if (err.status == 403) {
                AuthService.removeCookie();
                $location.path('login');
            }
        });
    }

}