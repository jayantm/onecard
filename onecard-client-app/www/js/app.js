// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var starterController = angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

starterController.controller("ExampleController", function($scope, $cordovaBarcodeScanner, $cordovaOauth, $http){
  $scope.Scan = function(){
    alert("Scanning !!!");
    $cordovaBarcodeScanner.scan().then(function(imageData){
        alert(imageData.text);
    }, function(error){
        alert("ERror while scanning : " + error);
    });
  };
  $scope.LoginWithGoogle = function(){
    
    try{  
      $cordovaOauth.google("75670157293-8bjfof6jaidmjub049e6424uv6ks5igu.apps.googleusercontent.com", 
          ["email"]).then(function(result){
        var accessToken = result.access_token;
        $http.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + accessToken).then(function(result, data){
          alert("Welcome : " + result.data.email);
        }, function(error){
          alert("Error : " + JSON.stringify(error));
        });
      },function(error){
        alert("ERROR GIAML : " + error);
      });
    }
    catch(Error){
      alert("Eror : " + Error);
    }
  }
  $scope.LoginWithFacebook = function(){
    
    $cordovaOauth.facebook("411152612427103", ["email"]).then(function(result) {
            $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: result.access_token, fields: "email,id,name,gender,location,website,picture,relationship_status", format: "json" }}).then(function(result) {
                var data = result.data;
                alert("Welcome : " + data.email);
            }, function(error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
                console.log(error);
            });
        }, function(error) {
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
        });
  }
});
