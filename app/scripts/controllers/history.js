'use strict';


angular.module('bigdriveAngularApp')
  .controller('HistoryCtrl', ['$scope', '$http', function ($scope, $http) {

    var map = initMap();
    var pathOverlays = [];

    $scope.selectedDevice = null;
    $scope.showWrongParameter = 0;

    $scope.dateSelected = getCurrentDate();

    // detect any change in dateSelected
    $scope.setDateSelected = function () {
      if ($scope.dateSelected.length === 10) {
        $scope.show();
      }
    };

    // populate dropdown
    $http.get('/devices/')
      .success(function (data, status, headers, config) {
        $scope.devices = data;
      });

    // update map with any information from selectedDevice
    $scope.show = function () { 
      clearMap(map, pathOverlays);

      var params = { aggregate: 1 };
      if ($scope.selectedDevice !== null)
        params.deviceID = $scope.selectedDevice.name;

      if ($scope.dateSelected !== null)
        params.dateSelected = $scope.dateSelected;

      $http.get('/trackers/', { params: params })
        .success(function (data, status, headers, config) {
          $scope.showWrongParameter = 0;
          $scope.showResultLength = 1;
          $scope.resultLength = data.length;

          var path = null;
          for (var i = 0; i < data.length; i++) {
            console.log(data[i].lat + " " + data[i].lon);
            if (i === 0) {
              path = addPath(map, data[i].lat, data[i].lon, data[i].lat,
                                 data[i].lon);
            } else {
              path = addPath(map, data[i-1].lat, data[i-1].lon,
                                 data[i].lat, data[i].lon);
            }
            pathOverlays.push(path);
          }
        })
        .error(function (data, status, headers, config) {
          $scope.showWrongParameter = 1;
          $scope.showResultLength = 0;
        });
    };

  }]);
