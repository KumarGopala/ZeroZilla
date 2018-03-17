'use strict';
app.controller('pricingController', ['$rootScope', '$scope', 'pricingService', '$http', 'ngAuthSettings', 'authService', '$location',
    "$window", "Upload", //"apiUrl",
    function ($rootScope, $scope, pricingService, $http, ngAuthSettings, authService, $location, $window, Upload) {

        var cnt = $scope.wordCount;
        $scope.pricing = [];
        $scope.files = [];

        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        $scope.GetPrice = function (wordCount, deliveryType) {

            var files = $scope.files;
            if (deliveryType == undefined) {
                alert("Please select Delivery Type");
                return;
            }

            if (files[0]==undefined) {
                if (wordCount == undefined) {
                    alert("Please upload files or Enter word count");
                    return;
                }

                $scope.getPriceQuote(wordCount, deliveryType);
            }
            else {
                $scope.uploadFiles();
                $scope.getPriceQuote(wordCount, deliveryType);
            }

          

        }


        $scope.getPriceQuote = function (wordCount, deliveryType) {

            $http.get(serviceBase + 'api/PriceQuote/price/' + wordCount + '/' + deliveryType).then(function (results) {
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

            $scope.pricing = [];
            $scope.pricing.wordCount = $scope.wordCount;
            $scope.pricing.deliveryType = $scope.deliveryType;
            $scope.pricing.PriceQuote = $scope.PriceQuote;

            $rootScope.pricing = $scope.pricing;

            if (!authService.authentication.isAuth) {
                $location.path('/signin');
            }
            else {
                $location.path('/orderRequirement');
            }

        }

 

        $scope.uploadFiles =   function() {
            
            var files = $scope.files;
            //vm.spinner.active = true;
            Upload.upload({
                url: serviceBase +"api/PriceQuote/files",
                data: { file: files }
            })
                .then(function (response) {
                    $scope.filename = "Uploaded files : " + files[0].name;
                    $scope.wordCount =  response.data.counts;
                  
                }, function (err) {
                    console.log("Error status: " + err.status);
                });


        }


    }]);
 