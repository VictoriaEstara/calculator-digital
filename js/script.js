let currentInput = "";
let lastParentheses = '';
const history = [];

//Fungsi untuk menginputkan atribut aritmatika 
function appendToDisplay(value) {
    if (value === '(' && (currentInput === '' || /[\+\-\*\/\(]$/.test(currentInput))) {
        currentInput += value;
        lastParentheses = '(';
    } else if (value === ')' && currentInput !== '' && lastParentheses === '(' && isBalancedParentheses(currentInput + value)) {
        currentInput += value;
        lastParentheses = ')';
    } else if (/[\d+\-*/%=.]/.test(value)) {
        currentInput += value;
    }
    document.getElementById("display").value = currentInput;
}

//Fungsi untuk menghapus nilai yang sudah terinput 
function clearDisplay() {
    currentInput = "";
    document.getElementById("display").value = "";
}

//Fungsi untuk mengevaluasi ekspresi matematika
function calculateExpression(expression) {
    try {
        const result = eval(expression);
        return result;
    } catch (error) {
        return "Error";
    }
}

//Fungsi untuk 
function calculateResult() {
    try {
        const result = calculateExpression(currentInput);
        document.getElementById("display").value = result;
        history.push(currentInput + ' = ' + result); // Tambahkan perhitungan ke riwayat
        appendToHistoryList(history[history.length - 1]);
        currentInput = result.toString();
    } catch (error) {
        document.getElementById("display").value = "Error";
        currentInput = "";
    }
}

//Fungsi untuk 
function toggleParentheses() {
    const parenthesesButton = document.querySelector('.btn[onclick="toggleParentheses()"]');
    if (lastParentheses === '(') {
        parenthesesButton.textContent = ")";
        appendToDisplay(')');
        lastParentheses = ')';
    } else {
        parenthesesButton.textContent = "(";
        appendToDisplay('(');
        lastParentheses = '(';
    }
}

//Untuk menampilan kolom history
function toggleHistory() {
    const historyContainer = document.getElementById('history-container');
    if (historyContainer.style.display === 'none') {
        historyContainer.style.display = 'block';
    } else {
        historyContainer.style.display = 'none';
    }
}

//Function yang menampilkan item dalam History
function appendToHistoryList(historyItem) {
    const historyList = document.getElementById('history-list');
    const listItem = document.createElement('li');
    listItem.textContent = historyItem;
    historyList.appendChild(listItem);
}

//Untuk menghilangkan History
function clearHistory() {
    history.length = 0; // Mengosongkan array riwayat
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = ''; // Menghapus semua elemen dalam daftar riwayat
}

//Untuk menampilkan tampilan light mode atau dark mode
function toggleMode(mode) {
    const body = document.body;
    const calculator = document.querySelector(".calculator");
    const buttons = document.querySelectorAll("button");
    
    if (mode === 'dark') {
        body.classList.add("dark-mode");
        calculator.classList.add("dark-mode");
        buttons.forEach((button) => {
            button.classList.add("dark-mode");
        });
    } else if (mode === 'light') {
        body.classList.remove("dark-mode");
        calculator.classList.remove("dark-mode");
        buttons.forEach((button) => {
            button.classList.remove("dark-mode");
        });
    }
}

// Menangani input dari keyboard pada elemen input
document.getElementById("display").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        calculateResult();
    }
});

// Menangani input dari keyboard (tanpa event listener yang duplikat)
document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (key === "Backspace") {
        backspace();
    }

    // Proses cross-check terhadap key: angka, operator, atau '%'?
    else if (/[\d+\-*/%=.]/.test(key)) {
        appendToDisplay(key);
    }

    // Jika tombol "Enter" ditekan, jalankan perhitungan
    else if (key === "Enter") {
        calculateResult();
    }

    // Input ( dan ) disini
    else if (key === "(" || key === ")") {
        appendToDisplay(key);
    }
});

function backspace() {
    currentInput = currentInput.slice(0, -1);
    document.getElementById("display").value = currentInput;
}

function isBalancedParentheses(expression) {
    // Menghitung jumlah kurung pembuka dan kurung penutup
    let openCount = 0;
    let closeCount = 0;

    for (let i = 0; i < expression.length; i++) {
        if (expression[i] === '(') {
            openCount++;
        } else if (expression[i] === ')') {
            closeCount++;
        }

        // Jika jumlah kurung penutup melebihi jumlah kurung pembuka, return false
        if (closeCount > openCount) {
            return false;
        }
    }

    // Return true jika jumlah kurung pembuka dan kurung penutup sama
    return openCount === closeCount;
}
