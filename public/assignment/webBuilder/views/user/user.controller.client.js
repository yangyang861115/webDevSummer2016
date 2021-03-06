/**
 * Created by yangyang on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, $rootScope, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            if (user && user.username && user.password) {
                UserService
                    .login(user.username, user.password)
                    .then(
                        function (response) {
                            var user = response.data;
                            if (user) {
                                $rootScope.currentUser = user;
                                $location.url("/user");
                            } else {
                                vm.alert = "We're sorry, but you used a username and/or password that doesn't match our records. Please try again";
                            }
                        }, function (error) {
                            vm.alert = "We're sorry, but you used a username and/or password that doesn't match our records. " +
                                "Please try again";
                        });
            }
        }
    }

    function RegisterController($location, UserService, $rootScope) {
        var vm = this;
        vm.register = register;

        function register(user) {
            if (user && user.username && user.password && user.confirmPassword && user.password == user.confirmPassword) {
                UserService
                    .register(user)
                    .then(
                        function (response) {
                            var newUser = response.data;
                            if (newUser) {
                                $rootScope.currentUser = user;
                                $location.url("/user");
                            }
                        },
                        function (error) {
                            vm.alert = error.data;
                        }
                    );
            }
        }
    }

    function ProfileController($routeParams, $location, $rootScope, UserService) {
        var vm = this;
        vm.userId = $rootScope.currentUser._id;
        vm.updateUser = updateUser;
        vm.logout = logout;
        vm.deleteUser = deleteUser;
        vm.convertToDate = convertToDate;

        function init() {
            UserService
                .findUserById(vm.userId)
                .then(
                    function (response) {
                        response.data.dob = new Date(response.data.dob);
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

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function (error) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                );
        }

        function deleteUser() {
            UserService
                .deleteUser(vm.user._id)
                .then(
                    function (response) {
                        $location.url("/login");
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                )
        }

        function convertToDate(dateString) {
            return new Date(dateString);
        }
    }

})();