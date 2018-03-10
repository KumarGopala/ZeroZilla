'use strict';
app.controller('orderReviewController', ['$rootScope', '$scope', '$http', 'ngAuthSettings', '$location', function ($rootScope, $scope, $http, ngAuthSettings, $location) {
    debugger;

   
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    debugger;
    $rootScope.order
    $rootScope.pricing


    $scope.datapost = [];
    
$scope.orderReview = function () {
    // $http.post(serviceBase + 'api/Orders', $rootScope.order).then(function (response) {
    //    return response;
    //});


    $http.post(serviceBase + 'api/Orders/test', "amit").then(function (response) {
        return response;
    });



    //$http.post(serviceBase + 'api/Orders').then(function (results) {
    //    debugger;
    //    $scope.PriceQuote = results.data;
    //}, function (error) {

    //    debugger;
    //});

}


}]);
