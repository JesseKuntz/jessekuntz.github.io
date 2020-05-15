const cards = [...document.getElementsByClassName('card')];
const panels = [...document.getElementsByClassName('panel')];
const darkModeCat = document.querySelector('.dark-mode-cat');

const root = document.documentElement;
const rootStyles = getComputedStyle(root);
const cardHeight = rootStyles.getPropertyValue('--card-height');

function shouldHaveFade(card) {
  if (card.scrollHeight > card.offsetHeight) {
    return true;
  }

  return false;
}

function resetCards(currentCard) {
  const otherCards = cards.filter(card => {
    return (card !== currentCard) && (shouldHaveFade(card) || card.classList.value.includes('active'))
  })
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
  const params = (new URL(document.location)).searchParams;
  const project = params.get('project');
  const card = document.querySelector(`#${project}`);

  if (card) {
    card.scrollIntoView();
    card.click();
  }
}

cards.forEach(card => {
  if (shouldHaveFade(card)) {
    card.addEventListener('click', function () {
      resetCards(card);

      this.classList.toggle('active');
      const fade = card.querySelector('.fade');

      if (card.style.height === '100%') {
        card.style.height = cardHeight;
        fade.style.display = 'block';
      } else {
        card.style.height = '100%';
        fade.style.display = 'none';
      }

      window.scrollTo({
        'left': 0,
        'top': card.offsetTop - 20
      });
    });

    card.lastElementChild.style.display = 'block';
  }
});

openProject();

darkModeCat.addEventListener('click', () => {
  meow();

  const darkColor = rootStyles.getPropertyValue('--dark-color');
  const lightColor = rootStyles.getPropertyValue('--light-color');
  const darkModeImage = rootStyles.getPropertyValue('--dark-mode-cat');
  const lightModeImage = rootStyles.getPropertyValue('--light-mode-cat');
  const linkLightColor = rootStyles.getPropertyValue('--link-light-color');
  const linkVisitedLightColor = rootStyles.getPropertyValue('--link-visited-light-color');
  const linkDarkColor = rootStyles.getPropertyValue('--link-dark-color');
  const linkVisitedDarkColor = rootStyles.getPropertyValue('--link-visited-dark-color');

  root.style.setProperty('--dark-color', lightColor);
  root.style.setProperty('--light-color', darkColor);
  root.style.setProperty('--dark-mode-cat', lightModeImage);
  root.style.setProperty('--light-mode-cat', darkModeImage);
  root.style.setProperty('--link-light-color', linkDarkColor);
  root.style.setProperty('--link-visited-light-color', linkVisitedDarkColor);
  root.style.setProperty('--link-dark-color', linkLightColor);
  root.style.setProperty('--link-visited-dark-color', linkVisitedLightColor);
});
