/**
 * Created by yangyang on 6/10/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var WidgetSchema = require("./widget.schema.server.js")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        uploadImage: uploadImage
    };

    function createWidget(pageId, widget) {
        widget._page = pageId;
        return Widget.create(widget);
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        return Widget.update(
            {_id: widgetId},
            {$set: widget}
        );
    }

    function deleteWidget(widgetId){
        return Widget.remove({_id: widgetId});
    }

    function reorderWidget(pageId, start, end){
        //Modifies the order of widget at position start into final position end in page whose _id is pageId
        return Widget.find({_page: pageId})
            .then(function(widgets){
                widgets.splice(end, 0, widgets.splice(start, 1)[0]);
                widgets.save();
            });
    }

    function uploadImage(widgetId, url, width) {
        return Widget.update(
            {_id: widgetId},
            {$set: {
                url: url,
                width: width
            }}
        );
    }
    return api;
};