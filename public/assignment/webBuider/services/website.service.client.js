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
        }

        function findWebsitesByUser(userId) {
        }

        function findWebsiteById(websiteId) {
        }

        function updateWebsite(websiteId, website) {
        }

        function deleteWebsite(websiteId) {
        }

        return api;
    }
})();