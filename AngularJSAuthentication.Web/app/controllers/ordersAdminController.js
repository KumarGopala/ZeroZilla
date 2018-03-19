'use strict';
app.controller('ordersAdminController', ['$scope', 'ordersAdminService', 'ngAuthSettings', function ($scope, ordersAdminService, ngAuthSettings) {

    $scope.orders = [];

    $scope.serviceBase = ngAuthSettings.apiServiceBaseUri;

    ordersAdminService.getOrders().then(function (results) {

        $scope.orders = results.data;

    }, function (error) {
        console.log(error.data.message);
    });



    //$scope.Download = function () {
    //    serviceBase + 'api/PriceQuote/price/' 
    //    http://localhost:26264/Uploads/testDoc-20180317121755.doc

    //}
}]);