let currentPhotoIndex;
let score = 0;

function startGame() {
    score = 0;
    loadNewPhoto();
}

function loadNewPhoto() {
    currentPhotoIndex = Math.floor(Math.random() * photos.length);
    console.log('photos length:', photos.length);
    const photo = photos[currentPhotoIndex];
    document.getElementById('photo').src = photo.src;
    document.getElementById('dateInput').value = "";
    document.getElementById('locationInput').value = "";
    document.getElementById('feedback').value = "";
}

function checkAnswers() {
    const photo = photos[currentPhotoIndex];
    console.log('Current photo:', photo);

    const dateGuess = document.getElementById('dateInput').value.trim();
    console.log('Date guess:', dateGuess);
    console.log('Actual date:', photo.date);
    const locationGuess = document.getElementById('locationInput').value.trim().toLowerCase();

    let correct = 0;

    if (dateGuess.includes(photo.date.toLowerCase())) {
        correct++;
    }
    if (locationGuess.includes(photo.location.toLowerCase())) {
        correct++;
    }

    if (correct === 2) {
        score++;
        loadNewPhoto();
    } else {
        alert(`Incorrect. The correct date was ${photo.date} and location was ${photo.location}. Your final score is ${score}. Starting a new game.`);
        startGame();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on the games section
    if (document.getElementById('hunt-container')) {
        startGame();
    }
});