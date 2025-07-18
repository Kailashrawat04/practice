// // how to declare the var let const

//   let b= 300;

//   let c=400;

//   var g= 50;

//   console.log(c);


// GEC global execution context 
   
 
//     console.log("starting js code");

//     var a = 20;
//     var b = 30;
    
//     console.log(a);
//     console.log(b);

//     var sumoftwo =a+b;

//     console.log(sumoftwo);

// function doubletwonumber(xx, yy) {
//     function sumofthriple(pp, kk) {
//         var answerof = (kk + pp) / 2;
//         return answerof;
//     }

//     console.log("Calling nested fun", sumofthriple(35, 45));

//     var ans = (xx + yy) / 2;
//     return ans;
// }

// console.log(doubletwonumber(55,44));

// for loop

// for (var i=0; i<=3;i++){
//       console.log(i);
// };

// 0 0<=3, -> 1 1<=3 => 2 <=3 => 3 <=3 => 4<=3
// 0 1  2 3 


// settimeout setinterval

  // console.log("start");

  // setTimeout(() => {
  //   console.log("hi i m going to run after 5 sec");
    
  // }, 5000);

  // console.log("end");

  // setinterval


// for (var i =0; i<=5; i++){

//    setTimeout(function (){
//     console.log(i)
//    },5000);
  
// }
// for loop runnning syc
// ettimeout runnuing asyc


// new 

//   for (var i =0; i<=5; i++){
//     let a = i;
//    setTimeout(function (){
//     console.log(a)
//    },5000);
  
// }
// do not use let try with var only 


//   for (var a =0; a<=5; a++){
//   function close(i){
//    setTimeout(function (){  // in case of closer its acts a lets scoped but , wraps its own space in its
//     console.log(i)
//    },2000);
//   }
//   close(a);
// }


// // function 

// function nameOfFunc(){
//   return ;
// }
//   // anoy    function

// function (){

// }

// // Arrow function 

// () =>  {

// }

// // named function

//   var myfun = function(){

//   }


// var a =200;
// console.log(a);

//   var functionK = function(){
//     console.log("hello");
//   }
//   functionK();

  



// // first class function 

// function funk1(funk,k,p)
// {
//         return funk(k,p);
     
// }
// function funk2(X,Y){
//     return (X+Y);
// }
// function funk3(A,B){
//   return(A-B);
// }

// var add = funk1(funk2,10,20);
// var sub = funk1(funk3,30,40);

// console.log(add);
// console.log(sub);

///

///

function meanu(cb){
  console.log("dinner done");
     setTimeout(cb, 5000);

}
function meanu(cb){
  console.log("dinner done");
     setTimeout(cb, 5000);

}














