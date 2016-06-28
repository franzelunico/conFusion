"use strict";
angular.module("confusionApp")
			.constant("baseURL","http://localhost:3000/")
			.factory("menuFactory", ['$resource','baseURL',function($resource, baseURL){
					var menufac = {};

                        menufac.getDishes = function(){
                        	return $resource(baseURL+"dishes/:id", null, {'update':{method:'PUT'}});
                        };

                      /*  menufac.getDish = function(index){
                        	return $resource.get(baseURL+"dishes/"+index);
                        };*/

                        menufac.getPromotions = function(){
                          return $resource(baseURL+"promotions/:id", null, {'get':{method:'GET'}});
                        };

                        return menufac;
			}])
      
      .factory('corporateFactory', ['$resource','baseURL',function($resource, baseURL){
          
            var corpfac = {};
    
            corpfac.getLeaders = function(){
                return $resource(baseURL+"leadership/:id",null,{'get':{method:'GET'}});
            };

            /*corpfac.getLeader = function(index){
                return leadership[index];
            };*/
    
            return corpfac;
        }])
      .factory("feedbackFactory", ['$resource','baseURL',function($resource, baseURL){
                    var contactfac = {};

                        contactfac.getFeedBacks = function(){
                            return $resource(baseURL+"feedback/:id", null, {'save': {method:'POST'}});
                        };

                        return contactfac;
            }]);