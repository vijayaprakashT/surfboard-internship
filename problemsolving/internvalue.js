let value = 0;
let count = 50;

function call() {
    if (value < count) {                    //if(base condition ) => base condition indicate to stop when the condition is met 
        value++;                           //other wise it will do recursion process until it get satisfied by the condition
        console.log(value);
        call(); // Recursive call to continue incrementing
    }
}
call(); 
