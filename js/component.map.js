/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
function MapCtrl($scope, leafletMarkerEvents, toaster, $log) {
  this.userName = "Example user";
  this.helloText = "Welcome in SeedProject";
  this.descriptionText =
    "It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.";

  $scope.center = {
    lat: 3.868987,
    lng: 11.521334,
    zoom: 8,
  };

  $scope.lastEvent = this.lastEvent = {};

  $scope.markers = {
    yde: {
      lat: 3.868987,
      lng: 11.521334,
      draggable: false,
      message: "PADER Activity #1",
      focus: true,
    },
    dla: {
      lat: 4.042941,
      lng: 9.706203,
      draggable: false,
      message: "PADER Activity #2",
      focus: false,
    },
    ber: {
      lat: 4.577727,
      lng: 13.684441,
      draggable: false,
      message: "PADER Activity #3",
      focus: false,
    },
    gar: {
      lat: 9.30707,
      lng: 13.393453,
      draggable: false,
      message: "PADER Activity #4",
      focus: false,
    },
  };

  $scope.events = {
    markers: {
      enable: leafletMarkerEvents.getAvailableEvents(),
    },
  };

  // Toaster 
   $scope.demoToastr = function (title = "", msg = "") {
     toaster.pop({
       type: "info",
       title: title,
       body: "notification box:" + msg,
       showCloseButton: true,
       timeout: 3000,
     });
   };

  $scope.eventDetected = "No events yet...";
  var markerEvents = leafletMarkerEvents.getAvailableEvents();
  for (var k in markerEvents) {
    var eventName = "leafletDirectiveMarker." + markerEvents[k];
    var vm = this;
   
    $scope.$on(eventName, function (event, args) {
      $scope.eventDetected = event.name;
      $scope.lastEvent = vm.lastEvent = event;
      if (event.name === "leafletDirectiveMarker.click") {
        console.info("Last CLICK Event", $scope.lastEvent);
        vm.currentActivity = args.model;
        $log.debug(args.model);
        $scope.demoToastr(args.model.message, event.name);
      }
    });
  }
}

angular.module("imap").controller("MapCtrl", MapCtrl);
