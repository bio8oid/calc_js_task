
'use strict';
(function () {

    // const historyDisplay = document.getElementById('history');
    // historyDisplay.value = 'test'

    // const display = document.getElementById('main') 
    // display.value = 1

    class Calculator {
        constructor() {

            this.currentNumber = '',
            this.resultOfTwoNumbers = 0,
            this.operand = '',
            this.operandsHistory = [],
            this.displayHistory = [],
            this.numbersHistory = [],
            this.totalCharactersHistory = [],

            this.historyDisplay = document.getElementById('history'),
            this.display = document.getElementById('main'),
            this.display.value = 0
        }

        handleDisplays = x => {
            this.historyDisplay.value = this.totalCharactersHistory.toString().replace(/,/g, ' ');
            if (typeof x === 'string') this.display.value = x;
        }

        numbersHistoryHandle = () => {
            if (this.currentNumber !== '') {
                this.numbersHistory.push(Number(this.currentNumber))
                this.totalCharactersHistory.push(Number(this.currentNumber));
            }
        }

        operandsHistoryHandle = () => {
            this.operandsHistory.push(this.operand)
        }

        handleNumbers = e => {
            this.currentNumber += e.target.value;
            console.log('this.currentNumber:', this.currentNumber)
            this.handleDisplays(this.currentNumber);
        }

        handleOperators = e => {

            // store numbers
            this.numbersHistoryHandle()
            this.currentNumber = '';

            // store operators
            if (e.target.value === 'C') {
                this.clear();
            } else {
                this.operand = e.target.value
            }
            const charactersArr = this.totalCharactersHistory
            const lastCharacter = charactersArr[charactersArr.length - 1]

            if (typeof lastCharacter === 'number') {
                charactersArr.push(this.operand);
            } else {
                charactersArr.splice(charactersArr.length - 1, 1, this.operand)
            }


            this.handleDisplays();

            console.log('operand:', this.operand)
            console.log('calky:', calky)
        }

        handleButtons = e => {

        }

        clear = () => {
            this.currentNumber = '';
            this.resultOfTwoNumbers = 0;
            this.operand = '';
            this.operandsHistory = [];
            this.displayHistory = [];
            this.numbersHistory = [];
            this.totalCharactersHistory = [];
            this.historyDisplay.value = 0;
            this.display.value = 0;
        }
    }


    const calky = new Calculator();

    const allButtons = document.querySelectorAll('button');
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator')

    for (const button of allButtons) button.addEventListener("click", e => calky.handleButtons(e));
    for (const button of numberButtons) button.addEventListener("click", e => calky.handleNumbers(e));
    for (const button of operatorButtons) button.addEventListener("click", e => calky.handleOperators(e));


    //     const resultDisplay = document.getElementById('result')
    //     const allButtons = document.querySelectorAll('button')
    //     const cancelButton = document.getElementById('cancel')
    //     const posNegButton = document.getElementById('positive-negative')
})();