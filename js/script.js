
'use strict';
(function () {

    class Calculator {
        constructor() {

            this.currentNumber = '',
                this.resultOfTwoNumbers = 0,
                this.operand = '',
                this.operandStatus = false,
                this.operandsHistory = [],
                this.displayHistory = [],
                this.numbersHistory = [],
                this.totalCharactersHistory = [],

                this.historyDisplay = document.getElementById('history'),
                this.display = document.getElementById('main'),
                this.display.value = 0
        }

        numbersHistoryHandle = num => {
            if (this.currentNumber !== '') {
                this.numbersHistory.push(Number(this.currentNumber))
                this.totalCharactersHistory.push(Number(this.currentNumber));
            } else {
                this.numbersHistory.push(0)
                // this.numbersHistory.push(num)
            }
        }

        operandsHistoryHandle = operand => {
            this.operandsHistory.push(operand)
            this.operandStatus = true;
        }

        handleNumbers = e => {
            this.currentNumber += e.target.value;
            // this.numbersHistoryHandle();
            this.handleDisplays(this.currentNumber);
            this.operandStatus = false;
        }

        calculation = operand => {
            console.log('calculation-operand:', operand)

            let firstNumber = this.numbersHistory[0];
            let secondNumber = this.numbersHistory[1];

            console.log('firstNumber:', firstNumber)
            console.log('secondNumber:', secondNumber)

            if (this.operandStatus === true && this.numbersHistory.length > 1) {
                // if (operand === '=' && this.operandsHistory.length > 1 ) {
                //     operand = this.operandsHistory[this.operandsHistory.length - 2]
                // } else {
                //     operand = this.operandsHistory[this.operandsHistory.length - 1]
                // }
                console.log('operand-after:', operand)

                switch (operand) {
                    case '+':
                        // console.log('case +:', firstNumber + secondNumber)
                        this.resultOfTwoNumbers = firstNumber + secondNumber;
                        // console.log('this.resultOfTwoNumbers:', this.resultOfTwoNumbers)
                        this.handleDisplays(this.resultOfTwoNumbers);
                        break;
                    case '-':
                        this.resultOfTwoNumbers = firstNumber - secondNumber;
                        this.handleDisplays(this.resultOfTwoNumbers);
                        break;
                    case '*':
                        this.resultOfTwoNumbers = firstNumber * secondNumber;
                        this.handleDisplays(this.resultOfTwoNumbers);
                        break;
                    case '/':
                        this.resultOfTwoNumbers = firstNumber / secondNumber;
                        this.handleDisplays(this.resultOfTwoNumbers);
                        break;
                    case '%':
                        this.resultOfTwoNumbers = ((firstNumber / 100) * secondNumber);
                        this.handleDisplays(this.resultOfTwoNumbers);
                        // this.historyDisplay.value = this.resultOfTwoNumbers
                        // this.currentNumber = this.resultOfTwoNumbers;
                        break;
                    case '+-':
                        if (Math.sign(this.display.value) === 1 ) {

                            this.display.value = -Math.abs(this.display.value)
                            console.log('this.display.value:', this.display.value)

                            this.historyDisplay.value = this.display.value

                            this.numbersHistory = this.display.value

                            this.totalCharactersHistory.splice(this.totalCharactersHistory.length -1, 1, this.display.value)

                        } else {

                            this.display.value = Math.abs(this.display.value);

                            this.historyDisplay.value = this.display.value;

                            this.totalCharactersHistory.splice(this.totalCharactersHistory.length -1, 1, this.display.value)

                        }
                        this.operandStatus = false;
                        break;
                    default:
                        console.log(`no prerand error`);
                }
                if ( this.numbersHistory.length > 1 ) {
                    this.numbersHistory.splice(0, 2, this.resultOfTwoNumbers);
                } else {
                    this.numbersHistory = this.numbersHistory;
                }
            }
        }

        handleOperators = e => {


            // set and add entered numbers to memory

            // if (e.target.value === 'C') {
            if (e.target.value === 'C') {

                this.clear();

            } else {
               
                this.operand = e.target.value;
                this.operandsHistoryHandle(this.operand);
                
                // add entered numbers to memory
                this.numbersHistoryHandle()
                this.currentNumber = '';
    
                // if (this.operandsHistory[this.operandsHistory.length - 1] === '%') {
                //                 console.log('kutas')
                //                 this.handleDisplays(this.resultOfTwoNumbers, this.resultOfTwoNumbers);

                if (this.operandsHistory.length > 1 && this.operand !== '%' && this.operandsHistory[this.operandsHistory.length - 2] !== '%') {

                    console.log('fired')
                    this.calculation(this.operandsHistory[this.operandsHistory.length -2]);
                    // this.operandsHistory.splice(0, 1);
                } else {
                    this.calculation(this.operand);
                        
                    // } 
                }
            }

            const ArrCharacters = this.totalCharactersHistory
            const lastArrCharacter = ArrCharacters[ArrCharacters.length - 1]

            if (typeof lastArrCharacter === 'number') {
                if (this.operand !== '+-') ArrCharacters.push(this.operand);
            } else {
                if (this.operandsHistory[this.operandsHistory.length - 2] === '%') {
                    ArrCharacters.splice(ArrCharacters.length - 1, 1, this.operand)
                    this.totalCharactersHistory = [this.resultOfTwoNumbers, this.operand]
                } else {
                    ArrCharacters.splice(ArrCharacters.length - 1, 1, this.operand)
                }

            }
  
            this.handleDisplays();

            console.log('operand:', this.operand)
            console.log('calky:', calky)
        }


        handleButtons = e => {

        }

        handleDisplays = (x,y) => {
            // if (y !== undefined) {
            //     console.log('y:', y)
            //     this.historyDisplay.value = this.totalCharactersHistory.toString().replace(/,/g, '0');
            // } else {
                this.historyDisplay.value = this.totalCharactersHistory.toString().replace(/,/g, ' ');
                // this.display.value = [];
            // }
            if (x !== undefined) this.display.value = x;
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