function removeLastDigit(numbertocheck){
    console.log('inside the function')
// Loop through the array and remove the last digit from each number
const removelastdigit = numbertocheck.map((removelastdigit) => removelastdigit % 10);

console.log("removedlast digit number:", removelastdigit);

for (let i = 0; i < numbertocheck.length; i++) {
    numbertocheck[i] = Math.floor(numbertocheck[i] / 10); // Divide by 10 and update the array
    
}

console.log(numbertocheck);// Output the updated array


const rev = numbertocheck.reverse();
console.log(rev);
let multiply = 2;

let multi = rev.map(rev => rev * multiply);

console.log(multi);

  const reducedArray = multi.map(num => {
        while (num > 9) {
            num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
        }
        return num;
    });
    
    console.log( "reduce to single digit :",reducedArray);
  
       if (JSON.stringify(reducedArray) === JSON.stringify(removelastdigit)) {
        console.log("Valid");
    } else {
        console.log("Invalid");
    }
    let valid;
    if(valid){
        console.log("validity check : valid");
        console.log("stop");
    }
    else{
        console.log("validity check : Invalid");
        console.log("stop");
    }
    }
  
    //removeLastDigit([18920992829, 123234551, 559000101992]);
    removeLastDigit([1001001001001, 12345567891, 559922932941]);



    
    
    
    
    
   
    
 
    


