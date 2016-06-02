var findBand = function(array,id){
  for(var i = 0, m = null; i < array.length; ++i) {
    if(array[i].id == id) {
      return array[i];
    break;
    };
  };
};

(function(){
  var ENDPOINT = "data/bands.json";
  var app = angular.module('bandsModule',['ngRoute']);
  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/showBands/:bandId', {templateUrl: 'templates/show.html', controller: 'showController'}).
        when('/home',{templateUrl:'templates/home.html',controller:'indexController'})
     }]);

  app.directive('bandDirective', function(){
    return{
      restrict: 'AE',
      replace: true,
      templateUrl: 'components/card.html'
    };
  });

  app.controller('indexController',function($scope,$http){
    $http.get(ENDPOINT).then(function(res){$scope.bands = res.data});

  });

  app.controller('showController', function($scope,$routeParams,$http){
    $scope.band_id = $routeParams.bandId;
    $http.get(ENDPOINT).then(function(res){
      $scope.band = findBand(res.data,$scope.band_id);
    });
  });

})();
