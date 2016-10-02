angular.module('patientsApp', [])
.controller('patientsCtrl', function($scope, $http) {
    $http.get('https://izenda.herokuapp.com/patients').
        then(function(response) {
         $scope.patients = response.data;
        });
}); /*
angular.module('patientsApp',[])
    .controller('patientsCtrl', ['$scope', 'patientsFactory',
        function ($scope, patientsFactory) {
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
    }
	$scope.getPatient = function (id) {
        var pat;
        for (var i = 0; i < $scope.patients.length; i++) {
            var curPat = $scope.patients[i];
            if (curPat.ID === id) {
                pat = curPat;
                break;
            }
        }

        patientsFactory.getPatient(pat)
          .then(function (response) {
              $scope.patients=response.data;
          }, function (error) {
              $scope.status = 'Error: Unable to retrieve patients data' + error.message;
          });
    };

    $scope.createPatient = function () {

        var pat = {

        };
		// write code to take input of patient data  from user
        patientsFactory.createPatient(pat)
            .then(function (response) {
                $scope.status = 'Created new patient record';
                $scope.patients.push(pat);
            }, function(error) {
                $scope.status = 'Error: Unable to create new patient' + error.message;
            });
    };
     $scope.updatePatient = function (id) {
        var pat;
        for (var i = 0; i < $scope.patients.length; i++) {
            var curPat = $scope.patients[i];
            if (curPat.ID === id) {
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
    $scope.deletePatient = function (id) {
        patientsFactory.deletePatient(id)
        .then(function (response) {
            $scope.status = 'Patient data deleted succesfully';
            for (var i = 0; i < $scope.patients.length; i++) {
                var pat = $scope.patients[i];
                if (pat.ID === id) {
                    $scope.patients.splice(i, 1);
                    break;
                }
            }

        }, function (error) {
            $scope.status = 'Error: Unable to delete patient data: ' + error.message;
        });
    };
}]);
*/
