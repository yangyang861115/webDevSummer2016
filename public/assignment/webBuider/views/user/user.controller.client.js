/**
 * Created by yangyang on 5/25/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController() {
        var vm = this;

        var users  = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        vm.login = function(username, password){
            for (var i in users) {
                if(users[i].username === username && users[i].password === password) {
                    console.log("Yay");
                } else {
                    vm.error = "We're sorry, but you used a username and/or password that doesn't match our records. Please try again";
                }
            }
        }
    }
})();