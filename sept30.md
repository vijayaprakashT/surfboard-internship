# SEPT 30

## INTERNSHIP :
        1. In today class we discussed about the execution stack .

        2. execution stack always starts with main function . each function it will create a block after completion the block will get deleted .

        3.It works like last in and first out  and note that every code starts with main function in some language you will write main function and in some languages you dont see it but its always start with main function.

        4.for example:
           `` void add(){
             int a = 10;
             int b = 20;
             int c = a+b;
             print(c)
           }

           add()``

           1. here void is used for doesnt return any data type and we have created a add dunction inside that we have declared and intilaize the value and we are printing the statement and outside the function we calling add function to perform set of instruction inside a function 

           2. in this execution of stack will work like first it will create a block for add function and perform instruction we have written inside the function after completion it will automatically delete the add block in execution stack.

### TASK :
       1.After completion of deletion . in deletion my mentor told me to some changes like while employee detail deleting it should not get deleted in database instead of that you have to shown as response successfully deleted and create a column in the table t update whether employee details is deleted or not in boolean .

       2. There's concept in sql is soft deletion method in sql to perform this kind of operation in delete method.

       3. i have searched and learned how soft deletion works and i didnt write any code just read what is soft deletion and how to implement query in js code .