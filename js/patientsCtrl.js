/*angular.module('patientsApp', [])
.controller('patientsCtrl', function($scope, $http) {
    $http.get('https://izenda.herokuapp.com/patients').
        then(function(response) {
         $scope.patients = response.data;
        });
});
*/

angular.module('patientsApp', []).controller ('patientsCtrl',[
  '$scope','$http',
  function ($scope, $http) {
      $http.get('https://izenda.herokuapp.com/patients').
      then(function(response) {
       $scope.patients = response.data;
      });

}]);
