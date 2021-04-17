var app = angular.module('myApp',[]);
app.controller('myController', function($scope, $http, $interval){
    var successCallback = function (response){
        $scope.lines = response.data;
        console.log("refresh");
    }

    var errorCallback = function (response){
        $scope.lines = response.statusText;
    }

    $scope.getData = function() {
        $http({
            method: 'GET',
            //url: 'http://127.0.0.1:6500/index.html' //test bad gateway
             url: 'https://api.tfl.gov.uk/Line/Mode/tube/Status'
        }).then(successCallback, errorCallback);
        $scope.currentTime = new Date().toLocaleTimeString();
        $scope.currentDate = new Date().toLocaleDateString();
    }
    
    $scope.getData();
    
    $scope.intervalFunction = function() {
        $interval(function() {
            $scope.getData();            
        }, 30000);
    }

    $scope.intervalFunction();
    
    // not working yet
    $scope.refresh = function() {
        $interval.cancel
        console.log("BUTTON");
        $scope.intervalFunction();
    }
});