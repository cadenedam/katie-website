class ScavengerHunt {
    constructor() {
        this.container = document.getElementById('hunt-container');
        this.currentClue = 0;
        this.clues = scavengerClues;
        this.init();
    }

    init() {
        this.createHuntInterface();
        this.loadProgress();
    }

    createHuntInterface() {
        this.container.innerHTML = `
            <div class="scavenger-hunt">
                <div class="hunt-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(this.currentClue / this.clues.length) * 100}%"></div>
                    </div>
                    <p>Clue ${this.currentClue + 1} of ${this.clues.length}</p>
                </div>
                
                <div class="current-clue">
                    <div id="clue-content"></div>
                </div>
                
                <div class="answer-section">
                    <input type="text" id="answer-input" placeholder="Enter your answer...">
                    <button id="submit-answer">Submit Answer</button>
                    <button id="hint-button">Need a Hint?</button>
                </div>
                
                <div id="feedback-section"></div>
            </div>
        `;

        this.displayCurrentClue();
        this.addHuntListeners();
    }

    addHuntListeners() {
        document.getElementById('submit-answer').addEventListener('click', () => {
            this.checkAnswer();
        });

        document.getElementById('answer-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer();
            }
        });

        document.getElementById('hint-button').addEventListener('click', () => {
            this.showHint();
        });
    }

    displayCurrentClue() {
        if (this.currentClue >= this.clues.length) {
            this.showCompletion();
            return;
        }

        const clue = this.clues[this.currentClue];
        document.getElementById('clue-content').innerHTML = `
            <div class="clue-card">
                <div class="clue-image">
                    <img src="${clue.image}" alt="Clue image">
                </div>
                <div class="clue-text">
                    <h3>Clue ${this.currentClue + 1}</h3>
                    <p>${clue.clue}</p>
                </div>
            </div>
        `;

        document.getElementById('answer-input').value = '';
        document.getElementById('feedback-section').innerHTML = '';
    }

    checkAnswer() {
        const userAnswer = document.getElementById('answer-input').value.toLowerCase().trim();
        const correctAnswer = this.clues[this.currentClue].answer.toLowerCase();
        const alternativeAnswers = this.clues[this.currentClue].alternatives || [];

        const isCorrect = userAnswer === correctAnswer || 
                         alternativeAnswers.some(alt => alt.toLowerCase() === userAnswer);

        if (isCorrect) {
            this.showCorrectFeedback();
        } else {
            this.showIncorrectFeedback();
        }
    }

    showCorrectFeedback() {
        const clue = this.clues[this.currentClue];
        document.getElementById('feedback-section').innerHTML = `
            <div class="feedback correct">
                <h4>Correct! 🎉</h4>
                <p>${clue.successMessage}</p>
                <button id="next-clue">Next Clue</button>
            </div>
        `;

        document.getElementById('next-clue').addEventListener('click', () => {
            this.currentClue++;
            this.saveProgress();
            this.displayCurrentClue();
            this.updateProgress();
        });
    }

    showIncorrectFeedback() {
        document.getElementById('feedback-section').innerHTML = `
            <div class="feedback incorrect">
                <h4>Not quite right... 🤔</h4>
                <p>Try again! Think about our special moments together.</p>
            </div>
        `;
    }

    showHint() {
        const clue = this.clues[this.currentClue];
        document.getElementById('feedback-section').innerHTML = `
            <div class="feedback hint">
                <h4>Hint 💡</h4>
                <p>${clue.hint}</p>
            </div>
        `;
    }

    showCompletion() {
        this.container.innerHTML = `
            <div class="hunt-completion">
                <div class="completion-content">
                    <h2>Congratulations! 🏆</h2>
                    <p>You've completed our treasure hunt!</p>
                    <div class="final-message">
                        <p>Every clue represented a special moment in our relationship. Thank you for being the treasure at the end of every adventure.</p>
                        <p>I love you more than words can express, and I can't wait for all the new memories we'll create together!</p>
                    </div>
                    <button id="restart-hunt">Play Again</button>
                </div>
                <div class="celebration-animation">
                    <div class="heart">❤️</div>
                    <div class="heart">💕</div>
                    <div class="heart">💖</div>
                </div>
            </div>
        `;

        document.getElementById('restart-hunt').addEventListener('click', () => {
            this.currentClue = 0;
            this.saveProgress();
            this.createHuntInterface();
        });
    }

    updateProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.hunt-progress p');
        
        if (progressFill && progressText) {
            progressFill.style.width = `${(this.currentClue / this.clues.length) * 100}%`;
            progressText.textContent = `Clue ${this.currentClue + 1} of ${this.clues.length}`;
        }
    }

    saveProgress() {
        localStorage.setItem('scavengerProgress', this.currentClue.toString());
    }

    loadProgress() {
        const saved = localStorage.getItem('scavengerProgress');
        if (saved) {
            this.currentClue = parseInt(saved);
        }
    }
}