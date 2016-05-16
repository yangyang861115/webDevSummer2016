/**
 * Created by yangyang on 4/12/16.
 */
(function () {
    angular.module("myApp", ['ngRoute'])
        .config(configuration)
        .controller('headerController', headerController)
        .controller('menuController', menuController)
        .filter('encodeURI', encodeURI);;

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "views/home.html",
            })
            .when('/menu', {
                templateUrl: "views/menu.html",
                controller: "menuController",
                controllerAs: "model"
            })
            .when('/menu/:item', {
                templateUrl: "views/entry.html",
                controller: "menuController",
                controllerAs: "model"
            })
            .when('/contact', {
                templateUrl: "views/contact.html"
            })
            .when('/reservation', {
                templateUrl: "views/reservation.html"
            })
            .otherwise({
                redirectTo: "/"
            });

    }

    function headerController($location) {
        var vm = this;
        vm.$location = $location;

    }

    function menuController($http, $location, $routeParams) {
        var vm = this;
        vm.menu = {};
        console.log($location.url());
        vm.currentCat = $routeParams.item;
        vm.checkActive = function(name) {
            if('/menu/' + window.encodeURI(name) == $location.url()) return "active";
        }

        $http.get('menu.json')
            .then(function (res) {
                vm.menu = res.data;
                vm.chunkedData = chunk(vm.menu, 3);
                if (vm.currentCat) {
                    for (var idx in vm.menu) {
                        if (vm.menu[idx].catname == vm.currentCat) {
                            vm.entries = vm.menu[idx].catitems;
                        }
                    }
                }
            });

        function chunk(arr, size) {
            var newArr = [];
            for (var i=0; i<arr.length; i+=size) {
                newArr.push(arr.slice(i, i+size));
            }
            return newArr;
        }


    }

    function encodeURI(){
        return window.encodeURI;
    }
})();