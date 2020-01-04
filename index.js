var accordions = [...document.getElementsByClassName('accordion')];

accordions.forEach(accordion => {
    accordion.addEventListener('click', function() {
        this.classList.toggle('active');

        var panel = this.nextElementSibling;
        if (panel.style.display === 'block') {
            panel.style.display = 'none';
        } else {
            panel.style.display = 'block';
        }
    });
});
