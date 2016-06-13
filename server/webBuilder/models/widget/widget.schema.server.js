/**
 * Created by yangyang on 6/10/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var WidgetSchema = mongoose.Schema(
        {
            _page: {type: mongoose.Schema.ObjectId, ref: "Page"},
            type: {type: String, enum: ["HTML", "HEADER", "LABEL", "TEXT",
                "LINK", "BUTTON", "IMAGE", "YOUTUBE","DATATABLE", "REPEATER"]},
            name: String,
            text: String,
            placeholder: String,
            description: String,
            url: String,
            target: {type: String, enum: ["_blank", "_self", "_parent", "_top"]},
            width: String,
            height: String,
            rows: Number,
            size: Number,
            class: String,
            style: String,
            icon: String,
            deletable: Boolean,
            formatted: Boolean,
            dateCreated: {type: Date, default: Date.now}
        },
        {collection: "webbuilder.widget"});

    return WidgetSchema;
};