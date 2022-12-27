"use strict";

require("./components/card");

require("./styles/index.css");

const sounds = [
  require("./assets/dark-mode/meow0.mp3"),
  require("./assets/dark-mode/meow1.mp3"),
  require("./assets/dark-mode/meow2.mp3"),
];

const cards = [...document.getElementsByClassName("card")];
const cat = document.querySelector(".cat");

const root = document.documentElement;
const rootStyles = getComputedStyle(root);
const cardHeight = rootStyles.getPropertyValue("--card-height");

const projectPlaceholder = document.createElement("div");
projectPlaceholder.classList.add("placeholder");

function addFade(card) {
  const fade = document.createElement("div");
  fade.classList.add("fade");

  card.appendChild(fade);
}

function resetCards(currentCard, fade) {
  const otherCards = cards.filter(
    (card) =>
      card !== currentCard && (fade || card.classList.value.includes("active"))
  );

  otherCards.forEach((otherCard) => {
    otherCard.classList.remove("active");
    otherCard.style.height = cardHeight;
    otherCard.lastElementChild.style.display = "block";
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function meow() {
  const random = getRandomInt(3);
  const audio = new Audio(sounds[random]);
  audio.play();
}

function openProject() {
  const params = new URL(document.location).searchParams;
  const project = params.get("project");
  const card = document.querySelector(`#${project}`);

  if (card) {
    card.click();

    const { left, top } = card.getBoundingClientRect();
    document.querySelector(".projects").scrollTo(left, 0);
    window.scrollTo(0, top);
  }
}

function updateProjectParam(params) {
  window.history.replaceState({}, "", `${window.location.pathname}?${params}`);
}

function setCardWidth(percentage) {
  const windowWidth = window.innerWidth;

  if (windowWidth <= 600) {
    const newSize = percentage * windowWidth;

    root.style.setProperty("--card-width", `${newSize}px`);
  }
}

async function setDownloadCount() {
  const date = new Date().toISOString().slice(0, 10);

  const response = await fetch(
    `https://api.npmjs.org/downloads/point/2021-01-01:${date}/emoji-sprinkle`
  );
  const { downloads } = await response.json();

  const downloadCountElement = document.querySelector(".download-count");

  downloadCountElement.innerHTML = downloads;
}

// START DOING THINGS

new window.LazyLoad();

cards.forEach((card) => {
  addFade(card);

  const fade = card.querySelector(".fade");
  const overlay = card.nextElementSibling;

  const toggleModal = () => {
    resetCards(card, fade);

    card.classList.toggle("active");
    card.parentElement.classList.toggle("modal");
    document.body.classList.toggle("modal-open");

    const params = new URL(document.location).searchParams;

    // If the card is closing
    if (!card.classList.value.includes("active")) {
      card.style.height = cardHeight;
      fade.style.display = "block";

      params.delete("project");

      projectPlaceholder.remove();
    }
    // If the card is opening
    else {
      card.style.height = "fit-content";
      fade.style.display = "none";

      params.set("project", card.id);

      document
        .querySelector(".projects")
        .insertBefore(projectPlaceholder, card.parentNode);
    }

    updateProjectParam(params);
  };

  overlay.addEventListener("click", () => {
    toggleModal();
  });

  card.addEventListener("click", (event) => {
    if (
      card.classList.value.includes("active") &&
      event.target.classList.value !== "close-button-overlay"
    ) {
      return;
    }

    // Close the currently open card
    const activeCard = cards.find((card) =>
      card.classList.value.includes("active")
    );
    if (activeCard) {
      activeCard.querySelector(".close-button-overlay").click();
    }

    toggleModal();
  });

  window.addEventListener(
    "keyup",
    (event) =>
      card.classList.value.includes("active") &&
      event.code === "Escape" &&
      toggleModal()
  );
});

openProject();
setCardWidth(0.87);

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

setDownloadCount();
