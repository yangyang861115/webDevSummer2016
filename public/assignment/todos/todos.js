/**
 * Created by yangyang on 6/11/16.
 */
(function(){
    angular.module("MyDirectives", [])
        .directive("todos", todos);

    function todos(){
        function linker(scope, element, attributes){
            var data = scope.data;
            var startIndex = -1;
            var endIndex = -1;
            $(element)
                .find("tbody")
                .sortable({
                    axis: "y",
                    start: function(event, ui){
                        console.log("sorting started");
                        startIndex = ui.item.index();
                    },
                    stop: function(event, ui){
                        console.log("sorting stopped");
                        endIndex = ui.item.index();
                        console.log([startIndex, endIndex]);
                        scope.callback({start: startIndex, end: endIndex});
                        //var reorderedElement = scope.data.splice(startIndex, 1)[0];
                        //scope.data.splice(endIndex, 0, reorderedElement);
                        //scope.$apply();
                    }
                });
        }

        return {
            //template: "These are my todos"
            templateUrl: "todos.html",
            scope: {
                data: "=data",
                callback: "&"
            },
            link: linker
        }
    }
})();