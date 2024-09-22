const a = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

function even(arr) {
    arr.sort((a, b) => a - b); // Sort in ascending order
    arr.reverse(); // Reverse to get descending order
    return arr; // Return the sorted array
}

const sortedArray = even(a); // Call the function and store the result
console.log(sortedArray); // Log the sorted array