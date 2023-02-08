var app=angular.module("EmployPayrollApp",['ngRoute','ngStorage'/* ,'ngTouch','ngAnimate','ui.bootstrap' */]);

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
    templateUrl:"Components/DashBoard/Dashboard.html",
    controller:"DashboardCtrl"
}).

otherwise({
    redirectTo:"/Login"
    });
    }]); 