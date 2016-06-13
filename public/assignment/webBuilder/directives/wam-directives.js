/**
 * Created by yangyang on 6/5/16.
 */
(function () {
    angular
        .module("wamDirective", [])
        .directive("wamSortable", wamSortable);

    function wamSortable() {
        var start = -1;
        var end = -1;

        function link(scope, element, attributes) {
            $(element)
                .sortable({
                    axis: "y",
                    start: function(event, ui){
                        console.log("sorting started");
                        start = ui.item.index();
                    },
                    stop: function(event, ui){
                        console.log("sorting stopped");
                        end = ui.item.index();
                        console.log([start, end]);
                        scope.callback({start: start, end: end});
                    }
                });
        }

        return {
            scope: {
                callback: "&"
            },
            link: link
        }
    }
})();