'use strict';
app.controller('pricingController', ['$rootScope', '$scope', '$http', 'ngAuthSettings', 'authService', '$location',
    "$window", "Upload", "localStorageService",
    function ($rootScope, $scope, $http, ngAuthSettings, authService, $location, $window, Upload, localStorageService) {
        var cnt = $scope.wordCount;


        //$scope.deliveryType = "Standard Delivery";

        $scope.pricing = [];
        $scope.files = [];
        $scope.selectedCurrency = "USD";
        var serviceBase = ngAuthSettings.apiServiceBaseUri;




        $scope.wordCount = localStorageService.get('wordCount');
        $scope.deliveryType = localStorageService.get('deliveryType');
        $scope.PriceQuote = localStorageService.get('PriceQuote');
        localStorageService.remove("PriceQuote");
        localStorageService.remove("deliveryType");
        localStorageService.remove("wordCount");




        $scope.loading = false;
        $scope.GetPrice = function (wordCount, deliveryType) {




            var files = $scope.files;
            if (deliveryType == undefined) {
                alert("Please select Delivery Type");
                return;
            }

            if (files[0] == undefined) {
                if (wordCount == undefined) {
                    alert("Please upload files or Enter word count");
                    return;
                }

                $scope.getPriceQuote(wordCount, deliveryType, $scope.currencySelected.label);
            }
            else {
                $scope.uploadFiles();
            }
        }

        //$scope.currencyList = ["USD", "GBP"];



        $scope.currencyList = [{
            value: '$',
            label: 'USD'
        }, {
            value: '£',
            label: 'GBP'
        }];

        $scope.currencySelected = $scope.currencyList[0];

        $scope.getPriceQuote = function (wordCount, deliveryType, currency) {


        

            $http.get(serviceBase + 'api/PriceQuote/price/' + wordCount + '/' + deliveryType + '/' + currency).then(function (results) {
                $scope.PriceQuote = results.data;
            }, function (error) {
                $scope.PriceQuote = 0;
            });

        }

        $scope.files = [];

        //listen for the file selected event
        $scope.$on("fileSelected", function (event, args) {
            $scope.$apply(function () {
                //add the file object to the scope's files collection
                $scope.files.push(args.file);
            });
        });


        $scope.PlaceOrder = function () {

            if ($scope.PriceQuote == undefined || $scope.PriceQuote < 1) {
                alert("Please enter word count and click GO to proceed");
                return;
            }

            if ($scope.wordCount == undefined || $scope.wordCount == 0) {
                alert("Please enter word count to proceed");
                return;
            }
            if ($scope.deliveryType == undefined) {
                alert("Please select Delivery Type");
                return;
            }

            $scope.pricing = [];
            $scope.pricing.wordCount = $scope.wordCount;
            $scope.pricing.deliveryType = $scope.deliveryType;
            $scope.pricing.PriceQuote = $scope.PriceQuote;

            $rootScope.pricing = $scope.pricing;
           
            
            $rootScope.currencySelected = $scope.currencySelected;




            if (!authService.authentication.isAuth) {
                localStorageService.set('wordCount', $scope.pricing.wordCount);
                localStorageService.set('deliveryType', $scope.pricing.deliveryType);
                localStorageService.set('PriceQuote', $scope.pricing.PriceQuote);
                $location.path('/signin');
            }
            else {
                $location.path('/orderRequirement');
            }

        }



        $scope.uploadFiles = function () {

            var files = $scope.files;
            //vm.spinner.active = true;
            Upload.upload({
                url: serviceBase + "api/PriceQuote/files",
                data: { file: files }
            })
                .then(function (response) {


                    $scope.filename = "Uploaded files : " + files[0].name;
                    $rootScope.StoredFilename = response.data.docs[0].name;
                    $rootScope.DisplayFilename = files[0].name;

                    $scope.wordCount = response.data.counts;


                    $scope.getPriceQuote($scope.wordCount, $scope.deliveryType, $scope.currencySelected.label);


                }, function (err) {
                    console.log("Error status: " + err.status);
                });


        }


        $scope.currencyChange = function () {

           
            $scope.getPriceQuote($scope.wordCount, $scope.deliveryType, $scope.currencySelected.label);
        }
    }]);
