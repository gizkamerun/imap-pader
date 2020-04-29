/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
function MainCtrl($scope, $rootScope) {
  this.userName = "Example user";
  this.helloText = "Welcome in SeedProject";
  this.descriptionText =
    "It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.";
 this.currentActivity = {};
 this.rightSidebarIsOpen = false; 
 this.detailsVM = {}; 
 var vm = this; 
  $scope.mainData = {
    logs: "",
  };

  $scope.$on("eventSidebareUpdate", function (event, data) {
      
      vm.currentActivity = vm.detailsVM =  data.model;
    $scope.mainData.logs =
      $scope.mainData.logs +
      '\nMainController - receive EVENT "' +
      event.name +
      '" with message = "' +
      data.message +
      '"';
  });

  $rootScope.$on("eventSidebareUpdate", function (event, data) {
    console.debug($rootScope.rightSidebar);
    if ($rootScope.rightSidebar === "undefined") {
      $rootScope.rightSidebar = !$rootScope.rightSidebar;
    }
    $scope.mainData.logs =
      $scope.mainData.logs +
      '\n$rootScope - receive EVENT "' +
      event.name +
      '" with message = "' +
      data.message +
      '"';
  });
};


angular.module("imap")
    .controller("MainCtrl", MainCtrl);