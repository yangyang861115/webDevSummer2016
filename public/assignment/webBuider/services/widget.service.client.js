/**
 * Created by yangyang on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        /*
         * createWidget(pageId, widget) - adds the widget parameter instance to the local widgets array. The new widget's pageId is set to the pageId parameter
         * findWidgetsByPageId(pageId) - retrieves the widgets in local widgets array whose pageId matches the parameter pageId
         * findWidgetById(widgetId) - retrieves the page in local pages array whose _id matches the widgetId parameter
         * updateWidget(widgetId, widget) - updates the widget in local pages array whose _id matches the widgetId parameter
         * deleteWidget(widgetId) - removes the widget from local widgets array whose _id matches the widgetId parameter
         * sortWidgets(pageId, index1, index2) - jgasortable
         */
        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            sortWidgets: sortWidgets
        };

        function createWidget(pageId, widget) {
            return $http.post("/api/webbuilder/page/" + pageId + "/widget", widget);
        }

        function findWidgetsByPageId(pageId) {
            return $http.get("/api/webbuilder/page/" + pageId + "/widget");
        }

        function findWidgetById(widgetId) {
            return $http.get("/api/webbuilder/widget/" + widgetId);
        }

        function updateWidget(widgetId, widget) {
            return $http.put("/api/webbuilder/widget/" + widgetId, widget);
        }

        function deleteWidget(widgetId) {
            return $http.delete("/api/webbuilder/widget/" + widgetId);
        }

        function sortWidgets(pageId, id1, id2) {
            return $http.put("/api/webbuilder/page/" + pageId + "/widget?initial=" + id1 + "&final=" + id2);
        }
        return api;
    }
})();