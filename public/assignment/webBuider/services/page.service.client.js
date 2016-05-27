/**
 * Created by yangyang on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456"},
            {"_id": "432", "name": "Post 2", "websiteId": "456"},
            {"_id": "543", "name": "Post 3", "websiteId": "456"}
        ];

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
            var newpage = {
                _id: (Math.ceil(Math.random()*100)).toString(),
                name: page.name,
                websiteId: websiteId
            };
            pages.push(newpage);
            return newpage;
        }

        function findPagesByWebsiteId(websiteId) {
            var results = [];
            for(var i in pages) {
                if(pages[i].websiteId === websiteId) {
                    results.push(pages[i]);
                }
            }
            return results;
        }

        function findPageById(pageId) {
            for(var i in pages) {
                if(pages[i]._id === pageId) {
                    return pages[i];
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for(var i in pages) {
                if(pages[i]._id === pageId) {
                    pages[i] = page;
                    return true;
                }
            }
            return false;
        }

        function deletePage(pageId) {
            for(var i in pages) {
                if(pages[i]._id === pageId) {
                    pages.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

        return api;
    }

})();