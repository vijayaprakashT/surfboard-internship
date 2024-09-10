#  SEPT 5


## internship day - 4

Today we have learned about propositions and revised the topics from yesterday.
In propositions, its kind of true or false format for example: 
                                                             1.when sun is getting raise in the morning you will get warm.
                                                             2.car is parked under the sun
                                                             3.my car is warm
> here if you can observe that each statement has dependent on each other statements and it comes under the format of logical AND. like that kowsiq has said some examples for OR and NOT

### topics

berlin bro has given some topics yesterday to study  so i didnt complete that. here i started with commands used in terminal and later i had problem of setting the path and asked george help for bro .the reason for the problem is everything has stored under onedrive finally we couldnt make it and started to learn topics



####  LOOPS
       
      1. for loop :
                 1.used for execute block of code number of times.
                 2.syntax: for(intialize;condition;update){
                    //statements
                 }


     2.for in :
                1.used for objects to get the properities with the help of key values.
                2.EXAMPLE:
                      const person ={
                         name = "vj";
                         age = 10;
                      }
                      for(let key in person){
                        console.log(key+":"+person(key));
                      }
                      output:
                           name:vj
                           age : 10

    3.for of :
             1.its used in arrays ,with help of for loop you can get the values directly you wont need a key values.
             example: 
                  const arr = [1,2,3,4]
                  for(let value in arr){
                    console.log(value);
                  }

    4.while :
             1. while is used with help of specified condition evalutes to be true . if it fails stop the loop.
             example:
                    let n = 8;
                    let x = 0;
                    while(n< 10){
                        n++;
                        x+=n;
                        console.lo(x);
                    }

                    output:
                         9
                         19
#####  ARRAYS:
       
        1.Array.length():
                    1. Its used for finding length of the array 
        2.Array.prototype.map():
                    1.Its used for create a new array for result and map is used for callback the function with condition and calls each every element in the array and it doesnt modify the array elements
                    and result stored in new array.
        3.Array.Filter():
                    1.Its used for filtering out elements from array with given condition .
        4.Array.some():
                    1.Its used for checking the given  condition  atleast it will check one element is true or false
                    based on the condition .if its not return false or else true.

        5.Array.foreach():
                    1.Its used for check each and every element based on the condition given even if it fails it doesnt stop it will check every element in given array regardless whether its true or not.
        6.Array.find():
                    1.  It returns the first element which satisfying the condition and it will not return more than one element .if its not satisfying the condition it return  undefined.
        