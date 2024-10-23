// const a =[1,2,3,4,5,6,7,8,9,10]

// function even(a){
//    a.forEach(num => {
//         if (num % 2 === 0) {
//             console.log(num);
//             return a
//         }
//     });
    
//     }
//  const num = even(a);
//  console.log(num)

const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function even(a) {
    const evenNumbers = a.filter(num => num % 2 === 0); // Create a new array with even numbers
    return evenNumbers; // Return the new array of even numbers
}

const num = even(a); // Store the return value in 'num'
console.log(num); // This will show the array of even numbers
