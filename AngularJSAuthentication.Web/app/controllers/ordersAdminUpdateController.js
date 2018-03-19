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

            $http.put(
                serviceBase + "api/Orders",
                JSON.stringify(totaldata),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).success(function (data) {

                //$location.path("/OrderAdmin");
                $location.path('/orderAdmin');


            });
        }





        //$scope.Download = function () {
        //    serviceBase + 'api/PriceQuote/price/' 
        //    http://localhost:26264/Uploads/testDoc-20180317121755.doc

        //}
    }]);