// // Example 1
// arr.forEach(function (val) {
//     alert(val + " Hello");
// })





// // Example 2
// var arr = [1, 2, 3, 4];
// arr.forEach(double);
// arr.forEach(triple);
// arr.forEach(display);

// function double(element, index, array) {
//     console.log(array[index] = element * 2);  
// };

// function triple(element, index, array) {
//     console.log(array[index] = element * 3);
// };

// function display(element) {
//     console.log(element);
// };




// Example 3
// var fruits = [ "apple", "banana", "Mango", "Orange" ];
// fruits.forEach(lowerCase);
// fruits.forEach(dispaly);

// function upperCase(element, index, array){
//     array[index]= element.toUpperCase();
// };

// function lowerCase(element, index, array){
//     array[index]= element.toLowerCase();
// };

// function dispaly(element){
//     console.log(element);
// };






// var fruits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// function evenodd(element) {
//     if (element % 2 === 0) {
//         console.log(`${element} is even`);
//     } else {
//         console.log(`${element} is odd`);
//     }
// }

// fruits.forEach(evenodd);





// Array of user objects
// const users = [
//     { name: 'zamar', age: 25, email: 'zamar@example.com' },
//     { name: 'rafay', age: 19, email: 'rafay@example.com' },
//     { name: 'faisal', age: 30, email: 'faisal@example.com' },
//     { name: 'Hyder', age: 22, email: 'hyder@example.com' },
//     { name: 'Kiswa', age: 28, email: 'kiswa@example.com' }
// ];

// function dispaly(user) {
//     console.log(`sending email to ${user.name} (${user.email})`);
// };
// users.forEach(function (user) {
//     if (user.age > 24) {
//         dispaly(user);
//     }
// });