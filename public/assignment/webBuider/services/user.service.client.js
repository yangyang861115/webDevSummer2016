/**
 * Created by yangyang on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "yang", password: "yang", firstName: "yang", lastName: "yang"}
        ];

        /*
         * createUser(user) - adds the user parameter instance to the local users array
         * findUserById(userId) - returns the user in local users array whose _id matches the userId parameter
         * findUserByUsername(username) - returns the user in local users array whose username matches the parameter username
         * findUserByCredentials(username, password) - returns the user whose username and password match the username and password parameters
         * updateUser(userId, user) - updates the user in local users array whose _id matches the userId parameter
         * deleteUser(userId) - removes the user whose _id matches the userId parameter
         */

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        function createUser(user) {

            var newUser = {
                _id: (Math.ceil(Math.random()*100)).toString(),
                username: user.username,
                password: user.password
            };
            users.push(newUser);
            console.log(users);
            return newUser;
        }

        function findUserById(userId) {
            for(var i in users) {
                if(users[i]._id === userId) {
                    return users[i];
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for(var i in users) {
                if(users[i].username === username) {
                    return users[i];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var i in users) {
                if(users[i].username === username && users[i].password === password) {
                    return users[i];
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            for(var i in users) {
                if(users[i]._id === userId) {
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    users[i].email = user.email;
                    return true;
                }
            }
            return false;
        }

        function deleteUser(userId) {
            for(var i in users) {
                if(users[i]._id === userId) {
                    users.splice(i, 1);
                }
                return true;
            }
            return false;
        }

        return api;
    }

})();