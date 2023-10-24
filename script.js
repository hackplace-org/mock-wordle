// Setting up variables all as 'const', meaning the variable value stays the same unless you physically change the line where the variable has been declared
const inputs = document.querySelector(".word"), // Selecting/Accessing/Retrieving elements with class "word"
    hintTag = document.querySelector(".hint span"), // Selecting/Accessing/Retrieving elements with class "hint" and a span inside
    guessLeft = document.querySelector(".guess span"), // Selecting/Accessing/Retrieving elements with class "guess" and a span inside
    mistakes = document.querySelector(".wrong span"), // Selecting/Accessing/Retrieving elements with class "wrong" and a span inside
    restartBtn = document.querySelector(".restart"), // Selecting/Accessing/Retrieving element with class "restart", Restart Button
    hintBtn = document.querySelector(".showhint"), // Selecting/Accessing/Retrieving element with class "showhint", Show Hint Button
    hintElement = document.querySelector(".hint"), // Selecting/Accessing/Retrieving element with class "hint"
    typeInput = document.querySelector(".type-input"); // Selecting/Accessing/Retrieving element with class "type-input"

// Intializing game variables
let word, incorrectLetters = [], correctLetters = [], maxGuesses; // Declaring variables for the game

// Select random word from word list and set up game; functions have inputs (code) to create an output
function startNewGame() {
    alert("New Game Started! Guess New Word :)"); // Displaying an alert message

    // Hide hint element
    hintElement.style.display = "none"; // Setting the display style property to "none"; style property allows modification of CSS properties of this ement
    hintElement.style.opacity = "0"; // Setting the opacity style property to "0"

    // Choose random word from database and setup game
    const ranWord = wordList[Math.floor(Math.random() * wordList.length)]; // Selecting a random word from an array
    word = ranWord.word; // Assigning the selected word to the variable 'word'
    maxGuesses = word.length >= 5 ? 8 : 6; // Setting the maximum number of guesses based on word length; if word chars/letters >= 5, then max guess is 8. If word chars/letters < 5, max guess is 6.
    incorrectLetters = []; // Resetting incorrect letters array
    correctLetters = []; // Resetting correct letters array
    hintTag.innerText = ranWord.hint; // Setting the hint text
    guessLeft.innerText = maxGuesses; // Setting the text of the guess and placing it in the maxGuesses array from earlier
    mistakes.innerText = incorrectLetters; // Setting the incorrect letters text

    // Create an input element for each letter of word (sets up user input)
    inputs.innerHTML = ""; // Clearing the content inside the 'inputs' element (where all the variables are stored)
    for (let i = 0; i < word.length; i++) { // For Loop: looping/iterating through each letter of the word. Starts at the first letter(index) and stops at
        const input = document.createElement("input"); // Creating an input element
        input.type = "text"; // Setting the input element type to text
        input.disabled = true; // Disabling the input field (so user doesn't directly interact with these input fields, the program will update the field[word boxes] itself)
        inputs.appendChild(input); // placeholder for the user to type in a letter
        // code inside the For Loop will repeat/iterate until the word is fully typed
    }
}

// Handle user input and update game stats
function handleInput(e) { 
    // e parameter(event object input) is the letter the user types in; e also triggers the function
    // Ignore non-letters input and letters that have already guessed
    const key = e.target.value.toLowerCase(); // Getting the input value (user letter) and converting to lowercase
        // e: event that triggered the function; e.target: element that triggered the event; e.target.value: gets the letter the user typed (value) from the input field
    if (key.match(/^[a-z]+$/i) && !incorrectLetters.includes(`${key}`) && !correctLetters.includes(`${key}`)) { // Checking if it's a valid letter
        // Checks if key(user keyboard input) is a letter from a-z, "^" starts a new string, "+" checks if input in string is one or more letters, "$" is the end of the string, "i" checks if it's not case-sensitive. The if statement also checks if key is in the incorrectLetters array and is NOT in the correctLetters array

        // the if-statement below iterates through each character of the randomly-selected word of the database. if it matches the user's input "key" then it finds the corresponding input element and appends the key to the current value.  
        if (word.includes(key)) { // Checking if key is in the word
            // Update correct guess
            for (let i = 0; i < word.length; i++) { // Looping through each letter of the word
                if (word[i] === key) { // Checking if the key matches any letter (index) of the randomly-selected word
                    inputs.querySelectorAll("input")[i].value += key; // Updating the input field with the correct letter; fills in the box with the guessed letter; += key: adds the "key" value to the input value (ex: input is A and key is B, then the value of input would change to AB)
                }
            }

            correctLetters += key; // Adding the correctly guessed letter to the correctLettersarray
        } else {
            // Update incorrect guess
            maxGuesses--; // Decreasing the remaining guesses if guess was incorrect
            incorrectLetters.push(`${key}`); // push function adds the incorrect guess to the incorrectLetters array
            mistakes.innerText = incorrectLetters; // Updating the display of incorrect letters
        }
    }

    // Update remain guess and check for win-lose conditions
    guessLeft.innerText = maxGuesses; // Updates the display showing how many guesses are left
    if (correctLetters.length === word.length) { // Checking if all letters have been guessed correctly (if correctly-guessed letters is equal to length of the word)
        alert(`Congrats! You Found The Word ${word.toUpperCase()}`); // Displaying a congratulatory alert if the the above are equal (since it means the letters have been guessed correctly)
        startNewGame(); // Starting a new game
    } else if (maxGuesses < 1) { // Checking if there are no more guesses left if previous condition not met
        alert("Game Over! You don't have any more guesses left!"); // Displaying a game over alert since player used up all of their guesses
        for (let i = 0; i < word.length; i++) { // iterates through each letter of the word
            inputs.querySelectorAll("input")[i].value = word[i]; // selects all input fields and fills with the correct letters when game ends (either player won or ran out of guesses), also gives a visual representation of the correct word
        }
    }

    // Clear input field
    typeInput.value = ""; // Automatically clears the input field so the user can enter their next guess (does not need to manually/physically delete & enter letter)
}

// Reveals the hint to the user
function showHintElement() {
    hintElement.style.display = "block"; // block: displaying hints (where hints show up after you press the hint button); 
    hintElement.style.opacity = "1"; // making it fully visible(opaque)
}

// Setup event listeners (respond to specific events occurring in a web page)
restartBtn.addEventListener("click", startNewGame); // listening for a click --> restart button clicked  --> triggers startNewGame function from much earlier --> start new game
hintBtn.addEventListener("click", showHintElement); // listening for a click --> hint button clicked --> triggers showHintElement function --> displays hint to player
typeInput.addEventListener("input", handleInput); // listening for an "input" event --> user types (inputs) into input field --> triggers handleInput function --> determines correct v.s. incorrect guess
inputs.addEventListener("click", () => typeInput.focus()); // listening for a click --> any "inputs" element clicked --> input field (typeInput element) is ready to receive text input
document.addEventListener("keydown", () => typeInput.focus()); // listening for a key on keyboard pressed --> sets focus on typeInput element --> allows user to typing w/out manually clicking input field first

// Function to handle color change (more advanced aspect)
function handleColorChange() {
    const selectedColor = document.getElementById('bgColorPicker').value; // Retrieves the selected color value from the color picker input that user chooses (finds the HTML element with bgColorPicker ID and accesses its value property)
        // essentially connects the HTML element to the JavaScript code
    document.body.style.backgroundColor = selectedColor; // Sets the background color of the entire page to the selected color (accesses style property of body element and sets its "backgroundColor")

    // Change restart and hint button colors
    const buttons = document.querySelectorAll('.restart, .showhint'); // Selects hint and restart buttons and stores in "buttons" variable
    buttons.forEach(button => { // takes in the button parameter/input and uses "forEach" method to iterate through each button and apply a style to it
        button.style.backgroundColor = selectedColor; // Sets the background color of each selected button to the background color of the webpage
    });

    // Store the selected color in localStorage; key: "backgroundColor", value: "selectedColor"; value stored under/associated with key
    // localStorage is a built-in web API (allows external data-sharing/usage) that allows the storing of key-value pairs in a web browser, basically providing a simple way to store data persistently is a web application
    localStorage.setItem('backgroundColor', selectedColor); // setItem method sets a key-value pair in the local storage object 
    // Essentially: store "selectedColor" value in the local storage under the "backgroundColor" label so that whenever you want to retrieve this color value, you can ask the local storage for the value associated with the key "backgroundColor"; Purpose: saves the selected color value to the browser's local storage.
    // English Summary: this line ensures that the user's chosen background color is remembered even if they naviage away from the page or refresh it so that the user's preferred color persists across all sessions/games.
}

const storedColor = localStorage.getItem('backgroundColor'); // Retrieves the stored color value associated with the key from local storage and stores in "storedColor" variable
if (storedColor) {
    document.body.style.backgroundColor = storedColor; // If a color is stored(storedColor is truthy) --> sets the background color of the page to the stored color (value in variable)
} else {
    document.body.style.backgroundColor = '#ffffff'; // If no color is stored, sets a default background color to white (#ffffff), same as default color in HTML file
}

// Add an event listener to the color picker input
document.getElementById('bgColorPicker').addEventListener('input', handleColorChange); // Listens for changes in the color picker input (user's color input) --> user selects (input) a color --> triggers the handleColorChange function, which is responsible for updating the background color of the page and other elements based on the selected color

startNewGame(); // Starting/ensures a new game when the script is loaded
// calls the startNewGame function
