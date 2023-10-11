const words = ["apple", "banana", "carrot", "dog", "elephant", "football"];


const randomIndex = Math.floor(Math.random() * words.length);
const selectedWord = words[randomIndex];


let guessedLetters = [];
let remainingAttempts = 6;


function updateWordDisplay() {
    const wordDisplay = document.getElementById("word-display");
    let displayText = "";

    for (const letter of selectedWord) {
        if (guessedLetters.includes(letter)) {
            displayText += letter + " ";
        } else {
            displayText += "_ ";
        }
    }

    wordDisplay.textContent = displayText;
}


function checkWin() {
    if (selectedWord.split("").every(letter => guessedLetters.includes(letter))) {
        alert("Você venceu! A palavra era: " + selectedWord);
        resetGame();
    }
}


function updateHangmanImage() {
    const hangmanImage = document.getElementById("hangman-image");
    hangmanImage.innerHTML = `<img src="images/hangman${6 - remainingAttempts}.png" alt="Hangman">`;

    if (remainingAttempts === 0) {
        alert("Você perdeu! A palavra era: " + selectedWord);
        resetGame();
    }
}


function resetGame() {
    guessedLetters = [];
    remainingAttempts = 6;
    updateWordDisplay();
    updateHangmanImage();
}


const guessForm = document.getElementById("guess-form");
guessForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const guessInput = document.getElementById("guess");
    const guess = guessInput.value.toLowerCase();

    if (!guessedLetters.includes(guess)) {
        guessedLetters.push(guess);

        if (!selectedWord.includes(guess)) {
            remainingAttempts--;
        }

        updateWordDisplay();
        updateHangmanImage();
        checkWin();
    }

    guessInput.value = "";
});


updateWordDisplay();
updateHangmanImage();
