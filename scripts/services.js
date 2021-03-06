'use strict';

angular.module('confusionApp')
  .constant("baseURL","http://localhost.:3000/")

	.service('menuFactory',['$resource','baseURL',function($resource,baseURL){

    /*var promotions=[
                        {
                          _id:0,
                          name:'Weekend Grand Buffet',
                          image:'images/buffet.png',
                          label:'New',
                          price:'19.99',
                          description:'Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person ',
                        }];  //end promotions                      
*/

    this.getDishes=function(){
    	return $resource(baseURL+"dishes/:id",null,
        {'update':{method:'PUT'}});
    };

    this.getPromotions = function(){
      return $resource(baseURL+"promotions/:id",null,
        {'update':{method:'PUT'}});
    };

	}]).

  factory('corporateFactory',['$resource','baseURL',function($resource,baseURL){

    /* var corpfac={};

      var leadership=[
      {
          _id:0,
          name: "Peter Pan",
          image: 'images/alberto.png',
          designation: "Chief Epicurious Officer",
          abbr: "CEO",
          description: "Our CEO, Peter, credits his hardworking East Asian immigrant parents who undertook the arduous journey to the shores of America with the intention of giving their children the best future. His mother's wizardy in the kitchen whipping up the tastiest dishes with whatever is available inexpensively at the supermarket, was his first inspiration to create the fusion cuisines for which The Frying Pan became well known. He brings his zeal for fusion cuisines to this restaurant, pioneering cross-cultural culinary connections."
      }
 
      ]; //end leadership

      corpfac.getLeaders=function(){
        return leadership;
      };
      corpfac.getLeader=function(index){

                return leadership[index];
        
      };
    return corpfac;
      */
      
    return {
      getLeader:function(index){
        return $resource(baseURL+"leadership/:id",null,
                {'update':{method:'PUT'}}).get({id:index});
        },

      getLeaders:function(){
        return $resource(baseURL+"leadership/:id",null,
                {'update':{method:'PUT'}});
        }
      
    };

  }]).
factory('feedbackFactory',['$resource','baseURL',function($resource,baseURL){
    

      return $resource(baseURL+"feedback/:id",null,
        {'update':{method:'PUT'}});

  }]); //end factory



