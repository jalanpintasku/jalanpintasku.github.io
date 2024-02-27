// Get the canvas element
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

// Set the width and height of the canvas
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Create an array of characters
const characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

// Create an array of columns
const columns = Math.floor(canvasWidth / 20);

// Initialize the y positions of the columns
const yPositions = [];

for (let i = 0; i < columns; i++) {
  yPositions[i] = Math.random() * canvasHeight;
}

// Update the matrix animation
function updateMatrix() {
  // Set the background color
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Set the text color and font
  ctx.fillStyle = "green";
  ctx.font = "12px timesnewroman";

  // Loop through each column
  for (let i = 0; i < columns; i++) {
    // Select a random character from the array
    const character = characters[Math.floor(Math.random() * characters.length)];

    // Set the y position of the current column
    const y = yPositions[i];

    // Draw the character at the current position
    ctx.fillText(character, i * 20, y);

    // Move the column down by 20 units
    yPositions[i] += 20;

    // Reset the position if it reaches the bottom of the canvas
    if (yPositions[i] > canvasHeight && Math.random() > 0.98) {
      yPositions[i] = 0;
    }
  }
}

// Render the matrix animation
function renderMatrix() {
  requestAnimationFrame(renderMatrix);
  updateMatrix();
}

// Start the animation
renderMatrix();

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomLetter() {
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
return alphabet[rand(0,alphabet.length - 1)]
}
function getRandomWord(word) {
var text = word.innerHTML

var finalWord = ''
for(var i=0;i<text.length;i++) {
  finalWord += text[i] == ' ' ? ' ' : getRandomLetter()
}

return finalWord
}

var word = document.querySelector('p')
var interv = 'undefined'
var canChange = false
var globalCount = 0
var count = 0
var INITIAL_WORD = word.innerHTML;
var isGoing = false

function init() {
if(isGoing) return;

isGoing = true
var randomWord = getRandomWord(word)
word.innerHTML = randomWord

interv = setInterval(function() {
var finalWord = ''
for(var x=0;x<INITIAL_WORD.length;x++) {
 if(x <= count && canChange) {
  finalWord += INITIAL_WORD[x]
 } else {
  finalWord += getRandomLetter()
 }
}
word.innerHTML = finalWord
if(canChange) {
  count++
}
if(globalCount >= 20) {
 canChange = true
}
if(count>=INITIAL_WORD.length) {
 clearInterval(interv)
 count = 0
 canChange = false
 globalCount = 0
 isGoing = false
}
globalCount++
},50)

}



word.addEventListener('mouseenter', init)
