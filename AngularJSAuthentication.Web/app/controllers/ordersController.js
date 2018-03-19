'use strict';
app.controller('ordersController', ['$scope', 'ordersService', 'ngAuthSettings', 'authService','$location', function ($scope, ordersService, ngAuthSettings, authService, $location) {
    $scope.authentication = authService.authentication;
    if ($scope.authentication.userName === "admin@Zilla.com") {
        $location.path('/Order/all');

    }
    else {

        $scope.orders = [];

        $scope.serviceBase = ngAuthSettings.apiServiceBaseUri;

        ordersService.getOrders().then(function (results) {

            $scope.orders = results.data;

        }, function (error) {
            console.log(error.data.message);
        });
    }

    
}]);