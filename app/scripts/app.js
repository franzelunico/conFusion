'use strict';
angular.module('confusionApp', [])
        .controller('DishDetailController', ['$scope', function($scope) {

            $scope.dish={
                          name:'Uthapizza',
                          image: 'images/uthapizza.png',
                          category: 'mains', 
                          label:'Hot',
                          price:'4.99',
                          description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
                           comments: [
                               {
                                   rating:5,
                                   comment:"Imagine all the eatables, living in conFusion!",
                                   author:"John Lemon",
                                   date:"2012-10-16T17:57:28.556094Z"
                               },
                               {
                                   rating:4,
                                   comment:"Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
                                   author:"Paul McVites",
                                   date:"2014-09-05T17:57:28.556094Z"
                               },
                               {
                                   rating:3,
                                   comment:"Eat it, just eat it!",
                                   author:"Michael Jaikishan",
                                   date:"2015-02-13T17:57:28.556094Z"
                               },
                               {
                                   rating:4,
                                   comment:"Ultimate, Reaching for the stars!",
                                   author:"Ringo Starry",
                                   date:"2013-12-02T17:57:28.556094Z"
                               },
                               {
                                   rating:2,
                                   comment:"It's your birthday, we're gonna party!",
                                   author:"25 Cent",
                                   date:"2011-12-02T17:57:28.556094Z"
                               }
                               
                           ]
                    };
            
            $scope.filtText = '';
            $scope.getOrder = function(){
                    var list_order = ["author","date","rating","-author","-date","-rating"];
                    var found = "";
                    var a = list_order.indexOf($scope.filtText);
                    if(a > -1){
                        found= list_order[a];
                    }else{
                        found= "";
                    }
                    return found;
            };
            $scope.ratingSelect=5;
            $scope.newComment = {
                rating:$scope.ratingSelect,
                comment:"",
                author:"",
                date:""
            };
        }])

        .controller('DishCommentController', ['$scope', function($scope) {
            $scope.submitComment = function() {

                console.log($scope.newComment);

                if ( ($scope.newComment.comment !== "") && $scope.newComment.author !== "") {
                    console.log('incorrect');
                    $scope.newComment.date=new Date();
                    $scope.dish.comments.push($scope.newComment);
                    $scope.commentForm.$setPristine();

                    $scope.newComment = {
                        rating:$scope.ratingSelect,
                        comment:"",
                        author:"",
                        date:""
                    };
                }
            };

        }])
;
