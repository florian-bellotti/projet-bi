var commandeApp = angular.module("commandeApp", []);

// define the controller
commandeApp.controller("CommandeCtrl", function ($scope, $http) {
    $scope.data = {};

    $scope.submit = function(commande) {
        $http({
            url: '/generator/add',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: commande
        }).then(function successCallback(response) {
            $scope.refresh();
        }, function errorCallback(response) {
            $scope.data.error = response;
        });
    };

    // get json response
    $scope.refresh = function() {
        $http({
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            url: '/generator/list'
        }).then(function successCallback(response) {
            $scope.data.commandes = response.data.commandes;
            console.log(response.data.commandes);
        }, function errorCallback(response) {
            $scope.data.error = response;
        });
    };

    $scope.refresh();
});