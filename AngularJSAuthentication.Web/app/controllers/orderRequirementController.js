'use strict';
app.controller('orderRequirementController', ['$rootScope', '$scope', '$http', 'ngAuthSettings', '$location', function ($rootScope,$scope, $http, ngAuthSettings, $location) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    $scope.OrderReview = function () {

        $scope.order = [];
        $scope.order.DocumentType = $scope.DocType;
        $scope.order.SubCategory = $scope.SubCatType;
        $scope.order.EnglishStyle = $scope.EngStyle;
        $scope.order.Referencing = $scope.Reference;
        $scope.order.Requirments = $scope.YourRequirement;

        $rootScope.order = $scope.order;

        $location.path('/orderReview');

    }

     
     
}]);
