/**
 * Created by yangyang on 6/9/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId, ref: "User"},
        name: String,
        description: String,
        //pages: [page]
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "webbuilder.website"});

    return WebsiteSchema;
};