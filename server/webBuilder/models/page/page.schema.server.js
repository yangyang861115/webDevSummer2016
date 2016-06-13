/**
 * Created by yangyang on 6/10/16.
 */
module.exports = function(){
    var mongoose = require('mongoose');

    var WidgetSchema = require("../widget/widget.schema.server.js")();
    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.ObjectId, ref: "Website"},
        name: String,
        title: String,
        description: String,
        widgets: [WidgetSchema],
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "webbuilder.page"});

    return PageSchema;
};