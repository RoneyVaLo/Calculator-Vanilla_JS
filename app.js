const screen = document.getElementById('operation');
const numbers = document.getElementsByClassName('number');
const reset = document.getElementById('reset');
const deleteNum = document.getElementById('delete');
const equal = document.getElementById('equal');
const divide = document.getElementById('divide');
const multiply = document.getElementById('multiply');
const subtract = document.getElementById('subtract');
const add = document.getElementById('add');
const decimal = document.getElementById('decimal');


let isDecimal = false;
let operation = "";


//? Clear screen data

const deleteData = () => {
    if (screen.textContent !== "0") {
        console.log(screen.textContent.length);
        if (screen.textContent.length !== 1) {
            let text = screen.textContent;
            screen.textContent = text.slice(0, -1);
            operation = text.slice(0, -1);
        } else {
            screen.textContent = "0";
            operation = "";
        };

        isDecimal = false;

    }
};


//? Display data on screen
//* Numbers

const writeNumber = (value) => {
    if (!isDecimal && screen.textContent === "0") {
        screen.textContent = value;
        operation += value;
    } else {
        screen.textContent += value;
        operation += value;
    };
};

const handleOnClickNumber = (e) => {
    writeNumber(e.target.textContent);
};

//* Operators

const writeOperator = (value, visualCharacter) => {
    if (!isDecimal && screen.textContent !== "0") {
        screen.textContent += visualCharacter;
        operation += value;
    } else if (isDecimal) {
        screen.textContent += value;
        operation += value;
    }
};

const handleOnClickOperator = (value) => {
    let visualCharacter = "\u002B";

    switch (value) {
        case "*":
            visualCharacter = "\u00D7";
            break;
        case "/":
            visualCharacter = "\u00F7";
            break;
        case "-":
            visualCharacter = "\u2212";
            break;
    };
    writeOperator(value, visualCharacter);
};


//? Get the result of the operation

const getOperationResult = () => {
    try {
        const result = eval(operation);
        operation = result;
        screen.textContent = result.toString().slice(0, 9);
        isDecimal = false;
    } catch (error) {
        screen.textContent = "OPERACION INVALIDA!!";
        screen.textContent = "";
        console.error("Error en el calculo: ", error);
    }
};


//? Event assignment for each buttons
//TODO: OBTENER EL VALOR DE LOS NÚMEROS CUANDO SE CLICAN LAS TECLAS

for (const number of numbers) {
    number.addEventListener('click', (e) => handleOnClickNumber(e));
};

reset.addEventListener('click', () => screen.textContent = "0");
deleteNum.addEventListener('click', deleteData);
divide.addEventListener('click', () => handleOnClickOperator(decodeURIComponent(divide.value)));
multiply.addEventListener('click', () => handleOnClickOperator(multiply.value));
subtract.addEventListener('click', () => handleOnClickOperator(subtract.value));
add.addEventListener('click', () => handleOnClickOperator(add.value));
decimal.addEventListener('click', () => { isDecimal = true; writeOperator(decimal.textContent) });

equal.addEventListener('click', getOperationResult);
