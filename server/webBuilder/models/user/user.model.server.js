/**
 * Created by yangyang on 6/8/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var UserSchema = require('./user.schema.server.js')();
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByFacebookId: findUserByFacebookId,
        updateUser: updateUser,
        deleteUser: deleteUser
    };

    return api;

    function createUser(user) {
        return User.create(user);
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function findUserById(userId) {
        //return User.findOne({_id: userId});
        return User.findById(userId);
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserByFacebookId(fid) {
        return User.findOne({"facebook.id": fid});
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

    function updateUser(userId, user) {
        //delete user._id; $set: user
        return User.update(
            {_id: userId},
            {
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    dob: user.dob
                }
            });
    }
};