class LoveGames {
    constructor() {
        this.container = document.getElementById('games-container');
        this.currentGame = null;
        this.init();
    }

    init() {
        this.createGameMenu();
    }

    createGameMenu() {
        this.container.innerHTML = `
            <div class="games-menu">
                <div class="game-card" data-game="wordle">
                    <i class="fas fa-heart"></i>
                    <h3>Love Wordle</h3>
                    <p>Guess words that mean something to us</p>
                </div>
                <div class="game-card" data-game="connections">
                    <i class="fas fa-link"></i>
                    <h3>Our Connections</h3>
                    <p>Find groups in our shared memories</p>
                </div>
                <div class="game-card" data-game="crossword">
                    <i class="fas fa-th"></i>
                    <h3>Memory Crossword</h3>
                    <p>Clues about our relationship</p>
                </div>
            </div>
            <div id="game-area"></div>
        `;

        this.addGameListeners();
    }

    addGameListeners() {
        document.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const gameType = card.dataset.game;
                this.startGame(gameType);
            });
        });
    }

    startGame(gameType) {
        const gameArea = document.getElementById('game-area');
        
        switch(gameType) {
            case 'wordle':
                this.createWordleGame(gameArea);
                break;
            case 'connections':
                this.createConnectionsGame(gameArea);
                break;
            case 'crossword':
                this.createCrosswordGame(gameArea);
                break;
        }
    }

    createWordleGame(container) {
        const words = ['PARIS', 'PIZZA', 'BEACH', 'MOVIE', 'DANCE'];
        const targetWord = words[Math.floor(Math.random() * words.length)];
        
        container.innerHTML = `
            <div class="wordle-game">
                <h3>Guess Our Special Word!</h3>
                <div class="wordle-grid"></div>
                <div class="wordle-keyboard"></div>
                <button class="back-to-menu">Back to Games</button>
            </div>
        `;

        // Implement Wordle logic here
        this.setupWordleLogic(targetWord);
    }

    // Add more game implementations...
}