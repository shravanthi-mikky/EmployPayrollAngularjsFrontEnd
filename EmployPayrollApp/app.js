var app=angular.module("EmployPayrollApp",['ngRoute','ngStorage','ngTouch','ngAnimate','ui.bootstrap']);

 app.config(["$routeProvider",function($routeProvider){

$routeProvider.
when("/Login",{
    templateUrl:"Components/Login/Login.html",
    controller:"loginCtrl"
}).
when("/Register",{
    templateUrl:"Components/Register/Register.html",
    controller:"registerCtrl"
}).
when("/Dashboard",{
    templateUrl:"Components/Dashboard/Dashboard.html",
    controller:"DashboardCtrl"
}).

when("/EmployPage",{
    templateUrl:"Components/EmployPage/EmployPage.html",
    controller:"DashboardCtrl"
}).

when("/UpdateEmploy",{
    templateUrl:"Components/UpdateEmploy/UpdateEmploy.html",
    controller:"DashboardCtrl"
}).

otherwise({
    redirectTo:"/Login"
    });
    }]); 