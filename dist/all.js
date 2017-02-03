/**
 * Created by Regrem PC2 on 25.01.2017.
 */
'use strict';

angular.module('myApp.addnew', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add', {
            templateUrl: 'partials/add-product.html',
            controller: 'addnewController'
        });
    }])

    .controller('addnewController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
        $scope.newBook = {
            title: "",
            description: "",
            price: "",
            image: "",
            id: ""
        };
        if (!$rootScope.books) {
            $http.get("json/products.json").then(function (res) {
                $rootScope.books = res.data.products;
            });
        }
        ;
        $scope.addNewBook = function () {
            var isEqual=function(elem){
                return $scope.newBook.id==elem.id
            };
            if ($scope.newBook.title && $scope.newBook.description && $scope.newBook.price) {
                if ($rootScope.books.some(isEqual)) {
                    alert("Take another id!")
                }
                else {
                    $rootScope.books[$rootScope.books.length] = $scope.newBook;
                    alert("Product successfully added!");
                    $scope.newBook={
                        title: "",
                        description: "",
                        price: "",
                        image: "",
                        id: ""
                    }
                }
            }
            else {
                alert("Not enough information!");
            }


        }
    }])
;
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