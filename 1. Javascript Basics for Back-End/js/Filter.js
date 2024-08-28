let arr = [1, 2, 3, 4];

let ans = arr.filter(function (val) {
    if (val%2===0) {
        return val;
    }
    else{
        return false;
    }
});

console.log(ans);
