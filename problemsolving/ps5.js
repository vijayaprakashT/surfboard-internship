// Problem 5


// Write the algorithm to multiply two 4 digit numbers. Assume the computer knows
// nothing about multiplication and only about addition.
// 1.step1 : START.
//       2.step2: create a function .
//       3.step3: set count = 0.
//       4.step4: use for loop condition to execute number of times as we mentioned.
//       5.step5: inside for loop condition set i = 0  and set i < b(var name) and i++ iteration count.
//       6.step6: add count + a  to execute each number times based on variable that we intialize in b.
//       7.step7: return count
//       8.step8: outside the condition declare and intialize variable which is a and b.
//       9.step9: call back function and  store it variable and set result.
//       10step10: print result.


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