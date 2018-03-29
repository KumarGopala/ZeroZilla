'use strict';
app.controller('ordersAdminUpdateController', ['$scope', 'ordersAdminUpdateService', 'ngAuthSettings', '$http', '$location', '$routeParams',
    function ($scope, ordersAdminUpdateService, ngAuthSettings, $http, $location, $routeParams) {


        $scope.orders = [];

        $scope.serviceBase = ngAuthSettings.apiServiceBaseUri;

        $scope.Load = function (ID) {


            $http.get(serviceBase + 'api/Orders/OrderDetail/' + ID).then(function (results) {
                $scope.orders = results.data;
            }, function (error) {
                $scope.orders = 0;
            });


        }

        var ID = ($routeParams.ID || "");
        if (ID !== '') {
            $scope.Load(ID);
        }


        $scope.Submit = function () {
            var totaldata = {
                "OrderId": ID, "JobStatus": $scope.orders[0].jobStatus
            };

            $http.post(
                serviceBase + "api/Orders/update",
                JSON.stringify(totaldata),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).success(function (data) {
                
                $location.path("/Order/all");
                $location.path('/orderAdmin');

            });
        }

    }]);