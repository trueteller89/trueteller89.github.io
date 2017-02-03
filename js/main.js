'use strict';

angular.module('myApp.main', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'partials/main.html',
            controller: 'mainController'
        });
    }])
    .controller('mainController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
        if (!$rootScope.books) {
            $http.get("json/products.json").then(function (res) {
                $rootScope.books = res.data.products;
            });
        }
        ;
        $scope.clickBook = function (elem) {
            var element = elem;
            console.log(element);
            $scope.$emit('myClickBookEvent', element);
        }

    }])
;