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
    newRec: 2, // Fixed duplicate "new" key
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

    const activityIcons = {
        sports: "🏈",
        creative: "🎨", 
        music: "🎵",
        walk: "🚶‍♂️",
        bars: "🍺",
        hike: "🥾",
        coffee: "☕",
        cocktails: "🍸",
        food: "🍽️",
        lighthearted: "😄",
        new: "🆕",
        horror: "👻",
        bake: "🧁",
        fancy: "🥂",
        newRec: "✨",
        phone: "📱",
        computer: "💻",
        board: "🎲"
    };

    const activityTimes = {
        sports: "Afternoon",
        creative: "Evening", 
        music: "Night",
        walk: "Sunset",
        bars: "Evening",
        hike: "Morning",
        coffee: "Morning",
        cocktails: "Night",
        food: "Evening",
        lighthearted: "Evening",
        new: "Evening",
        horror: "Night",
        bake: "Afternoon",
        fancy: "Evening",
        newRec: "Lunch",
        phone: "Anytime",
        computer: "Evening",
        board: "Evening"
    };

    adventureContainer.innerHTML = `
        <div class="date-plan-container">
            <h3 class="date-plan-title">Your Perfect Bear Date Adventure ❤️🐻</h3>
            <ul class="order-container">
                ${sorted.map((activity, index) => `
                    <li class="order-item">
                        <div class="order-step">
                            <div class="step-number">${index + 1}</div>
                            <div class="time-badge">${activityTimes[activity] || 'Anytime'}</div>
                            
                            <div class="activity-wrapper">
                                <div class="activity-icon">${activityIcons[activity] || '🎯'}</div>
                                <strong>${activity}</strong>

                                ${activitySuggestions[activity] ? `
                                    <div class="tooltip">
                                        <div style="font-weight: bold; margin-bottom: 8px; color: #8B4513;">💡 Suggestions:</div>
                                        ${activitySuggestions[activity].map(s => `<p>• ${s}</p>`).join("")}
                                    </div>
                                ` : ""}
                            </div>
                        </div>
                    </li>
                `).join("")}
            </ul>
            <div style="text-align: center; margin-top: 30px;">
                <button class="adventure-btn" id="restartBtn">🐻 Plan Another Bear Date</button>
            </div>
        </div>
    `;

    document.getElementById("restartBtn").addEventListener("click", () => {
        answers = {};
        chosenActivities = [];
        nextQuestion();
    });
}

nextQuestion();