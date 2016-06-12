/**
 * Created by yangyang on 6/10/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var WidgetSchema = mongoose.Schema(
        {
            _page: {type: mongoose.Schema.ObjectId, ref: "Page"},
            type: String, //enum ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']
            name: String,
            text: String,
            placeholder: String,
            url: String,
            width: String,
            height: String,
            rows: Number,
            size: Number,
            class: String,
            icon: String,
            deletable: Boolean,
            formatted: Boolean,
            dateCreated: {type: Date, default: Date.now}
        },
        {collection: "webbuilder.widget"});

    return WidgetSchema;
};