/**
 * 
 #Problem 1
 * 
1: Start

2: Set Name <- ‘Abraham’

3: Print Name

4: Add ‘Surfboard ‘ to the beginning of Name

5: Print Name

6: Goto Step 2 and continue till you print Name(Abraham) 5 times

7: Stop
 */
let i = 'Abraham' // we assigned a value = abraham to variable i
console.log(i); // printing the assigned value which is in i variable

//   i = 'surfboard' + i; // now we have created a variable b and assigned value for b and  we have used concatenate "+" to add surfboard with assigned value of i
// console.log(i);// printing the assign value in b

for(let w = 0 ; w < 5 ; w++){ 
    console.log(i);
    i = 'surfboard  ' + i; // now we have created a variable b and assigned value for b and  we have used concatenate "+" to add surfboard with assigned value of i
 // we have used  for loop condition to print i value 5 times  
    console.log(i);
}