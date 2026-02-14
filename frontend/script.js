document.addEventListener('DOMContentLoaded', () => {
    let userId = '';
    let questions = [];
    let currentIndex = 0;
    let score = 0;

    const loginButton = document.getElementById('login-btn');
    const registerButton = document.getElementById('register-btn');
    const nextButton = document.getElementById('next-btn');

    loginButton?.addEventListener('click', async () => {
        const email = document.getElementById('email')?.value.trim();
        const password = document.getElementById('password')?.value.trim();
        if (!email || !password) return alert('Email and password required');

        const res = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (data.userId) { userId = data.userId; startQuiz(); }
        else alert(data.error);
    });

    registerButton?.addEventListener('click', async () => {
        const username = document.getElementById('username')?.value.trim();
        const email = document.getElementById('reg-email')?.value.trim();
        const level = document.getElementById('level')?.value.trim();
        const password = document.getElementById('reg-password')?.value.trim();
        if (!username || !email || !level || !password) return alert('All fields required');

        const res = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, level, password })
        });
        const data = await res.json();
        alert(data.message || data.error);
    });

    nextButton?.addEventListener('click', () => {
        const selected = document.querySelector('input[name="option"]:checked');
        if (!selected) return alert('Choose an option');
        if (selected.value === questions[currentIndex].answer) score++;
        currentIndex++;
        if (currentIndex < questions.length) showQuestion();
        else finishQuiz();
    });

    async function startQuiz() {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';

        const res = await fetch('http://localhost:3000/api/questions');
        questions = await res.json();
        currentIndex = 0;
        score = 0;
        showQuestion();
    }

    function showQuestion() {
        const q = questions[currentIndex];
        const questionDiv = document.getElementById('question');
        const optionsDiv = document.getElementById('options');
        questionDiv.innerText = q.question;
        optionsDiv.innerHTML = '';
        q.options.forEach(opt => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="radio" name="option" value="${opt}"> ${opt}`;
            optionsDiv.appendChild(label);
            optionsDiv.appendChild(document.createElement('br'));
        });
    }

    async function finishQuiz() {
        document.getElementById('quiz-container').innerHTML = `<h2>Your Score: ${score} / ${questions.length}</h2>`;
        await fetch('http://localhost:3000/api/scores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: userId, score })
        });
    }
});
