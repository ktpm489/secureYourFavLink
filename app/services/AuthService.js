'use strict';

module.exports = function($resource, $q, $cookies) {
    var context = this;
    context.setDomain = function() {
        var domain = '//' + window.location.hostname;
        if (window.location.port) {
            domain = '//' + window.location.hostname + ':8080';
        }
        return domain;
    }
    var domain = context.setDomain();
    context.savedToken = "";
    var savedUsername = "";

    var DataPromise = null;
    context.globalData = {};

    context.isHaveAuthToken = function() {
        context.savedToken = $cookies.get("jwtToken");
        savedUsername = $cookies.get("loggedUsername");
        if ((context.savedToken && savedUsername && context.savedToken.length > 0)) {
            if (!context.globalData.auth && savedUsername) {
                context.globalData.auth = {
                    username: savedUsername,
                }
            }
            return true;
        }
        context.savedToken = sessionStorage.getItem("jwtToken");
        savedUsername = sessionStorage.getItem("loggedUsername");
        if ((context.savedToken && savedUsername && context.savedToken.length > 0)) {
            if (!context.globalData.auth && savedUsername) {
                context.globalData.auth = {
                    username: savedUsername,
                }
            }
            return true;
        }
        return false;
    }
    context.removeCookie = function() {
        $cookies.remove("jwtToken");
        $cookies.remove("loggedUsername");
        sessionStorage.removeItem("jwtToken");
        sessionStorage.removeItem("loggedUsername");
        sessionStorage.removeItem("submissionModel");
    }

    context.login = function(username, password) {
        var deferred = $q.defer();
        var loginresource = $resource(domain + '/api/auth', {}, {
            post: {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function(data) {
                    var str = [];
                    str.push("username=" + encodeURIComponent(data.data.username));
                    str.push("password=" + encodeURIComponent(data.data.password));
                    return str.join("&");
                }
            }
        });
        var dataLogin = {};
        dataLogin.username = username;
        dataLogin.password = password;
        var data = loginresource.post({ 'data': dataLogin },
            function(response) {
                deferred.resolve(response);
            },
            function(response) {
                deferred.reject(response);
            });
        return deferred.promise;
    }

    context.createGauges = function(gaugeInfo) {
        var deferred = $q.defer();
        var gaugeResource = $resource(domain + '/BackflowServer/gauge/create', {}, {
            save: {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + context.savedToken }
            }
        });
        var data = gaugeResource.save({ 'make': gaugeInfo.gaugeMake, 'serialNumber': gaugeInfo.serialNumber, 'dateEquipmentTested': gaugeInfo.dateEquipmentTested },
            function(response) {
                deferred.resolve(response);
            },
            function(response) {
                deferred.resolve(response);
            });
        return deferred.promise;
    }
    context.getGauges = function() {
        var deferred = $q.defer();
        var gaugeResource = $resource(domain + '/BackflowServer/gauges', {}, {
            get: {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + context.savedToken,
                    'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            }
        });
        var data = gaugeResource.get({},
            function(response) {
                deferred.resolve(response);
            },
            function(response) {
                deferred.resolve(response);
            });
        return deferred.promise;
    }

}