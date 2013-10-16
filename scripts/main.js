(function() {
  var writer;

  console.log("Listen, the code is probably crap by your standards. But our CEO wrote it, not our engineering team. So give us a break. And hey, think you can do better? We are hiring. hello@dobt.co");

  writer = angular.module('writer', []);

  writer.controller('MainCtrl', function($scope) {
    var stats;
    $scope.pad = "";
    stats = {};
    $scope.readability = 999;
    return $scope.check = function(e) {
      var ts, _ref;
      if ((_ref = e.keyCode) === 32 || _ref === 13) {
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
