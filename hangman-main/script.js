import { ruswords } from "./words.js";
let noNum = /[0-9]/g;
let usedLetters = [];
let used = document.querySelector(".used");
let h1 = document.querySelector("h1");
let entrNameBtn = document.querySelector("#entrNameBtn");
let entrName = document.querySelector("#entrName");
let setBtn = document.querySelector(".setBtn");
let modal = document.querySelector(".settings");
let secretModal = document.querySelector(".secretModal");
let multiplayer = document.querySelector(".multiplayer");
let single = true;
let singleplayer = document.querySelector(".singleplayer");
let start = document.querySelector(".start");
let word = randomWord();
let check = document.querySelector(".check");
let letter = document.querySelector(".letter");
let letters = [];
let wordInput = document.querySelector(".word");
let attempts = document.querySelector(".attempts");
let attemp = 10;
letter.oninput = function () {
  this.value = this.value.replace(noNum, "");
};
entrName.oninput = function () {
  this.value = this.value.replace(noNum, "");
};
multiplayer.onclick = function (event) {
  event.preventDefault();
  modal.style.transform = "translateY(100%)";
  secretModal.style.transform = "translate(0)";
  single = false;
  h1.innerHTML = "ВИСЕЛИЦА MULTIPLAYER";
  entrName.focus();
};
singleplayer.onclick = function (event) {
  event.preventDefault();
  modal.style.transform = "translateY(100%)";
  single = true;
  newGame();
  word = randomWord();
  h1.innerHTML = "ВИСЕЛИЦА";
};
setBtn.onclick = function () {
  modal.style.transform = "translateY(0)";
};
modal.onclick = function () {
  modal.style.transform = "translateY(100%)";
};
modal.children[0].onclick = function (event) {
  event.stopPropagation();
};
entrNameBtn.onclick = function (event) {
  event.preventDefault();
  word = entrName.value || randomWord();
  secretModal.style.transform = "translateY(100%)";
  newGame();
  entrName.value = "";
};
secretModal.onclick = function () {
  secretModal.style.transform = "translateY(100%)";
};
secretModal.children[0].onclick = function (event) {
  event.stopPropagation();
};
function newGame() {
  usedLetters = [];
  used.innerHTML = "";
  letter.value = "";
  attemp = 10;
  letters = [];
  attempts.innerHTML = 10;
  wordInput.value = "*".repeat(word.length);
  check.disabled = false;
  letter.disabled = false;
}
start.onclick = function () {
  if (single == false) {
    secretModal.style.transform = "translateY(0)";
    console.log(single == false);
  } else {
    word = randomWord();
    newGame();
  }
};
check.onclick = function () {
  if (word.includes(letter.value)) {
    letters.push(letter.value);
  } else {
    attemp--;
    attempts.innerHTML = attemp;
  }
  if (!usedLetters.includes(letter.value)) {
    usedLetters.push(letter.value);
    console.log(usedLetters);
  }
  used.innerHTML = usedLetters;
  if (attemp == 0) {
    check.disabled = true;
    letter.disabled = true;
    alert('Вы проиграли! слово было: "' + word + '"');
  }
  let encoded = "";
  for (let i = 0; i < word.length; i++) {
    if (letters.includes(word[i])) {
      encoded += word[i];
    } else {
      encoded += "*";
    }
  }
  wordInput.value = encoded;
  if (word == encoded) {
    check.disabled = true;
    letter.disabled = true;
    alert("Вы выиграли!");
  }
};
function randomWord() {
  // let words = ["телевизор", "ванная", "огурец", "помидор"];
  let words = ruswords;
  function randomInteger(min, max) {
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
  }
  return words[randomInteger(0, words.length)];
}
wordInput.value = "*".repeat(word.length);
