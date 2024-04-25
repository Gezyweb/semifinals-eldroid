var app = angular.module("app", []);

app.controller("ctrl", function($scope, $http) {
  // Fetch students data from the API
  $http({
	url: 'http://localhost:4321/api/students',
	method: 'GET'
  }).then(function(response) {
	$scope.students = response.data;
  });

  // Function to handle login
  $scope.login = function() {
	var formData = {
	  username: $scope.username,
	  password: $scope.password
	};

	$http.post("/login", formData)
	  .then(function(response) {
		if (response.data.success) {
		  window.location.href = "index.html";
		} else {
		  alert("Invalid username or password");
		}
	  });
  };
});