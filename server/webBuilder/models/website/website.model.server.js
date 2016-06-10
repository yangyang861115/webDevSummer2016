/**
 * Created by yangyang on 6/9/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var WebsiteSchema = require('./website.schema.server.js')();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };

    function createWebsite(userId, website){
        website._user = userId;
        return Website.create(website);
    }

    function findAllWebsitesForUser(userId){
        return Website.find({_user: userId});
    }

    function findWebsiteById(websiteId) {
        return Website.findById(websiteId);
    }

    function updateWebsite(websiteId, website){
        return Website.update(
            {_id: websiteId},
            {$set: website});
    }

    function deleteWebsite(websiteId) {
        return Website.remove({_id: websiteId});
    }

    return api;
};