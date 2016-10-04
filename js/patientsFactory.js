angular.module('patientsApp')
    .factory('patientsFactory', ['$http', function($http) {

    var baseUrl = 'https://izenda.herokuapp.com/patients';
    var patientsFactory = {};

    patientsFactory.getPatients = function () {

        return $http.get(baseUrl);
    };

    patientsFactory.getPatient = function (id) {
        return $http.get(baseUrl + '/' + id);
    };

    patientsFactory.createPatient = function (pat) {
        return $http.post(baseUrl, pat);
    };

    patientsFactory.updatePatient = function (pat) {
        return $http.put(baseUrl + '/' + pat.id, pat)
    };

    patientsFactory.deletePatient = function (id) {
        return $http.delete(baseUrl + '/' + id);
    };


    return patientsFactory;
}]);
