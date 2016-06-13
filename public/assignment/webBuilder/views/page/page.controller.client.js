/**
 * Created by yangyang on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init() {
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .then(
                    function (response) {
                        vm.pages = response.data;
                    },
                    function (error) {
                        vm.alert = "cannot find pages for website with id = " + vm.websiteId;
                    }
                );
        }

        init();

    }

    function NewPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.createPage = createPage;

        function createPage(page) {
            if (page && page.name) {
                PageService
                    .createPage(vm.websiteId, page)
                    .then(
                        function (response) {
                            var page = response.data;
                            if (page) {
                                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
                            }
                        },
                        function (error) {
                            vm.alert = "Unable to create page";
                        }
                    );
            }
        }
    }

    function EditPageController($routeParams, PageService, $location) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            PageService
                .findPageById(vm.pageId)
                .then(
                    function (response) {
                        vm.page = response.data;
                    },
                    function (error) {
                        vm.alert = "Cannot find page with id " + vm.pageId;
                    }
                );
        }

        init();

        function updatePage(page) {
            if (page && page.name) {
                PageService
                    .updatePage(vm.pageId, page)
                    .then(
                        function (response) {
                            vm.success = "update successfully";
                        },
                        function (error) {
                            vm.alert = "Cannot update page with id " + vm.pageId;
                        }
                    );
            }
        }

        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
                    },
                    function (error) {
                        vm.alert = "Cannot remove page with id " + vm.pageId;
                    }
                );
        }
    }
})();