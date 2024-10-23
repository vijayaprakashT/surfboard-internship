# OCT 11:
   
## INTERNSHIP CLASS :
    1.In internship class kowsiq bro taught us about the recursive function .

    2.recursive function :  function that calls itself somewhere within the body of the function.

    3. example syntax:
         ' function recursiveFunc() {
           // some code here... 
          recursiveFunc()
         }'

     4. based on this code to solve given by kowsiq bro . the code is 
       `let value = 0;
       let count = 50;

      function call() {
     if (value < count) {     //if(base condition ) => base condition indicate to stop when the condition is met 
        value++;                           //other wise it will do recursion process until it get satisfied by the condition
        console.log(value);
        call(); // Recursive call to continue incrementing
    }
}
call(); 
`