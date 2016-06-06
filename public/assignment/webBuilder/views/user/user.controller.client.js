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
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(
                    function (response) {
                        var user = response.data;
                        if (user) {
                            var id = user._id;
                            $location.url("/user/" + id);
                        }
                    }, function (error) {
                        console.log(error.data);
                        vm.alert = "We're sorry, but you used a username and/or password that doesn't match our records. Please try again";
                    });
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;
        vm.user = {};

        function register() {
            UserService
                .createUser(vm.user)
                .then(
                    function (response) {
                        var newUser = response.data;
                        if (newUser) {
                            $location.url("/user/" + newUser._id);
                        }
                    },
                    function (error) {
                        console.log(error.data);
                        vm.alert = "We're sorry, something went wrong in registration. Please try again";
                    }
                );
        }

    }

    function ProfileController($routeParams,$location, UserService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function init() {
            UserService
                .findUserById(vm.userId)
                .then(
                    function (response) {
                        vm.user = response.data;
                    },
                    function (error) {
                        console.log(error.data);
                    }
                );
        }

        init();

        function updateUser() {

            UserService
                .updateUser(vm.user._id, vm.user)
                .then(
                    function (response) {
                        vm.success = "Update successfully!";
                    },
                    function (error) {
                        console.log(error.data);
                        vm.alert = "We're sorry, something went wrong in updating. Please try again";
                    }
                );
        }

        function deleteUser() {
            UserService
                .deleteUser(vm.user._id)
                .then(
                    function(response) {
                        $location.url("/login");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }
    }

})();