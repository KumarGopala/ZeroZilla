'use strict';
app.controller('ordersController', ['$scope', 'ordersService', 'ngAuthSettings', function ($scope, ordersService, ngAuthSettings) {

    $scope.orders = [];

    $scope.serviceBase = ngAuthSettings.apiServiceBaseUri;

    ordersService.getOrders().then(function (results) {

        $scope.orders = results.data;

    }, function (error) {
        console.log(error.data.message);
    });



    //$scope.Download = function () {
    //    serviceBase + 'api/PriceQuote/price/' 
    //    http://localhost:26264/Uploads/testDoc-20180317121755.doc

    //}
}]);