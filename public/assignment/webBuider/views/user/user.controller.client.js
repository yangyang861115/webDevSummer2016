/**
 * Created by yangyang on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    function LoginController($location) {
        var vm = this;

        vm.login = function (username, password) {
            for (var i in users) {
                if (users[i].username === username && users[i].password === password) {
                    console.log("You are login!");
                    $location.url("/profile/" + users[i]._id);
                } else {
                    vm.error = "We're sorry, but you used a username and/or password that doesn't match our records. Please try again";
                }
            }
        }
    }

    function ProfileController($routeParams) {
        var vm = this;
        vm.updateUser = updateUser;

        var index = -1;
        var userId = $routeParams.userId;
        for (var i in users) {
            if (users[i]._id === userId) {
                vm.user = users[i];
                index = i;
            }
        }

        function updateUser(newUser) {
            users[i].firstName = newUser.firstName;
            users[i].lastName = newUser.lastName;
            users[i].email = newUser.email;
        }
    }

})();