/**
 * Created by yangyang on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            var user = UserService.findUserByCredentials(user.username, user.password);
            if(user) {
                var id = user._id;
                $location.url("/user/" + id);
            } else {
                vm.alert = "We're sorry, but you used a username and/or password that doesn't match our records. Please try again";
            }
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;
        vm.user = {};

        function register() {
            var newUser = UserService.createUser(vm.user);
            if(newUser) {
                $location.url("/user/" + newUser._id);
            } else {
                vm.alert = "We're sorry, something went wrong in registration. Please try again";
            }
        }

    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.updateUser = updateUser;

        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();

        function updateUser() {
            var user = angular.copy(vm.user);
            var result = UserService.updateUser(vm.user._id, user);
            if (result) {
                vm.success = "Update successfully!";
            } else {
                vm.alert = "We're sorry, something went wrong in updating. Please try again";
            }
        }
    }

})();