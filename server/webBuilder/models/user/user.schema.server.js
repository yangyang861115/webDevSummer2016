/**
 * Created by yangyang on 6/9/16.
 */
module.exports = function(){
    var mongoose = require('mongoose');

    var WebsiteSchema = require("../website/website.schema.server.js")();

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        dob: Date,
        websites: [WebsiteSchema],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "webbuilder.user"});

    return UserSchema;
};
