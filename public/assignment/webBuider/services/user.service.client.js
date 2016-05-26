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
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
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

        }

        function findUserById(userId) {

        }

        function findUserByUsername(username) {

        }

        function findUserByCredentials(username, password) {

        }

        function updateUser(userId, user) {

        }

        function deleteUser(userId) {

        }

        return api;
    }

})();