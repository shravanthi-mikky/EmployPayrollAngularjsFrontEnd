app.component('noteList', {
    templateUrl: "Components/AddNotes/addNotes.html",
  
  }).controller("DashboardCtrl", function ($scope, $http, $window, $uibModal) {
  
    var token = $window.localStorage.getItem("token");
    let headersConfig = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }

    $scope.getAllTheNotes = function () {
        $http.get("https://localhost:44340/api/Note/byUserid", headersConfig)
          .then((response1) => {
            console.log(response1.data);
            $scope.AllNotesArray = response1.data;
          }, (error) => {
            console.log(error)
          })
        }
    }
);  