'use strict';

/**
 * @ngdoc function
 * @name bigdriveAngularApp.controller:MainCtrl
 * @description
 * # NavbarCtrl
 * Controller of the bigdriveAngularApp
 */

/**
      <div class="header" ng-controller="NavbarCtrl" ng-cloak>
        <ul class="nav nav-pills pull-right" ng-repeat="menu in menus">
          <li ng-class="{'active': $index==selectedIndex}"><a ng-href="{{ menu.url }}" ng-click="setClassActive($index)">{{ menu.name }}</a></li>
        </ul>
        <h3 class="text-muted">BigDrive</h3>
      </div>
*/
angular.module('bigdriveAngularApp')
  .controller('NavbarCtrl', function ($scope) {
    $scope.setClassActive = function (i) {
      $scope.selectedIndex = i;
    };

    $scope.menus = [
      { name: 'API', url: '#/api' },
      { name: 'Track History', url: '#/history' },
      { name: 'My Devices', url: '#/device' },
      { name: 'Home', url: '#/' },
    ];
  });
