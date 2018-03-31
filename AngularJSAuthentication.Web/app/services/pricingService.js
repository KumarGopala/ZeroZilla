'use strict';
app.factory('pricingService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var pricingServiceFactory = {};
    //debugger;
    //var wordCount = $scope.wordCount;
    //var deliveryType = $scope.deliveryType;


    var pricingAmount = function (wordCount, deliveryType, currency) {
        var amount = 0;
        //return wordCount;

        return $http.get(serviceBase + 'api/PriceQuote/price?wordCount=' + wordCount + '&deliveryType=' + deliveryType + '&currency=' + currency).then(function (results) {
            return results;
        });

    };
  

    pricingServiceFactory.getPrice = pricingAmount;

    return pricingServiceFactory;

}]);