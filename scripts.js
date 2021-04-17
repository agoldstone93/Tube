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
    
    var promise;
    $scope.intervalFunction = function() {
        promise = $interval(function() {
            $scope.getData();            
        }, 300000);
    }
    $scope.intervalFunction();
    
    $scope.refreshPage = function() {
        console.log("BUTTON");
        $interval.cancel(promise);
        $scope.getData();
        $scope.intervalFunction();
    }
});