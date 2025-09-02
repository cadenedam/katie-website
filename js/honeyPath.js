class HoneyPathLevelGenerator {
    constructor() {
        this.themes = [
            {
                name: "Forest Adventure",
                description: "Navigate through the enchanted forest to collect magical honey!",
                completionMessage: "You've gathered all the forest honey! 🌲🍯",
                memoryPhoto: "images/memories/forest.jpg"
            },
            {
                name: "Garden Paradise",
                description: "Help bear collect honey from the beautiful flower garden!",
                completionMessage: "The garden is blooming with sweetness! 🌺🐝",
                memoryPhoto: "images/memories/garden.jpg"
            },
            {
                name: "Mountain Trail",
                description: "Climb the mountain path to reach the honey treasures!",
                completionMessage: "You've reached the summit of sweetness! 🏔️🍯",
                memoryPhoto: "images/memories/mountain.jpg"
            },
            {
                name: "Desert Oasis",
                description: "Cross the desert to find hidden honey caches!",
                completionMessage: "Sweet relief in the desert oasis! 🏜️💧",
                memoryPhoto: "images/memories/desert.jpg"
            },
            {
                name: "Beach Treasure Hunt",
                description: "Search the sandy shores for buried honey treasures!",
                completionMessage: "Treasure found by the sparkling waves! 🏖️⭐",
                memoryPhoto: "images/memories/beach.jpg"
            },
            {
                name: "City Exploration",
                description: "Discover honey shops hidden throughout the bustling city!",
                completionMessage: "Urban honey hunting complete! 🏙️🍯",
                memoryPhoto: "images/memories/city.jpg"
            },
            {
                name: "Snowy Village",
                description: "Find warm honey treats in the cozy winter village!",
                completionMessage: "Winter warmth found in every drop! ❄️🍯",
                memoryPhoto: "images/memories/snow.jpg"
            }
        ];
    }

    generateLevel(id, difficulty = 'medium') {
        const config = this.getDifficultyConfig(difficulty);
        const theme = this.themes[Math.floor(Math.random() * this.themes.length)];
        
        let attempts = 0;
        const maxAttempts = 50;
        
        while (attempts < maxAttempts) {
            try {
                const level = this.createLevel(id, config, theme);
                if (this.validateLevel(level)) {
                    return level;
                }
            } catch (error) {
                console.log(`Attempt ${attempts + 1} failed:`, error.message);
            }
            attempts++;
        }
        
        return this.createFallbackLevel(id, theme);
    }

    getDifficultyConfig(difficulty) {
        const configs = {
            easy: {
                size: { width: 4, height: 4 },
                honeyCount: { min: 2, max: 3 },
                obstacleRatio: 0.1,
                moveMultiplier: 1.8
            },
            medium: {
                size: { width: 5, height: 5 },
                honeyCount: { min: 3, max: 4 },
                obstacleRatio: 0.15,
                moveMultiplier: 1.5
            },
            hard: {
                size: { width: 6, height: 6 },
                honeyCount: { min: 4, max: 6 },
                obstacleRatio: 0.2,
                moveMultiplier: 1.3
            }
        };
        return configs[difficulty] || configs.medium;
    }

    createLevel(id, config, theme) {
        const { width, height } = config.size;
        
        const bear = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        };

        const honeyCount = Math.floor(Math.random() * (config.honeyCount.max - config.honeyCount.min + 1)) + config.honeyCount.min;
        const honey = this.generateReachableHoney(bear, config.size, honeyCount);

        const optimalPath = this.findOptimalPath(bear, honey, config.size);
        if (!optimalPath) {
            throw new Error("Could not find path through all honey");
        }

        const minMoves = optimalPath.length - 1;
        const maxMoves = Math.max(minMoves + 2, Math.ceil(minMoves * config.moveMultiplier));

        const obstacles = this.generateNonBlockingObstacles(bear, honey, config.size, config.obstacleRatio, optimalPath);

        return {
            id: id,
            name: theme.name,
            description: theme.description,
            size: config.size,
            maxMoves: maxMoves,
            bear: bear,
            honey: honey,
            obstacles: obstacles,
            completionMessage: theme.completionMessage,
            memoryPhoto: theme.memoryPhoto,
            isGenerated: true
        };
    }

    generateReachableHoney(bear, size, count) {
        const honey = [];
        const used = new Set();
        used.add(`${bear.x},${bear.y}`);

        const candidates = [{ x: bear.x, y: bear.y }];
        
        while (honey.length < count && candidates.length > 0) {
            const candidateIndex = Math.floor(Math.random() * candidates.length);
            const current = candidates[candidateIndex];
            
            const adjacent = this.getAdjacentCells(current, size)
                .filter(cell => !used.has(`${cell.x},${cell.y}`));
            
            if (adjacent.length > 0) {
                const honeyPos = adjacent[Math.floor(Math.random() * adjacent.length)];
                honey.push(honeyPos);
                used.add(`${honeyPos.x},${honeyPos.y}`);
                candidates.push(honeyPos);
            }
            
            if (adjacent.length === 0 || Math.random() < 0.3) {
                candidates.splice(candidateIndex, 1);
            }
        }

        if (honey.length < count) {
            throw new Error(`Could only generate ${honey.length} reachable honey positions out of ${count}`);
        }

        return honey;
    }

    getAdjacentCells(pos, size) {
        const adjacent = [];
        const directions = [
            { dx: 0, dy: -1 }, { dx: 1, dy: 0 },
            { dx: 0, dy: 1 }, { dx: -1, dy: 0 }
        ];

        for (const dir of directions) {
            const newX = pos.x + dir.dx;
            const newY = pos.y + dir.dy;
            
            if (newX >= 0 && newX < size.width && newY >= 0 && newY < size.height) {
                adjacent.push({ x: newX, y: newY });
            }
        }

        return adjacent;
    }

    findOptimalPath(bear, honey, size) {
        const visited = new Set();
        const path = [bear];
        let current = bear;
        
        while (visited.size < honey.length) {
            let nearest = null;
            let minDistance = Infinity;
            
            for (const h of honey) {
                const key = `${h.x},${h.y}`;
                if (!visited.has(key)) {
                    const distance = Math.abs(current.x - h.x) + Math.abs(current.y - h.y);
                    if (distance < minDistance) {
                        minDistance = distance;
                        nearest = h;
                    }
                }
            }
            
            if (nearest) {
                const pathSegment = this.findPathAStar(current, nearest, size, []);
                if (!pathSegment) {
                    return null;
                }
                
                path.push(...pathSegment.slice(1));
                visited.add(`${nearest.x},${nearest.y}`);
                current = nearest;
            } else {
                break;
            }
        }
        
        return visited.size === honey.length ? path : null;
    }

    findPathAStar(start, end, size, obstacles) {
        const openSet = [start];
        const cameFrom = new Map();
        const gScore = new Map();
        const fScore = new Map();
        
        gScore.set(`${start.x},${start.y}`, 0);
        fScore.set(`${start.x},${start.y}`, this.heuristic(start, end));
        
        const obstacleSet = new Set(obstacles.map(o => `${o.x},${o.y}`));
        
        while (openSet.length > 0) {
            let current = openSet[0];
            let currentIndex = 0;
            for (let i = 1; i < openSet.length; i++) {
                const currentKey = `${openSet[i].x},${openSet[i].y}`;
                const lowestKey = `${current.x},${current.y}`;
                if ((fScore.get(currentKey) || Infinity) < (fScore.get(lowestKey) || Infinity)) {
                    current = openSet[i];
                    currentIndex = i;
                }
            }
            
            if (current.x === end.x && current.y === end.y) {
                const path = [];
                let temp = current;
                while (temp) {
                    path.unshift(temp);
                    temp = cameFrom.get(`${temp.x},${temp.y}`);
                }
                return path;
            }
            
            openSet.splice(currentIndex, 1);
            
            for (const neighbor of this.getAdjacentCells(current, size)) {
                const neighborKey = `${neighbor.x},${neighbor.y}`;
                
                if (obstacleSet.has(neighborKey)) {
                    continue;
                }
                
                const tentativeGScore = (gScore.get(`${current.x},${current.y}`) || Infinity) + 1;
                
                if (tentativeGScore < (gScore.get(neighborKey) || Infinity)) {
                    cameFrom.set(neighborKey, current);
                    gScore.set(neighborKey, tentativeGScore);
                    fScore.set(neighborKey, tentativeGScore + this.heuristic(neighbor, end));
                    
                    if (!openSet.find(n => n.x === neighbor.x && n.y === neighbor.y)) {
                        openSet.push(neighbor);
                    }
                }
            }
        }
        
        return null;
    }

    heuristic(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    generateNonBlockingObstacles(bear, honey, size, obstacleRatio, solutionPath) {
        const obstacles = [];
        const totalCells = size.width * size.height;
        const maxObstacles = Math.floor(totalCells * obstacleRatio);
        
        const protected = new Set();
        protected.add(`${bear.x},${bear.y}`);
        honey.forEach(h => protected.add(`${h.x},${h.y}`));
        
        solutionPath.forEach(pos => {
            if (Math.random() < 0.7) {
                protected.add(`${pos.x},${pos.y}`);
            }
        });
        
        let attempts = 0;
        while (obstacles.length < maxObstacles && attempts < maxObstacles * 3) {
            const x = Math.floor(Math.random() * size.width);
            const y = Math.floor(Math.random() * size.height);
            const key = `${x},${y}`;
            
            if (!protected.has(key) && !obstacles.find(o => o.x === x && o.y === y)) {
                const testObstacles = [...obstacles, { x, y }];
                if (this.canReachAllHoney(bear, honey, size, testObstacles)) {
                    obstacles.push({ x, y });
                }
            }
            attempts++;
        }
        
        return obstacles;
    }

    canReachAllHoney(bear, honey, size, obstacles) {
        for (const h of honey) {
            const path = this.findPathAStar(bear, h, size, obstacles);
            if (!path) {
                return false;
            }
        }
        return true;
    }

    validateLevel(level) {
        if (!level.bear || !level.honey || !level.obstacles) {
            return false;
        }
        
        if (level.honey.length === 0) {
            return false;
        }
        
        const isInBounds = (pos) => 
            pos.x >= 0 && pos.x < level.size.width && 
            pos.y >= 0 && pos.y < level.size.height;
        
        if (!isInBounds(level.bear)) return false;
        if (!level.honey.every(isInBounds)) return false;
        if (!level.obstacles.every(isInBounds)) return false;
        
        return this.canReachAllHoney(level.bear, level.honey, level.size, level.obstacles);
    }

    createFallbackLevel(id, theme) {
        return {
            id: id,
            name: theme.name + " (Simple)",
            description: theme.description,
            size: { width: 4, height: 4 },
            maxMoves: 10,
            bear: { x: 0, y: 0 },
            honey: [
                { x: 1, y: 0 },
                { x: 2, y: 0 },
                { x: 3, y: 0 }
            ],
            obstacles: [
                { x: 1, y: 1 },
                { x: 2, y: 2 }
            ],
            completionMessage: theme.completionMessage,
            memoryPhoto: theme.memoryPhoto,
            isGenerated: true
        };
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