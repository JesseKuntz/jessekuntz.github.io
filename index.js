const accordions = [...document.getElementsByClassName('accordion')];
const panels = [...document.getElementsByClassName('panel')];
const darkModeCat = document.querySelector('.dark-mode-cat');

function resetAccordions(currentAccordion) {
    const otherAccordions = accordions.filter(accordion => { return accordion != currentAccordion })
    otherAccordions.forEach(otherAccordion => {
        otherAccordion.classList.remove('active');
        otherAccordion.nextElementSibling.style.display = 'none';
    });
}

accordions.forEach(accordion => {
    accordion.addEventListener('click', function() {
        resetAccordions(accordion);

        this.classList.toggle('active');

        var panel = this.nextElementSibling;
        if (panel.style.display === 'block') {
            panel.style.display = 'none';
        } else {
            panel.style.display = 'block';
        }

        window.scrollTo({
            'behavior': 'smooth',
            'left': 0,
            'top': accordion.offsetTop
        });
    });
});

darkModeCat.addEventListener('click', () => {
    const root = document.documentElement;
    const rootStyles = getComputedStyle(root);

    const darkColor = rootStyles.getPropertyValue('--dark-color');
    const lightColor = rootStyles.getPropertyValue('--light-color');
    const darkModeImage = rootStyles.getPropertyValue('--dark-mode-cat');
    const lightModeImage = rootStyles.getPropertyValue('--light-mode-cat');

    root.style.setProperty('--dark-color', lightColor);
    root.style.setProperty('--light-color', darkColor);
    root.style.setProperty('--dark-mode-cat', lightModeImage);
    root.style.setProperty('--light-mode-cat', darkModeImage);
});
