/**
 * Created by yangyang on 6/10/16.
 */
module.exports = function(){
    var mongoose = require('mongoose');
    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.ObjectId, ref: "Website"},
        name: String,
        title: String,
        description: String,
        //widgets: [widget]
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "page"});

    return PageSchema;
};