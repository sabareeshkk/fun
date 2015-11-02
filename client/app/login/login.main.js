'use strict';

angular.module('meanApp')
  .controller('LoginCtrl', function ($scope, $http, $state) {
    $scope.login = function(user){
        console.log(user);
      /*$http.post('/api/login', user).success(function(data){
        $state.go('main');
      });*/
    }
  });