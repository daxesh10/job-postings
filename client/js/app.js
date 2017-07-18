var config = {
    apiKey: "AIzaSyA_ECTvmFcCLgJdgWVflcRtMkEszNmloOQ",
    authDomain: "mydata-d5748.firebaseapp.com",
    databaseURL: "https://mydata-d5748.firebaseio.com",
    projectId: "mydata-d5748",
    storageBucket: "mydata-d5748.appspot.com",
    messagingSenderId: "1097794308491"
  };
 firebase.initializeApp(config);



var app = angular.module("myApp",["ngRoute",'ngAnimate','ngAria','ngMaterial','ngRoute','firebase','ngMessages'])

// app.config(function($routeProvider) {
//     $routeProvider
//     .when("/linkedin", {
//         templateUrl : "main.html"
//     })
// })

app.controller("ctrl1",['$scope','$log','$firebaseObject','$firebaseArray','$http'
,function($scope,$log,$firebaseObject,$firebaseArray,$http){

$scope.h = "linkedin"


let clickLinkedin = ()=>{
    $http({
        
        method:"GET",
        url:"/jobs/linkedin"
    }).then(function suc(response){

        $scope.jobLocations = response.data
        $scope.heading = "Linkedin"

        $log.info(response.data)

    },function(error){

        $log.info(error)
    })
}

$scope.clickIndeed = ()=>{
    $http({
        
        method:"GET",
        url:"/jobs/indeed"
    }).then(function suc(response){

        $scope.jobLocations = response.data
        $scope.heading = "Indeed"

        $log.info(response.data)

    },function(error){

        $log.info(error)
    })
}

$scope.clickMonster = ()=>{
    $http({
        
        method:"GET",
        url:"/jobs/monster"
    }).then(function suc(response){

        $scope.jobLocations = response.data
        $scope.heading = "Monster"

        $log.info(response.data)

    },function(error){

        $log.info(error)
    })
}




let jobListing = (x)=>{

    $log.info(JSON.stringify(x))


    Object.keys(x).forEach((val,index)=>{

        $scope.jobList = x[val]
    })

    
    $scope.showJobList = true
   
}

 $scope.showListedJobs = function(jobListVal,jobListKey)
            {
                console.log("joblist key",jobListKey)
                if(jobListKey==='company')
                {
                        console.log("joblist")
                        let companyList = []
                        Object.keys(jobListVal).forEach((val,index)=>{

                              //  console.log("filet "+val+" val "+jobListVal[val])
                                companyList.push(jobListVal[val])

                        })
                        $scope.jobListingKey = "company"
                         $scope.companyList = companyList
                }
                else if(jobListKey==='easyLinks')
                {
                         let easylinksCompany = []   
                         Object.keys(jobListVal).forEach((val,index)=>{

                             if(val==='company')
                             {

                            //    console.log(" vals "+val+" val "+JSON.stringify(jobListVal[val])+"index "+index) 
                                 Object.keys(jobListVal[val]).forEach((easyVal,index)=>{

                                //      // console.log("filet "+val+" val "+jobListVal[val][easyVal])

                                //  console.log(" easyVal "+easyVal +" index "+index +" jobListVal[val][easyVal] "+ JSON.stringify(jobListVal[val][easyVal])) 
                                  easylinksCompany.push(jobListVal[val][easyVal])
                                //         console.log(" val "+JSON.stringify(jobListVal[val])+"index "+index)
                                        
                                  })
                             }
                         })
                         if(easylinksCompany.length>0)
                         {
                              $scope.jobListingKey = "easyLinks"
                             $scope.easylinksCompany = easylinksCompany
                         }

                }
                else
                {
                    console.log("no results")
                }


            }


$scope.clickLinkedin = clickLinkedin
$scope.jobListing = jobListing


}])

app.directive("cards",function(){

    return {

         restrict:"ACE",
        templateUrl:"../client/views/jobCards.html",
        
    }
})
app.directive("easycards",function(){

    return {

         restrict:"ACE",
        templateUrl:"../client/views/easyCards.html",
       
    }
})