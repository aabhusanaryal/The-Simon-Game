// Identifiers
const box1 = document.querySelector(".box1");
const box2 = document.querySelector(".box2");
const box3 = document.querySelector(".box3");
const box4 = document.querySelector(".box4");
const scoreBoard = document.querySelector("#score");
//Sounds
const sound1 = new Audio("sounds/1.mp3");
const sound2 = new Audio("sounds/2.mp3");
const sound3 = new Audio("sounds/3.mp3");
const sound4 = new Audio("sounds/4.mp3");
const soundWrong = new Audio("sounds/wrong.mp3");

//Variables
let i = 0;
let score = 0;
// Main Array, holds boxes
let gameArr = [box1]; //The starting block is always first
const boxArr = [box1, box2, box3, box4]; //We'll pick a random box from here
// Functions
const genRandom = () => {
  const random = Math.floor(Math.random() * 4);
  gameArr.push(boxArr[random]);
  return boxArr[random];
};

const scoreUpdate = () => {
  scoreBoard.innerHTML = `Score: ${score}`;
};
scoreUpdate();

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
      break;
    case box2:
      sound2.play();
      break;
    case box3:
      sound3.play();
      break;
    case box4:
      sound4.play();
      break;
  }
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
  soundWrong.play();
  i = 0;
  score = 0;
  scoreUpdate();
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
      score++;
      playBox(genRandom());
      scoreUpdate();
    }, 250);
  }
};
//Main Function
const playGame = () => {
  playArr();
  box1.addEventListener("click", () => {
    playBox(box1);
    checker(box1);
  });
  box2.addEventListener("click", () => {
    playBox(box2);
    checker(box2);
  });
  box3.addEventListener("click", () => {
    playBox(box3);
    checker(box3);
  });
  box4.addEventListener("click", () => {
    playBox(box4);
    checker(box4);
  });
};

//Listens for spacebar and then plays
document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    playGame();
  }
});
