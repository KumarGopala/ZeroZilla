'use strict';
app.controller("SimpleExampleController", ['$scope', '$location', '$timeout', '$http', function ($scope, $location, $timeout, $http) {
    $scope.doCheckout = function (token) {

        
        var data = {
            "StripeEmail" : "kumarblue99@gmail.com", "Token": token.id
        };

        $http.post(
            serviceBase + "api/Orders/Charge",
            JSON.stringify(data),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).success(function (data) {
            $location.path('/OrderSuccess');

        });
    };
}]);