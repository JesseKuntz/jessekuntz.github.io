const cards = [...document.getElementsByClassName('card')];
const darkModeCat = document.querySelector('.dark-mode-cat');

const root = document.documentElement;
const rootStyles = getComputedStyle(root);
const cardHeight = rootStyles.getPropertyValue('--card-height');

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
  const audio = new Audio(`assets/dark-mode/meow${random}.mp3`);
  audio.play();
}

function openProject() {
  const params = new URL(document.location).searchParams;
  const project = params.get('project');
  const card = document.querySelector(`#${project}`);

  if (card) {
    card.scrollIntoView();
    card.click();
  }
}

function updateProjectParam(params) {
  window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
}

function setCardWidth() {
  const windowWidth = window.innerWidth;

  if (windowWidth <= 600) {
    const newSize = 0.75 * windowWidth;

    root.style.setProperty('--card-width', `${newSize}px`);
  }
}

new window.LazyLoad();

cards.forEach(card => {
  addFade(card);

  card.addEventListener('click', function clickHandler(event) {
    if (event.target.tagName.toLowerCase() === 'a') {
      return;
    }

    const fade = card.querySelector('.fade');

    resetCards(card, fade);

    this.classList.toggle('active');

    const params = new URL(document.location).searchParams;

    if (!card.classList.value.includes('active')) {
      if (fade) {
        card.style.height = cardHeight;
        fade.style.display = 'block';
      }

      params.delete('project');
    } else {
      if (fade) {
        card.style.height = '100%';
        fade.style.display = 'none';
      }

      params.set('project', card.id);
    }

    updateProjectParam(params);

    window.scrollTo({
      left: 0,
      top: card.offsetTop - 20,
    });
  });
});

openProject();
setCardWidth();

darkModeCat.addEventListener('click', () => {
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
