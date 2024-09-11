// Problem 2

// 1: Start

// 2: Set numberToCheck <- 1001001001001, 12345567891, 559922932941

// 3: Remove the last digit

// 5: From the last digit multiply each digit by 2

// 6: Take each of the products derived and add them together

// 7: Reduce the number until you get a single digit

// 8: Check if the calculated value is equal to the last digit from Step 3

// 9: Decide if the number is valid (If the value is equal, the number is valid.
// Otherwise it is invalid)

// 10: Print the validity

// 11: Stop
function removeLastDigit(numbertocheck){   // created function name called removelastdigit
    console.log('inside the function')
// Loop through the array and remove the last digit from each number
const removelastdigit = numbertocheck.map((removelastdigit) => removelastdigit % 10); // used arraymap method  to remove last digit and we will get the last digit divided by 10

console.log("removedlast digit number:", removelastdigit);// printing the last digit

 for (let i = 0; i < numbertocheck.length; i++) {  // used for loop condition to check the array length and  updating the array after removing last digit and using math.floor round of the long values
     numbertocheck[i] = Math.floor(numbertocheck[i] / 10); // Divide by 10 and update the array
    
 }

console.log(numbertocheck);// Output the updated array


const rev = numbertocheck.reverse();// here we have used reverse method to reverse the array elements
console.log(rev);  //printing the rev
let multiply = 2; // declare and intialize the variable for next iteration

let multi = rev.map(rev => rev * multiply); // using map to multiply the rev array elements with 2

console.log(multi); // printing the update one after multiplied with  2

  const reducedArray = multi.map(num => {  // we have used reduce() method to reduce to single digit of each long values in array
        while (num > 9) {
            num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
        }
        return num;
    });// we have used while condition to if the num is greater than 9 or not until it becomes single digit then we are converting the number to string format  and using spilt() method to splitting the elements using ","
       // used reduce() method for reducing the values to single digit and used parseInt pass value as string and return as integer and returning the value
    console.log( "reduce to single digit :",reducedArray); // printing the array after reduce to single digit
  
       if (JSON.stringify(reducedArray) === JSON.stringify(removelastdigit)) {
        console.log("Valid");  // using json.stringify() method to converting the array format to string to check whether its valid or not
    } else {
        console.log("Invalid");
    }
    let valid;// defined value
    if(valid){ // if valid it will print this
        console.log("validity check : valid");
        console.log("stop");
    }
    else{// if not it will print this
        console.log("validity check : Invalid");
        console.log("stop");
    }
    }
  
    //removeLastDigit([18920992829, 123234551, 559000101992]);
    removeLastDigit([1001001001001, 12345567891, 559922932941]); // finally we are calling the function to execute the instructions



    
    
    
    
    
   
    
 
    


