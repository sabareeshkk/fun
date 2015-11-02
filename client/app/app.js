'use strict';

angular.module('meanApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ngUpload',
  'ngFileUpload'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
