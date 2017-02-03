'use strict';

angular.module('myApp.product', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/product/:id', {
            templateUrl: 'partials/product-details.html',
            controller: 'productController'
        });
    }])
    .controller('productController', ['$scope', '$rootScope', '$http', "$routeParams", function ($scope, $rootScope, $http, $rootParams) {
        if (!$rootScope.books) {
            $http.get("json/products.json").then(function (res) {
                $rootScope.books = res.data.products;

                $rootScope.books.forEach(function (elem, i) {
                    if (elem.id == $rootParams.id) {
                        $scope.book = elem;
                    }
                });
            });
        } else {
            $rootScope.books.forEach(function (elem, i) {
                if (elem.id == $rootParams.id) {
                    $scope.book = elem;
                }
            });
        }
    }])
;