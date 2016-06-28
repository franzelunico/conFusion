'use strict';

angular.module('confusionApp')
        .constant("baseURL","http://localhost:3000/")

        .service('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) {
			this.getDishes = function(){
				return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
			};
			
			this.getPromotions = function () {
				return $resource(baseURL+"promotions/:id", null,  {'get':{method:'GET' }});
			};
        }])

        .factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
            var corpfac = {};
            
			// Implement two functions, one named getLeaders,
            // the other named getLeader(index)
            // Remember this is a factory not a service
			corpfac.getLeaders = function() {
				return $resource(baseURL+"leadership/:id", null,  {'query':{method:'GET', isArray:true}});
			};
			
			corpfac.getLeader = function(index) {
				return $resource(baseURL+"leadership/"+index, null,  {'get':{method:'GET' }});
			};
			
			return corpfac;
        }])
		
		.factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
            var feedbackfac = {};
            
			// Implement two functions, one named getLeaders,
            // the other named getLeader(index)
            // Remember this is a factory not a service
			feedbackfac.sendFeedback = function() {
				return $resource(baseURL+"feedback/", null,  {'save':{method:'POST'}});
			};
			
			return feedbackfac;
        }])

;
