/**
 * Created by yangyang on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(
                    function (response) {
                        var websites = response.data;
                        if (websites) {
                            vm.websites = websites;
                        }
                    },
                    function (error) {
                        vm.alert = "unable to find websites for userID" + vm.userId;
                    }
                );

        }

        init();

    }

    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function createWebsite() {
            WebsiteService
                .createWebsite(vm.userId, vm.website)
                .then(
                    function (response) {
                        var website = response.data;
                        if (website) {
                            $location.url("/user/" + vm.userId + "/website/");
                        }
                    },
                    function (error) {
                        vm.alert = "unable to create website";
                    }
                );
        }

    }

    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;


        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(
                    function (response) {
                        vm.website = response.data;
                    },
                    function (error) {
                        vm.alert = error.data;
                    }
                );
        }

        init();

        function updateWebsite(website) {
            WebsiteService
                .updateWebsite(vm.websiteId, website)
                .then(
                    function (response) {
                        vm.success = "Update successfully!";
                    },
                    function (error) {
                        vm.alert = error.data;
                    }
                );
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.userId + "/website")
                    },
                    function (error) {
                        vm.alert = error.data;
                    }
                );
        }
    }
})();