/**
 * Created by yangyang on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {

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
            return $http.post("/api/webbuilder/user/" + userId + "/website", website);
        }

        function findWebsitesByUser(userId) {
            return $http.get("/api/webbuilder/user/" + userId+ "/website");
        }

        function findWebsiteById(websiteId) {
            return $http.get("/api/webbuilder/website/" + websiteId);
        }

        function updateWebsite(websiteId, website) {
            return $http.put("/api/webbuilder/website/" + websiteId, website);
        }

        function deleteWebsite(websiteId) {
            return $http.delete("/api/webbuilder/website/" + websiteId);
        }

        return api;
    }
})();