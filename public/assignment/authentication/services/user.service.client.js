/**
 * Created by yangyang on 6/13/16.
 */
(function(){
    angular.module("myApp")
        .factory("UserService", UserService);

    function UserService($http){
        var service = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            logoutUser: logoutUser
        };

        return service;

        function createUser(user){
            return $http.post('/api/authentication/user', user)
        }

        function findUserById(id) {
            return $http.get('/api/authentication/user/' + id);
        }

        function updateUser(user) {
            return $http.put('/api/authentication/user/' + user._id, user);
        }

        function findUserByCredentials(user) {
            return $http.get('/api/authentication/user/?username='+user.username+'&password='+user.password);
        }

        function logoutUser(){

        }
    }
})();