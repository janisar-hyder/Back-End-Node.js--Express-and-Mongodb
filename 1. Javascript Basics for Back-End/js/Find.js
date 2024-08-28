let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let ans = arr.find(val => {
    if (val === 0) {
        return true
    }
});
console.log(ans);
