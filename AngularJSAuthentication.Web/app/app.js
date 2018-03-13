
var app = angular.module('AngularAuthApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar','ngFileUpload']);

app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/app/views/home.html"
    });

    //$routeProvider.when("/login", {
    //    controller: "loginController",
    //    templateUrl: "/app/views/login.html"
    //});

    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: "/app/views/signup.html"
    });

    $routeProvider.when("/orders", {
        controller: "ordersController",
        templateUrl: "/app/views/orders.html"
    });

    $routeProvider.when("/refresh", {
        controller: "refreshController",
        templateUrl: "/app/views/refresh.html"
    });

    $routeProvider.when("/tokens", {
        controller: "tokensManagerController",
        templateUrl: "/app/views/tokens.html"
    });

    $routeProvider.when("/associate", {
        controller: "associateController",
        templateUrl: "/app/views/associate.html"
    });



    $routeProvider.when("/pricing", {
        controller: "pricingController",
        templateUrl: "/app/views/pricing1.html"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "/app/views/signin.html"
    });

    $routeProvider.when("/signin", {
        controller: "loginController",
        templateUrl: "/app/views/signin.html"
    });

    
    $routeProvider.when("/orderRequirement", {
        controller: "orderRequirementController",
        templateUrl: "/app/views/orderRequirments.html"
    });

    
    $routeProvider.when("/orderReview", {
        controller: "orderReviewController",
        templateUrl: "/app/views/orderReview.html"
    });


    $routeProvider.when("/OrderSuccess", {
        controller: "ordersuccessController",
        templateUrl: "/app/views/orderSuccess.html"
    });


    /*only ui*/


    $routeProvider.when("/academic", {
        templateUrl: "/app/views/academic.html"
    });


    $routeProvider.when("/authors", {
        templateUrl: "/app/views/authors.html"
    });


    $routeProvider.when("/blog", {
        controller: "blogController",
        templateUrl: "/app/views/blog.html"
    });


    $routeProvider.when("/business", {
        templateUrl: "/app/views/business1.html"
    });


    $routeProvider.when("/contact", {
        templateUrl: "/app/views/contact.html"
    });


    $routeProvider.when("/faq", {
        templateUrl: "/app/views/faq.html"
    });

    $routeProvider.when("/onlinecontent", {
        templateUrl: "/app/views/online-content.html"
    });

    $routeProvider.when("/personal", {
        templateUrl: "/app/views/personal.html"
    });
     
    $routeProvider.otherwise({ redirectTo: "/home" });

});

var serviceBase = 'http://localhost:26264/';
//var serviceBase = 'http://ngauthenticationapi.azurewebsites.net/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: '844579736688-uhlg0h18699hujgcolf16muqg5npnpos.apps.googleusercontent.com'
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);


