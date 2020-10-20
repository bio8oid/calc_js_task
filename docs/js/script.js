"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _defineProperty(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}!function(){var o=new function e(){var s=this;_classCallCheck(this,e),_defineProperty(this,"disableDot",function(){s.dotButton.disabled=!0}),_defineProperty(this,"numbersHistoryHandle",function(){""!==s.currentNumber?(s.numbersHistory.push(Number(s.currentNumber)),s.totalCharactersHistory.push(Number(s.currentNumber)),s.mainDisplayDefault=s.currentNumber):!1===s.operandStatus&&s.numbersHistory.push(0)}),_defineProperty(this,"operandsHistoryHandle",function(e){s.operandsHistory.push(e),"o"!==e&&(s.operandStatus=!0),s.dotButton.disabled=!1}),_defineProperty(this,"handleNumbers",function(e){s.currentNumber+=e.target.value,console.log("this.currentNumber:",s.currentNumber),"."===s.currentNumber[0]&&(s.currentNumber=s.currentNumber.replace(/./g,"0.")),console.log("this.currentNumber-after:",s.currentNumber),s.handleDisplays(s.currentNumber),s.operandStatus=!1}),_defineProperty(this,"calculation",function(e){console.log("calculation-operand:",e);var r=s.numbersHistory[0],t=s.numbersHistory[1];if(console.log("firstNumber:",r),console.log("secondNumber:",t),!0===s.operandStatus&&1<s.numbersHistory.length||"o"===e&&0!==s.mainDisplayDefault){switch(console.log("true"),console.log("operand-after:",e),e){case"+":s.resultOfTwoNumbers=r+t,s.handleDisplays(s.resultOfTwoNumbers);break;case"-":s.resultOfTwoNumbers=r-t,s.handleDisplays(s.resultOfTwoNumbers);break;case"*":0!==t&&(s.resultOfTwoNumbers=r*t,s.handleDisplays(s.resultOfTwoNumbers));break;case"/":0!==t&&(s.resultOfTwoNumbers=r/t,s.handleDisplays(s.resultOfTwoNumbers));break;case"%":if(s.resultOfTwoNumbers=r/100*t,"%"!==s.operandsHistory[s.operandsHistory.length-2]){switch(s.operandsHistory[s.operandsHistory.length-2]){case"+":s.resultOfThreeNumbers=r+s.resultOfTwoNumbers,s.handleDisplays(s.resultOfThreeNumbers);break;case"-":s.resultOfThreeNumbers=r-s.resultOfTwoNumbers,s.handleDisplays(s.resultOfThreeNumbers);break;case"*":s.resultOfThreeNumbers=r*s.resultOfTwoNumbers,s.handleDisplays(s.resultOfThreeNumbers);break;case"/":s.resultOfThreeNumbers=r/s.resultOfTwoNumbers,s.handleDisplays(s.resultOfThreeNumbers)}s.resultOfTwoNumbers=s.resultOfThreeNumbers}else s.handleDisplays(s.resultOfTwoNumbers);break;case"o":1===Math.sign(s.display.value)?(s.display.value=-Math.abs(s.display.value),console.log("bolek == this.display.value:",s.display.value),s.historyDisplay.value=s.display.value):(s.display.value=Math.abs(s.display.value),console.log("lolek == this.display.value:",s.display.value)),1<s.numbersHistory.length?s.numbersHistory[1]=Number(s.display.value):s.numbersHistory[0]=Number(s.display.value),_typeof(s.totalCharactersHistory.length)-1!=="number"&&s.totalCharactersHistory.splice(s.totalCharactersHistory.length-1,1,Number(s.display.value)),s.operandStatus=!1;break;default:console.log("no operand error")}1<s.numbersHistory.length&&"o"!==e?(console.log("kutas2"),s.numbersHistory.splice(0,2,s.resultOfTwoNumbers)):(s.numbersHistory=s.numbersHistory,console.log("this.numbersHistory:",s.numbersHistory))}}),_defineProperty(this,"handleOperators",function(e){"C"===e.target.value?s.clear():(s.operand=e.target.value,s.operandsHistoryHandle(s.operand),s.numbersHistoryHandle(),s.currentNumber="",console.log("operand-status: ",s.operandStatus),"%"===s.operand||!0===s.operandStatus&&1<s.operandsHistory.length&&"o"===s.operandsHistory[s.operandsHistory.length-2]&&"="!==s.operand?(console.log("triger-1"),s.calculation(s.operandsHistory[s.operandsHistory.length-1])):!0===s.operandStatus&&1<s.operandsHistory.length&&"%"!==s.operand&&"%"!==s.operandsHistory[s.operandsHistory.length-2]||"o"!==s.operand?"="===s.operand&&"o"===s.operandsHistory[s.operandsHistory.length-2]?(console.log("triger-3"),s.calculation(s.operandsHistory[s.operandsHistory.length-3])):(console.log("triger-2"),s.calculation(s.operandsHistory[s.operandsHistory.length-2])):(console.log("triger-0"),s.calculation(s.operand)));var r=s.totalCharactersHistory,t=r[0];"number"==typeof r[r.length-1]?"o"!==s.operand&&r.push(s.operand):"%"===s.operandsHistory[s.operandsHistory.length-2]?(r.splice(r.length-1,1,s.operand),0!==s.resultOfTwoNumbers&&(s.totalCharactersHistory=[s.resultOfTwoNumbers,s.operand])):r.splice(r.length-1,1,s.operand),"number"!=typeof t&&r.splice(0,1),s.handleDisplays(),console.log("operand:",s.operand),console.log("calky:",o)}),_defineProperty(this,"handleDisplays",function(e){s.historyDisplay.value=s.totalCharactersHistory.toString().replace(/,/g," "),void 0!==e&&(s.display.value=e)}),_defineProperty(this,"clear",function(){s.currentNumber="",s.resultOfTwoNumbers=0,s.mainDisplayDefault=0,s.operand="",s.operandsHistory=[],s.displayHistory=[],s.numbersHistory=[],s.totalCharactersHistory=[],s.historyDisplay.value=0,s.display.value=0}),this.currentNumber="",this.resultOfTwoNumbers=0,this.mainDisplayDefault=0,this.operand="",this.operandStatus=!1,this.operandsHistory=[],this.displayHistory=[],this.numbersHistory=[],this.totalCharactersHistory=[],this.historyDisplay=document.getElementById("history"),this.display=document.getElementById("main"),this.dotButton=document.getElementById("dot"),this.numberButtons=document.querySelectorAll(".number"),this.operatorButtons=document.querySelectorAll(".operand"),this.display.value=this.mainDisplayDefault,this.dotButton.addEventListener("click",function(){return s.disableDot()}),this.numberButtons.forEach(function(e){return e.addEventListener("click",function(e){return s.handleNumbers(e)})}),this.operatorButtons.forEach(function(e){return e.addEventListener("click",function(e){return s.handleOperators(e)})})}}();