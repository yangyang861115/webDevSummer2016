/**
 * Created by yangyang on 6/5/16.
 */
(function () {
    angular
        .module("jagDirective", [])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable(){
        var start = null;
        var end = null;
        function link(scope, element, attributes){
            var jgaAxis = attributes.jgaAxis;
            $(element).sortable({
                axis: jgaAxis,
                start: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    var tmp = scope.widgets[start];
                    scope.widgets[start] = scope.widgets[end];
                    scope.widgets[end] = tmp;
                    scope.$apply();
                }
            })
        }

        return {
            link: link
        }
    }
})();