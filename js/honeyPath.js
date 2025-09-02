class HoneyPathGame {
    constructor() {
        this.container = document.getElementById('games-container');
        this.currentLevel = 0;
        this.gameState = 'menu'; // 'menu', 'playing', 'completed', 'failed'
        this.moves = 0;
        this.collectedHoney = 0;
        this.bearPosition = { x: 0, y: 0 };
        this.levels = honeyPathLevels;
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
                    <p>Help our adorable bear collect honey while navigating through our favorite places!</p>
                </div>
                
                <div id="game-menu" class="game-menu">
                    <div class="level-selector">
                        <h3>Choose Your Adventure:</h3>
                        <div class="levels-grid">
                            ${this.levels.map((level, index) => `
                                <div class="level-card ${index === 0 ? 'unlocked' : 'locked'}" data-level="${index}">
                                    <div class="level-number">${index + 1}</div>
                                    <div class="level-name">${level.name}</div>
                                    <div class="level-description">${level.description}</div>
                                    <div class="level-stats">
                                        <span>🍯 ${level.honey.length}</span>
                                        <span>👣 ${level.maxMoves}</span>
                                    </div>
                                </div>
                            `).join('')}
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
                            <button id="next-level" class="action-btn">Next Level</button>
                            <button id="replay-level" class="action-btn secondary">Replay</button>
                            <button id="back-to-menu-2" class="action-btn secondary">Menu</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // Level selection
        document.querySelectorAll('.level-card.unlocked').forEach(card => {
            card.addEventListener('click', (e) => {
                const levelIndex = parseInt(e.currentTarget.dataset.level);
                this.startLevel(levelIndex);
            });
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
        document.getElementById('next-level')?.addEventListener('click', () => this.nextLevel());
        document.getElementById('replay-level')?.addEventListener('click', () => this.restartLevel());
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
    }

    startLevel(levelIndex) {
        this.currentLevel = levelIndex;
        const level = this.levels[levelIndex];
        
        this.gameState = 'playing';
        this.moves = 0;
        this.collectedHoney = 0;
        this.bearPosition = { ...level.bear };
        
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
        const level = this.levels[this.currentLevel];
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
        
        const level = this.levels[this.currentLevel];
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
        const level = this.levels[this.currentLevel];
        document.getElementById('moves-counter').textContent = `Moves: ${this.moves}/${level.maxMoves}`;
        document.getElementById('honey-counter').textContent = `🍯 ${this.collectedHoney}/${level.honey.length}`;
    }

    completeLevel() {
        this.gameState = 'completed';
        const level = this.levels[this.currentLevel];
        
        document.getElementById('game-area').style.display = 'none';
        document.getElementById('game-completion').style.display = 'block';
        
        document.getElementById('completion-title').textContent = '🎉 Level Complete! 🎉';
        document.getElementById('completion-message').textContent = level.completionMessage;
        
        // Show memory photo if available
        if (level.memoryPhoto) {
            document.getElementById('completion-photo').innerHTML = 
                `<img src="${level.memoryPhoto}" alt="Memory photo" class="memory-photo">`;
        }
        
        // Unlock next level
        this.unlockNextLevel();
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

    unlockNextLevel() {
        if (this.currentLevel + 1 < this.levels.length) {
            // Unlock next level in menu
            const nextLevelCard = document.querySelector(`[data-level="${this.currentLevel + 1}"]`);
            if (nextLevelCard) {
                nextLevelCard.classList.remove('locked');
                nextLevelCard.classList.add('unlocked');
                nextLevelCard.addEventListener('click', (e) => {
                    const levelIndex = parseInt(e.currentTarget.dataset.level);
                    this.startLevel(levelIndex);
                });
            }
            
            // Show/hide next level button
            document.getElementById('next-level').style.display = 'block';
        } else {
            document.getElementById('next-level').style.display = 'none';
            document.getElementById('completion-title').textContent = '🏆 All Levels Complete! 🏆';
            document.getElementById('completion-message').textContent = 
                'Amazing! You and bear have collected honey from all our favorite places! 💕';
        }
    }

    nextLevel() {
        if (this.currentLevel + 1 < this.levels.length) {
            this.startLevel(this.currentLevel + 1);
        }
    }

    restartLevel() {
        this.collectedPositions = [];
        this.startLevel(this.currentLevel);
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