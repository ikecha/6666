let learnedWords = []; // 学習した言葉を格納する配列

// メッセージを送信する関数
function sendMessage() {
    const inputText = document.getElementById('inputText').value;
    if (inputText) {
        addMessage(inputText, 'user');
        learn(inputText);
        document.getElementById('inputText').value = '';
    } else {
        alert('入力してください');
    }
}

// チャットにメッセージを追加する関数
function addMessage(text, sender) {
    const chat = document.getElementById('chat');
    const message = document.createElement('div');
    message.className = `message ${sender}`;
    message.innerText = text;
    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;
}

// 学習する関数
function learn(text) {
    learnedWords.push(text);
    addMessage(`学習しました: ${text}`, 'bot');
}

// 学習内容をJSONファイルとして保存する関数
function save() {
    const blob = new Blob([JSON.stringify(learnedWords, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'learned_words.json';
    a.click();
    URL.revokeObjectURL(url);
}

// JSONファイルを読み込む関数
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

// 学習した言葉をチャットに表示する関数
function displayLearnedWords() {
    const chat = document.getElementById('chat');
    chat.innerHTML = '';
    learnedWords.forEach(word => {
        addMessage(word, 'bot');
    });
}

// 初期表示のための呼び出し
displayLearnedWords();
