angular.module("storage", ["resources.volumes", "resources.snapshots", "services.breadcrumbs"]).
config(['$routeProvider', function($routeProvider){
    $routeProvider.
    when('/volumes',{
        controller: 'VolumesListCtrl',
        templateUrl: '/static/js/app/storage/storage.tpl.html',
        resolve: {
            volumes: function(Volumes){
                return Volumes.getAll();
            }
        }
    }).
    when('/snapshots', {
        controller: 'SnapshotsListCtrl',
        templateUrl: 'table.html',
        resolve:{
            snapshots: function(Snapshots){
                return Snapshots.getAll();
            }
        }
    })
}]);

angular.module("storage").controller("VolumesListCtrl", ["$scope", "$location", "volumes", "Breadcrumbs", function($scope, $location, volumes, Breadcrumbs){
    Breadcrumbs.refresh();
    Breadcrumbs.push('Volumes', '/#/volumes');
    $scope.collection = volumes;
    $scope.view = 'volumes';
    $scope.toDisplay = ['name', 'type', 'hypervisor', 'vmdisplayname'];

    $scope.$watch('view', function(newVal, oldVal){
        if(newVal === oldVal) return;
        if(newVal === 'volumes') return;
        else $location.path('/snapshots');
    });
}]);

angular.module("storage").controller("SnapshotsListCtrl", ["$scope", "$location", "snapshots", "Breadcrumbs", function($scope, $location, snapshots, Breadcrumbs){
    Breadcrumbs.refresh();
    Breadcrumbs.push('Snapshots', '/#/snapshots');
    $scope.collection = snapshots;
    $scope.view = "snapshots";
    $scope.toDisplay = ['volumename', 'intervaltype', 'created', 'state'];

    $scope.$watch('view', function(newVal, oldVal){
        if(newVal === oldVal) return;
        if(newVal === 'snapshots') return;
        else $location.path('/volumes');
    });
}]);
