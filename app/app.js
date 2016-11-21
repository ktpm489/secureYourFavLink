'use strict';
require('angular')
var ngRoute = require('angular-route')
var ngResource = require('angular-resource')
var ngCookies = require('angular-cookies')
var bootstrap = require('angular-ui-bootstrap')
require('../bower_components/tg-angular-validator/dist/angular-validator.js')

var LoginController = require('./controllers/LoginController')
var HomeController = require('./controllers/HomeController')

var AuthService = require('./services/AuthService')
var LinkService = require('./services/LinkService')

var app = angular.module('app', [ngRoute, bootstrap, ngResource, ngCookies, 'angularValidator'])

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'app/templates/Login.html',
                controller: 'LoginController'
            })
            .when('/', {
                templateUrl: 'app/templates/home.html',
                controller: 'HomeController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);

app.controller('LoginController', ['$scope', '$rootScope', '$window', '$location', '$cookies', 'AuthService', LoginController])
app.controller('HomeController', ['$scope', '$rootScope', '$window', '$location', 'AuthService', 'LinkService', HomeController])

app.service('AuthService', ['$resource', '$q', '$cookies', AuthService]);
app.service('LinkService', ['$resource', '$q', 'AuthService', LinkService]);