var app = angular.module('myApp', []);

app.constant('appConfig', {
	newApiKey: 'ee059aead8cd453b99cef7cb68afb04a',
	newUrlArticle: 'https://newsapi.org/v1/articles?source=the-hindu&sortBy=top'
});

app.factory('fetchtopNews', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
	var topNewsFactory = {};
	var deferred = $q.defer();
	var topNews = function(){
		$http({
			method: 'GET',
			headers: {'X-Api-Key': appConfig.newApiKey},
			url: appConfig.newUrlArticle
		}).then(function(response){
			deferred.resolve(response);

		}, function(error){
			deferred.reject(error);
		});
		return deferred.promise;
	}
	topNewsFactory.topNews = topNews;
	return topNewsFactory;
}]);

app.controller('myCtrl', ['$scope','fetchtopNews', function ($scope, fetchtopNews) {
	$scope.newsList = [];
	$scope.slider = [];
	fetchtopNews.topNews().then(function(res){
		console.log('response', res);
		$scope.newsList.push(res.data);
		$scope.newsArr = res.data.articles;
		$scope.slider = [$scope.newsArr[0], $scope.newsArr[1], $scope.newsArr[2], $scope.newsArr[3]];
		console.log('slider ',$scope.slider);
	}, function(error){

	})
}]);