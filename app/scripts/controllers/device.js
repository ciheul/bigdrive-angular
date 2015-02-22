'use strict';


angular.module('bigdriveAngularApp')
  .controller('DeviceCtrl', ['$scope', '$http', function ($scope, $http) {
    // populate dropdown
    $http.get('/devices/')
      .success(function (data, status, headers, config) {
        $scope.devices = data;
      });

    $scope.addNewDevice = function () {
      console.log("submit: " + $scope.newDeviceName);
      $http.post('/devices/')
        .success(function (data, status, headers, config) {
        
        });
    };
  }]);
