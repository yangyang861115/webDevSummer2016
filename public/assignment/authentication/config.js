/**
 * Created by yangyang on 6/13/16.
 */
(function(){
    angular
        .module("myApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "views/home.html"
            })
            .when("/profile/:id",{
                templateUrl: "views/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/login",{
                templateUrl: "views/login/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register",{
                templateUrl: "views/register/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .otherwise(
                {redirectTo: "/home"}
            );
    }
})();