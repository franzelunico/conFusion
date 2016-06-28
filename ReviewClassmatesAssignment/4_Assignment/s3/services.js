'use strict';

angular.module('confusionApp')
    .constant("baseURL", "http://localhost:3000/")
    .service('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        this.getDishes = function () {
            return $resource(baseURL + "dishes/:id", null, {'update': {method: 'PUT'}});
        };

        // implement a function named getPromotion
        this.getPromotion = function () {

            return $resource(baseURL + "promotions/:id", null, {'update': {method: 'PUT'}});
        };
        // that returns a selected promotion.


    }])

    .factory('corporateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        var corpfac = {};

        corpfac.getLeaders = function () {
            return $resource(baseURL + "leadership/:id", null, {'update': {method: 'PUT'}});
        };

        return corpfac;

    }])

    .service('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        this.sendFeedback = function () {
            return $resource(baseURL + "feedback", null, {'save': {method: 'POST'}});
        };

    }])

;
