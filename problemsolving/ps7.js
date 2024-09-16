// Problem 7


// Your computer has received a message in Morse Code. However instead of the .s
// and _s, its replaced with ; and :. Everything else seems to be in the same
// structure as standard Morse code. How will you program your computer to this
// decrypt message. -> Eg: ;: :;;; ;:; ;: ;;;; ;: ::

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
  
  let message = ";: :;;; ;:; ;: ;;;; ;: ::"; 
  let morseCode = message.replace(/;/g, ".").replace(/:/g, "-");
  console.log(morseCode);
  let decode = decodeMorse(morseCode);
  console.log("decoded message:" + decode)
  