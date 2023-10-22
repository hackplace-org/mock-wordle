// Setting up variables within "const" (meaning we cannot change the values of the variables later on)
const inputs = document.querySelector(".word"), // Selecting/Accessing/Retrieving elements with class "word"
    hintTag = document.querySelector(".hint span"), // Selecting/Accessing/Retrieving elements with class "hint" and a span inside
    guessLeft = document.querySelector(".guess span"), // Selecting/Accessing/Retrieving elements with class "guess" and a span inside
    mistakes = document.querySelector(".wrong span"), // Selecting/Accessing/Retrieving elements with class "wrong" and a span inside
    restartBtn = document.querySelector(".restart"), // Selecting/Accessing/Retrieving element with class "restart"
    hintBtn = document.querySelector(".showhint"), // Selecting/Accessing/Retrieving element with class "showhint"
    hintElement = document.querySelector(".hint"), // Selecting/Accessing/Retrieving element with class "hint"
    typeInput = document.querySelector(".type-input"); // Selecting/Accessing/Retrieving element with class "type-input"

// Intializing game variables
let word, incorrectLetters = [], correctLetters = [], maxGuesses; // Declaring variables for the game

// Select random word from word list and set up game
function startNewGame() {
    alert("New Game Started! Guess New Word :)"); // Displaying an alert message

    // Hide hint element
    hintElement.style.display = "none"; // Setting the display style property to "none"
    hintElement.style.opacity = "0"; // Setting the opacity style property to "0"

    // Choose random word from db and setup game
    const ranWord = wordList[Math.floor(Math.random() * wordList.length)]; // Selecting a random word from an array
    word = ranWord.word; // Assigning the selected word to the variable 'word'
    maxGuesses = word.length >= 5 ? 8 : 6; // Setting the maximum number of guesses based on word length
    incorrectLetters = []; // Resetting incorrect letters array
    correctLetters = []; // Resetting correct letters array
    hintTag.innerText = ranWord.hint; // Setting the hint text
    guessLeft.innerText = maxGuesses; // Setting the remaining guesses
    mistakes.innerText = incorrectLetters; // Setting the incorrect letters

    // Create input for each letter of word
    inputs.innerHTML = ""; // Clearing the content inside the 'inputs' element
    for (let i = 0; i < word.length; i++) { // Looping through each letter of the word
        const input = document.createElement("input"); // Creating an input element
        input.type = "text"; // Setting the input type to text
        input.disabled = true; // Disabling the input field
        inputs.appendChild(input); // Appending the input element to the 'inputs' element
    }
}

// Handle user input and update game stats
function handleInput(e) {
    // Ignore non-letters input and letters that have already guessed
    const key = e.target.value.toLowerCase(); // Getting the input value and converting to lowercase
    if (key.match(/^[a-z]+$/i) && !incorrectLetters.includes(`${key}`) && !correctLetters.includes(`${key}`)) { // Checking if it's a valid letter
        // Check if the letter is in word
        if (word.includes(key)) { // Checking if the letter is in the word
            // Update correct guess
            for (let i = 0; i < word.length; i++) { // Looping through each letter of the word
                if (word[i] === key) { // Checking if the letter matches
                    inputs.querySelectorAll("input")[i].value += key; // Updating the input field with the correct letter
                }
            }
            correctLetters += key; // Adding the correct letter to the array
        } else {
            // Update incorrect guess
            maxGuesses--; // Decreasing the remaining guesses
            incorrectLetters.push(`${key}`); // Adding the incorrect letter to the array
            mistakes.innerText = incorrectLetters; // Updating the display of incorrect letters
        }
    }

    // Update remain guess and check for win lose conditions
    guessLeft.innerText = maxGuesses; // Updating the remaining guesses display
    if (correctLetters.length === word.length) { // Checking if all letters have been guessed correctly
        alert(`Congrats! You Found The Word ${word.toUpperCase()}`); // Displaying a congratulatory alert
        startNewGame(); // Starting a new game
    } else if (maxGuesses < 1) { // Checking if there are no more guesses left
        alert("Game Over! You don't have any more guesses left!"); // Displaying a game over alert
        for (let i = 0; i < word.length; i++) {
            // Fill inputs with correct words
            inputs.querySelectorAll("input")[i].value = word[i]; // Filling the input fields with the correct letters
        }
    }

    // Clear input field
    typeInput.value = ""; // Clearing the input field value
}

// Show hint element
function showHintElement() {
    hintElement.style.display = "block"; // Displaying the hint element
    hintElement.style.opacity = "1"; // Setting the opacity of the hint element
}

// Setup event listeners
restartBtn.addEventListener("click", startNewGame); // Adding a click event listener to the restart button
hintBtn.addEventListener("click", showHintElement); // Adding a click event listener to the hint button
typeInput.addEventListener("input", handleInput); // Adding an input event listener to the type input field
inputs.addEventListener("click", () => typeInput.focus()); // Adding a click event listener to the inputs element to focus on type input
document.addEventListener("keydown", () => typeInput.focus()); // Adding a keydown event listener to focus on type input

startNewGame(); // Starting a new game when the script is loaded
