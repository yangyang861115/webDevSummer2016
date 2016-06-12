/**
 * Created by yangyang on 6/11/16.
 */
(function () {
    angular.module("TodoApp", ["MyDirectives"])
        .controller("TodoController", TodoController);

    function TodoController($http) {
        var vm = this;
        vm.reorderTodos = reorderTodos;

        function init() {
            $http.get("/api/todo/todos")
                .then(function (response) {
                    vm.data = response.data;
                })
        }

        init();

        function reorderTodos(start, end) {
            console.log("in the controller" + [start, end]);
            $http.put("/api/todo/todos?start=" + start + "&end=" + end)
                .then(function () {
                    init();
                });
        }
    }
})();