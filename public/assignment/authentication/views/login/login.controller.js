/**
 * Created by yangyang on 6/14/16.
 */
(function () {
    angular
        .module("myApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $rootScope, $location) {
        var vm = this;
        vm.findUserByCredentials = findUserByCredentials;

        function findUserByCredentials(user) {
            UserService
                .findUserByCredentials(user)
                .then(
                    function (response) {
                        console.log(response);
                        if (response.data) {
                            var user = response.data;
                            if (user) {
                                delete user.password;
                                $rootScope.currentUser = user;
                                $location.url("/profile/" + user._id);
                            }
                        } else {
                            vm.errormsg = "user not found."
                        }
                    },
                    function (error) {
                        vm.errormsg = "something went wrong."
                    });
        }
    }
})();