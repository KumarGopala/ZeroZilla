'use strict';
app.controller('orderReviewController', ['$rootScope', '$scope', '$http', 'ngAuthSettings', '$location', function ($rootScope, $scope, $http, ngAuthSettings, $location) {
    debugger;


    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    debugger;
    $rootScope.order;


    $scope.wordCount = $rootScope.pricing.wordCount
    $scope.deliveryType = $rootScope.pricing.deliveryType;
    $scope.PriceQuote = $rootScope.pricing.PriceQuote;


    $scope.orderReview = function () {


        var data = {
            "DocumentType": $rootScope.order.DocumentType, "SubCategory": $rootScope.order.SubCategory,
            "EnglishStyle": $rootScope.order.EnglishStyle, "Referencing": $rootScope.order.Referencing,
            "Requirments": $rootScope.order.Requirments
        };


        $http.post(
            serviceBase + "api/Orders",
            JSON.stringify(data),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).success(function (data) {
            $location.path('/OrderSuccess');

        });



    }


}]);
