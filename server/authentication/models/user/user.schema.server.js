/**
 * Created by yangyang on 6/13/16.
 */
module.exports = function(){
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        email: String,
        firstname: String,
        lastname: String,
        roles: [String],
        dateCreated: {type: String, default: Date.now}
    }, {collection: "authentication.user"});

    return UserSchema;
};