/**
 * Created by yangyang on 5/17/16.
 */
(function () {
    angular
        .module("MeanBlogApp", [])
        .controller("MeanBlogController", MeanBlogController);

    function MeanBlogController($scope, $http) {
        $scope.posts = [];

        $http
            .get("/api/meanblog/post")
            .then(setAllPosts);

        $scope.createPost = function (title, body) {
            var newPost = {
                title: title,
                body: body
            };
            $http
                .post("/api/meanblog/post", newPost)
                .then(setAllPosts);
        }

        $scope.removePost = function(id){
            $http
                .delete("/api/meanblog/post/"+id)
                .then(setAllPosts);
        }


        function setAllPosts(response) {
            console.log(response);
            $scope.posts = response.data;
        }
    }

})();