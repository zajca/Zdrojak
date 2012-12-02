'use strict';

/* Directives */

/**
 * <inline value='page.text' action='updateDb()'/>
 */
zdrojak.directive('inline', function(){
  var KEY_CODE_ENTER = 13;
  return {
    restrict: 'E',
    replace: true,
    scope: {
      action: '=action',
      value: '=value'
    },
    template: 
      '<div>' +
        '<span ng-hide="mode">{{value}}</span>' +
        '<input type="text" ng-show="mode" ng-model="value" required>' +
      '</div>',
    link: function(scope, element) {
      var children = element.children();
      var span  = angular.element(children[0]);
      var input = angular.element(children[1]);
      
      //puvodni obsah
      var oldContent;
      
      //zmenit editaci na text a zavolat akci po editaci
      function send() {
        var newContent = element.text().trim();
        if (newContent) {
          scope.$apply('mode=false');    
        }
        if (newContent !== oldContent) {
          scope.action();  
        }    
      }
      
      //ztrata focusu, ulozit zmenu
      input.bind('blur', function(e){
        if (!scope.mode) return;
        send();
      });
      
      //uzivatel kliknul na enter, ulozit zmenu
      input.bind('keypress', function(e){
        if (!scope.mode) return;
        if (e.charCode === KEY_CODE_ENTER) {
          send();       
        }   
      });
      
      //po kliknuti na text zobrazit input pro editaci
      span.bind('click', function(el){
        oldContent = element.text().trim();
        scope.$apply('mode=true');
        element.children()[1].focus();
      });
    }
  }
});