
// console.log("Class Started");

// console.log("ATTENDANCE");

// console.log("CLASS LECTURE");

// console.log("LUNCH");

// console.log("CLASS END");


//HOW WE DECLARE VARIABLES

// var aa =20;

// let a =10;

// console.log(a);

// a = 30;
// console.log(a);

// const b =20;

// // const b =30;
// b =40;

// console.log(b);


// FUNCTIONS :

// function sumOfTwo(param1,param2){
//     var answer = param1 + param2;

//     return answer;
// }

// var arg1 =10;
// var arg2 =20;
// console.log(sumOfTwo(arg1,arg2));


// HOW JAVASCRIPT CODE RUNS

// let a= 10;
// let b= 20;

// console.log(a);

// function sumOfTwo(param1,param2){
//     let answer = param1 + param2;
//     return answer;
// }

// let arg1 =10;
// let arg2 =20;
// console.log(sumOfTwo(arg1,arg2));

// console.log(b);


// console.log(a);

// var a =20;
// var b =30;

// console.log(b);


// console.log(aa);

// let aa =200;

// let bb =400;

// console.log(bb);

// var a =200;

// console.log(a);
// let a =300;
// console.log(a);

// var a =2000;
// console.log(a);

// // let a =4000;

// console.log(a);


//SCOPE


// var a = 100;

// console.log(a);

// function sumOfTwo(aa,bb){
//     return aa+ bb;
// }

// var b = 300;

// console.log(sumOfTwo(a,b));


// var a =200;

// function sumOfTwo(a,b){
//     var b =300;
//     return a+b;
// }

// var b =500;
// console.log(sumOfTwo(a,b));


// var x =300;

// function firstFun(){
//     var a =20;
//     var b =30;
//             console.log("HELLO I AM FIRST FUNCTION");

//     function secFun(){
//         var c = 50;
//             console.log("HELLO I AM SECOND FUNCTION");
//         function thirdFun(){
//             var d =80;
//             console.log("HELLO I AM THIRD FUNCTION");
//             console.log(a+b+c+d+x);
//         }
//         thirdFun();
//     }
//     secFun();
// }
// console.log(firstFun());


// setTimeout & setInterval

// setTimeout(function (){
//     console.log("HELLO I AM SETTIMEOUT")
// },5000);


// setInterval(function (){
//     console.log("HELLOO I AM SETINTERVAL")
// },2000);


for (let i =0; i<=5;i++){
    setTimeout(function (){
        console.log(i)
    },2000);
}