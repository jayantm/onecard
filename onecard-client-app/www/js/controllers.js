angular.module('starter.controllers', ['ionic','ngCordova'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller("LoginController", function($scope, $cordovaBarcodeScanner, $cordovaOauth, $http){
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
