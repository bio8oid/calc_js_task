'use strict';
(function () {

    class Calculator {
        constructor() {

                this.currentNumber = '',
                this.resultOfTwoNumbers = 0,
                this.mainDisplayDefault = 0,
                this.operand = '',
                this.operandStatus = false,
                this.operandsHistory = [],
                this.displayHistory = [],
                this.numbersHistory = [],
                this.totalCharactersHistory = [],
                
                this.historyDisplay = document.getElementById('history'),
                this.display = document.getElementById('main'),
                this.dotButton = document.getElementById('dot'),
                this.numberButtons = document.querySelectorAll('.number'),
                this.operatorButtons = document.querySelectorAll('.operand'),
                this.display.value = this.mainDisplayDefault,
                
                this.dotButton.addEventListener("click", () => this.disableDot()),
                this.numberButtons.forEach(button => button.addEventListener("click", e => this.handleNumbers(e))),
                this.operatorButtons.forEach(button => button.addEventListener("click", e => this.handleOperators(e)))
        }

        disableDot = () => {
            this.dotButton.disabled = true;
        }
        
        numbersHistoryHandle = () => {
            if (this.currentNumber !== '') {
                this.numbersHistory.push(Number(this.currentNumber))
                this.totalCharactersHistory.push(Number(this.currentNumber));
                this.mainDisplayDefault = this.currentNumber;
            } else {
                if (this.operandStatus === false) this.numbersHistory.push(0)
            }
        }

        operandsHistoryHandle = operand => {
            this.operandsHistory.push(operand)
            if (operand !== 'o') this.operandStatus = true;
            this.dotButton.disabled = false;
        }

        handleNumbers = e => {
            this.currentNumber += e.target.value;
            console.log('this.currentNumber:', this.currentNumber)
            if (this.currentNumber[0] === '.') {
                this.currentNumber = this.currentNumber.replace(/./g, '0.')
            }
            console.log('this.currentNumber-after:', this.currentNumber)
            this.handleDisplays(this.currentNumber);
            this.operandStatus = false;
        }

        calculation = operand => {
            console.log('calculation-operand:', operand)

            let firstNumber = this.numbersHistory[0];
            let secondNumber = this.numbersHistory[1];

            console.log('firstNumber:', firstNumber)
            console.log('secondNumber:', secondNumber)

            if (this.operandStatus === true && this.numbersHistory.length > 1 || operand === 'o' && this.mainDisplayDefault !== 0) {

                console.log('true')
                console.log('operand-after:', operand)

                switch (operand) {
                    case '+':
                        this.resultOfTwoNumbers = firstNumber + secondNumber;
                        this.handleDisplays(this.resultOfTwoNumbers);
                        break;
                    case '-':
                        this.resultOfTwoNumbers = firstNumber - secondNumber;
                        this.handleDisplays(this.resultOfTwoNumbers);
                        break;
                    case '*':
                        if (secondNumber !== 0) {
                            this.resultOfTwoNumbers = firstNumber * secondNumber;
                            this.handleDisplays(this.resultOfTwoNumbers)
                        }
                        break;
                    case '/':
                        if (secondNumber !== 0) {
                            this.resultOfTwoNumbers = firstNumber / secondNumber;
                            this.handleDisplays(this.resultOfTwoNumbers);
                        }
                        break;
                    case '%':
                        this.resultOfTwoNumbers = ((firstNumber / 100) * secondNumber);

                        if (this.operandsHistory[this.operandsHistory.length -2] !== '%') {

                            let specialOperand = this.operandsHistory[this.operandsHistory.length -2];

                            switch (specialOperand) {
                                case '+':
                                    this.resultOfThreeNumbers = firstNumber + this.resultOfTwoNumbers;
                                    this.handleDisplays(this.resultOfThreeNumbers);
                                    break;
                                case '-':
                                    this.resultOfThreeNumbers = firstNumber - this.resultOfTwoNumbers;
                                    this.handleDisplays(this.resultOfThreeNumbers);
                                    break;
                                case '*':
                                    this.resultOfThreeNumbers = firstNumber * this.resultOfTwoNumbers;
                                    this.handleDisplays(this.resultOfThreeNumbers);
                                    break;
                                case '/':
                                    this.resultOfThreeNumbers = firstNumber / this.resultOfTwoNumbers;
                                    this.handleDisplays(this.resultOfThreeNumbers);
                                    break;
                            }
                            this.resultOfTwoNumbers = this.resultOfThreeNumbers;
                        } else {
                            this.handleDisplays(this.resultOfTwoNumbers);
                        }
                        break;
                    case 'o':
                        if (Math.sign(this.display.value) === 1) {

                            this.display.value = -Math.abs(this.display.value)
                            console.log('bolek == this.display.value:', this.display.value)

                            this.historyDisplay.value = this.display.value

                            if (this.numbersHistory.length > 1) {
                                this.numbersHistory[1] = Number(this.display.value)
                            } else {
                                this.numbersHistory[0] = Number(this.display.value)
                            }

                            if (typeof this.totalCharactersHistory.length - 1 !== 'number') {
                                this.totalCharactersHistory.splice(this.totalCharactersHistory.length - 1, 1, Number(this.display.value))
                            }

                        } else {

                            this.display.value = Math.abs(this.display.value);
                            console.log('lolek == this.display.value:', this.display.value)

                            if (this.numbersHistory.length > 1) {
                                this.numbersHistory[1] = Number(this.display.value)
                            } else {
                                this.numbersHistory[0] = Number(this.display.value)
                            }
                            if (typeof this.totalCharactersHistory.length - 1 !== 'number') {
                                this.totalCharactersHistory.splice(this.totalCharactersHistory.length - 1, 1, Number(this.display.value))
                            }

                        }

                        this.operandStatus = false;

                        break;
                    default:
                        console.log(`no operand error`);
                }
                if (this.numbersHistory.length > 1 && operand !== 'o') {
                    console.log('kutas2')
                    this.numbersHistory.splice(0, 2, this.resultOfTwoNumbers);
                } else {
                    this.numbersHistory = this.numbersHistory;
                    console.log('this.numbersHistory:', this.numbersHistory)
                }
            }
        }


        handleOperators = e => {

            if (e.target.value === 'C') {

                this.clear();

            } else {

                this.operand = e.target.value;

                this.operandsHistoryHandle(this.operand);
                this.numbersHistoryHandle()
                this.currentNumber = '';

                console.log('operand-status: ', this.operandStatus)

                if (this.operand === '%' || this.operandStatus === true && this.operandsHistory.length > 1 && this.operandsHistory[this.operandsHistory.length - 2] === 'o' && this.operand !== '=') {
                    console.log('triger-1')
                    this.calculation(this.operandsHistory[this.operandsHistory.length - 1]);

                } else {

                    if (this.operandStatus === true && this.operandsHistory.length > 1 && this.operand !== '%' && this.operandsHistory[this.operandsHistory.length - 2] !== '%' || this.operand !== 'o') {

                        if (this.operand === '=' && this.operandsHistory[this.operandsHistory.length - 2] === 'o') {
                            console.log('triger-3')

                            this.calculation(this.operandsHistory[this.operandsHistory.length - 3]);
                        } else {
                            console.log('triger-2')
                            this.calculation(this.operandsHistory[this.operandsHistory.length - 2])
                        }
                    } else {
                        console.log('triger-0')
                        this.calculation(this.operand);
                    }
                }
            }

            const ArrCharacters = this.totalCharactersHistory
            const firstArrCharacter = ArrCharacters[0]
            const lastArrCharacter = ArrCharacters[ArrCharacters.length - 1]

            if (typeof lastArrCharacter === 'number') {
                if (this.operand !== 'o') ArrCharacters.push(this.operand);
            } else {
                if (this.operandsHistory[this.operandsHistory.length - 2] === '%') {

                    ArrCharacters.splice(ArrCharacters.length - 1, 1, this.operand)
                    if (this.resultOfTwoNumbers !== 0) {
                        this.totalCharactersHistory = [this.resultOfTwoNumbers, this.operand]
                    }
                } else {
                    ArrCharacters.splice(ArrCharacters.length - 1, 1, this.operand)
                }
            }

            if (typeof firstArrCharacter !== 'number') {
                ArrCharacters.splice(0, 1)
            }
            this.handleDisplays();

            console.log('operand:', this.operand)
            console.log('calky:', calky)
        }

        handleDisplays = character => {
            this.historyDisplay.value = this.totalCharactersHistory.toString().replace(/,/g, ' ');
            if (character !== undefined) this.display.value = character;
            // if (character === '.') this.display.value = character;
        }

        clear = () => {
            this.currentNumber = '';
            this.resultOfTwoNumbers = 0;
            this.mainDisplayDefault = 0;
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

})();