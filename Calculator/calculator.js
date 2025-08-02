// Calculator State
let calculatorState = {
    display: '0',
    previousValue: null,
    operation: null,
    waitingForNewValue: false,
    history: ''
};

// DOM Elements
const displayElement = document.getElementById('display');
const historyElement = document.getElementById('history');

// Update Display
function updateDisplay() {
    displayElement.textContent = calculatorState.display;
    historyElement.textContent = calculatorState.history;
}

// Input Number
function inputNumber(num) {
    if (calculatorState.waitingForNewValue) {
        calculatorState.display = num;
        calculatorState.waitingForNewValue = false;
    } else {
        calculatorState.display = calculatorState.display === '0' ? num : calculatorState.display + num;
    }
    updateDisplay();
}

// Input Decimal
function inputDecimal() {
    if (calculatorState.waitingForNewValue) {
        calculatorState.display = '0.';
        calculatorState.waitingForNewValue = false;
    } else if (calculatorState.display.indexOf('.') === -1) {
        calculatorState.display += '.';
    }
    updateDisplay();
}

// Clear All
function clearAll() {
    calculatorState = {
        display: '0',
        previousValue: null,
        operation: null,
        waitingForNewValue: false,
        history: ''
    };
    updateDisplay();
}

// Clear Entry
function clearEntry() {
    calculatorState.display = '0';
    updateDisplay();
}

// Perform Operation
function performOperation(nextOperation) {
    const inputValue = parseFloat(calculatorState.display);

    if (calculatorState.previousValue === null) {
        calculatorState.previousValue = inputValue;
        calculatorState.operation = nextOperation;
        calculatorState.waitingForNewValue = true;
        calculatorState.history = `${inputValue} ${getOperationSymbol(nextOperation)}`;
    } else if (calculatorState.operation && !calculatorState.waitingForNewValue) {
        const currentValue = calculatorState.previousValue || 0;
        const result = performCalculation(currentValue, inputValue, calculatorState.operation);
        
        calculatorState.display = String(result);
        calculatorState.previousValue = result;
        calculatorState.operation = nextOperation;
        calculatorState.waitingForNewValue = true;
        calculatorState.history = nextOperation ? `${result} ${getOperationSymbol(nextOperation)}` : `${calculatorState.history} ${inputValue} =`;
    } else {
        calculatorState.operation = nextOperation;
        calculatorState.waitingForNewValue = true;
        calculatorState.history = `${calculatorState.previousValue} ${getOperationSymbol(nextOperation)}`;
    }
    
    updateDisplay();
}

// Calculate Result
function calculate() {
    performOperation('');
}

// Perform Calculation
function performCalculation(firstValue, secondValue, operation) {
    switch (operation) {
        case '+':
            return firstValue + secondValue;
        case '-':
            return firstValue - secondValue;
        case '*':
            return firstValue * secondValue;
        case '/':
            return secondValue !== 0 ? firstValue / secondValue : 0;
        case '%':
            return firstValue % secondValue;
        default:
            return secondValue;
    }
}

// Get Operation Symbol for Display
function getOperationSymbol(operation) {
    switch (operation) {
        case '+': return '+';
        case '-': return '−';
        case '*': return '×';
        case '/': return '÷';
        case '%': return '%';
        default: return '';
    }
}

// Toggle Sign
function toggleSign() {
    const current = parseFloat(calculatorState.display);
    calculatorState.display = String(-current);
    updateDisplay();
}

// Backspace
function backspace() {
    if (calculatorState.display.length > 1) {
        calculatorState.display = calculatorState.display.slice(0, -1);
    } else {
        calculatorState.display = '0';
    }
    updateDisplay();
}

// Reciprocal (1/x)
function reciprocal() {
    const current = parseFloat(calculatorState.display);
    if (current !== 0) {
        calculatorState.display = String(1 / current);
        updateDisplay();
    }
}

// Keyboard Support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Prevent default behavior for calculator keys
    if ('0123456789+-*/.%='.includes(key) || key === 'Enter' || key === 'Escape' || key === 'Backspace') {
        event.preventDefault();
    }
    
    // Handle different key types
    if (key >= '0' && key <= '9') {
        inputNumber(key);
    } else if (key === '.') {
        inputDecimal();
    } else if (key === '+') {
        performOperation('+');
    } else if (key === '-') {
        performOperation('-');
    } else if (key === '*') {
        performOperation('*');
    } else if (key === '/') {
        performOperation('/');
    } else if (key === '%') {
        performOperation('%');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        clearAll();
    } else if (key === 'Backspace') {
        backspace();
    }
});

// Button Press Visual Feedback
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(2px)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = '';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Initialize Display
updateDisplay();