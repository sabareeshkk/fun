'use strict';

angular.module('meanApp')
  .controller('NavbarCtrl', function ($scope, $location, $http) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }, 
    {
      'title':'Login',
      'link': '/login'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
    $scope.logout = function(){
      $http.get('/signout').success(function(){
        console.log('helloo world');
      });
    }
  });