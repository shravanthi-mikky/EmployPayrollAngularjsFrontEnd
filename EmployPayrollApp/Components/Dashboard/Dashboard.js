

app.component('noteList', {
    templateUrl: "Components/AddNotes/addNotes.html",
  
  }).controller("DashboardCtrl", function ($scope, $http,$uibModal,$window,$location) {
  var SingleEmploy = [];
  var EmployeeIdOfSingle = 0;
    var token = $window.localStorage.getItem("token");
    let headersConfig = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }

    $scope.getAllEmployees = function () {
        $http.get("https://localhost:44327/api/Employ/Get", headersConfig)
          .then((response1) => {
            console.log(response1.data.response);
            $scope.AllEmployeesArray = response1.data.response;
          }, (error) => {
            console.log(error)
        } )
    }

    $scope.ExportEmployeesData = function () {
        $http.post("https://localhost:44327/api/Employ/Export", headersConfig)
          .then((response1) => {
            console.log(response1);
          }, (error) => {
            console.log(error)
        } )
    }

    //Export as pdf one

    $scope.ExportAsPdf = function () {
        html2canvas(document.getElementById('tblCustomers'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500
                    }]
                };
                pdfMake.createPdf(docDefinition).download("Table.pdf");
            }
        });
    }

    $scope.exportData = function () {
        var blob = new Blob([document.getElementById('export').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Employeereport.xls");
    };

    // get employ by Id
    //GetEmployById(employ.EmployeeId)
    $scope.GetEmployById = function (EmployeeId) {
        $scope.EmployeeId=EmployeeId;
        console.log($scope.EmployeeId);
        $http.get(`https://localhost:44327/api/Employ/GetEmployById?employId=${EmployeeId}`, headersConfig)
          .then((response1) => {
            console.log(response1);
            if(response1){
                SingleEmploy = response1.data.response;
                console.log("Single employee");
                console.log(SingleEmploy);
                $scope.employeeId=response1.data.response.employeeId;
                $scope.name=response1.data.response.name;
                $scope.profile=response1.data.response.profile;
                $scope.gender=response1.data.response.gender;
                $scope.department=response1.data.response.department;
                $scope.salary=response1.data.response.salary;
                $scope.startDate=response1.data.response.startDate;
            }
            
          }, (error) => {
            console.log(error)
        } )
    }

    //Delete Employee
    $scope.DeleteEmploy = function (EmployeeId) {
        $scope.EmployeeId=EmployeeId;
        console.log($scope.EmployeeId);
        $http.delete(`https://localhost:44327/api/Employ/Delete?EmployID=${EmployeeId}`, headersConfig)
          .then((response1) => {
            console.log(response1);
            if(response1){
                console.log(response1);
                window.location.reload();
            } 
          }, (error) => {
            console.log(error)
        } )
    }

    //Update
    $scope.UpdateEmploy= function (name,profile,gender,department,salary,startDate) {
        var data={
            employeeId:$scope.EmployeeIdOfSingle,
            name:name,
            profile:profile,
            gender:gender,
            department:department,
            salary:salary,
            startDate:startDate
        }

        $http.put("https://localhost:44327/api/Employ/Update" ,JSON.stringify(data), headersConfig)
          .then((response1) => {
            console.log(response1);
            if(response1){
                SingleEmploy = response1.data.response;
                console.log("Single employee");
                console.log(SingleEmploy);
                $location.path('/Dashboard');
            }
            
          }, (error) => {
            console.log(error)
        } )
    }    
    //Add Employee
    $scope.AddEmploy = function (name,profile,gender,department,salary,startDate) {
        var data={
            name:name,
            profile:profile,
            gender:gender,
            department:department,
            salary:salary,
            startDate:startDate
        }
        $http.post("https://localhost:44327/api/Employ/AddEmployee",JSON.stringify(data), headersConfig)
          .then((response1) => {
            console.log(response1);
            if(response1){
                $location.path('/Dashboard');
            }
            
          }, (error) => {
            console.log(error)
        } )
    }


    //Edit with popup part

    $scope.EditEmp=function(employeeId,name,gender,department,profile,salary,startDate){
        var data={
            employeeId:employeeId,
            name:name,
            profile:profile,
            gender:gender,
            department:department,
            salary:salary,
            startDate:startDate
        }

        //call the service
        $http.put("https://localhost:44327/api/Employ/Update" ,JSON.stringify(data), headersConfig)
        .then(function(response){
            console.log(response);
      
            if(response.data){
                $scope.message="Employee Updated Successfully";
                $scope.firstName=response.data.firstName;
                $scope.lastName=response.data.lastName;
                $scope.email=response.data.email;
                $scope.password=response.data.password;
                $scope.password=response.data.designation;

            }
        },function(error){
            console.log(error)
        })
      };
      
      $scope.editmodal = function (employeeId,name,gender,department,profile,salary,startDate) {
    
        user = {
            employeeId:employeeId,
            name:name,
            profile:profile,
            gender:gender,
            department:department,
            salary:salary,
            startDate:startDate
       }
         $scope.modalInstance = $uibModal.open({
           ariaLabelledBy: 'modal-title',
           ariaDescribedBy: 'modal-body',
           templateUrl: 'Components/Dashboard/Editemp.html',
           controller: 'empeditController',
           controllerAs: '$ctrl',
           size: 'md',
           resolve: {
             user: function () {
               return user;
             }
           }
         });
     
       }
});  

app.controller("empeditController", function ($scope, $uibModalInstance,$window,$location) {
    $scope.employeeId=user.employeeId;
    $scope.name = user.name;
    $scope.profile = user.profile;
    $scope.department = user.department;
    $scope.gender = user.gender;
    $scope.salary = user.salary;
    $scope.startDate = user.startDate;
    $scope.cancelModal = function () {
      console.log("cancelmodal");
      $uibModalInstance.dismiss('close');
    }
    $scope.ok = function () {
        window.location.reload();
      $uibModalInstance.close('save');
  
    }
  
  });