// Identifiers
const box1 = document.querySelector(".box1");
const box2 = document.querySelector(".box2");
const box3 = document.querySelector(".box3");
const box4 = document.querySelector(".box4");
const levelBoard = document.querySelector("#level");
const playBtn = document.querySelector("#play");
const welcomeScreen = document.querySelector("#welcomeScreen");
const gameScreen = document.querySelector("#gameScreen");
//Sounds
const sound1 = new Audio("assets/sounds/1.mp3");
const sound2 = new Audio("assets/sounds/2.mp3");
const sound3 = new Audio("assets/sounds/3.mp3");
const sound4 = new Audio("assets/sounds/4.mp3");
const soundWrong = new Audio("assets/sounds/wrong.mp3");

//colors
const red = "#ff6b6b";
const orange = "#fcaa67";
const green = "#82ff9e";
const blue = "#05a8aa";
//Variables
let i = 0;
let level = 1;
gameOngoing = false;
let lastColor = red;
// Main Array, holds boxes
let gameArr = [box1]; //The starting block is always first
const boxArr = [box1, box2, box3, box4]; //We'll pick a random box from here
// Functions
const genRandom = () => {
    const random = Math.floor(Math.random() * 4);
    randomBox = boxArr[random];
    if (randomBox === gameArr[gameArr.length - 1]) return genRandom(); //Makes sure that boxes arent repeated simultaneously
    gameArr.push(randomBox);
    return randomBox;
};

const levelUpdate = () => {
    levelBoard.innerHTML = `Level: ${level}`;
};

const playBox = (box) => {
    //box is the element itself, and not just a number
    box.classList.add("darkBox");

    setTimeout(() => {
        box.classList.remove("darkBox");
    }, 250);
    //Playing sound
    switch (box) {
        case box1:
            sound1.play();
            lastColor = red;
            break;
        case box2:
            sound2.play();
            lastColor = orange;
            break;
        case box3:
            sound3.play();
            lastColor = green;
            break;
        case box4:
            sound4.play();
            lastColor = blue;
            break;
    }
    gameScreen.style.color = lastColor;
};

const playArr = () => {
    //Loops through the gameArr and plays respective block
    gameArr.forEach((box, index) => {
        setTimeout(() => {
            playBox(box);
        }, 350 * index);
    });
};

const gameOver = () => {
    gameOngoing = false;
    soundWrong.play();
    i = 0;
    level = 1;
    gameArr = [box1];
    playBtn.style.display = "block";
    playBtn.innerHTML = "Play Again?";
};

const checker = (box) => {
    if (i <= gameArr.length - 1) {
        if (gameArr[i] === box) {
            i++;
        } else gameOver();
    }

    if (i === gameArr.length) {
        setTimeout(() => {
            i = 0;
            level++;
            playBox(genRandom());
            levelUpdate();
        }, 250);
    }
};
box1.addEventListener("click", () => {
    if (gameOngoing) {
        playBox(box1);
        checker(box1);
    }
});
box2.addEventListener("click", () => {
    if (gameOngoing) {
        playBox(box2);
        checker(box2);
    }
});
box3.addEventListener("click", () => {
    if (gameOngoing) {
        playBox(box3);
        checker(box3);
    }
});
box4.addEventListener("click", () => {
    if (gameOngoing) {
        playBox(box4);
        checker(box4);
    }
});
//Main Function
const playGame = () => {
    gameOngoing = true;
    levelUpdate();
    playArr();
};

//Event listener
playBtn.addEventListener("click", (event) => {
    playGame();
    welcomeScreen.style.display = "none";
    gameScreen.style.display = "block";
});
