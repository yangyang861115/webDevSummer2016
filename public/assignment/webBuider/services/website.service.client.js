/**
 * Created by yangyang on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456"},
            {"_id": "234", "name": "Tweeter", "developerId": "456"},
            {"_id": "456", "name": "Gizmodo", "developerId": "456"},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123"},
            {"_id": "678", "name": "Checkers", "developerId": "123"},
            {"_id": "789", "name": "Chess", "developerId": "234"}
        ];

        /*
        * createWebsite(userId, website) - adds the website parameter instance to the local websites array. The new website's developerId is set to the userId parameter
        * findWebsitesByUser(userId) - retrieves the websites in local websites array whose developerId matches the parameter userId
        * findWebsiteById(websiteId) - retrieves the website in local websites array whose _id matches the websiteId parameter
        * updateWebsite(websiteId, website) - updates the website in local websites array whose _id matches the websiteId parameter
        * deleteWebsite(websiteId) - removes the website from local websites array whose _id matches the websiteId parameter
         */

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };

        function createWebsite(userId, website) {
            var newWebsite = {
                _id: (Math.ceil(Math.random()*100)).toString(),
                name: website.name,
                description: website.description,
                developerId: userId
            };
            websites.push(newWebsite);
            return newWebsite;
        }

        function findWebsitesByUser(userId) {
            var results = [];
            for(var i in websites) {
                if(websites[i].developerId === userId) {
                    results.push(websites[i]);
                }
            }
            return results;
        }

        function findWebsiteById(websiteId) {
            for(var i in websites) {
                if(websites[i]._id === websiteId) {
                    return websites[i];
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            for(var i in websites) {
                if(websites[i]._id === websiteId) {
                    websites[i] = website;
                    return true;
                }
            }
            return false;
        }

        function deleteWebsite(websiteId) {
            for(var i in websites) {
                if(websites[i]._id === websiteId) {
                    console.log(i);
                    websites.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

        return api;
    }
})();