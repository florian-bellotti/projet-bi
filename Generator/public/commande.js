var commandeApp = angular.module("commandeApp", []);

// define the controller
commandeApp.controller("CommandeCtrl", function ($scope, $http) {
    $scope.data = {};

    // get json response
    $http({
        method: 'GET',
        url: '/generator/list'
    }).then(function successCallback(response) {
        $scope.data.commandes = response.data.commandes;
        console.log(response.data.commandes);
    }, function errorCallback(response) {
        $scope.data.error = response;
    });
});