# SEPT 10

## PROBLEM SOLVE 6

### CODE:
        1. function gcd(a,b){
            let common ;
            for(let i = 0 ; i <= a && i < =b ; i++){
                if(a%i==0 && b%i==0){
                    common = i;
                }
            }
            return common;
        }

        let a =4;
        let b = 6;
        let result = gcd(a,b);
        console.log(result);

    2.ALGORITHM:
            1.create a function and set name gcd.
            2.inside a function declare var name and set common.
            3.use for loop condition to execute block number of times 
            4.inside loop condition intialize and declare i = 0 and check a and b greater than or equal to 0 use AND operator because it has to satisfy both condition.
            5.inside for loop use if condition . 
            6.if for loop satisfy it will enter into if condition and check a and b % i == 0.
            7.if condition satisfy inide the condition store the i value into common.
            8.return common.
            9.initialize and declare variable for a  = 4 and b = 6.
            10.call back the function and store this one variable and set result.
            11.print result. 
