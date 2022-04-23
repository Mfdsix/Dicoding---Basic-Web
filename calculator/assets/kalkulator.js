'use strict';

const calculator = {
    displayNumber: 0,
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false,
    lastInput: null,
};
const buttons = document.querySelectorAll(".button");

for(let button of buttons) {
    button.addEventListener("click", function(event) {
        const target = event.target;

        if(target.classList.contains("clear")){
            clearCalculator();
            updateDisplay();
            return;
        }

        if(target.classList.contains("negative")){
            inverseNumber();
            updateDisplay();
            return;
        }

        if(target.classList.contains("equals")){
            performCalculation();
            updateDisplay();
            return;
        }

        if(target.classList.contains("operator")){
            handleOperator(target.innerText);
            updateDisplay();
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    })
}

function updateDisplay(){
    document.querySelector("#displayNumber").innerHTML = calculator.displayNumber.toString();
    document.querySelector("#lastInput").innerHTML = calculator.lastInput;
}

function inputDigit(digit){
    if(calculator.displayNumber == '0'){
        calculator.displayNumber = digit;
    }else{
        calculator.displayNumber += digit;
    }
}

function clearCalculator(){
    calculator.displayNumber = 0;
    calculator.firstNumber = null;
    calculator.operator = null;
    calculator.waitingForSecondNumber = false;
}

function inverseNumber(){
    if(calculator.displayNumber == '0'){
        return;
    }

    calculator.displayNumber *= -1;
}

function handleOperator(operator){
    if(!calculator.waitingForSecondNumber){
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;
        calculator.lastInput = calculator.displayNumber + " " + calculator.operator;

        calculator.displayNumber = '0';
    }else{
        alert("Operator Sudah Ditetapkan");
    }
}

function performCalculation(){
    if(calculator.firstNumber == null || calculator.operator == null){
        alert("Anda belum menetapkan operator");
        return;
    }

    let result = 0;
    if(calculator.operator == "+"){
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    }else{
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    }

    calculator.operator = null;
    calculator.waitingForSecondNumber = false;
    calculator.displayNumber = result;
    calculator.lastInput = null;
}