'use strict';
app.controller('pricingController', ['$rootScope', '$scope', 'pricingService', '$http', 'ngAuthSettings', 'authService', '$location',
    "$window", "Upload", //"apiUrl",
    function ($rootScope, $scope, pricingService, $http, ngAuthSettings, authService, $location, $window, Upload) {

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

        $scope.files = [];

        //listen for the file selected event
        $scope.$on("fileSelected", function (event, args) {
            $scope.$apply(function () {
                //add the file object to the scope's files collection
                $scope.files.push(args.file);
            });
        });

        //https://shazwazza.com/post/uploading-files-and-json-data-in-the-same-request-with-angular-js/
        //https://stackoverflow.com/questions/31987723/unable-to-upload-doc-or-docx-file


        $scope.PlaceOrder = function () {

            $scope.pricing = [];
            $scope.pricing.wordCount = $scope.wordCount;
            $scope.pricing.deliveryType = $scope.deliveryType;
            $scope.pricing.PriceQuote = $scope.PriceQuote;

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



        $scope.uploadFiles =   function(files) {
            debugger;
            //vm.spinner.active = true;
            Upload.upload({
                url: serviceBase +"api/PriceQuote/files",
                data: { file: files }
            })
                .then(function (response) {
                    //activate();
                    //setPreviewPhoto();
                    //vm.spinner.active = false;
                }, function (err) {
                    console.log("Error status: " + err.status);
                    //vm.spinner.active = false;
                });


        }


    }]);
 