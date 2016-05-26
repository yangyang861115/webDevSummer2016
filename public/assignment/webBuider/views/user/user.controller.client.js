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
                $location.url("/user/" + user._id);
            } else {
                vm.alert = "We're sorry, but you used a username and/or password that doesn't match our records. Please try again";
            }
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(user) {
            var user = UserService.createUser(user);
            if(user) {
                $location.url("/user/" + user._id);
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

        function updateUser(user) {
            vm.user = UserService.updateUser(vm.userId, user);
            if (user) {
                vm.success = "Update successfully!";
            } else {
                vm.alert = "We're sorry, something went wrong in updating. Please try again";
            }
        }
    }

})();