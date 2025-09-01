class LoveLetterGenerator {
    constructor() {
        this.container = document.getElementById('letters-container');
        this.templates = letterTemplates;
        this.init();
    }

    init() {
        this.createLetterInterface();
    }

    createLetterInterface() {
        this.container.innerHTML = `
            <div class="letter-generator">
                <div class="letter-controls">
                    <div class="mood-selector">
                        <h3>How are you feeling?</h3>
                        <div class="mood-buttons">
                            <button class="mood-btn" data-mood="romantic">💕 Romantic</button>
                            <button class="mood-btn" data-mood="playful">😄 Playful</button>
                            <button class="mood-btn" data-mood="missing">😢 Missing You</button>
                            <button class="mood-btn" data-mood="grateful">🙏 Grateful</button>
                        </div>
                    </div>
                    <button id="generate-letter" class="generate-btn">Generate Love Letter</button>
                </div>
                <div class="letter-display">
                    <div class="letter-paper">
                        <div id="letter-content">
                            Click "Generate Love Letter" to create a personalized message!
                        </div>
                    </div>
                    <div class="letter-actions">
                        <button id="save-letter">Save Letter</button>
                        <button id="share-letter">Copy to Clipboard</button>
                    </div>
                </div>
                <div class="saved-letters">
                    <h3>Your Saved Letters</h3>
                    <div id="saved-letters-list"></div>
                </div>
            </div>
        `;

        this.addLetterListeners();
        this.loadSavedLetters();
    }

    addLetterListeners() {
        let selectedMood = 'romantic';

        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedMood = btn.dataset.mood;
            });
        });

        document.getElementById('generate-letter').addEventListener('click', () => {
            this.generateLetter(selectedMood);
        });

        document.getElementById('save-letter').addEventListener('click', () => {
            this.saveLetter();
        });

        document.getElementById('share-letter').addEventListener('click', () => {
            this.copyToClipboard();
        });
    }

    generateLetter(mood) {
        const template = this.templates[mood];
        const variables = {
            name: "Beautiful", // Customize this
            petName: "Love",
            memory: this.getRandomMemory(),
            compliment: this.getRandomCompliment(),
            futureDate: this.getFutureDateIdea()
        };

        let letter = template[Math.floor(Math.random() * template.length)];
        
        Object.keys(variables).forEach(key => {
            letter = letter.replace(new RegExp(`{${key}}`, 'g'), variables[key]);
        });

        document.getElementById('letter-content').innerHTML = letter;
    }

    getRandomMemory() {
        const memories = [
            "our first coffee date where you ordered that amazing cortado",
            "the time we got caught in the rain and laughed about it",
            "when you surprised me with homemade cookies",
            "our movie marathon night with terrible rom-coms"
        ];
        return memories[Math.floor(Math.random() * memories.length)];
    }

    getRandomCompliment() {
        const compliments = [
            "your incredible smile lights up my day",
            "the way you laugh at your own jokes",
            "how thoughtful you are with everyone",
            "your amazing taste in music"
        ];
        return compliments[Math.floor(Math.random() * compliments.length)];
    }

    getFutureDateIdea() {
        const ideas = [
            "cook a fancy dinner together over video call",
            "take an online art class together",
            "plan our next adventure to that place we talked about",
            "have a picnic in our respective local parks"
        ];
        return ideas[Math.floor(Math.random() * ideas.length)];
    }

    saveLetter() {
        const letterContent = document.getElementById('letter-content').innerHTML;
        const savedLetters = JSON.parse(localStorage.getItem('savedLetters') || '[]');
        const newLetter = {
            id: Date.now(),
            content: letterContent,
            date: new Date().toLocaleDateString()
        };
        
        savedLetters.push(newLetter);
        localStorage.setItem('savedLetters', JSON.stringify(savedLetters));
        this.loadSavedLetters();
    }

    loadSavedLetters() {
        const savedLetters = JSON.parse(localStorage.getItem('savedLetters') || '[]');
        const container = document.getElementById('saved-letters-list');
        
        if (savedLetters.length === 0) {
            container.innerHTML = '<p>No saved letters yet. Generate and save some!</p>';
            return;
        }

        container.innerHTML = savedLetters.map(letter => `
            <div class="saved-letter" data-letter-id="${letter.id}">
                <div class="letter-preview">${letter.content.substring(0, 100)}...</div>
                <div class="letter-date">${letter.date}</div>
                <button class="view-letter" data-letter-id="${letter.id}">View</button>
            </div>
        `).join('');

        document.querySelectorAll('.view-letter').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const letterId = parseInt(e.target.dataset.letterId);
                const letter = savedLetters.find(l => l.id === letterId);
                document.getElementById('letter-content').innerHTML = letter.content;
            });
        });
    }

    copyToClipboard() {
        const letterContent = document.getElementById('letter-content').textContent;
        navigator.clipboard.writeText(letterContent).then(() => {
            alert('Letter copied to clipboard!');
        });
    }
}