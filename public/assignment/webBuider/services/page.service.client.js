/**
 * Created by yangyang on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        /*
         * createPage(websiteId, page) - adds the page parameter instance to the local pages array. The new page's websiteId is set to the websiteId parameter
         * findPageByWebsiteId(websiteId) - retrieves the pages in local pages array whose websiteId matches the parameter websiteId
         * findPageById(pageId) - retrieves the page in local pages array whose _id matches the pageId parameter
         * updatePage(pageId, page) - updates the page in local pages array whose _id matches the pageId parameter
         * deletePage(pageId) - removes the page from local pages array whose _id matches the pageId parameter
         */
        var api = {
            createPage: createPage,
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        function createPage(websiteId, page) {
            return $http.post("/api/webbuilder/website/" + websiteId + "/page", page);
        }

        function findPagesByWebsiteId(websiteId) {
            return $http.get("/api/webbuilder/website/" + websiteId + "/page");
        }

        function findPageById(pageId) {
            return $http.get("/api/webbuilder/page/" + pageId);
        }

        function updatePage(pageId, page) {
            return $http.put("/api/webbuilder/page/" + pageId, page);
        }

        function deletePage(pageId) {
            return $http.delete("/api/webbuilder/page/" + pageId);
        }

        return api;
    }

})();