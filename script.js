let display = document.getElementById('display');
let currentInput = '0';
let memoryValue = 0;  // 新增記憶變數

function updateDisplay() {
    display.textContent = currentInput;
}

function appendToDisplay(value) {
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function calculate() {
    try {
        currentInput = eval(currentInput).toString();
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
        setTimeout(() => {
            currentInput = '0';
            updateDisplay();
        }, 1500);
    }
}

function calculatePercentage() {
    try {
        currentInput = (eval(currentInput) / 100).toString();
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
        setTimeout(() => {
            currentInput = '0';
            updateDisplay();
        }, 1500);
    }
}


function getCurrentValue() {
    try {
        if (currentInput === 'Error' || currentInput.trim() === '') {
            return null;
        }

        let value = Number(eval(currentInput));

        if (!Number.isFinite(value)) {
            return null;
        }

        return value;
    } catch (error) {
        return null;
    }
}

// M+ 記憶加法
function memoryAdd() {
    let value = getCurrentValue();

    if (value === null) return;

    memoryValue += value;

    currentInput = '0';
    updateDisplay();
    showMemoryIndicator();
}

// M- 記憶減法
function memorySubtract() {
    let value = getCurrentValue();

    if (value === null) return;

    memoryValue -= value;

    currentInput = '0';
    updateDisplay();
    showMemoryIndicator();
}

// MR 記憶讀取
function memoryRecall() {
    currentInput = String(memoryValue);
    updateDisplay();
}

// MC 記憶清除
function memoryClear() {
    memoryValue = 0;
    hideMemoryIndicator();
}

// 記憶指示燈
function showMemoryIndicator() {
    display.style.borderLeft = '5px solid #ff9800';
}

function hideMemoryIndicator() {
    display.style.borderLeft = 'none';
}
// 新增科學計算函數
function scientificCalc(operation) {
    try {
        let value = eval(currentInput);
        let result;
        
        switch(operation) {
            case 'sin':
                result = Math.sin(value * Math.PI / 180);
                break;
            case 'cos':
                result = Math.cos(value * Math.PI / 180);
                break;
            case 'tan':
                result = Math.tan(value * Math.PI / 180);
                break;
            case 'log':
                result = Math.log10(value);
                break;
            case 'sqrt':
                result = Math.sqrt(value);
                break;
            case 'pow':
                result = Math.pow(value, 2);
                break;
            default:
                result = value;
        }
        
        currentInput = result.toString();
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
        setTimeout(() => {
            currentInput = '0';
            updateDisplay();
        }, 1500);
    }
}