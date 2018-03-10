'use strict';
app.controller('pricingController', ['$rootScope', '$scope', 'pricingService', '$http', 'ngAuthSettings', 'authService', '$location', function ($rootScope,$scope, pricingService, $http, ngAuthSettings, authService, $location) {
    debugger;

    var cnt = $scope.wordCount;
    $scope.pricing = [];

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    $scope.GetPrice = function (wordCount, deliveryType) {
      
        //$http.get(serviceBase + '/api/PriceQuote/price/' + wordCount + '/' + deliveryType).then(function (results) {
        //    debugger;
        //    return results.data;
        //}, function (error) {

        //    debugger;
        //    });
        $http.get(serviceBase + 'api/PriceQuote/price/' + wordCount + '/' + deliveryType).then(function (results) {
            debugger;
            $scope.PriceQuote = results.data;
        }, function (error) {

            debugger;
        });

    }
    
    
    
    
    $scope.PlaceOrder = function () {

        $scope.pricing = [];
        $scope.pricing.wordCount = $scope.wordCount;
        $scope.pricing.deliveryType = $scope.deliveryType;

        $rootScope.pricing = $scope.pricing;

        debugger;
        if (!authService.authentication.isAuth) {
            $location.path('/signin');
        }
        else {
            $location.path('/orderRequirement');
        }
        
    }


    $scope.Get2 = pricingService.getPrice(1, 1).then(function (results) {
        debugger;
        alert(10);
        $scope.Amount = results.data;

    }, function (error) {
        //alert(error.data.message);
        });


}]);
