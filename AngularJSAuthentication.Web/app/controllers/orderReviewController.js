'use strict';
app.controller('orderReviewController', ['$rootScope', '$scope', '$http', 'ngAuthSettings', '$location', "Upload",
    function ($rootScope, $scope, $http, ngAuthSettings, $location, Upload) {


    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    $rootScope.order;


    $scope.wordCount = $rootScope.pricing.wordCount
    $scope.deliveryType = $rootScope.pricing.deliveryType;
    $scope.PriceQuote = $rootScope.pricing.PriceQuote;
    $scope.Price = $scope.PriceQuote * 100;

    $scope.DisplayFileName = $rootScope.DisplayFilename;
    $scope.StoredFilename = $rootScope.StoredFilename;

    $scope.serviceBase = serviceBase;


    $scope.orderReview = function () {


        var totaldata = {
            "DocumentType": $rootScope.order.DocumentType, "SubCategory": $rootScope.order.SubCategory,
            "EnglishStyle": $rootScope.order.EnglishStyle, "Referencing": $rootScope.order.Referencing,
            "Requirments": $rootScope.order.Requirments,
            "StoredFilename": $rootScope.StoredFilename, "PriceQuoted": $scope.PriceQuote, "WordCount": $scope.wordCount, "DeliveryType": $scope.deliveryType
        };




        $http.post(
            serviceBase + "api/Orders",
            JSON.stringify(totaldata),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).success(function (data) {
            $location.path('/orders');

        });
    }




    $scope.uploadFiles = function () {
        debugger;
        var files = $scope.files;
        //vm.spinner.active = true;
        Upload.upload({
            url: serviceBase + "api/PriceQuote/files",
            data: { file: files }
        })
            .then(function (response) {


                //$scope.filename = "Uploaded files : " + files[0].name;
                $scope.StoredFilename = response.data.docs[0].name;
                $scope.DisplayFileName = files[0].name;

                $scope.wordCount = response.data.counts;



            }, function (err) {
                console.log("Error status: " + err.status);
            });


    }


    $scope.doCheckout = function (token) {
        debugger;


        alert("Got Stripe token: " + token.id);
        var price = $scope.PriceQuote * 100;
        var data = {
            "StripeEmail": token.email, "Token": token.id, "Price": price
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

            $scope.orderReview();

            //$http.post(
            //    serviceBase + "api/Orders",
            //    JSON.stringify($scope.orderReview.data),
            //    {
            //        headers: {
            //            'Content-Type': 'application/json'
            //        }
            //    }
            //).success(function (data) {
            //    $location.path('/OrderSuccess');

            //    });

            //$location.path('/OrderSuccess');

        });
    };

}]);
