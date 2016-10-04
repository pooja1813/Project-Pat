var app=angular.module('patientsApp',['ngRoute']);
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
        when('/Update', {
            templateUrl: 'view/update-patient.html',
            controller: 'patientsCtrl'
        }).
        when('/Details', {
             templateUrl: 'view/patient-details.html',
             controller: 'patientsCtrl'
         }).
				 otherwise({
            redirectTo: '/list'
        });
  }]);
    app.controller('patientsCtrl', ['$scope','patientsFactory',
        function ($scope, patientsFactory,$location) {
	$scope.status;
  $scope.patients;
  getPatients();
    $scope.go = function (path) {
  $location.path( path );
};
    function getPatients() {
        patientsFactory.getPatients()
            .then(function (response) {

                $scope.patients = response.data;

            }, function (error) {
                $scope.status = 'Unable to retrieve patients data: ' + error.message;
            });
    }
	$scope.getPatient = function (pat) {
        var pa;
        for (var i = 0; i < $scope.patients.length; i++) {
            var curPat = $scope.patients[i];
            if (curPat.ID === pat.id) {
                pa = curPat;
                break;
            }
        }

        patientsFactory.getPatient(pat.id)
          .then(function (response) {
              $scope.patients=response.data;
              //console.log($scope.patients);
          }, function (error) {
              $scope.status = 'Error: Unable to retrieve patients data' + error.message;
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
                $scope.patients.push(pat);
            }, function(error) {
                $scope.status = 'Error: Unable to create new patient' + error.message;
            });
    };

     $scope.updatePatient = function (pat) {

      for (var i = 0; i < $scope.patients.length; i++) {
            var curPat = $scope.patients[i];
            if (curPat.ID === pat.id) {
                pat = curPat;
                break;
            }
        }

        patientsFactory.updatePatient(pat)
          .then(function (response) {
              $scope.status = 'Patients data updated.';
          }, function (error) {
              $scope.status = 'Error: Unable to update patient data' + error.message;
          });
    };
    $scope.deletePatient = function (pat) {
       var id=pat.id;
        patientsFactory.deletePatient(id)
        .then(function (response) {
            $scope.status = 'Patient data deleted succesfully';
                    var index=$scope.patients.indexOf(pat);
                    $scope.patients.splice(index, 1);
        }, function (error) {
            $scope.status = 'Error: Unable to delete patient data: ' + error.message;
        });
    };
}]);
