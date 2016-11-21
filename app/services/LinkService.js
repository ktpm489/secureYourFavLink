'use strict';

module.exports = function($resource, $q, AuthService) {

    this.getLinks = function() {
        var deferred = $q.defer();
        var domain = AuthService.setDomain();
        var resource = $resource(domain + '/api/link/get', {}, {
            getLink: {
                method: 'POST',
                headers: {
                    'x-access-token': AuthService.savedToken,
                }
            }
        });
        var data = resource.getLink({},
            function(response) {
                deferred.resolve(response);
            },
            function(response) {
                deferred.reject(response);
            }
        );
        return deferred.promise;
    }
    this.createLink = function(urlInfo) {
        var deferred = $q.defer();
        var domain = AuthService.setDomain();
        var resource = $resource(domain + '/api/link/save', {}, {
            post: {
                method: 'POST',
                headers: {
                    'x-access-token': AuthService.savedToken,
                    'Content-Type': 'application/json'
                }
            }
        });
        var data = resource.post({
                url: urlInfo
            },
            function(response) {
                deferred.resolve(response);
            },
            function(response) {
                deferred.reject(response);
            }
        );
        return deferred.promise;
    };
    this.deleteLink = function(urlInfo) {
        var deferred = $q.defer();
        var domain = AuthService.setDomain();
        var resource = $resource(domain + '/api/link/remove', {}, {
            delete: {
                method: 'POST',
                headers: {
                    'x-access-token': AuthService.savedToken,
                    'Content-Type': 'application/json'
                }
            }
        });
        var data = resource.delete({
                url: urlInfo
            },
            function(response) {
                deferred.resolve(response);
            },
            function(response) {
                deferred.reject(response);
            }
        );
        return deferred.promise;
    };

}