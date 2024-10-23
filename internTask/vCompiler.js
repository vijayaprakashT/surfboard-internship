const fs = require('fs');

// Define token types
const TOKENS = {
    ADD: 'ADD',
    IDENTIFIER: 'IDENTIFIER',
    NUMBER: 'NUMBER',
    EQUALS: 'EQUALS',
    SEMICOLON: 'SEMICOLON',
    PLUS: 'PLUS'
};

// Tokenize the input code
function tokenize(code) {
    const tokens = [];
    const regex = /\s*(=>|{|}|[a-zA-Z_]\w*|\d+|[=;+\-*/])\s*/g;
    let match;

    while ((match = regex.exec(code))) {
        const value = match[1];
        if (!isNaN(value)) {
            tokens.push({ type: TOKENS.NUMBER, value });
        } else if (value === 'add') {
            tokens.push({ type: TOKENS.ADD, value });
        } else if (value === '=') {
            tokens.push({ type: TOKENS.EQUALS, value });
        } else if (value === ';') {
            tokens.push({ type: TOKENS.SEMICOLON, value });
        } else if (value === '+') {
            tokens.push({ type: TOKENS.PLUS, value });
        } else {
            tokens.push({ type: TOKENS.IDENTIFIER, value });
        }
    }
    return tokens;
}

// Evaluate the tokens
function evaluate(tokens) {
    const variables = {};

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (token.type === TOKENS.ADD) {
            const varType = tokens[i + 1]; // Get the data type
            const varName = tokens[i + 2]; // Get the variable name
            const equalsSign = tokens[i + 3]; // Expect '='
            const value = tokens[i + 4]; // Get the value

            if (varType.type === TOKENS.IDENTIFIER && varType.value === 'num' && value.type === TOKENS.NUMBER) {
                variables[varName.value] = parseInt(value.value, 10); // Store as integer
            }

            // Move the index past the processed tokens
            i += 4; // Move to the next statement
        } else if (token.type === TOKENS.IDENTIFIER && token.value === 'result') {
            // Get the identifiers for first and second variables
            const varName1 = tokens[i - 3]; // Get the first variable (should be first)
            const plusSign = tokens[i - 2]; // Expect '+'
            const varName2 = tokens[i - 1]; // Get the second variable (should be second)
            const semicolon = tokens[i + 1]; // Expect ';'

            if (
                varName1.type === TOKENS.IDENTIFIER &&
                varName2.type === TOKENS.IDENTIFIER &&
                variables[varName1.value] !== undefined &&
                variables[varName2.value] !== undefined
            ) {
                // Perform the addition and store the result
                variables[token.value] = variables[varName1.value] + variables[varName2.value];
            }

            // Move the index past the processed tokens
            i += 1; // Move to the next statement
        }
    }

    return variables;
}

// Read and parse the .v file
const fileName = 'program.v'; // Replace with your actual file name
fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }

    const tokens = tokenize(data);
    console.log('Tokens:', tokens);

    const result = evaluate(tokens);
    console.log('Result:', result);
});
