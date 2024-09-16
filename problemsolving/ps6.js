function gcd(a,b){
    let common ;
    for(let i = 0 ; i <= a && i <=b ; i++){
        if(a%i==0 && b%i==0){
            common = i;
        }
    }
    return common;
}

let a =4;
let b = 6;
let result = gcd(a,b);
console.log("GCD IS :" +result);