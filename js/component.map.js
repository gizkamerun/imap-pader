/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
function MapCtrl(
  $scope,
  leafletMarkerEvents,
  toaster,
  $log,
  $http,
  leafletLogger
) {
  this.userName = "Example user";
  this.helloText = "Welcome to the GIZ/PADER Map Service";
  this.descriptionText =
    "Please find on the map the activities of the GIZ Cluster Rural Development Project: PADER";

    var icons = {
      green: {
        type: "div",
        iconSize: [30, 30],
        className: "green",
        iconAnchor: [15, 15],
      },
      red: {
        type: "div",
        iconSize: [30, 30],
        className: "red",
        iconAnchor: [15, 15],
      },
    };

  $scope.center = {
    lat: 3.868987,
    lng: 11.521334,
    zoom: 8,
  };

  $scope.lastEvent = this.lastEvent = {};

  $scope.markers = {
    yde: {
      layer: "coordination",
      lat: 3.868987,
      lng: 11.521334,
      draggable: false,
      message: "Coordination du projet",
      focus: true,
      icon: icons.green,
    },
    baf: {
      layer: "antenna",
      lat: 5.475808,
      lng: 10.421557,
      draggable: false,
      message: "Antenne de projets: ProFINA, ProCISA",
      focus: false,
      icon: icons.red,
    },
    nde: {
      layer: "antenna",
      lat: 7.323871,
      lng: 13.583642,
      draggable: false,
      message: "Antenne de projets: PADER, ProCISA, COTON",
      focus: false,
      icon: icons.red,
    },
    gar: {
      layer: "antenna",
      lat: 9.30707,
      lng: 13.393453,
      draggable: false,
      message: "Antenne de projets: PADER, COTON",
      focus: false,
      icon: icons.red,
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
  leafletLogger.currentLevel = leafletLogger.LEVELS.debug;

  // GeoJson data
  // Get the countries geojson data from a JSON
  // $http.get("js/CMR_Regions.geo.json").success(function (data, status) {
  //   angular.extend($scope, {
  //     geojson: {
  //       data: data,
  //       style: {
  //         fillColor: "teal",
  //         weight: 2,
  //         opacity: 1,
  //         color: "white",
  //         dashArray: "3",
  //         fillOpacity: 0.7,
  //       },
  //     },

  //     events: {
  //       // or just {} //all events
  //       markers: {
  //         enable: ["dragend", "click", "mouseup"],
  //         logic: "emit",
  //       },
  //     },
  //   });
  // });
  angular.extend($scope, {
    layers: {
      baselayers: {
        osm: {
          name: "OpenStreetMap",
          url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          type: "xyz",
        },
      },
      overlays: {
        antenna: {
          type: "group",
          name: "Antenne",
          visible: true,
        },

        coordination: {
          type: "group",
          name: "Coordination",
          visible: true
        },
      },
    },
  });
  // $scope.layers= {
  //                   baselayers: {
  //                       osm: {
  //                       name: 'OpenStreetMap',
  //                       url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  //                       type: 'xyz'
  //                       },
  //                   },
  //                   overlays:{}
  //               }

  $http.get("js/CMR_Regions.geo.json").success(function (data, status) {
    angular.extend($scope.layers.overlays, {
      countries: {
        name: "CM Regions",
        type: "geoJSONShape",
        data: data,
        visible: true,

        layerOptions: {
          style: {
            color: "white",
            fillColor: "teal",
            weight: 2.0,
            opacity: 0.6,
            dashArray: "3",
            fillOpacity: 0.4,
          },
          onEachFeature: onEachFeature,


          events: {
            // or just {} //all events
            // markers: {
            //   enable: ["dragend", "click", "mouseup"],
            //   logic: "emit",
            // },
            // map: {
            //   enable: ["click", "mouseover"],
            //   logic: "emit",
            // },
          },
        },
      },
    });
  });

  // Track Position
  $scope.position = {};

  // $scope.$on("leafletDirectiveMarker.dragend", function (event, args) {
  //   $scope.position.lat = args.model.lat;
  //   $scope.position.lng = args.model.lng;
  // });

  $scope.$on("leafletDirectiveMap.click", function (event, args) {
    //$scope.clicked++;
    $log.info(args.model);

    var leafEvent = args.leafletEvent;

    // $scope.markers.push({
    //   lat: leafEvent.latlng.lat,
    //   lng: leafEvent.latlng.lng,
    //   message: "My Added Marker",
    // });

  });

  // $scope.$on("leafletDirectivePath.mouseover", function (event, path) {
  //   //$scope.position = path.modelName;
  //   console.log(path.modelName);
  // });

  $scope.$on("leafletDirectiveMarker.click", function (event, args) {
    $scope.position.lat = args.model.lat;
    $scope.position.lng = args.model.lng;
    $log.info($scope.position);

    //$scope.center.lat = args.model.lat;
    //$scope.center.lng = args.model.lng;

    $scope.center = angular.copy(args.model);
    //$scope.center.zoom = 7;
  });

  /* $scope.$on(mainMarker1.click, function(event, args){
                $scope.position.lat = mainMarker1.lat;
                $scope.position.lng = mainMarker1.lng;
            }); */
}

function onEachFeature(feature, layer) {
  var l = layer;
  // var popupContent =
  //   "<p>I started out as a GeoJSON " +
  //   feature.geometry.type +
  //   ", but now I'm a Leaflet vector!</p>";
  var currentlayer = angular.copy(layer);
  //console.info(layer);
  var excludeRegions = ["Littoral", "Sud", "Est"],
   RegionsSet1 = ["Extrême - Nord"], // Coton
   RegionsSet2 = ["Nord"], // Pader, Coton
   RegionsSet3 = ["Adamaoua"], // Pader, Procisa, coton
   RegionsSet4 = ["Centre", "Ouest", "Nord - Ouest", "Sud - Ouest"]; // ProFINA, ProCISA

  if (~excludeRegions.indexOf(layer.feature.properties.nom_reg)) {
    // Set Fill color to none
    layer.setStyle({ fillColor: "none" });
    //console.info(layer.feature.properties.nom_reg + '--' + "Color:none");
  }else if (RegionsSet1[0] === layer.feature.properties.nom_reg) {
    // Set Fill color to none
    layer.setStyle({ fillColor: "yellow" });
    // console.info(layer.feature.properties.nom_reg + "--" + "Color:yellow");
  }else if (RegionsSet2[0] === layer.feature.properties.nom_reg) {
    // Set Fill color to none
    layer.setStyle({ fillColor: "teal" });
    // console.info(layer.feature.properties.nom_reg + "--" + "Color:teal");
  }else if (RegionsSet3[0] ===layer.feature.properties.nom_reg ) {
    // Set Fill color to none
    layer.setStyle({ fillColor: "red" });
    // console.info(layer.feature.properties.nom_reg + "--" + "Color:red");
  }else if (RegionsSet4.indexOf(layer.feature.properties.nom_reg > -1)) {
          // Set Fill color to none
          layer.setStyle({ fillColor: "blue" });
          // console.info(layer.feature.properties.nom_reg + "--" + "Color:blue");
        }

  //layer.options.fillColor = "red";
  var popupContent = "<strong> " + feature.properties.nom_reg + "</strong>";

  if (feature.properties && feature.properties.popupContent) {
    popupContent +=
      "<em>" +
      feature.properties.nom_reg +
      "</em>" +
      feature.properties.popupContent;
  }

  layer.bindPopup(popupContent);

  layer.on({
    click: function (e, arg) {
      console.log(layer.feature.properties.nom_reg);
      //$scope.region = layer.feature.properties.nom_reg;
      // console.log("layer_test", e);
      //arg.layer.options.style.fillColor = "red";
      //layer.setStyle({ fillColor: "red" });
    },
    mouseout: function (e, arg) {
      //arg.layer.options.style.fillColor = "red";
      currentlayer.resetStyle(layer);
    },
  });
}

angular.module("imap").controller("MapCtrl", MapCtrl);
