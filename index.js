'use strict';

// Components
require('./components/card');

// Styles
require('./styles/index.css');

// Sounds
const sounds = [
  require('./assets/dark-mode/meow0.mp3'),
  require('./assets/dark-mode/meow1.mp3'),
  require('./assets/dark-mode/meow2.mp3'),
];

const cards = [...document.getElementsByClassName('card')];
const cat = document.querySelector('.cat');

const root = document.documentElement;
const rootStyles = getComputedStyle(root);
const cardHeight = rootStyles.getPropertyValue('--card-height');

const projectPlaceholder = document.createElement('div');
projectPlaceholder.classList.add('placeholder');

function addFade(card) {
  if (card.scrollHeight > card.offsetHeight) {
    const fade = document.createElement('div');
    fade.classList.add('fade');

    card.appendChild(fade);
  }
}

function resetCards(currentCard, fade) {
  const otherCards = cards.filter(
    card =>
      card !== currentCard && (fade || card.classList.value.includes('active'))
  );

  otherCards.forEach(otherCard => {
    otherCard.classList.remove('active');
    otherCard.style.height = cardHeight;
    otherCard.lastElementChild.style.display = 'block';
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
  const project = params.get('project');
  const card = document.querySelector(`#${project}`);

  if (card) {
    card.click();

    const { left, top } = card.getBoundingClientRect();
    document.querySelector('.projects').scrollTo(left, 0);
    window.scrollTo(0, top);
  }
}

function updateProjectParam(params) {
  window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
}

function setCardWidth(percentage) {
  const windowWidth = window.innerWidth;

  if (windowWidth <= 600) {
    const newSize = percentage * windowWidth;

    root.style.setProperty('--card-width', `${newSize}px`);
  }
}

async function setDownloadCount() {
  const date = new Date().toISOString().slice(0, 10);

  const response = await fetch(
    `https://api.npmjs.org/downloads/point/2021-01-01:${date}/emoji-sprinkle`
  );
  const { downloads } = await response.json();

  const downloadCountElement = document.querySelector('.download-count');

  downloadCountElement.innerHTML = downloads;
}

// START DOING THINGS

new window.LazyLoad();

cards.forEach(card => {
  addFade(card);

  const fade = card.querySelector('.fade');
  const overlay = card.nextElementSibling;

  const toggleModal = () => {
    resetCards(card, fade);

    card.classList.toggle('active');
    card.parentElement.classList.toggle('modal');
    document.body.classList.toggle('modal-open');

    const params = new URL(document.location).searchParams;

    // If the card is now closed
    if (!card.classList.value.includes('active')) {
      if (fade) {
        card.style.height = cardHeight;
        fade.style.display = 'block';
      }

      params.delete('project');

      projectPlaceholder.remove();
    }
    // If the card is now open
    else {
      if (fade) {
        card.style.height = 'fit-content';
        fade.style.display = 'none';
      }

      params.set('project', card.id);

      document
        .querySelector('.projects')
        .insertBefore(projectPlaceholder, card.parentNode);
    }

    updateProjectParam(params);
  };

  overlay.addEventListener('click', () => {
    toggleModal();
  });

  card.addEventListener('click', event => {
    if (
      card.classList.value.includes('active') &&
      event.target.classList.value !== 'close-button-overlay'
    ) {
      return;
    }

    toggleModal();
  });
});

openProject();
setCardWidth(0.87);

cat.addEventListener('click', () => {
  meow();

  const darkColor = rootStyles.getPropertyValue('--dark-color');
  const lightColor = rootStyles.getPropertyValue('--light-color');
  const darkModeImage = rootStyles.getPropertyValue('--dark-mode-cat');
  const lightModeImage = rootStyles.getPropertyValue('--light-mode-cat');
  const linkDarkColor = rootStyles.getPropertyValue('--link-dark-color');
  const linkVisitedDarkColor = rootStyles.getPropertyValue(
    '--link-visited-dark-color'
  );
  const linkLightColor = rootStyles.getPropertyValue('--link-light-color');
  const linkVisitedLightColor = rootStyles.getPropertyValue(
    '--link-visited-light-color'
  );
  const fadeDarkColor = rootStyles.getPropertyValue('--fade-dark-color');
  const fadeLightColor = rootStyles.getPropertyValue('--fade-light-color');

  root.style.setProperty('--dark-color', lightColor);
  root.style.setProperty('--light-color', darkColor);
  root.style.setProperty('--dark-mode-cat', lightModeImage);
  root.style.setProperty('--light-mode-cat', darkModeImage);
  root.style.setProperty('--link-dark-color', linkLightColor);
  root.style.setProperty('--link-visited-dark-color', linkVisitedLightColor);
  root.style.setProperty('--link-light-color', linkDarkColor);
  root.style.setProperty('--link-visited-light-color', linkVisitedDarkColor);
  root.style.setProperty('--fade-dark-color', fadeLightColor);
  root.style.setProperty('--fade-light-color', fadeDarkColor);
});

setDownloadCount();
