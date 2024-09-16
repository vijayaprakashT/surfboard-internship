# PROBLEM SOLVE 7
     
     QUESTION:
           Your computer has received a message in Morse Code. However instead of the .s and _s, its replaced with ; and :. Everything else seems to be in the same structure as standard Morse code. How will you program your computer to this decrypt message. -> Eg: ;: :;;; ;:; ;: ;;;; ;: ::

           1.CONSTRAINTS :  
                  1.instead of : - semicolon , ;-colon  we have to use morse dot and line.
                  2. we have convert the example input to morse code.
                  3. after that decrypt the morse code symbol and convert into alphabets.



## CODE:
         function decodeMorse(morseCode) {
    let ref = { 
      '.-':     'a',
      '-...':   'b',
      '-.-.':   'c',
      '-..':    'd',
      '.':      'e',
      '..-.':   'f',
      '--.':    'g',
      '....':   'h',
      '..':     'i',
      '.---':   'j',
      '-.-':    'k',
      '.-..':   'l',
      '--':     'm',
      '-.':     'n',
      '---':    'o',
      '.--.':   'p',
      '--.-':   'q',
      '.-.':    'r',
      '...':    's',
      '-':      't',
      '..-':    'u',
      '...-':   'v',
      '.--':    'w',
      '-..-':   'x',
      '-.--':   'y',
      '--..':   'z',
      '.----':  '1',
      '..---':  '2',
      '...--':  '3',
      '....-':  '4',
      '.....':  '5',
      '-....':  '6',
      '--...':  '7',
      '---..':  '8',
      '----.':  '9',
      '-----':  '0',
    };
    let result = '';
    let code = morseCode.split('   ');  
  
    code.forEach(word => {
      let symbols = word.split(' '); 
      symbols.forEach(symbol => {
        if (ref[symbol] !== undefined) {
          result += ref[symbol]; 
        }
      });
      result += ' ';
    });
  
    return result.trim(); 
  }
  
   let message = ";: :;;; ;:; ;: ;;;; ;: ::"; .
   let morseCode = message.replace(/;/g, ".").replace(/:/g, "-");.
   console.log(morseCode);.
   let decode = decodeMorse(morseCode);.
   console.log("decoded message:" + decode).
  
  
       1.STEPS TO SOLVE:
             1. start.
             2. create function and set name  decodeMorse and pass morseCode.
             3. inside the function set ref and intialize morse code symbols for alphabets with alphabets.
             4.set result.
             5.set code and intialize the formal arguement and use split function to spilt the words.
             6.use foreach condition to check each and every element.
             7.using foreach loop and set symbols and intialize words.split() function to spilting the morse code.
             8.after splitting the morsecode its checking the ref variable which code has which alphabet 
             9.if its available it will add result + symbol and store it in result and it will update the result.
             10.if its not it will not update again loop continues untill satisfying the condition.
             11.after all this use trim function to remove space between the letters.
             12. return result.trim().
             13. outside the function set message and intialize the input .
             14.set morseCode and inside that use replace method to convert all the semicolon and colon to dot and line(morsecode) .
             15.print morseCode.
             16.set decode and calling back function.
             17.print decode.