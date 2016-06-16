/**
 * Created by yangyang on 6/13/16.
 */
(function () {
    angular
        .module("myApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location, $rootScope) {
        var vm = this;
        vm.register = register;

        function register(user) {
            UserService
                .createUser(user)
                .then(
                    function (response) {
                        console.log(response);
                        if (response.data) {
                            var newuser = response.data;
                            if (newuser) {
                                $rootScope.currentUser = newuser;
                                $location.url("/profile/" + newuser._id);
                            }
                        }else {
                            vm.errormsg = "user already exists."
                        }
                    },
                    function (error) {

                    }
                );
        }
    }
})();