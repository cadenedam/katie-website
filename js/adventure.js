let chosenActivities = [];
let answers = {};

const activityPriority = {
    sports: 1,
    creative: 1,
    music: 1,
    walk: 2,
    bars: 2,
    hike: 2,
    coffee: 1,
    cocktails: 2,
    food: 2,
    lighthearted: 3,
    new: 3,
    horror: 3,
    bake: 3,
    fancy: 2,
    new: 2,
    phone: 3,
    computer: 3,
    board: 3
}

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
        const lastAnswer = Object.values(answers).pop();
        chosenActivities.push(lastAnswer);

        adventureContainer.innerHTML = `
            <p>Nice! You picked <strong>${lastAnswer}</strong> for your date.</p>
            <button class="adventure-btn" id="addMoreBtn">Add Another Activity</button>
            <button class="adventure-btn" id="finishBtn">Finish Planning</button>
        `;

        document.getElementById("addMoreBtn").addEventListener("click", () => {
            answers = {};
            nextQuestion();
        });

        document.getElementById("finishBtn").addEventListener("click", () => {
            renderDatePlan();
        });
    }
}

function renderDatePlan() {
    const sorted = [...chosenActivities].sort(
        (a, b) => (activityPriority[a] || 99) - (activityPriority[b] || 99)
    );

    adventureContainer.innerHTML = `
        <h3>Your Perfect Date Plan ❤️</h3>
        <ol>
            ${sorted.map(act => `<li>${act}</li>`).join("")}
        </ol>
        <button class="adventure-btn" id="restartBtn">Plan Another Date</button>
    `;

    document.getElementById("restartBtn").addEventListener("click", () => {
        answers = {};
        chosenActivities = [];
        nextQuestion();
    });
}

nextQuestion();
