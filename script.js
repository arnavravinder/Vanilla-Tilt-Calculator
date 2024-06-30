function clearDisplay() {
    document.getElementById('display').innerText = '0';
}

function deleteLast() {
    const display = document.getElementById('display');
    if (display.innerText.length > 1) {
        display.innerText = display.innerText.slice(0, -1);
    } else {
        display.innerText = '0';
    }
}

function appendSymbol(symbol) {
    const display = document.getElementById('display');
    if (display.innerText === '0' && !isNaN(symbol)) {
        display.innerText = symbol;
    } else {
        display.innerText += symbol;
    }
}

function calculateResult() {
    const display = document.getElementById('display');
    try {
        display.innerText = eval(display.innerText);
    } catch {
        display.innerText = 'Error';
    }
}

const OPENAI_API_KEY = 'enter it here';

async function sendMessage(event) {
    if (event.key && event.key !== 'Enter') return;

    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (message === '') return;

    const chatContent = document.getElementById('chat-content');
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerText = message;
    chatContent.appendChild(userMessage);

    input.value = '';

    const apiUrl = "https://api.openai.com/v1/chat/completions";

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
    };

    const body = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;

        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        botMessage.innerText = reply;
        chatContent.appendChild(botMessage);
        chatContent.scrollTop = chatContent.scrollHeight;
    } catch (error) {
        console.error('Error:', error);
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        botMessage.innerText = 'Sorry, I encountered an error.';
        chatContent.appendChild(botMessage);
    }
}

function toggleChatBox() {
    const chatBox = document.getElementById('chat-box');
    if (chatBox.style.display === 'none' || chatBox.style.display === '') {
        chatBox.style.display = 'flex';
    } else {
        chatBox.style.display = 'none';
    }
}

VanillaTilt.init(document.querySelector(".calculator"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
});
