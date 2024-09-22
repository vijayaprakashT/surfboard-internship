#  SEPT-13  PROBLEM SOLVE - 7
     
     QUESTION:
     
           Your computer has received a message in Morse Code. However instead of the .s and _s, its replaced with ; and :. Everything else seems to be in the same structure as standard Morse code. How will you program your computer to this decrypt message. -> Eg: ;: :;;; ;:; ;: ;;;; ;: ::


           1.CONSTRAINTS : 

                  1.instead of : - semicolon , ;-colon  we have to use morse dot and line.
                  2. we have convert the example input to morse code.
                  3. after that decrypt the morse code symbol and convert into alphabets.



## APPROACH: 

1.Initially, I struggled to solve the problem. I had a basic understanding of Morse code but was unsure how to proceed with translating the altered symbols into a decipherable message. After doing some research on Google, I found a method that helped me break down the problem step by step.

2.The goal of the problem was to handle the transformation of the altered symbols (semicolon and colon) into standard Morse code, and then decrypt the Morse code into its corresponding alphabet. This required two main tasks:

3.Replace the altered symbols in the input message with proper Morse code symbols.Decrypt the Morse code into letters by mapping the Morse patterns to their corresponding alphabets.

1.STEPS:
   1.The first task was to replace the semicolons (;) with dots (.) and the colons (:) with dashes (_). for this i have used replace method satisfying the constraints.

   2.The second part of the problem was to take this Morse code and map it to the corresponding alphabet. For this, I needed to use a Morse code dictionary, which contains mappings of Morse code patterns to letters.


1.CHALLENGES:
     Initially, understanding the replacement method took time because it wasn’t immediately clear how to approach converting non-standard Morse symbols back into standard dots and dashes. I spent time researching on Google and found various methods to handle string replacements and Morse code decryption.





