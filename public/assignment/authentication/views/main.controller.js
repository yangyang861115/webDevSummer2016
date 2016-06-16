/**
 * Created by yangyang on 6/13/16.
 */
(function(){
    angular
        .module("myApp")
        .controller("MainController", MainController);

    function MainController($location, UserService){
        var vm = this;
        vm.$location = $location;
        vm.logout = logout;

        function logout(){
            delete $rootScope.currentUser;
            //UserService.logoutUser()
            //    .then(function(response){
            //    $location.url("/home");
            //});
        }
    }

})();