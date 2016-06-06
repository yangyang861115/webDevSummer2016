/**
 * Created by yangyang on 6/6/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, $location, FlickrService, WidgetService) {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid ;
        var widgetId = $routeParams.wgid;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos.photo;
                    console.log(vm.photos);
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            WidgetService
                .findWidgetById(widgetId)
                .then(function(response) {
                    var widget = response.data;
                    widget.url = url;
                    WidgetService
                        .updateWidget(widgetId, widget)
                        .then(
                            function (response){
                                $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                            }
                        );
                });
        }

    }


})();