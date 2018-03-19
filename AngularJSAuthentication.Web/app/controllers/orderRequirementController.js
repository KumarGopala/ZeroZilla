'use strict';
app.controller('orderRequirementController', ['$rootScope', '$scope', '$http', 'ngAuthSettings', '$location', function ($rootScope,$scope, $http, ngAuthSettings, $location) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    $scope.OrderReview = function () {

        $scope.order = [];

        if ($scope.DocType == undefined) {
            alert("Please select document type");
            return;
        }
        if ($scope.SubCatType == undefined) {
            alert("Please select Subcategory type");
            return;
        }

        $scope.order.DocumentType = $scope.DocType;
        $scope.order.SubCategory = $scope.SubCatType;
        $scope.order.EnglishStyle = $scope.EngStyle;
        $scope.order.Referencing = $scope.Reference;
        $scope.order.Requirments = $scope.YourRequirement;

        $rootScope.order = $scope.order;

        $location.path('/orderReview');

    }

     
     
}]);
