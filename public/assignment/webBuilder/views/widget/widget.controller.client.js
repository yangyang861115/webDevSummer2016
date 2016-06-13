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
        vm.reorderWidget = reorderWidget;

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(
                    function (response) {
                        vm.widgets = response.data;
                    },
                    function (error) {
                        vm.alert = "Cannot find widgets for page";
                    }
                );
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

        function reorderWidget(start, end) {
            return WidgetService.reorderWidget(vm.pageId, start, end)
                .then(
                    function (response) {
                       init();
                    },
                    function (error) {
                        vm.alert = "Cannot move the widget";
                    }
                );
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
            var widget = {
                type: widgetType
            };
            WidgetService
                .createWidget(vm.pageId, widget)
                .then(
                    function (response) {
                        var widget = response.data;
                        if (widget) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
                        }
                    },
                    function (error) {
                        vm.alert = "Cannot create widget";
                    }
                );
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
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(
                    function (response) {
                        vm.widget = response.data;
                    },
                    function (error) {
                        vm.alert = error.data;
                    }
                );
        }

        init();

        function updateWidget() {
            if(vm.widget && vm.widget.name) {
                WidgetService
                    .updateWidget(vm.widgetId, vm.widget)
                    .then(
                        function (response) {
                            vm.success = "update successfully";
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                        },
                        function (error) {
                            vm.alert = error.data;
                        }
                    );
            }
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    },
                    function (error) {
                        vm.alert = error.data;
                    }
                );
        }
    }
})();
