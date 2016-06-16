/**
 * Created by yangyang on 6/13/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var UserSchema = require('./user.schema.server.js')();
    var User = mongoose.model("user", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser
    };
    return api;

    function createUser(user) {
        return User.create(user);
    }

    function findUserById(id) {
        return User.findOne({_id: id});
    }

    function findUserByCredentials(credentials) {
        return User.findOne(credentials);
    }

    function findUserByUsername(username , callback) {
        return User.findOne({username: username}, callback);
    }

    function updateUser(id, user) {
        delete user._id;
        return User.update({_id: id}, {$set: user});
    }
};