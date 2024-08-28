// alert();

let arr = [1, 2, 3, 4];

let ans = arr.map(function (val) {
    if (val%2===0) {
        return val;
    }
    else{
        return ' ';
    }
});

console.log(ans);


//      Key Differences

//      Operation:
//      map() transforms each element and returns a new array of the same length.
//      filter() selects elements based on a condition and returns a new array with potentially fewer elements.
//     
//      Use Cases:
//      Use map() when you want to transform or modify all elements in an array.
//      Use filter() when you want to extract a subset of elements based on a condition.
