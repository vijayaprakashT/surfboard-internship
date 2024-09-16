// Problem 5


// Write the algorithm to multiply two 4 digit numbers. Assume the computer knows
// nothing about multiplication and only about addition.



function multi(a,b){
    let count = 0;

    for(let i = 0 ; i < b ; i++){
        count += a;

    }
    return count
}
let a = 2345;
let b = 2345;
let result = multi(a,b);
console.log("ANSWER :" + result);