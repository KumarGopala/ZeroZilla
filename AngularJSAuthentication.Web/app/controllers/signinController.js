'use strict';
app.controller('signinController', ['$scope', '$http', 'ngAuthSettings', '$location', function ($scope, $http, ngAuthSettings, $location) {
    debugger;

    $scope.signup = function () {
        $location.path('/signup');
    }

}]);
