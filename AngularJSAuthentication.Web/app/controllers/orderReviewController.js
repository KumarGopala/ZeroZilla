'use strict';
app.controller('orderReviewController', ['$rootScope', '$scope', '$http', 'ngAuthSettings', '$location', "Upload", 'authService',
    function ($rootScope, $scope, $http, ngAuthSettings, $location, Upload, authService) {


        var serviceBase = ngAuthSettings.apiServiceBaseUri;

        $rootScope.order;


        $scope.wordCount = $rootScope.pricing.wordCount
        $scope.deliveryType = $rootScope.pricing.deliveryType;
        $scope.PriceQuote = $rootScope.pricing.PriceQuote;
        $scope.Price = $scope.PriceQuote * 100;

        $scope.DisplayFileName = $rootScope.DisplayFilename;
        $scope.StoredFilename = $rootScope.StoredFilename;

        $scope.DocType = $rootScope.order.DocumentType;
        $scope.SubCatType = $rootScope.order.SubCategory;
        $scope.EnglishStyle = $rootScope.order.EnglishStyle;
        $scope.Referencing = $rootScope.order.Referencing;
        $scope.Requirments = $rootScope.order.Requirments;


        $scope.currencySelected = $rootScope.currencySelected;

        $scope.serviceBase = serviceBase;

        
        $scope.userName = authService.authentication.userName;
        $scope.email = authService.authentication.email;

        $scope.orderReview = function () {


            var totaldata = {
                "DocumentType": $rootScope.order.DocumentType, "SubCategory": $rootScope.order.SubCategory,
                "EnglishStyle": $rootScope.order.EnglishStyle, "Referencing": $rootScope.order.Referencing,
                "Requirments": $rootScope.order.Requirments,
                "StoredFilename": $rootScope.StoredFilename, "PriceQuoted": $scope.PriceQuote, "WordCount": $scope.wordCount, "DeliveryType": $scope.deliveryType,
                "ReferenceStoredFilename": $scope.StoredFilenameReference, "ReferenceDisplayFilename": $scope.DisplayFileNameReference
                , "Currency": $scope.currencySelected.label, "DisplayFilename": $scope.DisplayFileName


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

            }).error(function (err) {
                console.log(err);
            });
        }




        $scope.uploadFiles = function () {
            debugger;
            var files = $scope.files;
            //vm.spinner.active = true;
            Upload.upload({
                url: serviceBase + "api/PriceQuote/filesReferenceFile",
                data: { file: files }
            })
                .then(function (response) {


                    //$scope.filename = "Uploaded files : " + files[0].name;
                    $scope.StoredFilenameReference = response.data.docs[0].name;
                    $scope.DisplayFileNameReference = files.name;





                }, function (err) {
                    console.log("Error status: " + err.status);
                });


        }


        $scope.getPriceQuote = function (wordCount) {

            var deliveryType = $scope.deliveryType;
            var currency = $scope.currencySelected.label;


            $http.get(serviceBase + 'api/PriceQuote/price/' + wordCount + '/' + deliveryType + '/' + currency).then(function (results) {
                $scope.PriceQuote = results.data;
            }, function (error) {
                $scope.PriceQuote = 0;
            });

        }


        $scope.doCheckout = function (token) {

            $scope.uploadFiles();

            //alert("Got Stripe token: " + token.id);
            $scope.Price= $scope.PriceQuote * 100;
            var data = {
                "StripeEmail": token.email, "Token": token.id, "Price": $scope.Price, "Currency": $scope.currencySelected.label,
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
