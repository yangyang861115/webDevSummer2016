/**
 * Created by yangyang on 6/6/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);


    function FlickrService($http) {
        var key = "86bbad0670b3cedd221ece4e3134fa9c";
        var secret = "4d7d8ac61b303f6c";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var api = {
            searchPhotos :searchPhotos
        };

        function searchPhotos(searchTerm){
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }

        return api;
    }
})();