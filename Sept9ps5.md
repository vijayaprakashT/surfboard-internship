>-- Problem 5


Write the algorithm to multiply two 4 digit numbers. Assume the computer knows
nothing about multiplication and only about addition.

# SEPT 9 :
      1.step1 : START.
      2.step2: create a function .
      3.step3: set count = 0.
      4.step4: use for loop condition to execute number of times as we mentioned.
      5.step5: inside for loop condition set i = 0  and set i < b(var name) and i++ iteration count.
      6.step6: add count + a  to execute each number times based on variable that we intialize in b.
      7.step7: return count
      8.step8: outside the condition declare and intialize variable which is a and b.
      9.step9: call back function and  store it variable and set result.
      10step10: print result.
      11.code:
         1.function multi(a,b){
         let count = 0;

         for(let i = 0 ; i < b ; i++){
         count += a;

         }
        return count
       }
      let a = 2345;
      let b = 2345;
      let result = multi(a,b);
      console.log("ANSWER :" + result);   output: ANSWER : 5499025.


      After this i have learned some basic commands that we are using in terminals.
      some of the basic commands are:
      1.ls command:
              1.its used to list files.
      2.cd command:
              1.the cd command  is used to change the current working directory(files or folder).
      3.pwd command:
               1. Its used to print working directory as the name suggest.
      4.Mkdir:
               1.It's used to create new directories on the file system.
      5.rmdir:
               1.It's used for remove empty directories.
      6.rm command:
               1.It's used to remove non empty directories along with sub directories and files.
      7.mv command:
               1.It's used to move directories or files from one place in the file system to another.
      8.cp command:
               1.It's used for copy the content from one file to another file.
      9.cat command:
               1.It's used to display contents of file and concatenate the files and create new files.
      10.Less command:
               1.It's used for viewing the file and you cant able to modify the file using this command.

