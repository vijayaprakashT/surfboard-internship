// Problem 3
// 1: Start

// 2: Set max <- 0

// 3: Take a number from the input

// 4: Check if number is greater than max, if it is, set max <- number

// 5: Goto Step 3, until all given numbers are exhausted

// 6: Print max

// 7: Stop



function maximum(arr){ // created function and named it as maximum
    
    let max = arr[0]; // set max value is 0
    
    for(let i = 0 ; i < arr.length ; i++){ //using for loop  condition to checking which number is greater aamong the elements in the array
        if(arr[i] > max){  // using if condition check if value is greater than  max if its greater than max and update the greater value to max
            max = arr[i];
        }
        
        
    }
    return max;   // return max value
    
  }
  console.log("greatest element in the array:") // printing these lines
  //console.log(maximum([1,10,3,4,5,6])); //  calling back the function and implement the values in array format.

  console.log(maximum([1,10,13,4,5,6]));
  
  
       
      