class HoneyPathLevelGenerator {
    constructor() {
        this.themes = [
            { name: "Forest Adventure", description: "Navigate the forest!", completionMessage: "Collected all forest honey!", memoryPhoto: "images/memories/forest.jpg" },
            { name: "Garden Paradise", description: "Collect honey in the garden!", completionMessage: "Honey collected!", memoryPhoto: "images/memories/garden.jpg" },
            { name: "Mountain Trail", description: "Reach the honey on the mountain!", completionMessage: "Summit honey!", memoryPhoto: "images/memories/mountain.jpg" }
        ];
    }

    generateLevel(id, difficulty = 'medium') {
        const config = this.getDifficultyConfig(difficulty);
        const theme = this.themes[Math.floor(Math.random() * this.themes.length)];
        
        const { width, height, honeyCount, obstacleRatio, moveMultiplier } = config;

        // 1️⃣ Place bear
        const bear = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };

        // 2️⃣ Generate honey positions and guaranteed path
        const { honey, path } = this.generateHoneyAndPath(bear, width, height, honeyCount);

        // 3️⃣ Place obstacles only outside the main path
        const obstacles = this.generateObstacles(width, height, path, obstacleRatio);

        const minMoves = path.length - 1;
        const maxMoves = minMoves + 1;

        return {
            id,
            name: theme.name,
            description: theme.description,
            size: { width, height },
            maxMoves,
            bear,
            honey,
            obstacles,
            completionMessage: theme.completionMessage,
            memoryPhoto: theme.memoryPhoto,
            isGenerated: true
        };
    }

    getDifficultyConfig(difficulty) {
         const configs = {
            easy: { width: 4, height: 4, honeyCount: 3, obstacleRatio: 0.1, moveMultiplier: 1.8 },
            medium: { width: 5, height: 5, honeyCount: 4, obstacleRatio: 0.15, moveMultiplier: 1.5 },
            hard: { width: 6, height: 6, honeyCount: 5, obstacleRatio: 0.2, moveMultiplier: 1.3 }
        };
        return configs[difficulty] || configs.medium;
    }

    generateHoneyAndPath(bear, width, height, honeyCount) {
        const honey = [];
        const path = [bear];
        let current = { ...bear };

        for (let i = 0; i < honeyCount; i++) {
            // Randomly walk from current to place honey
            const honeyPos = this.randomReachablePosition(current, width, height, path);
            honey.push(honeyPos);

            // Extend path with simple Manhattan walk
            const segment = this.manhattanPath(current, honeyPos);
            path.push(...segment.slice(1)); // skip current
            current = honeyPos;
        }

        return { honey, path };
    }

    randomReachablePosition(start, width, height, path) {
        let pos;
        do {
            pos = {
                x: Math.floor(Math.random() * width),
                y: Math.floor(Math.random() * height)
            };
        } while (path.some(p => p.x === pos.x && p.y === pos.y)); // avoid duplicates
        return pos;
    }

    manhattanPath(start, end) {
        const path = [{ ...start }];
        let { x, y } = start;

        while (x !== end.x || y !== end.y) {
            if (x < end.x) x++;
            else if (x > end.x) x--;
            else if (y < end.y) y++;
            else if (y > end.y) y--;
            path.push({ x, y });
        }

        return path;
    }

    generateObstacles(width, height, protectedPath, obstacleRatio) {
        const totalCells = width * height;
        const maxObstacles = Math.floor(totalCells * obstacleRatio);
        const obstacles = [];
        const blocked = new Set(protectedPath.map(p => `${p.x},${p.y}`));

        while (obstacles.length < maxObstacles) {
            const x = Math.floor(Math.random() * width);
            const y = Math.floor(Math.random() * height);
            const key = `${x},${y}`;

            if (!blocked.has(key) && !obstacles.find(o => o.x === x && o.y === y)) {
                obstacles.push({ x, y });
            }
        }

        return obstacles;
    }

}

class HoneyPathGame {
    constructor() {
        this.container = document.getElementById('games-container');
        this.gameState = 'menu'; // 'menu', 'playing', 'completed', 'failed'
        this.moves = 0;
        this.collectedHoney = 0;
        this.bearPosition = { x: 0, y: 0 };
        this.generator = new HoneyPathLevelGenerator();
        this.currentLevel = null; // Will hold the currently playing level
        this.init();
    }

    init() {
        this.createGameInterface();
        this.bindEvents();
    }

    createGameInterface() {
        this.container.innerHTML = `
            <div class="honey-path-game">
                <div class="game-header">
                    <h2>🐻 Honey Path Adventures 🍯</h2>
                    <p>Help our adorable bear collect honey while navigating through randomly generated levels!</p>
                </div>
                
                <div id="game-menu" class="game-menu">
                    <div class="level-selector">
                        <h3>Choose Your Difficulty:</h3>
                        
                        <div class="difficulty-section">
                            <div class="difficulty-controls">
                                <label for="difficulty-select">Select Difficulty:</label>
                                <select id="difficulty-select" class="difficulty-select">
                                    <option value="easy">🌱 Easy (4x4 grid, 2-3 honey)</option>
                                    <option value="medium" selected>🌿 Medium (5x5 grid, 3-4 honey)</option>
                                    <option value="hard">🌲 Hard (6x6 grid, 4-6 honey)</option>
                                </select>
                                <button id="start-game" class="control-btn start-btn">🎮 Start Adventure</button>
                            </div>
                            
                            <div class="difficulty-info">
                                <div class="difficulty-description">
                                    <h4>Difficulty Details:</h4>
                                    <div id="difficulty-details">
                                        <p><strong>Medium:</strong> 5x5 grid with 3-4 honey pieces and moderate obstacles</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="game-area" class="game-area" style="display: none;">
                    <div class="game-controls">
                        <button id="back-to-menu" class="control-btn">← Back to Menu</button>
                        <div class="game-stats">
                            <span id="moves-counter">Moves: 0/0</span>
                            <span id="honey-counter">🍯 0/0</span>
                        </div>
                        <button id="restart-level" class="control-btn">🔄 Restart</button>
                    </div>
                    
                    <div class="level-info">
                        <h3 id="level-title">Level Name</h3>
                        <p id="level-description">Level description</p>
                        <div class="level-type-indicator">
                            🎲 Randomly Generated Level
                        </div>
                    </div>
                    
                    <div id="game-grid" class="game-grid"></div>
                    
                    <div class="movement-controls">
                        <div class="arrow-keys">
                            <button id="move-up" class="arrow-btn">↑</button>
                            <div class="middle-row">
                                <button id="move-left" class="arrow-btn">←</button>
                                <div class="center-space">🐻</div>
                                <button id="move-right" class="arrow-btn">→</button>
                            </div>
                            <button id="move-down" class="arrow-btn">↓</button>
                        </div>
                        <p class="controls-hint">Use arrow keys or click buttons to move</p>
                    </div>
                </div>

                <div id="game-completion" class="game-completion" style="display: none;">
                    <div class="completion-content">
                        <div class="completion-animation">🐻🍯✨</div>
                        <h2 id="completion-title">Level Complete!</h2>
                        <p id="completion-message">Great job!</p>
                        <div id="completion-photo" class="completion-photo"></div>
                        <div class="completion-actions">
                            <button id="play-again" class="action-btn">🎲 Play Again</button>
                            <button id="change-difficulty" class="action-btn secondary">⚙️ Change Difficulty</button>
                            <button id="back-to-menu-2" class="action-btn secondary">🏠 Main Menu</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // Difficulty selection change
        document.getElementById('difficulty-select')?.addEventListener('change', () => {
            this.updateDifficultyInfo();
        });

        // Start game button
        document.getElementById('start-game')?.addEventListener('click', () => {
            this.startNewLevel();
        });

        // Game controls
        document.getElementById('back-to-menu')?.addEventListener('click', () => this.showMenu());
        document.getElementById('restart-level')?.addEventListener('click', () => this.restartLevel());
        
        // Movement controls
        document.getElementById('move-up')?.addEventListener('click', () => this.moveBear('up'));
        document.getElementById('move-down')?.addEventListener('click', () => this.moveBear('down'));
        document.getElementById('move-left')?.addEventListener('click', () => this.moveBear('left'));
        document.getElementById('move-right')?.addEventListener('click', () => this.moveBear('right'));

        // Completion screen
        document.getElementById('play-again')?.addEventListener('click', () => this.startNewLevel());
        document.getElementById('change-difficulty')?.addEventListener('click', () => this.showMenu());
        document.getElementById('back-to-menu-2')?.addEventListener('click', () => this.showMenu());

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (this.gameState !== 'playing') return;
            
            switch(e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    e.preventDefault();
                    this.moveBear('up');
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    e.preventDefault();
                    this.moveBear('down');
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    e.preventDefault();
                    this.moveBear('left');
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    e.preventDefault();
                    this.moveBear('right');
                    break;
            }
        });

        // Initialize difficulty info
        this.updateDifficultyInfo();
    }

    updateDifficultyInfo() {
        const difficulty = document.getElementById('difficulty-select').value;
        const detailsEl = document.getElementById('difficulty-details');
        
        const descriptions = {
            easy: '<p><strong>Easy:</strong> 4x4 grid with 2-3 honey pieces and few obstacles</p>',
            medium: '<p><strong>Medium:</strong> 5x5 grid with 3-4 honey pieces and moderate obstacles</p>',
            hard: '<p><strong>Hard:</strong> 6x6 grid with 4-6 honey pieces and many obstacles</p>'
        };
        
        detailsEl.innerHTML = descriptions[difficulty];
    }

    startNewLevel() {
        const difficulty = document.getElementById('difficulty-select').value;
        
        this.showMessage("🎲 Generating new adventure...", 'info');
        
        // Use setTimeout to allow UI to update
        setTimeout(() => {
            try {
                const newLevel = this.generator.generateLevel(Date.now(), difficulty);
                this.currentLevel = newLevel;
                this.startLevel();
                this.showMessage("✨ Adventure ready! Good luck! 🐻", 'success');
            } catch (error) {
                console.error('Level generation failed:', error);
                this.showMessage("⚠️ Generation failed, please try again", 'warning');
            }
        }, 100);
    }

    startLevel() {
        const level = this.currentLevel;
        if (!level) {
            this.showMessage("Level not found!", 'error');
            return;
        }
        
        this.gameState = 'playing';
        this.moves = 0;
        this.collectedHoney = 0;
        this.bearPosition = { ...level.bear };
        this.collectedPositions = [];
        
        // Update UI
        document.getElementById('game-menu').style.display = 'none';
        document.getElementById('game-area').style.display = 'block';
        document.getElementById('game-completion').style.display = 'none';
        
        document.getElementById('level-title').textContent = level.name;
        document.getElementById('level-description').textContent = level.description;
        
        this.updateStats();
        this.renderGrid();
    }

    renderGrid() {
        const level = this.currentLevel;
        if (!level) return;
        
        const grid = document.getElementById('game-grid');
        
        grid.style.gridTemplateColumns = `repeat(${level.size.width}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${level.size.height}, 1fr)`;
        
        let gridHTML = '';
        
        for (let y = 0; y < level.size.height; y++) {
            for (let x = 0; x < level.size.width; x++) {
                let cellClass = 'grid-cell';
                let cellContent = '';
                
                // Check what's in this cell
                if (this.bearPosition.x === x && this.bearPosition.y === y) {
                    cellClass += ' bear-cell';
                    cellContent = '<div class="bear">🐻</div>';
                } else if (level.honey.some(h => h.x === x && h.y === y && !this.isHoneyCollected(x, y))) {
                    cellClass += ' honey-cell';
                    cellContent = '<div class="honey">🍯</div>';
                } else if (level.obstacles.some(o => o.x === x && o.y === y)) {
                    cellClass += ' obstacle-cell';
                    cellContent = '<div class="obstacle">🌳</div>';
                }
                
                gridHTML += `<div class="${cellClass}" data-x="${x}" data-y="${y}">${cellContent}</div>`;
            }
        }
        
        grid.innerHTML = gridHTML;
    }

    moveBear(direction) {
        if (this.gameState !== 'playing') return;
        
        const level = this.currentLevel;
        if (!level) return;
        
        let newX = this.bearPosition.x;
        let newY = this.bearPosition.y;
        
        switch(direction) {
            case 'up':
                newY = Math.max(0, newY - 1);
                break;
            case 'down':
                newY = Math.min(level.size.height - 1, newY + 1);
                break;
            case 'left':
                newX = Math.max(0, newX - 1);
                break;
            case 'right':
                newX = Math.min(level.size.width - 1, newX + 1);
                break;
        }
        
        // Check if move is valid (not into obstacle)
        const isObstacle = level.obstacles.some(o => o.x === newX && o.y === newY);
        if (isObstacle) {
            this.showMessage("🌳 Bear can't walk through trees!", 'warning');
            return;
        }
        
        // Check if bear actually moved
        if (newX === this.bearPosition.x && newY === this.bearPosition.y) {
            this.showMessage("🐻 Bear bumped into the edge!", 'info');
            return;
        }
        
        // Make the move
        this.bearPosition = { x: newX, y: newY };
        this.moves++;
        
        // Check for honey collection
        const honeyAtPosition = level.honey.find(h => h.x === newX && h.y === newY);
        if (honeyAtPosition && !this.isHoneyCollected(newX, newY)) {
            this.collectHoney(newX, newY);
        }
        
        this.updateStats();
        this.renderGrid();
        
        // Check win/lose conditions
        if (this.collectedHoney === level.honey.length) {
            this.completeLevel();
        } else if (this.moves >= level.maxMoves) {
            this.failLevel();
        }
    }

    collectHoney(x, y) {
        this.collectedHoney++;
        this.showMessage("🍯 Yummy honey collected!", 'success');
        
        // Add collected position to tracking
        if (!this.collectedPositions) this.collectedPositions = [];
        this.collectedPositions.push({ x, y });
    }

    isHoneyCollected(x, y) {
        if (!this.collectedPositions) return false;
        return this.collectedPositions.some(pos => pos.x === x && pos.y === y);
    }

    updateStats() {
        const level = this.currentLevel;
        if (!level) return;
        
        document.getElementById('moves-counter').textContent = `Moves: ${this.moves}/${level.maxMoves}`;
        document.getElementById('honey-counter').textContent = `🍯 ${this.collectedHoney}/${level.honey.length}`;
    }

    completeLevel() {
        this.gameState = 'completed';
        const level = this.currentLevel;
        if (!level) return;
        
        document.getElementById('game-area').style.display = 'none';
        document.getElementById('game-completion').style.display = 'block';
        
        document.getElementById('completion-title').textContent = '🎉 Level Complete! 🎉';
        document.getElementById('completion-message').textContent = level.completionMessage;
        
        // Show memory photo if available
        if (level.memoryPhoto) {
            document.getElementById('completion-photo').innerHTML = 
                `<img src="${level.memoryPhoto}" alt="Memory photo" class="memory-photo">`;
        } else {
            document.getElementById('completion-photo').innerHTML = '';
        }
    }

    failLevel() {
        this.gameState = 'failed';
        this.showMessage("🐻 Oh no! Bear ran out of moves! Try again?", 'error');
        
        setTimeout(() => {
            const retry = confirm("Bear needs more moves! Try this level again?");
            if (retry) {
                this.restartLevel();
            } else {
                this.showMenu();
            }
        }, 2000);
    }

    restartLevel() {
        this.collectedPositions = [];
        this.startLevel();
    }

    showMenu() {
        this.gameState = 'menu';
        document.getElementById('game-menu').style.display = 'block';
        document.getElementById('game-area').style.display = 'none';
        document.getElementById('game-completion').style.display = 'none';
    }

    showMessage(message, type = 'info') {
        // Create temporary message popup
        const messageEl = document.createElement('div');
        messageEl.className = `game-message ${type}`;
        messageEl.textContent = message;
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            messageEl.classList.remove('show');
            setTimeout(() => messageEl.remove(), 300);
        }, 2000);
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on the games section
    if (document.getElementById('games-container')) {
        new HoneyPathGame();
    }
});