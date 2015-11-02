'use strict';

angular.module('meanApp')
    .controller('PicCtrl', function ($scope, $http, Upload, $stateParams) {
        console.log($stateParams.id);
        $scope.id = $stateParams.id;
        $scope.remove = function (id){
             
        } 
});