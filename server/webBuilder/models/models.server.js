/**
 * Created by yangyang on 6/6/16.
 */
module.exports = function(){
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://127.0.0.1:27017/webBuilder');

    var models = {
        UserModel: require('./user/user.model.server.js')()
        //WebsiteModel: require('./website.model.server.js')(),
        //PageModel: require('./page.model.server.js')(),
        //WidgetModel: require('./widget.model.server.js')()
    };
    return models;
};