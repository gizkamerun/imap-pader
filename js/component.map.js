/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
function MapCtrl($scope, leafletMarkerEvents, toaster, $log) {
  this.userName = "Example user";
  this.helloText = "Welcome to the GIZ/PADER Map Service";
  this.descriptionText =
    "Please find on the map the activities of the GIZ Cluster Rural Development Project: PADER";

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
      message: "Activity #1",
      focus: true,
    },
    dla: {
      lat: 4.042941,
      lng: 9.706203,
      draggable: false,
      message: "Activity Title #2",
      focus: false,
    },
    ber: {
      lat: 4.577727,
      lng: 13.684441,
      draggable: false,
      message: "Activity Title #3",
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

  $scope.sidebarDetailsOpen = function (event, args) {
    $scope.$emit("eventSidebareUpdate", $scope.lastEvent);
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
        $scope.sidebarDetailsOpen(event, args);
      }
    });
  }
}

angular.module("imap").controller("MapCtrl", MapCtrl);
