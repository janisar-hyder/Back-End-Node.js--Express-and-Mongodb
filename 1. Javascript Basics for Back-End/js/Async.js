// _________________
// conditions to send request
// _________________
// fetch
// axios
// setTimeout
// setInterval
// Promise
// XMLHttpRequest
// _________________
// conditions to use request ans
// _________________
// then,catch
// callbacks
// async,await
// _________________




// _________________
// call back function
// _________________
// setTimeout(callback-function,time-in-ms)

// console.log("before settimeout");
// setTimeout(function () {
//     console.log("it will run after 5 seconds");
// }, 5000);
// console.log("after settimeout");
// _________________


// _________________
// promises
// _________________
// let ans = new Promise((res, rej) => {
//     let n = Math.floor(Math.random() * 10);
//     if (n > 3) {
//         res(n);
//     } else {
//         rej(n);
//     }
// });

// ans.then((n) => {
//     console.log(`Resolved! ${n} is greater than 3`);
// }).catch((n) => {
//     console.log(`Reject! ${n} is less than or equal to 3`);
// });

// _________________

// let ans = new Promise((res, rej) => {
//     let n = Math.floor(Math.random() * 100);
//     if (n % 2 === 0) {
//         return res(n);
//     }
//     else {
//         return rej(n);
//     }
// });

// ans.then((n) => {
//     console.log(`Resolved! ${n} is a even number`);
// }).catch((n) => {
//     console.log(`Rejected! ${n} is a odd number`);
// });



// _________________
// Doing task 1 by 1 in async
// _________________
// let p1 = new Promise((res, rej)=>{
//     return res("Task 1 done");
// });

// let p2 = p1.then((data)=>{
//     console.log(data);
//     return new Promise((res, rej)=>{
//         return res("Task 2 done");
//     });
// });

// let p3 = p2.then((data)=>{
//     console.log(data);
//     return new Promise((res, rej)=>{
//         return res("Task 3 done");
//     });
// });
// p3.then((data)=>{
//     console.log(data);
// });


// _________________
// async await
// _________________




// async function abc() {
//     let blob= await fetch(`https://randomuser.me/api/`);
//     let ans= await blob.json();
//     console.log(ans.results[0].name);
// }
// abc();




// async function abcd() {
//     var blob = await fetch(`https://randomuser.me/api/`);
//     let ans = await blob.json();
//     console.log(ans.results[0].name);
// };

// abcd();





