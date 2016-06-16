/**
 * Created by yangyang on 6/13/16.
 */
module.exports = function(){
    var models = {
        UserModel: require('./user/user.model.server.js')(),
    };
    return models;
};