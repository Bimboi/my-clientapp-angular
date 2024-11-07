var app = angular.module('myApp', []);

app.controller('MainController', function($scope, $http) {
    const apiUrl = 'http://localhost:8080/api/v1';
    // http://localhost:8080/myapi
    // http://localhost:7001/employee-weblogic/myapi

    // Fetch initial items from the API
    $http.get(apiUrl + '/books').then(function(response) {
        // $scope.items = response.data;
        $scope.employees = [{name : "venz", company_id:"123123",age:18}
            ,{name : "venz", company_id:"123123",age:21}];
            console.log($scope.employees);
    });

    // Add a new employee
    $scope.addEmployee = function() {
        if ($scope.newEmployee) {
            const newEmployee = { name: $scope.newItem, completed: false };
            $http.post(apiUrl, newItem).then(function(response) {
                $scope.items.push(response.data);
                $scope.newItem = ''; // Clear input field
            });
        }
    };

    // Edit an item
    $scope.editItem = function(employee) {
        employee.isEditing = true;
    };

    // Save an edited item
    $scope.saveItem = function(employee) {
        $http.put(apiUrl + '/book' + item.book_id, item).then(function(response) {
            employee.isEditing = false;
        });
    };

    // Delete an item
    $scope.deleteItem = function(employee) {
        $http.delete(apiUrl + '/' + item.book_id).then(function(response) {
            const index = $scope.items.indexOf(item);
            if (index > -1) {
                $scope.employee.splice(index, 1);
            }
        });
    };
});