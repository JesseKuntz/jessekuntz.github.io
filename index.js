var accordions = [...document.getElementsByClassName('accordion')];
var panels = [...document.getElementsByClassName('panel')];

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
