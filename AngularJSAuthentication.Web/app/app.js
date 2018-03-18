var app = angular.module('AngularAuthApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'stripe.checkout', 'ngFileUpload']);


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


    $routeProvider.when("/orderAdmin", {
        controller: "ordersAdminController",
        templateUrl: "/app/views/ordersAdmin.html"
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
        controller: "SimpleExampleController",
        templateUrl: "/app/views/Simple.html"
    });

    $routeProvider.when("/Simple", {
        controller: "SimpleExampleController",
        templateUrl: "/app/views/Simple.html"
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

    $routeProvider.when("/samples", {
        templateUrl: "/app/views/samples.html"
    });
    $routeProvider.when("/reviews", {
        templateUrl: "/app/views/reviews.html"
    });


    // For UI
    $routeProvider.when("/academic-article-proofreading", {
        templateUrl: "/app/views/UI/academic/academic-article-proofreading.html"
    });
    $routeProvider.when("/assignment-proofreading", {
        templateUrl: "/app/views/UI/academic/assignment-proofreading.html"
    });
    $routeProvider.when("/dissertion", {
        templateUrl: "/app/views/UI/academic/dissertion.html"
    });

    $routeProvider.when("/essay-proofreading", {
        templateUrl: "/app/views/UI/academic/essay-proofreading.html"
    });
    $routeProvider.when("/thesis", {
        templateUrl: "/app/views/UI/academic/thesis.html"
    });


    $routeProvider.when("/authors", {
        templateUrl: "/app/views/UI/authors/authors.html"
    });

    $routeProvider.when("/business1", {
        templateUrl: "/app/views/UI/business/business1.html"
    });

    $routeProvider.when("/privacy-policy", {
        templateUrl: "/app/views/UI/editing/privacy-policy.html"
    });

    $routeProvider.when("/terms-condition", {
        templateUrl: "/app/views/UI/editing/terms-condition.html"
    });


    $routeProvider.when("/online-content", {
        templateUrl: "/app/views/UI/editing/online-content.html"
    });

    $routeProvider.when("/personal", {
        templateUrl: "/app/views/UI/editing/personal.html"
    });

    //End of UI

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


