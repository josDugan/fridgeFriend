// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  }); 
})

.controller('RecipeController', function($scope, $http) {
  $scope.ingredients = [];
  $scope.recipes = [];
  $scope.url = "";


  $scope.addIngredients = function(ingredients) {
    // take input ingredients from ingredient input, process,
    // add to indredients array, one ingredient per element
    if (ingredients != null) 
        //$scope.ingredients = $scope.ingredients.concat(ingredients.match(/\w/gi));
        $scope.ingredients = $scope.ingredients.concat(ingredients.split(" "));
    console.log($scope.ingredients);
    this.ingredientList = null;
    
    
  };

  $scope.makeUrl = function() {
    // construct url from indredients list
    // http://www.recipepuppy.com/api/?i=
    var url = "http://food2fork.com/api/search?"  + 
        $scope.ingredients.join();
        console.log(url);
        $scope.url = url;
  };

  $scope.databaseCall = function () {
    //$http.jsonp($scope.url);
    //console.log($http.get($scope.url));
    $http({
        method: 'GET',
        url: $scope.url,
        //headers : {'Origin': 'localhost'}
      }).then(function successCallback(response) {
          console.log(response);
          // this callback will be called asynchronously
          // when the response is available
          console.log("hi");
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log(response);
        });
};

  $scope.getRecipes = function(ingredients) {
        $scope.addIngredients(ingredients);
        $scope.makeUrl();
        $scope.databaseCall();
        $scope.makeListOfReturnedRecipes();
  };

  $scope.testJSON = 
       {
        "count": 1, 
        "recipes": [{
        "publisher": "Allrecipes.com",
        "social_rank": 99.81007979198002, 
        "f2f_url": "http://food2fork.com/F2F/recipes/view/29159", 
        "publisher_url": "http://allrecipes.com", 
        "title": "Slow-Cooker Chicken Tortilla Soup", 
        "source_url": "http://allrecipes.com/Recipe/Slow-Cooker-Chicken-Tortilla-Soup/Detail.aspx",
        "page":1},
        {
        "publisher": "Allrecipes.com",
        "social_rank": 99.81007979198002, 
        "f2f_url": "http://food2fork.com/F2F/recipes/view/29159", 
        "publisher_url": "http://allrecipes.com", 
        "title": "Slow-Cooker Chicken Tortilla Soup", 
        "source_url": "http://allrecipes.com/Recipe/Slow-Cooker-Chicken-Tortilla-Soup/Detail.aspx",
        "page":1},
        {
        "publisher": "Allrecipes.com",
        "social_rank": 99.81007979198002, 
        "f2f_url": "http://food2fork.com/F2F/recipes/view/29159", 
        "publisher_url": "http://allrecipes.com", 
        "title": "Slow-Cooker Chicken Tortilla Soup", 
        "source_url": "http://allrecipes.com/Recipe/Slow-Cooker-Chicken-Tortilla-Soup/Detail.aspx",
        "page":1}]
        };

  $scope.JSONData = $scope.testJSON;

  $scope.makeListOfReturnedRecipes = function() {
    for (var recipe of $scope.JSONData["recipes"]) {
      var recipeTitle = recipe["title"];
      var recipeURL = recipe["source_url"];
      $scope.recipes.push({
        title: recipeTitle,
        url: recipeURL
      });
    }
  }

  $scope.clearLists = function() {
    $scope.recipes = [];
    $scope.ingredients = [];
  }

})
