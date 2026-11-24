let display = document.getElementById('display');

let currentInput = '0';
let memoryValue = 0;

// 更新顯示
function updateDisplay() {
    display.textContent = currentInput;
}

// 數字輸入
function appendToDisplay(value) {

    if (currentInput === 'Error') {
        currentInput = '0';
    }

    let operators = ['+', '-', '*', '/'];

    if (operators.includes(value)) {

        if (operators.includes(currentInput.slice(-1))) {
            currentInput = currentInput.slice(0, -1);
        }

        currentInput += value;

    } else if (value === '.') {

        let parts = currentInput.split(/[+\-*/]/);
        let lastNumber = parts[parts.length - 1];

        if (lastNumber.includes('.')) return;

        currentInput += '.';

    } else {

        if (currentInput === '0') {
            currentInput = value;
        } else {
            currentInput += value;
        }
    }

    updateDisplay();
}

// 清除畫面
function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

// 刪除最後一個字元
function deleteLast() {

    if (currentInput === 'Error') {
        currentInput = '0';
    } else if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }

    updateDisplay();
}

// 安全處理計算結果
function formatResult(value) {

    if (!Number.isFinite(value)) {
        throw new Error('Invalid result');
    }

    return String(Number(value.toPrecision(12)));
}

// 計算
function calculate() {

    try {

        if (!/^[0-9+\-*/.()\s]+$/.test(currentInput)) {
            throw new Error('Invalid input');
        }

        let result = eval(currentInput);

        currentInput = formatResult(result);

        updateDisplay();

    } catch (error) {

        showError();
    }
}

// 百分比
function calculatePercentage() {

    try {

        if (!/^[0-9+\-*/.()\s]+$/.test(currentInput)) {
            throw new Error('Invalid input');
        }

        let result = eval(currentInput) / 100;

        currentInput = formatResult(result);

        updateDisplay();

    } catch (error) {

        showError();
    }
}

// 錯誤顯示
function showError() {

    currentInput = 'Error';
    updateDisplay();

    setTimeout(() => {

        if (currentInput === 'Error') {
            currentInput = '0';
            updateDisplay();
        }

    }, 1500);
}

// 取得目前數值
function getCurrentValue() {

    try {

        if (currentInput === 'Error') {
            return null;
        }

        if (!/^[0-9+\-*/.()\s]+$/.test(currentInput)) {
            return null;
        }

        let value = eval(currentInput);

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

    currentInput = formatResult(memoryValue);

    updateDisplay();
}

// MC 清除記憶
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

// 科學計算
function applyScientificOp() {

    let select = document.getElementById('scientificOp');

    let operation = select.value;

    if (!operation) return;

    let value = getCurrentValue();

    if (value === null) {
        showError();
        select.value = '';
        return;
    }

    let result;

    switch (operation) {

        case 'sin':
            result = Math.sin(value * Math.PI / 180);
            break;

        case 'cos':
            result = Math.cos(value * Math.PI / 180);
            break;

        case 'tan':

            if (Math.abs(Math.cos(value * Math.PI / 180)) < 1e-12) {
                result = NaN;
            } else {
                result = Math.tan(value * Math.PI / 180);
            }

            break;

        case 'log':
            result = value > 0 ? Math.log10(value) : NaN;
            break;

        case 'sqrt':
            result = value >= 0 ? Math.sqrt(value) : NaN;
            break;

        case 'pow':
            result = Math.pow(value, 2);
            break;

        default:
            result = value;
    }

    try {

        currentInput = formatResult(result);

        updateDisplay();

    } catch (error) {

        showError();
    }

    select.value = '';
}
