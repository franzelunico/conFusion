'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading...";
            $scope.dishes= {};
            menuFactory.getDishes().query( function(response){
              $scope.showMenu = true;
              $scope.dishes= response;

            },function(response){

              $scope.message = "ERR: "+response.status+ " " + response.statusText;
            });




            $scope.select = function(setTab) {
                $scope.tab = setTab;

                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };

            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

            $scope.channels = channels;
            $scope.invalidChannelSelection = false;

        }])

        .controller('FeedbackController', ['$scope','feedbackFactory', function($scope, feedbackFactory) {

            $scope.sendFeedback = function() {

                console.log($scope.feedback);

                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;

                    feedbackFactory.getFeedback().update({id:$scope.feedback.id},$scope.feedback);

                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

                    $scope.feedback.mychannel="";

                    $scope.feedbackForm.$setPristine();

                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {


            $scope.showDish = false;
            $scope.message = "Loading...";
            $scope.dish=
            menuFactory.getDishes().get({id:parseInt($stateParams.id,10)}).$promise.then(function(response){
              $scope.showDish = true;
              $scope.dish= response;

            },function(response){

              $scope.message = "ERR: "+response.status+ " " + response.statusText;
            });





        }])

        .controller('DishCommentController', ['$scope', 'menuFactory',function($scope,menuFactory) {

          $scope.comment = {
            rating: "5",
            comment: "",
            author: "",
            date: ""
          };

          $scope.submitComment = function () {

            //Step 2: This is how you record the date
            //"The date property of your JavaScript object holding the comment" = new Date().toISOString();
            $scope.comment.date = new Date().toISOString();
            // Step 3: Push your comment into the dish's comment array
            $scope.dish.comments.push($scope.comment);
            //step 3.1 adding the comment to server side
            menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
            //Step 4: reset your form to pristine
            $scope.commentForm.$setPristine();

            console.log($scope.dish);
            //Step 5: reset your JavaScript object that holds your comment
            $scope.comment = {
              author: "",
              rating: "5",
              comment: "",
              date:""
            };
          };
        }])


        .controller('IndexController', ['$scope', 'corporateFactory', 'menuFactory', function($scope, corporateFactory, menuFactory){

          $scope.showMain = false;
          $scope.message = "Loading...";

            $scope.mainDish = {};
            menuFactory.getDishes().get({id:1})
            .$promise.then(function(response){
                $scope.showMain = true;
                $scope.mainDish= response;

              },function(response){

                $scope.message = "ERR: "+response.status+ " "+ response.statusText;
              }

            );

            $scope.promotion = {};
            $scope.showPromotions = false;
            $scope.message = "Loading...";
            menuFactory.getPromotion().get({id:0})
            .$promise.then(function(response){
                $scope.showPromotions = true;
                $scope.promotion= response;

              },function(response){

                $scope.message = "ERR: "+response.status+ " "+ response.statusText;
              }

            );
            $scope.chef = {};
            corporateFactory.getLeaders().get({id:0})
            .$promise.then(function(response){
                $scope.showLeaders = true;
                $scope.chef= response;

              },function(response){

                $scope.message = "ERR: "+response.status+ " "+ response.statusText;
              }

            );
        }])

        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory){
            $scope.leaders = {};
            $scope.showLeaders = false;
            $scope.message = "Loading...";
            corporateFactory.getLeaders().query( function(response){
            $scope.showLeaders = true;
            $scope.leaders= response;

            },function(response){

              $scope.message = "ERR: "+response.status+ " " + response.statusText;
            });
        }])

;
