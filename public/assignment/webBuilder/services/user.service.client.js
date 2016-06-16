/**
 * Created by yangyang on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {


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
            login: login,
            logout: logout,
            loggedIn: loggedIn,
            register: register,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        function createUser(user) {
            return $http.post("/api/webbuilder/user", user);
        }

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/webbuilder/login", user);
        }

        function logout(){
            return $http.post("/api/webbuilder/logout");
        }

        function loggedIn(){
            return $http.get("/api/webbuilder/loggedIn");
        }

        function register(user){
            return $http.post("/api/webbuilder/register", user);
        }

        function findUserById(userId) {
            return $http.get("/api/webbuilder/user/" + userId);
        }

        function findUserByUsername(username) {
            return $http.get("/api/webbuilder/user?username=" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/webbuilder/user?username=" + username + "&password=" + password);
        }

        function updateUser(userId, user) {
            return $http.put("/api/webbuilder/user/" + userId, user);
        }

        function deleteUser(userId) {
            return $http.delete("/api/webbuilder/user/" + userId);
        }

        return api;
    }

})();