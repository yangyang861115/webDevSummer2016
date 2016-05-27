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
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
        }
        init();

    }

    function NewPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.createPage = createPage;

        function createPage(page) {
            var page = PageService.createPage(vm.websiteId, page);
            if(page) {
                vm.success = "Page created successfully!";
                $location.url("/user/"+vm.userId + "/website/"+vm.websiteId + "/page/");
            } else {
                vm.alert = "Something went wrong in creating a new page.";
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
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function updatePage(page) {
            PageService.updatePage(vm.pageId, page);
            $location.url("/user/"+vm.userId + "/website/"+vm.websiteId + "/page/");
        }

        function deletePage() {
            PageService.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId + "/website/"+vm.websiteId + "/page/");
        }

    }
})();