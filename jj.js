let a = 254678;
 let str = a.toString();
 let result = "";
 
 for(let i = 0 ; i < str.length ; i++){
     result += str[i];
 
     if(i < str.length  && str[i] % 2 == 0 && str[i+1] % 2 == 0  ){
 
      result+="-";
 }
 
    
 }
 

let a = [1,2,3,3,4,3,5];

let count = 1;
let max = 0;
let item;

for (let i = 0; i < a.length; i++) {
    count = 1; // Reset count for each new element
    for (let j = i + 1; j < a.length; j++) {
        if (a[i] === a[j]) {
            count++;
        }
    }

    if (count > max) {
        max = count; // Update max if a higher frequency is found
        item = a[i]; // Update the most frequent item
    }
}

console.log(`Most frequent element: ${item}`);
console.log(`Count: ${max}`);


 
 
     
     console.log(result);
     
    
