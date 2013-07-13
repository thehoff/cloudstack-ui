angular.module('directives.confirm', ['ui.bootstrap.dialog']);
angular.module('directives.confirm').directive('confirm',['$dialog', function($dialog){
    return{
        restrict: 'E',
        transclude: true,
        template: '<span ng-transclude></span>',
        link: function(scope, element, attrs){
            element.css('cursor', 'pointer');
            element.bind('click', function(){
                var message = attrs.message || 'Are you sure?';
                var action = attrs.action;
                var msgbox = $dialog.messageBox(action, message, [{label:'Yes, I\'m sure', result: 'yes'},{label:'Nope', result: 'no'}]);
                scope.$apply(function(){
                    msgbox.open().then(function(result){
                        if(result === 'yes'){
                            if(attrs.onok) scope.$eval(attrs.onok);
                        }
                        if(result === 'no'){
                            if(attrs.oncancel) scope.$eval(attrs.oncancel);
                        }
                    });
                });
            });
        },
    }
}]);
