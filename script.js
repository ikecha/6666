// script.js

let learnedWords = [];

function learn() {
    const inputText = document.getElementById('inputText').value;
    if (inputText) {
        learnedWords.push(inputText);
        document.getElementById('inputText').value = '';
        displayLearnedWords();
    } else {
        alert('入力してください');
    }
}

function displayLearnedWords() {
    document.getElementById('output').innerText = JSON.stringify(learnedWords, null, 2);
}

function save() {
    const blob = new Blob([JSON.stringify(learnedWords, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'learned_words.json';
    a.click();
    URL.revokeObjectURL(url);
}

function load(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            learnedWords = JSON.parse(e.target.result);
            displayLearnedWords();
        };
        reader.readAsText(file);
    }
}

function loadFile() {
    document.getElementById('fileInput').click();
}

// Display initial learned words if any
displayLearnedWords();
