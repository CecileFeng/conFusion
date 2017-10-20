'use strict';

angular.module('confusionApp')
  .controller("MenuController", ['$scope','menuFactory',function($scope,menuFactory){
  
    $scope.tab=1;
    $scope.filtText='';
    $scope.showDetails=false;
    $scope.showMenu=false;
    $scope.message="Loading ...";

    //get data "dishes" from server
    menuFactory.getDishes().query(
        function(response){
          $scope.dishes=response;
          $scope.showMenu=true;
        },
        function(response){
          $scope.message="Error: "+response.status+" "+response.statusText;
        }

      );


    //detect the selected tab, and filter the dishes
        $scope.select=function(setTab){
          $scope.tab=setTab;

          if (setTab === 2){
             $scope.filtText="appetizer";}
          else if (setTab === 3){
             $scope.filtText="mains";}
          else if (setTab === 4){
             $scope.filtText="dessert";}
          else {
             $scope.filtText="";}
        };

        $scope.isSelected=function(checkTab){
          return ($scope.tab===checkTab);
        };

        $scope.toggleDetails = function(){
          $scope.showDetails=!$scope.showDetails;
        };

  }])
.controller('ContactController',['$scope',function($scope)
   {
      $scope.feedback={mychannel:"",firstName:"",lastName:"",
                      agree:false,email:""};
      var channels=[{value:"Tel.",label:"Tel."},
           {value:"Email",label:"Email"}];
      $scope.channels=channels;
      $scope.invalidChannelSelection=false;

  
}])
.controller('FeedbackController',['$scope','feedbackFactory',function($scope,feedbackFactory){
//operate the following function, when the "Send Feedback" btn is clicked.
  $scope.sendFeedback=function(){

    /*console.log(feedbackFactory.query());
    var ID=feedbackFactory.query().length;
    
    console.log(ID);
*/


    //Judge if the contact way is correctly selected
    if ($scope.feedback.agree && ($scope.feedback.mychannel === "") && (!$scope.feedback.mychannel))
    {
      //show warning
      $scope.invalidChannelSelection=true;
      console.log('incorrect');
    }
    else{
        //update myChannel for feedback
        $scope.invalidChannelSelection=false;
        

         //build a new instance
        var entry=new feedbackFactory();

         //save data to server
        entry.firstName = $scope.feedback.firstName;
        entry.lastName=$scope.feedback.lastName;
        entry.areaCode=$scope.feedback.tel.areaCode;
        entry.telNum=$scope.feedback.tel.number;
        entry.email=$scope.feedback.email;

        if($scope.feedback.mychannel !== "")
          {
            entry.myChannel=$scope.feedback.mychannel;
          }
        else
          {
            entry.myChannel="NA";
          }
        entry.comment=$scope.feedback.comments;

        entry.$save(function() {
                console.log(feedbackFactory.query());
           }); 

        //initialize the form
        $scope.feedback={mychannel:"",firstName:"",lastName:"",
              agree:false,email:""};
        $scope.feedback.mychannel="";
        $scope.feedbackForm.$setPristine();
        console.log($scope.feedback);
    }//end the outer else


  }; //endsendFeedback function

}])
.controller('DishDetailController',
    ['$scope','$stateParams','menuFactory',
      function($scope,$stateParams,menuFactory){

    
          var order= '';
          $scope.showDetails=false;
          $scope.message="Loading ...";

          //get "dish" data from the server.
          $scope.dish=menuFactory.getDishes()
                      .get({id:parseInt($stateParams.id,10)})
                      .$promise.then(
                          function(response){
                            $scope.dish=response;
                            $scope.showDetails=true;
                          },
                          function(response){
                            $scope.message="Error"+response.status+" "+response.statusText;
                          }
                        );
            

           //detect the ordering criterion.
           if (order === 'rating'||'author'||'date')
           {$scope.order = order;}

          //show a new comment form.
          $scope.commentform={name:"",star:5,myComment:""};   

      }
    ]
  )
.controller('DishCommentController',['$scope','menuFactory',

  function($scope,menuFactory){

      $scope.submitComment=function(){

        var comment={rating:$scope.commentform.star,
          comment:$scope.commentform.myComment,
          author:$scope.commentform.name,
          date:new Date()};

        //$scope.myComment.date=new Date().toISOString();
        console.log($scope.myComment);

        //add the newest comment to the comment list
        $scope.dish.comments.push(comment);
        console.log($scope.commentform);
        console.log($scope.dish.comments);

        menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);

        $scope.commentForm.$setPristine();
        $scope.commentform = {name:"",star:5,myComment:""};

      };

}])
  .controller('IndexController',['$scope','menuFactory','corporateFactory',function($scope,menuFactory,corporateFactory){
      
      $scope.showDish=false;
      $scope.messageDish="Loading ...";
      $scope.showProm=false;
      $scope.messageProm="Loading ...";
      $scope.showChef=false;
      $scope.messageChef="Loading ...";

      //get "feature" data from server.
      $scope.feature=menuFactory.getDishes().get({id:0})
                      .$promise.then(
                          function(response){
                            $scope.feature=response;
                            $scope.showDish=true;
                          },
                          function(response){
                            $scope.messageDish="Error:"+response.status+" "+response.statusText;
                          }
                        );
      

      $scope.promotion=menuFactory.getPromotions().get({id:0})
                        .$promise.then(
                           function(response){
                            $scope.promotion=response;
                            $scope.showProm=true;
                           },
                           function(response){
                            $scope.messageProm="Error:"+response.status+" "+response.statusText;
                           }
                          );

      $scope.chef=corporateFactory.getLeader(3).$promise
                  .then(
                       function(response){
                          $scope.chef=response;
                          $scope.showChef=true;
                       },
                       function(response){
                          $scope.messageChef="Error:"+response.status+" "+response.statusText;
                       }
                    );

 
          
  }])
  .controller('AboutController',['$scope','corporateFactory',function($scope,corporateFactory){

        $scope.showChefs=false;
        $scope.message="Loading ...";

    //get data "Leaders" from server
    $scope.leaders=corporateFactory.getLeaders().query(
        function(response){
          $scope.leaders=response;
          $scope.showChefs=true;
        },
        function(response){
          $scope.message="Error: "+response.status+" "+response.statusText;
        }

      );


  }]);//end the anonymous function within app.controller

