/**
 * Created by yangyang on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        /*
         * createWidget(pageId, widget) - adds the widget parameter instance to the local widgets array. The new widget's pageId is set to the pageId parameter
         * findWidgetsByPageId(pageId) - retrieves the widgets in local widgets array whose pageId matches the parameter pageId
         * findWidgetById(widgetId) - retrieves the page in local pages array whose _id matches the widgetId parameter
         * updateWidget(widgetId, widget) - updates the widget in local pages array whose _id matches the widgetId parameter
         * deleteWidget(widgetId) - removes the widget from local widgets array whose _id matches the widgetId parameter
         */
        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };

        function createWidget(pageId, widgetType) {
            var newWidget = {
                _id: (Math.ceil(Math.random()*100)).toString(),
                widgetType: widgetType,
                pageId: pageId
            };
            widgets.push(newWidget);
            return newWidget;
        }

        function findWidgetsByPageId(pageId) {
            var results = [];
            for(var i in widgets) {
                if(widgets[i].pageId === pageId) {
                    results.push(widgets[i]);
                }
            }
            return results;
        }

        function findWidgetById(widgetId) {
            for(var i in widgets) {
                if(widgets[i]._id === widgetId) {
                    return widgets[i];
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for(var i in widgets) {
                if(widgets[i]._id === widgetId) {
                    widgets[i] = widget;
                    return true;
                }
            }
            return false;
        }

        function deleteWidget(widgetId) {
            for(var i in widgets) {
                if(widgets[i]._id === widgetId) {
                    widgets.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

        return api;
    }
})();