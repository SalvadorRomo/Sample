var app = angular.module('AngularGoogleMap', ['uiGmapgoogle-maps']);

app.controller('MapCtrl', ['$scope', function ($scope) {

	$scope.map = {
		center: {
			latitude: 20.6301,
			longitude: -103.252
		}, 
		zoom: 15,
		draggable: false,
		options : {
			scrollwheel: false,
		},
		control: {},
		events: {
	        dragend: function (marker, eventName, args) {
		          $log.log('marker dragend');
		          var lat = marker.getPosition().lat();
		          var lon = marker.getPosition().lng();
		          $log.log(lat);
		          $log.log(lon);

		          $scope.marker.options = {
		            draggable: true,
		            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
		            labelAnchor: "100 0",
		            labelClass: "marker-labels"
		          };
	        }
    	}

	};
	
	$scope.marker = {
		id: 0,
      coords: {
			latitude: 20.6301,
			longitude: -103.252
      },
      options: { draggable: true },

	};



	$scope.$watchCollection("marker.coords", function (newVal, oldVal) {
      if (_.isEqual(newVal, oldVal))
        return;
    	console.log("$scope.$watchCollection");
      	console.log(newVal);
      console.log($scope.marker.coords);
    });




}]);