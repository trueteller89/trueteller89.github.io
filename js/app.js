/*//= ../../bower_components/angular/angular.js
//= ../../bower_components/angular-route/angular-route.js*/
'use strict';
angular.module('myApp', [
    'ngRoute',
    'myApp.main',
    'myApp.addnew',
    'myApp.product'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/main'});
}]);

