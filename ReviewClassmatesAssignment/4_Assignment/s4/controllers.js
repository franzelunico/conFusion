"use strict";
angular.module("confusionApp")

        .controller("MenuController",['$scope', 'menuFactory', function(scope, menuFactory){
            scope.showDetails = true;            
            scope.dishes =  {};
            scope.showMenu = false;
            scope.message = "Lading ...";
            /*menuFactory.getDishes().then(
                function(response){
                    scope.dishes = response.data;
                    scope.showMenu = true;
                },
                function(response){
                    scope.message = "Error: "+response.status+" "+response.statusText;
                }
              );*/
              
              scope.dishes = menuFactory.getDishes().query(
                      function(response){
                        scope.dishes = response;
                        scope.showMenu = true;
                    },
                    function(response){
                        scope.message = "Error: "+response.status+" "+response.statusText;
                    }
                );
                    scope.tab = 1;

                    scope.filtText = '';

                    scope.select = function (tabindex){
                        scope.tab = tabindex;

                         if (scope.tab === 2){
                            scope.filtText = "appetizer";
                         }
                        else if (scope.tab === 3){
                          scope.filtText = "mains";
                        }
                        else if (scope.tab === 4){
                          scope.filtText = "dessert";
                        }
                        else{
                            scope.filtText = "";
                        }
                            
                    };

                    scope.isSelected = function(selectedTab){
                        return (selectedTab === scope.tab);
                    };

                    scope.toggleDetails = function(){
                      scope.showDetails = !scope.showDetails;
                    };
                    
        }])

        .controller('DishDetailController', ['$scope', 'menuFactory','$stateParams',function(scope, menuFactory, $stateParams){
            scope.sortByText = "";
            scope.dish = {};
            scope.showDish = false;
            scope.message="Loading ...";
            /*menuFactory.getDish(parseInt($stateParams.id)).then(
                function(response){
                  scope.dish = response.data; 
                  scope.showDish=true;
                },
                function(response) {
                    scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );*/

            scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id)}).$promise.then(
                  function(response){
                  scope.dish = response; 
                  scope.showDish=true;
                },
                function(response) {
                    scope.message = "Error: "+response.status + " " + response.statusText;
                }
              );
        }])

        .controller('DishCommentController', ['$scope','menuFactory', function(scope,menuFactory) {
            
            scope.formRateObject = {name:"", rating:"5", comment:""};

            scope.ratings = [{value:"1", label:"1"},
                              {value:"2", label:"2"},
                              {value:"3", label:"3"},
                              {value:"4", label:"4"},
                              {value:"5", label:"5"}];

            
            scope.submitComment = function () {
                
                //Step 2: This is how you record the date
                scope.formRateObject.date = new Date().toISOString();
                
                // Step 3: Push your comment into the dish's comment array
                scope.dish.comments.push({rating: parseInt(scope.formRateObject.rating),
                                   comment:scope.formRateObject.comment,
                                   author:scope.formRateObject.name,
                                   date:scope.formRateObject.date});

                menuFactory.getDishes().update({id:scope.dish.id},scope.dish);
                
                //Step 4: reset your form to pristine
                scope.commentForm.$setPristine();
                
                //Step 5: reset your JavaScript object that holds your comment
                scope.formRateObject = {name:"", rating:"5", comment:""};
            };
        }])


        .controller("ContactController", ['$scope', function(scope){
              scope.feedback = {mychannel:"", firstName:"", lastName:"",
                               agree:false, email:"" };

              var channels = [{value:"tel", label:"Tel."},{value:"email", label:"Email"}];

              scope.channels = channels;
              scope.invalidChannelSelection = false;

        }])


        .controller("FeedbackController", ['$scope', 'feedbackFactory', function(scope,feedbackFactory){
                    scope.sendFeedback = function() {
                                console.log(scope.feedback);
                                if (scope.feedback.agree && (scope.feedback.mychannel === "")&& !scope.feedback.mychannel) {
                                  scope.invalidChannelSelection = true;
                                  console.log('incorrect');
                                }
                                else {
                                      scope.invalidChannelSelection = false;
                                      feedbackFactory.getFeedBacks().save(scope.feedback);

                                      scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                                         agree:false, email:"" };
                                      scope.feedback.mychannel="";

                                      scope.feedbackForm.$setPristine();
                                      console.log(scope.feedback);
                                    }
                            };
        }])
      
        .controller("IndexController", ['$scope','menuFactory','corporateFactory', function(scope,menuFactory,corporateFactory){
            scope.promotions = {};
            scope.featuredDish = {};
            scope.specialists = {};
            scope.showDish = false;
            scope.showPromotions = false;
            scope.showLeader = false;
            scope.message="Loading ...";
            scope.messagePromotion="Loading ...";
            scope.messageLeadership="Loading ...";
           /* menuFactory.getDish(0).then(
                function(response){
                  scope.featuredDish = response.data;
                  scope.showDish = true;
                  },
                  function(response) {
                      scope.message = "Error: "+response.status + " " + response.statusText;
                  }
            );*/

            menuFactory.getPromotions().get({id:0}).$promise.then(function(response){
                    scope.promotions = response;
                    scope.showPromotions = true;
                  },
                  function(response) {
                      scope.messagePromotion = "Error: "+response.status + " " + response.statusText;
                  });

            scope.featuredDish = menuFactory.getDishes().get({id:0}).$promise.then(function(response){
                  scope.featuredDish = response;
                    scope.showDish = true;
                  },
                  function(response) {
                      scope.message = "Error: "+response.status + " " + response.statusText;
                  });


                  corporateFactory.getLeaders().get({id:3}).$promise.then(function(response){
                    scope.specialists = response;
                    scope.showLeader = true;
                  },
                  function(response){
                    scope.messageLeadership = "Error: "+response.status + " " + response.statusText;
                  });
        }])


        .controller("AboutController", ['$scope','corporateFactory', function(scope,corporateFactory){
            scope.showLeaders = false;
            scope.message="Loading ...";
            corporateFactory.getLeaders().query(
                      function(response){
                        scope.leaders = response;
                        scope.showLeaders = false;
                    },
                    function(response){
                        scope.message = "Error: "+response.status+" "+response.statusText;
                    }
                );
        }]);