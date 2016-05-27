/**
 * Created by yangyang on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("ChooseWidgetController", ChooseWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();

        function getSafeHtml(text) {
            return $sce.trustAsHtml(text);
        }

        function getSafeUrl(url) {
            //old-url: https://youtu.be/AM2Ivdi9c4E
            //new-url: https://www.youtube.com/embed/AM2Ivdi9c4E
            var urlParts = url.split("/");
            var id = urlParts[urlParts.length - 1];
            var newUrl = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(newUrl);
        }
    }

    function ChooseWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.selectWidget = selectWidget;
        vm.widget = {};
        function selectWidget(widgetType) {
            var newWidget = WidgetService.createWidget(vm.pageId, widgetType);
            $location.url("/user/"+vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
        }
    }

    function EditWidgetController($routeParams, WidgetService, $location) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function updateWidget() {
            console.log(vm.widget);
            WidgetService.updateWidget(vm.widgetId, vm.widget);
            $location.url("/user/"+vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget/");
        }

        function deleteWidget(){
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/"+vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
    }
})();
