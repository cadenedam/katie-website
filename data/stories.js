const adventureStories = {
    start: {
        text: "It's date night! Even though we're apart, we can still have an amazing time together. What sounds perfect right now?",
        image: "images/dates/start.jpg",
        choices: [
            { text: "Something cozy and relaxing", next: "cozy" },
            { text: "An adventure from home", next: "adventure" },
            { text: "Something creative together", next: "creative" }
        ]
    },
    cozy: {
        text: "Perfect choice! Let's create the ultimate cozy date. I'm lighting a candle on my end - you should too!",
        image: "images/dates/cozy.jpg",
        choices: [
            { text: "Let's cook the same meal together", next: "cooking" },
            { text: "Movie night with synchronized start", next: "movie" },
            { text: "Read to each other", next: "reading" }
        ]
    }
    // Add more story nodes...
};