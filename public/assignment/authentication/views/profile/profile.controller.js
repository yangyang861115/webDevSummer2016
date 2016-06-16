/**
 * Created by yangyang on 6/13/16.
 */
(function(){
    angular
        .module("myApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $routeParams){
        var vm = this;
        vm.id = $routeParams.id;
        vm.updateUser = updateUser;

        function init() {
            UserService
                .findUserById(vm.id)
                .then(
                    function(response){
                        var user = response.data;
                        if(user) {
                            delete user.password;
                            vm.user = user;
                            console.log(vm.user);
                        }
                    },
                    function(error) {

                    }
                )
        }
        init();


        function updateUser(user) {
            console.log(user);
            UserService.updateUser(user)
                .then(
                function(stats){
                    console.log(stats);
                    vm.success = "Update successfully."
                },
                function(error) {

                }
            )
        }
    }
})();