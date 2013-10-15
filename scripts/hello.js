(function() {
  var writer;

  writer = angular.module('writer', []);

  writer.module;

  writer.controller('MainCtrl', function($scope) {
    var pad, stats;
    $scope.pad = "Just start typing over here!";
    pad = $scope.pad;
    stats = {};
    $scope.readability = 999;
    return $scope.check = function(e) {
      var ts;
      if (e.keyCode === 32) {
        ts = textstatistics($scope.pad);
        $scope.readability = ts.readingEase();
        return $scope.bigWords = ts.bigWords();
      }
    };
  });

  writer.directive("readability", function() {
    return function($scope, element, attrs) {
      return attrs.$observe('readability', function(value) {
        var face;
        face = (function() {
          switch (false) {
            case !(value > 90):
              return "&#xe00f;";
            case !(value > 70):
              return "&#xe010;";
            case !(value > 50):
              return "&#xe011;";
            case !(value > 30):
              return "&#xe012;";
            case !(value > 10):
              return "&#xe013;";
            case value !== void 0:
              return "&#xe00f;";
            default:
              return "&#xe014;";
          }
        })();
        return element.html(face);
      });
    };
  });

}).call(this);
