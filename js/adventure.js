let answers = {};

const adventureContainer = document.getElementById('adventure-container');

function renderQuestion(question) {
    adventureContainer.innerHTML = `
        <p class="adventure-text">${question.text}</p>
        <div class="adventure-choices">
            ${question.options.map(opt => `<button class="adventure-btn" data-value="${opt.value}">${opt.text}</button>`).join('')}
        </div>
    `;

    document.querySelectorAll('.adventure-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            answers[question.id] = btn.dataset.value;
            nextQuestion();
        });
    });
}

function nextQuestion() {
    const nextQ = dateQuestions.find(q =>
        !answers[q.id] &&
        (!q.dependsOn || answers[q.dependsOn.questionId] === q.dependsOn.value)
    );

    if (nextQ) {
        renderQuestion(nextQ);
    } else {
        renderDatePlan();
    }
}

function renderDatePlan() {
    adventureContainer.innerHTML = `
        <h3>Your Perfect Date Plan ❤️</h3>
        <ul>
            ${Object.keys(answers).map(key => `<li><strong>${key.replace("_", " ")}:</strong> ${answers[key]}</li>`).join('')}
        </ul>
        <button class="adventure-btn" id="restartBtn">Plan Another Date</button>
    `;

    document.getElementById("restartBtn").addEventListener("click", () => {
        answers = {};
        nextQuestion();
    });
}

nextQuestion();
