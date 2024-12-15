"use strict";

require("../components/card");
require("../styles/index.css");

const sounds = [
  require("../assets/dark-mode/meow0.mp3"),
  require("../assets/dark-mode/meow1.mp3"),
  require("../assets/dark-mode/meow2.mp3"),
];

const cat = document.querySelector(".cat");

const root = document.documentElement;
const rootStyles = getComputedStyle(root);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function meow() {
  const random = getRandomInt(3);
  const audio = new Audio(sounds[random]);
  audio.play();
}

cat.addEventListener("click", () => {
  meow();

  const darkColor = rootStyles.getPropertyValue("--dark-color");
  const lightColor = rootStyles.getPropertyValue("--light-color");
  const darkModeImage = rootStyles.getPropertyValue("--dark-mode-cat");
  const lightModeImage = rootStyles.getPropertyValue("--light-mode-cat");

  root.style.setProperty("--dark-color", lightColor);
  root.style.setProperty("--light-color", darkColor);
  root.style.setProperty("--dark-mode-cat", lightModeImage);
  root.style.setProperty("--light-mode-cat", darkModeImage);
});
