/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/index/map");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider

      .state("index", {
        abstract: true,
        url: "/index",
        templateUrl: "views/common/content.html",
      })
      .state("index.main", {
        url: "/main",
        templateUrl: "views/main.html",
        data: { pageTitle: "Example view" },
      })
      .state("index.minor", {
        url: "/minor",
        templateUrl: "views/minor.html",
        data: { pageTitle: "Example view" },
      })
      .state("index.map", {
        url: "/map",
        templateUrl: "views/map.html",
        data: { pageTitle: "Carte PADER" },
      })
      .state("index.aboutapp", {
        url: "/aboutapp",
        templateUrl: "views/aboutapp.html",
        data: { pageTitle: "A Propos" },
      })
      .state("index.aboutgizpader", {
        url: "/aboutgizpader",
        templateUrl: "views/aboutgizpader.html",
        data: { pageTitle: "GIZ/PADER" },
      })
      .state("index.legal", {
        url: "/legal",
        templateUrl: "views/legal.html",
        data: { pageTitle: "Mentions legales" },
      });
}
angular
    .module('imap')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
