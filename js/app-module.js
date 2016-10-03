'use strict';

angular.module('patientsApp',['ngRoute'])
	.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl:'view/patientsList.html',
		controller: 'patientsCtrl'
	})
	.when('/create',{
		templateUrl:'view/create-patient.html',
		controller:'patientsCtrl'
	})
	}
	.when('/:id',{
		templateUrl:'view/patient-view.html',
		controller:'patientsCtrl'
	})
	.when('/:id/update',{
		templateUrl:'view/update-patient.html',
		controller: 'patientsCtrl'
		method:'update'
	})
	.when('/:id/delete',{
		templateUrl:'view/delete-patient.html',
		controller: 'patientsCtrl'
		method:'delete'
	})
	.when('/deleteall',{
		templateUrl:'view/deleteall',
		controller:'patientsCtrl',
		method:'deleteAll'
	})
    .otherwise({
		redirectTo:'/'
	});
	});

}]);
