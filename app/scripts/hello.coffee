writer = angular.module('writer',[])
writer.module

writer.controller 'MainCtrl', ($scope) ->
	$scope.pad = "Just start typing over here!"
	pad = $scope.pad
	stats = {}
	$scope.readability = 999
	$scope.check = (e) ->
    # Only recalculate when hitting the 'space' or 'return' keys
    if e.keyCode in [32, 13]
      console.log e.keyCode
      ts = textstatistics($scope.pad)
      $scope.readability = ts.readingEase()
      $scope.bigWords = ts.bigWords();


writer.directive "readability", ->
  ($scope, element, attrs) ->
    attrs.$observe 'readability', (value) ->
      face = switch
             when value > 90 then "&#xe00f;"
             when value > 70 then "&#xe010;"
             when value > 50 then "&#xe011;"
             when value > 30 then "&#xe012;"
             when value > 10 then "&#xe013;"
             when value is undefined then "&#xe00f;"
             else "&#xe014;"

       element.html(face)
