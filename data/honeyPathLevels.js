const honeyPathLevels = [
    {
        id: 1,
        name: "Coffee Shop Memories",
        description: "Remember our first coffee date? Help bear collect all the honey lattes!",
        size: { width: 4, height: 4 },
        maxMoves: 8,
        bear: { x: 0, y: 0 },
        honey: [
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 3 }
        ],
        obstacles: [
            { x: 1, y: 2 },
            { x: 2, y: 1 }
        ],
        completionMessage: "Perfect! Just like how sweet our first coffee date was! ☕❤️",
        memoryPhoto: "images/memories/coffee.jpg"
    },
    {
        id: 2,
        name: "Park Picnic Adventure",
        description: "Navigate through our favorite park to collect honey sandwiches!",
        size: { width: 5, height: 4 },
        maxMoves: 12,
        bear: { x: 0, y: 2 },
        honey: [
            { x: 2, y: 0 },
            { x: 4, y: 1 },
            { x: 3, y: 3 },
            { x: 1, y: 3 }
        ],
        obstacles: [
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 1 }
        ],
        completionMessage: "Amazing! This reminds me of our perfect picnic day! 🧺🌳",
        memoryPhoto: "images/memories/picnic.jpg"
    },
    {
        id: 3,
        name: "Movie Night Marathon",
        description: "Collect honey popcorn before the movie starts!",
        size: { width: 6, height: 5 },
        maxMoves: 18,
        bear: { x: 0, y: 0 },
        honey: [
            { x: 2, y: 1 },
            { x: 4, y: 2 },
            { x: 5, y: 4 },
            { x: 1, y: 4 },
            { x: 3, y: 3 }
        ],
        obstacles: [
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 1 },
            { x: 4, y: 3 },
            { x: 2, y: 4 }
        ],
        completionMessage: "Perfect timing! Ready for our movie marathon! 🍿🎬",
        memoryPhoto: "images/memories/movie-night.jpg"
    }
];