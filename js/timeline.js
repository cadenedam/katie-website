class Timeline {
    constructor() {
        this.container = document.getElementById('timeline-container');
        this.init();
    }

    init() {
        this.createTimeline();
        this.addScrollAnimation();
    }

    createTimeline() {
        const timelineHTML = `
            <div class="timeline-wrapper">
                <div class="timeline-line"></div>
                ${memoriesData.map((memory, index) => this.createMemoryCard(memory, index)).join('')}
            </div>
        `;
        this.container.innerHTML = timelineHTML;
        this.addEventListeners();
    }

    createMemoryCard(memory, index) {
        const isLeft = index % 2 === 0;
        return `
            <div class="timeline-item ${isLeft ? 'left' : 'right'}" data-memory-id="${memory.id}">
                <div class="timeline-content">
                    <div class="memory-date">${this.formatDate(memory.date)}</div>
                    <div class="memory-card">
                        <img src="${memory.image}" alt="${memory.title}" class="memory-image">
                        <div class="memory-info">
                            <h3 class="memory-title">${memory.title}</h3>
                            <p class="memory-description">${memory.description}</p>
                            <div class="memory-location">
                                <i class="fas fa-map-marker-alt"></i>
                                ${memory.location}
                            </div>
                            <button class="memory-details-btn" data-memory-id="${memory.id}">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
                <div class="timeline-dot"></div>
            </div>
        `;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    addEventListeners() {
        document.querySelectorAll('.memory-details-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const memoryId = parseInt(e.target.dataset.memoryId);
                this.showMemoryModal(memoryId);
            });
        });
    }

    showMemoryModal(memoryId) {
        const memory = memoriesData.find(m => m.id === memoryId);
        const modal = document.createElement('div');
        modal.className = 'memory-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${memory.image}" alt="${memory.title}">
                <h2>${memory.title}</h2>
                <p class="modal-date">${this.formatDate(memory.date)}</p>
                <p class="modal-details">${memory.details}</p>
                <div class="modal-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${memory.location}
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    addScrollAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });
    }
}