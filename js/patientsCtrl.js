var app=angular.module('patientsApp',['ngRoute','smart-table']);
app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
			when('/list', {
				templateUrl: 'view/patientsList.html',
				controller: 'patientsCtrl'
			}).
			when('/Add', {
            templateUrl: 'view/create-Patient.html',
            controller: 'patientsCtrl'
        }).
        when('/Update/:id', {
            templateUrl: 'view/update-patient.html',
            controller: 'updateCtrl'
        }).
        when('/Details/:id', {
             templateUrl: 'view/patient-details.html',
             controller: 'detailsCtrl'
         }).
				 otherwise({
            redirectTo: '/list'
        });
  }]);

  app.controller('patientsCtrl', ['$scope','$http','patientsFactory',
    function ($scope,$http,patientsFactory) {
	     $scope.status;
       $scope.patients;
       getPatients();
       function getPatients() {
        patientsFactory.getPatients()
          .then(function (response) {
                $scope.patients = response.data;
            }, function (error) {
                $scope.status = 'Unable to retrieve patients data: ' + error.message;
            });
          };

       $scope.createPatient = function () {
         var pat={
           first_name:$scope.patient.first_name,
           last_name:$scope.patient.last_name,
           gender:$scope.patient.gender,
           email:$scope.patient.email,
           street_address:$scope.patient.street_address,
           state:$scope.patient.state,
           drug:$scope.patient.drug
          };

      patientsFactory.createPatient(pat)
        .then(function (response) {
            $scope.status = 'Created new patient record';
            alert($scope.status);
            $scope.patients.push(pat);
            $scope.patient={};
            }, function(error) {
              $scope.status = 'Error: Unable to create new patient' + error.message;
            });
          };

    $scope.deletePatient = function (pat) {
       var id=pat.id;
       patientsFactory.deletePatient(id)
        .then(function (response) {
            var index=$scope.patients.indexOf(pat);
            $scope.patients.splice(index, 1);
        }, function (error) {
            $scope.status = 'Error: Unable to delete patient data: ' + error.message;
        });
    };

}]);

app.controller('detailsCtrl', ['$scope','$http','$routeParams',
  function($scope,$http,$routeParams) {
    $http.get("https://izenda.herokuapp.com/patients"+'/'+$routeParams.id)
      .then(function(response){
        $scope.patient=response.data;
      })
    }
]);

app.controller('updateCtrl', ['$scope','$http','$routeParams',
    function($scope,$http,$routeParams) {
      $http.get("https://izenda.herokuapp.com/patients"+'/'+$routeParams.id)
      .then(function(response){
        $scope.patient=response.data;
      })
      $scope.updatePatient = function () {
              var pat={
                first_name:$scope.patient.first_name,
                last_name:$scope.patient.last_name,
                gender:$scope.patient.gender,
                email:$scope.patient.email,
                street_address:$scope.patient.street_address,
                state:$scope.patient.state,
                drug:$scope.patient.drug
              };
      $http.put("https://izenda.herokuapp.com/patients"+'/'+$routeParams.id,pat)
       .then(function(response){
          $scope.patient=response.data;
          alert('patient record updated')
          $scope.patient={};
        })
     };}
 ]);
