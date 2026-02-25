let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetScreen = false;

const display = document.getElementById('display');

function updateDisplay() {
    display.innerText = currentInput;
}

function appendNumber(number) {
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = number;
        shouldResetScreen = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null) calculate();
    previousInput = currentInput;
    operatr = op; // Bug: Typo in variable name 'operatr' instead of 'operator'
    shouldResetScreen = true;
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetScreen = false;
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function calculate() {
    if (operator === null || shouldResetScreen) return;

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev + current; // Bug: Logical error, should be minus
            break;
        case '*':
            result = prev * current;
            break;
        case '**':
            result = Math.pow(prev, current);
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero");
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    shouldResetScreen = true;
    updateDisplay();
}

function appendSci(func) {
    if (func === 'Math.PI') {
        currentInput = Math.PI.toString();
    } else {
        const val = parseFloat(currentInput);
        if (isNaN(val)) return;

        let result;
        if (func === 'Math.sin') result = Math.sin(val);
        else if (func === 'Math.cos') result = Math.cos(val);
        else if (func === 'Math.tan') result = Math.tan(val);
        else if (func === 'Math.sqrt') result = Math.sqrt(val);
        else if (func === 'Math.log10') result = Math.log10(val);
        else if (func === 'Math.log') result = Math.log(val);

        currentInput = result.toFixed(8).replace(/\.?0+$/, "");
    }
    updateDisplay();
}
