
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

                // this.allButtons = document.querySelectorAll('button'),
                this.numberButtons = document.querySelectorAll('.number'),
                // this.numberButtonsDisabled = document.querySelectorAll('.number').disable,
                this.operatorButtons = document.querySelectorAll('.operator'),

                this.numberButtons.forEach(button => button.addEventListener("click", e => this.handleNumbers(e))),
                this.operatorButtons.forEach(button => button.addEventListener("click", e => this.handleOperators(e))),
            // for (const button of this.numberButtons) button.addEventListener("click", e => calky.handleNumbers(e));
            // for (const button of this.operatorButtons) button.addEventListener("click", e => calky.handleOperators(e));

                this.historyDisplay = document.getElementById('history'),
                this.display = document.getElementById('main'),
                this.display.value = 0
        }



        // numbersHistoryHandle = num => {
        //     if (num !== '') {
        //         this.numbersHistory.push(Number(num))
        //         this.totalCharactersHistory.push(Number(num));
        //     } else {
        //     if (this.operandStatus === false) this.numbersHistory.push(0)
        //         this.numbersHistory.push(0)
        // this.numbersHistory.push(num)
        //     }
        // }

        numbersHistoryHandle = num => {
            if (this.currentNumber !== '') {
                this.numbersHistory.push(Number(this.currentNumber))
                this.totalCharactersHistory.push(Number(this.currentNumber));
            } else {
                if (this.operandStatus === false) this.numbersHistory.push(0)
                // this.numbersHistory.push(num)
            }
        }

        operandsHistoryHandle = operand => {
            this.operandsHistory.push(operand)
            // this.operandStatus = true;
            if (operand !== 'o') this.operandStatus = true;
        }

        handleNumbers = e => {
            this.currentNumber += e.target.value;
            // this.numbersHistoryHandle();
            this.handleDisplays(this.currentNumber);
            this.operandStatus = false;

            // this.operatorButtons.disabled = false;
        }

        calculation = operand => {
            console.log('calculation-operand:', operand)

            let firstNumber = this.numbersHistory[0];
            let secondNumber = this.numbersHistory[1];

            console.log('firstNumber:', firstNumber)
            console.log('secondNumber:', secondNumber)

            if (this.operandStatus === true && this.numbersHistory.length > 1 || operand === 'o') {
                console.log('true')

            //     // operand = this.totalCharactersHistory[this.totalCharactersHistory - 2]
            //     if (operand === '=' && this.operandsHistory.length > 1 && this.operandsHistory[this.operandsHistory.length - 1] === 'o') {

            //         operand = this.operandsHistory[this.operandsHistory.length - 2]
            //         console.log('shock 1', this.operandsHistory[this.operandsHistory.length - 2])

            //     }

            //     // else {
            //     //     operand = this.operandsHistory[this.operandsHistory.length - 2]
            //     // }

            //     if (operand === '=' && this.operandsHistory.length > 1 && this.operandsHistory[this.operandsHistory.length - 2] === 'o') {

            //         operand = this.operandsHistory[this.operandsHistory.length - 3]
            //         console.log('shock', this.operandsHistory[this.operandsHistory.length - 3])

            //     }
            //     else {
            //         operand = this.operandsHistory[this.operandsHistory.length - 1]
            //     }


                // } 
                /// causes last operand problem
                // if (operand === '=' && this.operandsHistory.length > 1 ) {
                //     operand = this.operandsHistory[this.operandsHistory.length - 2]

                //     if (this.operandsHistory[this.operandsHistory.length - 2] === 'o') {
                //         operand = this.operandsHistory[this.operandsHistory.length - 3]
                //     }
                // } 

                // else {
                //     operand = this.operandsHistory[this.operandsHistory.length - 2]
                // }
                // if (operand === 'o') {
                //     operand = this.operandsHistory[this.operandsHistory.length - 1]

                // if (this.operandsHistory.length > 1 && this.operandsHistory[this.operandsHistory.length - 1] === 'o') {
                //     operand = this.operandsHistory[this.operandsHistory.length - 2]
                // } else {
                //     operand = this.operandsHistory[this.operandsHistory.length - 1]
                //     }

                // } else {


                //     operand = this.operandsHistory[this.operandsHistory.length - 2]
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
                        this.handleDisplays(this.resultOfTwoNumbers);
                        break;
                    case 'o':
                        if (Math.sign(this.display.value) === 1) {

                            this.display.value = -Math.abs(this.display.value)
                            console.log('bolek == this.display.value:', this.display.value)

                            this.historyDisplay.value = this.display.value

                            // this.numbersHistory = this.display.value
                            if (this.numbersHistory.length > 1) {
                                // this.numbersHistory.push(Number(this.display.value))
                                this.numbersHistory[1] = Number(this.display.value)
                            } else {
                                this.numbersHistory[0] = Number(this.display.value)
                            }

                            // this.totalCharactersHistory = [Number(this.display.value)]

                            if (typeof this.totalCharactersHistory.length - 1 !== 'number') {
                                this.totalCharactersHistory.splice(this.totalCharactersHistory.length - 1, 1, Number(this.display.value))
                            }


                            // this.operandStatus = true;

                        } else {

                            this.display.value = Math.abs(this.display.value);
                            console.log('lolek == this.display.value:', this.display.value)

                            if (this.numbersHistory.length > 1) {
                                // this.numbersHistory.push(Number(this.display.value))
                                this.numbersHistory[1] = Number(this.display.value)
                            } else {
                                this.numbersHistory[0] = Number(this.display.value)
                            }

                            // this.totalCharactersHistory = [Number(this.display.value)]

                            if (typeof this.totalCharactersHistory.length - 1 !== 'number') {
                                this.totalCharactersHistory.splice(this.totalCharactersHistory.length - 1, 1, Number(this.display.value))
                            }

                            // this.operandStatus = true;

                        }
                        // console.log('kutas')

                        // if (Math.sign(this.numbersHistory[this.numbersHistory -1]) === 1) {

                        //     this.display.value = -Math.abs(this.numbersHistory[this.numbersHistory - 1])
                        //     console.log('=====this.display.value:', this.display.value)

                        //     this.historyDisplay.value = this.display.value

                        //     this.numbersHistory = this.display.value

                        //     this.totalCharactersHistory.splice(this.totalCharactersHistory.length - 1, 1, this.display.value)

                        // } else {

                        //     this.display.value = Math.abs(this.numbersHistory[this.numbersHistory - 1]);

                        //     this.historyDisplay.value = this.display.value;

                        //     this.totalCharactersHistory.splice(this.totalCharactersHistory.length - 1, 1, this.display.value)

                        // }
                        this.operandStatus = false;

                        break;
                    default:
                        console.log(`no operand error`);
                }
                if (this.numbersHistory.length > 1 && operand !== 'o') {
                    // if (this.numbersHistory.length > 1 ) {
                    console.log('kutas2')
                    this.numbersHistory.splice(0, 2, this.resultOfTwoNumbers);
                } else {
                    this.numbersHistory = this.numbersHistory;
                    console.log('this.numbersHistory:', this.numbersHistory)
                }
            }
        }


        handleOperators = e => {

            // this.operandStatus = true;
            // this.operatorButtonsDisabled = true;
            // this.operatorButtons.disabled = true;

            // set and add entered numbers to memory

            if (e.target.value === 'C') {

                this.clear();

            } else {

                this.operand = e.target.value;
                // add entered numbers to memory
                this.operandsHistoryHandle(this.operand);
                
                // this.numbersHistoryHandle(this.currentNumber)
                this.numbersHistoryHandle()
                this.currentNumber = '';
                
                console.log('operand-status: ', this.operandStatus)

                if (this.operand === '%' || 
                // this.operandStatus === false && this.operand === 'o' && this.operandsHistory.length > 1 ||
                    this.operandStatus === true && this.operandsHistory.length > 1 && this.operandsHistory[this.operandsHistory.length - 2] === 'o' && this.operand !== '='
                // this.operandsHistory.length > 1 && this.operand !== 'o' && this.operandsHistory[this.operandsHistory.length - 2] === 'o'
                
                ) {
                    console.log('triger-1')
                    this.calculation(this.operandsHistory[this.operandsHistory.length - 1]);
                } else {

                    if (this.operandStatus === true && this.operandsHistory.length > 1 && this.operand !== '%' && this.operandsHistory[this.operandsHistory.length - 2] !== '%' || this.operand !== 'o' || this.operand === '=' || this.operandStatus === false && this.operand === '=') {
    
                    //     if (this.operand === '=' ) {
                        console.log('triger-2')
                        
                    //     this.calculation(this.operandsHistory[this.operandsHistory.length - 3]);
                    // }
                    //     if (this.operand === '=' || this.operand === '+' || this.operand === '-' || this.operand === '*' || this.operand === '/' || this.operand === '=' && this.operandsHistory[this.operandsHistory.length - 1] === 'o') {
                    //     console.log('triger-2')
                    //     // if (this.operand === '=' || this.operand === '+' || this.operand === '-' || this.operand === '*' || this.operand === '/' || this.operand === '=' && this.operandsHistory[this.operandsHistory.length - 1] === 'o') {
                    //     // console.log('triger-2')
                        
                        this.calculation(this.operandsHistory[this.operandsHistory.length - 2])
                    // }
                    // this.calculation(this.operandsHistory[this.operandsHistory.length - 2])
                    // if (this.operand === 'o') {
                    //     console.log('triger-3')
                    //         this.calculation(this.operandsHistory[this.operandsHistory.length - 1])
                    //     }
                    } else {
    
    
                        console.log('triger-0')
                        this.calculation(this.operand);
                    }
                }


                // if (this.operandStatus === true && this.numbersHistory.length > 1 || this.operand === 'o') {
                //     console.log('true')

                    // if (this.operand === '=' && this.operandsHistory.length > 1 && this.operandsHistory[this.operandsHistory.length - 1] === 'o') {

                    //     this.calculation(this.operandsHistory[this.operandsHistory.length - 2])
                    //     console.log('shock 1', this.operandsHistory[this.operandsHistory.length - 2])

                    // }
                    // if (this.operand === '=' && this.operandsHistory.length > 1 && this.operandsHistory[this.operandsHistory.length - 2] === 'o') {

                    //     this.calculation(this.operandsHistory[this.operandsHistory.length - 3])
                    //     console.log('shock', this.operandsHistory[this.operandsHistory.length - 3])

                    // }
                    // else {
                    //     this.calculation(this.operandsHistory[this.operandsHistory.length - 1])
                    // }
                // }
                
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
            // this.operatorButtons.disabled = true;
            // this.operatorButtonsDisabled = true;

            console.log('operand:', this.operand)
            console.log('calky:', calky)
        }


        // handleButtons = e => {
        // }



        handleDisplays = (x, y) => {
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

    // const allButtons = document.querySelectorAll('button');
    // const numberButtons = document.querySelectorAll('.number');
    // const operatorButtons = document.querySelectorAll('.operator')

    // for (const button of allButtons) button.addEventListener("click", e => calky.handleButtons(e));
    // for (const button of numberButtons) button.addEventListener("click", e => calky.handleNumbers(e));
    // for (const button of operatorButtons) button.addEventListener("click", e => calky.handleOperators(e));

    //     const resultDisplay = document.getElementById('result')
    //     const allButtons = document.querySelectorAll('button')
    //     const cancelButton = document.getElementById('cancel')
    //     const posNegButton = document.getElementById('positive-negative')
})();


// Always add 0 when decimal pressed === fuck it
// negative positive not working again
